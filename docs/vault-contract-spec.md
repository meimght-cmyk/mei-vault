# MeiVault contract spec

**Status:** draft for Phase 4 v2 implementation. Supersedes the owner-funded `TreasuryVault.sol` for public-deposit use. Audit-ready target.

**Date:** 2026-05-23
**Owner:** Truu
**Implementor:** TBD (Codex draft + Truu draft, compared and reconciled before audit)

---

## 0. Why a new contract

The existing `TreasuryVault.sol` is owner-funded: only the owner deposits, only the owner withdraws. There are no shares, no capacity cap, no withdrawal queue, no fee accounting. To accept public deposits across three tiered vaults (Conservative / Balanced / Edge), a redesign is required.

This spec defines `MeiVault` — a single contract deployed three times (one per tier) with constructor-supplied parameters. No shared state across instances. No upgradeability. If a vault is broken, deploy a new one and let users migrate; do not patch in place.

---

## 1. Design principles

1. **The contract is the floor, the signer is the brain.** On-chain enforcement is intentionally narrow: capacity cap, executor allowlist, withdrawal delay, pause. All strategy/risk logic lives off-chain in the bounded-delegation signer that calls `exec()`. This keeps the audit surface small.
2. **Fail closed.** Every role check, every cap, every staleness check reverts on the safe path. No default-open behaviors.
3. **Centralized valuation, gated.** NAV is reported by the executor. To bound the centralization, every report has an expiry; deposits and redemptions revert if the report is stale. The executor cannot mint shares to itself except via the documented performance-fee path.
4. **One asset per vault.** Each MeiVault holds exactly one underlying ERC20 (USDC for v1). Multi-asset is out of scope.
5. **No upgradeability.** Immutable parameters in constructor; mutable state only where operationally necessary (executor address, allowed targets, valuation reports).
6. **Caps as a feature.** `capacityCap` is immutable. The only way to raise it is to deploy a new vault and migrate.

---

## 2. Roles

| Role | Identity | Powers | Constraint |
|---|---|---|---|
| **Owner** | 3-of-5 Safe multisig on mainnet (EOA on testnet) | Set executor, manage allowedTargets, pause/unpause, sweep emergency, set fee recipient, accept ownership transfer (Ownable2Step) | Cannot transfer user assets directly; cannot mint shares; cannot bypass capacity cap |
| **Executor** | Hardware wallet or TEE-bound key, separate from owner | Call `exec(target, data)` against allowedTargets, call `reportValuation()` | Cannot withdraw user funds except via DEX swaps to allowedTargets; cannot change roles; cannot change cap |
| **Fee recipient** | Mei treasury Safe (separate from owner multisig) | Receives mgmt fee shares + perf fee shares as minted | No on-chain powers beyond owning shares |
| **Depositors** | Anyone (subject to per-vault gating) | Deposit, queue redemption, claim after delay | Cannot bypass cap, cannot bypass delay |

---

## 3. Immutable parameters (set in constructor)

| Param | Type | Example (Conservative) | Notes |
|---|---|---|---|
| `asset` | `IERC20` | USDC on Base | The single underlying. Cannot change. |
| `name` | `string` | "Mei Conservative Vault" | ERC-20 metadata |
| `symbol` | `string` | "mvUSDC-C" | ERC-20 metadata |
| `capacityCap` | `uint256` | 250_000e6 | Maximum `totalAssets()`. Reverts deposit if exceeded. |
| `minDeposit` | `uint256` | 100e6 | Per-deposit minimum to prevent griefing |
| `withdrawalDelaySeconds` | `uint256` | 86400 (24h) | Queue delay between `requestRedeem` and `claim` |
| `valuationStalenessSeconds` | `uint256` | 3600 (1h) | Max age of a valuation report before deposits/redeems revert |
| `mgmtFeeBps` | `uint256` | 50 (0.5%/yr) | Streamed linearly per second |
| `perfFeeBps` | `uint256` | 500 (5%) | Charged on NAV above high-water mark |

### 3.1 Compile-time constants (not constructor inputs)

These are `public constant` in the contract and sanity-check constructor inputs:

| Constant | Value | Purpose |
|---|---|---|
| `MAX_MGMT_FEE_BPS` | 200 (2%/yr) | Upper bound on `mgmtFeeBps_` |
| `MAX_PERF_FEE_BPS` | 2500 (25%) | Upper bound on `perfFeeBps_` |
| `MIN_STALENESS_SECONDS` | 600 (10 min) | Lower bound on `valuationStalenessSeconds_` |
| `MAX_STALENESS_SECONDS` | 86_400 (24h) | Upper bound on `valuationStalenessSeconds_` |
| `MIN_DELAY_SECONDS` | 3_600 (1h) | Lower bound on `withdrawalDelaySeconds_` |
| `MAX_DELAY_SECONDS` | 30 days | Upper bound on `withdrawalDelaySeconds_` |
| `SHARE_DECIMALS` | 18 | Fixed share token decimals |
| `BPS` | 10_000 | Basis-point denominator |
| `YEAR` | 365.25 days | Mgmt-fee annualization base |

---

## 4. Mutable state

| Variable | Type | Set by | Purpose |
|---|---|---|---|
| `executor` | `address` | Owner | Bounded-delegation signer |
| `allowedTarget` | `mapping(address => bool)` | Owner | Contracts the executor can call via `exec` |
| `feeRecipient` | `address` | Owner | Where mgmt + perf fee shares mint to |
| `paused` | `bool` (via Pausable) | Owner | Halts deposits, exec, and new redemption requests |
| `lastValuation` | `uint256` | Executor (via `reportValuation`) | Reported value of off-vault assets in `asset` units |
| `lastValuationAt` | `uint256` | Executor (via `reportValuation`) | Block timestamp of report |
| `valuationNonce` | `uint256` | Executor (via `reportValuation`) | Strictly monotonic; prevents replay |
| `highWaterMark` | `uint256` | Updated on perf fee charge | Pricer per share at last fee charge, in 1e18 units |
| `mgmtFeeAccruedAt` | `uint256` | Updated on mgmt fee charge | Timestamp of last mgmt fee mint |
| `redemptions` | `mapping(uint256 => RedemptionRequest)` | `requestRedeem` / `claim` | Queue entries |
| `nextRedemptionId` | `uint256` | Incremented on each `requestRedeem` | Sequential ID |

```solidity
struct RedemptionRequest {
    address owner;        // who can call claim (recipient address)
    uint256 shares;       // shares locked at request, burned at claim
    uint256 unlockAt;     // block.timestamp + withdrawalDelaySeconds
    bool    claimed;      // single-use flag (also set by cancelRedemption)
}
```

---

## 5. Functions

### 5.1 Deposit & redeem (ERC-4626-ish)

#### `deposit(uint256 assets, address receiver) returns (uint256 shares)`
- Reverts if `paused`
- Reverts if `assets < minDeposit`
- Reverts if `block.timestamp - lastValuationAt > valuationStalenessSeconds`
- Reverts if `totalAssets() + assets > capacityCap`
- Pulls `assets` of `asset` from `msg.sender` via `safeTransferFrom`
- Computes `shares = convertToShares(assets)` using current price-per-share
- Mints `shares` to `receiver`
- Emits `Deposit(msg.sender, receiver, assets, shares)`

#### `mint(uint256 shares, address receiver) returns (uint256 assets)`
- Inverse of deposit. Same gates apply. Less commonly used.

#### `requestRedeem(uint256 shares, address receiver, address owner) returns (uint256 redemptionId)`
- Reverts if `msg.sender != owner && allowance(owner, msg.sender) < shares` (consumed via OZ `_spendAllowance`)
- Reverts if `paused` (cannot start a new queue during pause)
- Reverts if `block.timestamp - lastValuationAt > valuationStalenessSeconds`
- **Locks** `shares` by transferring them from `owner` to the vault address (not burned — they're burned at claim). Locked shares continue to participate in `totalSupply`, so the redeemer absorbs NAV moves during the delay window.
- Stores `RedemptionRequest({owner: receiver, shares: shares, unlockAt: block.timestamp + withdrawalDelaySeconds, claimed: false})` at `nextRedemptionId++`
- The `assets` payable is **computed at claim time**, not request time. See §5.4 for the design rationale.
- Emits `RedemptionRequested(redemptionId, owner, receiver, shares, unlockAt)`

#### `claim(uint256 redemptionId)`
- Reverts if `redemptions[redemptionId].owner != msg.sender`
- Reverts if `redemptions[redemptionId].claimed`
- Reverts if `block.timestamp < redemptions[redemptionId].unlockAt`
- Reverts if `block.timestamp - lastValuationAt > valuationStalenessSeconds`
- Computes `assets = convertToAssets(redemptions[redemptionId].shares)` at current price-per-share
- Reverts if `asset.balanceOf(this) < assets` (executor must have unwound enough to cover — operational concern, see §5.4)
- Burns `shares` from the vault's own balance (the request held them)
- Transfers `assets` to `msg.sender`
- Sets `claimed = true`
- Emits `RedemptionClaimed(redemptionId, msg.sender, assets, shares)`

#### `cancelRedemption(uint256 redemptionId)`
- Owner of the request can cancel before unlock
- Reverts if already claimed
- Returns the locked shares to the owner
- Emits `RedemptionCancelled(redemptionId)`

### 5.2 Valuation (executor-reported)

#### `reportValuation(uint256 newDeployedValue, uint256 nonce)`
- Only callable by `executor`
- Reverts if `nonce <= valuationNonce` (strict monotonic)
- Sets `lastValuation = newDeployedValue`
- Sets `lastValuationAt = block.timestamp`
- Sets `valuationNonce = nonce`
- Charges mgmt fee (mints shares to feeRecipient based on time elapsed)
- Charges perf fee (mints shares if PPS > HWM, updates HWM)
- Emits `ValuationReported(newDeployedValue, nonce, ppsAfter, mgmtFeeShares, perfFeeShares)`

**Critical invariant:** `totalAssets() = asset.balanceOf(this) + lastValuation`. The executor is trusted to honestly report deployed value. Mitigation: short staleness window (1h), strict nonce, public reporting, off-chain monitoring (AEON) flags drift.

### 5.3 Executor exec (bounded delegation)

#### `exec(address target, bytes calldata data) returns (bytes memory result)`
- Only callable by `executor`
- Reverts if `paused`
- Reverts if `!allowedTarget[target]`
- ReentrancyGuard
- Calls `target.call(data)`
- Bubbles revert reason on failure
- Emits `Executed(target, data)`

v1 vault does not handle native ETH. The `value` parameter has been removed from
`exec`. If a future strategy needs ETH-value calls (e.g., native ETH UniV4
pools), redeploy with a different contract that has a `receive` and proper ETH
accounting.

### 5.4 Design decision: assets-at-claim vs assets-at-request

**Two valid designs:**

**A. Assets-at-request (Yearn V3 style):**
- At `requestRedeem`: compute `assets` now, burn `shares`, store `assets` in the request
- At `claim`: pay out the stored `assets`
- Pro: user knows exactly what they're getting
- Con: vault must keep idle `assets` reserved against pending redemptions, reducing capital efficiency
- Con: locked NAV moves don't accrue to or against the redeemer — they accrue to remaining LPs

**B. Assets-at-claim (this spec, v1):**
- At `requestRedeem`: lock `shares` in the request (not burned, held by vault)
- At `claim`: compute `assets` from current PPS, burn shares, pay out
- Pro: redeemer is exposed to NAV moves during delay window — fair share of gains/losses
- Pro: vault doesn't need to reserve assets — executor unwinds as needed before claim window
- Con: requires operational discipline (executor must ensure liquidity available at unlock)

**Decision: B.** Fair-share semantics matter more for an experimental vault where users opt into the delay knowing it's a risk-management feature. The executor's job is to ensure idle `asset` balance ≥ near-term claimable amount; AEON monitors this.

**Operational rule:** the executor must keep `asset.balanceOf(vault) ≥ sum(claimable shares at PPS for unlocked requests in next 24h)`. If this fails, `claim()` reverts and the user re-tries after the executor unwinds.

### 5.5 Owner functions

| Function | Effect |
|---|---|
| `setExecutor(address)` | Updates executor. `address(0)` disables. |
| `setAllowedTarget(address, bool)` | Add/remove from allowlist. Reverts on `address(0)`. |
| `setFeeRecipient(address)` | Updates fee recipient. Future fees mint to new recipient. |
| `pause()` / `unpause()` | Halts deposits, exec, new redemption requests. **Claims of already-queued requests continue to work** — pause does not trap user funds. |
| `transferOwnership(address)` | Ownable2Step. Recipient must `acceptOwnership`. |
| `emergencySweep(IERC20 token, address to, uint256 amount)` | **Only for non-`asset` tokens stuck in the vault** (e.g., reward tokens accidentally sent). Reverts if `token == asset`. Reverts if not paused. |

`cancelRedemption` is allowed any time before claim, **including after unlock**.
Rationale: it computes no NAV and moves no assets; it just returns the locked
shares to the recipient. Blocking after unlock would trap users if liquidity is
temporarily unavailable.

**Note: there is no owner-callable `withdrawAssets` on the underlying.** The owner cannot drain the vault. The only way assets leave the vault is via `claim()` (paid to redeemers) or via `exec()` (paid to allowlisted DEX contracts as part of strategy). This is the load-bearing safety property.

### 5.6 View functions (ERC-4626 surface)

| Function | Returns |
|---|---|
| `asset()` | The underlying ERC20 |
| `totalAssets()` | `asset.balanceOf(this) + lastValuation` |
| `convertToShares(uint256 assets)` | `assets * totalSupply / totalAssets` (with rounding-down for deposits) |
| `convertToAssets(uint256 shares)` | `shares * totalAssets / totalSupply` (with rounding-down for redeems) |
| `maxDeposit(address)` | `capacityCap - totalAssets()` if not paused and valuation fresh, else 0 |
| `maxMint(address)` | derived from maxDeposit |
| `maxRedeem(address owner)` | `balanceOf(owner)` (the queue is the only path; this returns the gross redeemable) |
| `maxWithdraw(address owner)` | `convertToAssets(balanceOf(owner))` |
| `previewDeposit(uint256 assets)` | `convertToShares(assets)` |
| `previewRedeem(uint256 shares)` | `convertToAssets(shares)` |
| `pricePerShare()` | `totalAssets() * 1e18 / totalSupply` (or 1e18 if supply is 0) |
| `redemptionDelay()` | `withdrawalDelaySeconds` |
| `getRedemption(uint256 id)` | The `RedemptionRequest` struct |

---

## 6. Fees

### 6.1 Management fee (streamed)

Charged on every `reportValuation` call. Mints shares to `feeRecipient` representing the fee accrued since `mgmtFeeAccruedAt`.

```
secondsElapsed = block.timestamp - mgmtFeeAccruedAt
feeAssets = totalAssets() * mgmtFeeBps * secondsElapsed / (10000 * 365.25 days)
feeShares = convertToShares(feeAssets)
_mint(feeRecipient, feeShares)
mgmtFeeAccruedAt = block.timestamp
```

### 6.2 Performance fee (high-water mark)

Also charged on `reportValuation`. Compares current PPS to `highWaterMark`.

```
currentPPS = totalAssets() * 1e18 / totalSupply
if (currentPPS > highWaterMark) {
    gainPerShare = currentPPS - highWaterMark
    gainAssets = gainPerShare * totalSupply / 1e18
    feeAssets = gainAssets * perfFeeBps / 10000
    feeShares = convertToShares(feeAssets)
    _mint(feeRecipient, feeShares)
    highWaterMark = totalAssets() * 1e18 / totalSupply   // recompute after mint
}
```

**Order matters:** mgmt fee charged first, then perf fee. Both adjust `totalSupply`, which adjusts PPS; the perf fee calculation uses the post-mgmt-fee PPS.

### 6.3 Initial HWM

Set to `1e18` in constructor (price-per-share of 1.0). Until total assets per share exceeds 1.0, no perf fee.

### 6.4 Edge case: zero supply

If `totalSupply == 0`, both fee paths short-circuit to 0. PPS undefined but is reported as `1e18` by convention.

---

## 7. Invariants (for auditor + tests)

1. **Conservation:** `totalAssets() = asset.balanceOf(this) + lastValuation` always.
2. **Cap respected:** after any `deposit` or `mint`, `totalAssets() <= capacityCap`.
3. **No silent share inflation:** shares only mint in `deposit`, `mint`, and fee paths. Fee paths emit events.
4. **No silent asset drain:** assets only leave via `claim` (to depositors), `exec` (to allowlisted targets), or `emergencySweep` (non-asset tokens only, when paused).
5. **Owner cannot mint shares.** No code path lets owner mint to themselves or anyone.
6. **Owner cannot transfer user assets out as the underlying.** No `withdrawAsset` function exists for owner.
7. **Executor cannot bypass allowlist.** `exec` reverts on non-allowed target.
8. **Valuation strictly monotonic.** Each `reportValuation` requires a higher nonce than the last.
9. **Claim authorization:** only the original `receiver` (stored as `owner` in the struct — should be renamed to `recipient` to avoid Ownable collision) can claim.
10. **Pause blocks deposits but not claims.** Already-queued redeemers always have an exit.
11. **No reentrancy:** `deposit`, `requestRedeem`, `claim`, `exec` all have `nonReentrant`.

---

## 8. Events

```solidity
event Deposit(address indexed sender, address indexed receiver, uint256 assets, uint256 shares);
event RedemptionRequested(uint256 indexed id, address indexed owner, address indexed receiver, uint256 shares, uint256 unlockAt);
event RedemptionClaimed(uint256 indexed id, address indexed receiver, uint256 assets, uint256 shares);
event RedemptionCancelled(uint256 indexed id);
event ValuationReported(uint256 newDeployedValue, uint256 nonce, uint256 ppsAfter, uint256 mgmtFeeShares, uint256 perfFeeShares);
event Executed(address indexed target, bytes data);
event ExecutorSet(address indexed previous, address indexed current);
event TargetAllowed(address indexed target, bool allowed);
event FeeRecipientSet(address indexed previous, address indexed current);
event EmergencySwept(address indexed token, address indexed to, uint256 amount);
```

---

## 9. Errors

```solidity
error NotExecutor();
error TargetNotAllowed(address target);
error ZeroAddress();
error ZeroAmount();
error BelowMinDeposit(uint256 provided, uint256 min);
error CapacityExceeded(uint256 wouldBe, uint256 cap);
error ValuationStale(uint256 lastAt, uint256 currentBlock);
error NonceNotMonotonic(uint256 provided, uint256 lastSeen);
error NotRedeemer();
error AlreadyClaimed();
error NotUnlockedYet(uint256 unlockAt, uint256 currentBlock);
error InsufficientLiquidity(uint256 needed, uint256 available);
error CannotSweepAsset();
error FeeTooHigh(uint256 provided, uint256 max);
error StalenessOutOfRange(uint256 provided);
error DelayOutOfRange(uint256 provided);
error EtherNotAccepted();
```

---

## 10. Constructor

```solidity
constructor(
    IERC20 asset_,
    string memory name_,
    string memory symbol_,
    address initialOwner,
    address feeRecipient_,
    uint256 capacityCap_,
    uint256 minDeposit_,
    uint256 withdrawalDelaySeconds_,
    uint256 valuationStalenessSeconds_,
    uint256 mgmtFeeBps_,
    uint256 perfFeeBps_
)
```

Asset note: v1 mainnet asset is USDC on Base =
`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`.

Constructor reverts if:
- `address(asset_) == address(0)`
- `initialOwner == address(0)`
- `feeRecipient_ == address(0)`
- `capacityCap_ == 0`
- `mgmtFeeBps_ > 200` (MAX_MGMT_FEE_BPS constant)
- `perfFeeBps_ > 2500` (MAX_PERF_FEE_BPS constant)
- `valuationStalenessSeconds_ < 600` (10 min minimum — anything shorter starves the system)
- `valuationStalenessSeconds_ > 86400` (24h maximum — anything longer is too stale)
- `withdrawalDelaySeconds_ < 3600` (1h minimum — gives AEON time to react)
- `withdrawalDelaySeconds_ > 30 days` (sanity)

Constructor initializes:
- `highWaterMark = 1e18`
- `mgmtFeeAccruedAt = block.timestamp`
- `lastValuationAt = block.timestamp` (valuation starts at 0; idle deposits work immediately)
- `valuationNonce = 0`

---

### 10.1 Decimals offset

The contract uses fixed 18-decimal vault shares regardless of the asset's
decimals. An immutable `_assetToShareScale = 10^(18 - assetDecimals)` is
applied in `_convertToShares` and `_convertToAssets` so that, at inception, one
human-unit of asset mints one human-unit of share and `pricePerShare()` starts
at `1e18`. This is the standard ERC-4626 decimals-offset pattern and
substantially mitigates the first-deposit inflation attack on a 6-decimal
underlying (attacker would need ~$1e12 USDC of donation to move PPS
measurably).

---

## 11. Per-vault parameters (the three tiers)

| Param | Conservative | Balanced | Edge |
|---|---|---|---|
| `name` | "Mei Conservative Vault" | "Mei Balanced Vault" | "Mei Edge Vault" |
| `symbol` | `mvUSDC-C` | `mvUSDC-B` | `mvUSDC-E` |
| `capacityCap` | 250_000e6 | 100_000e6 | 25_000e6 |
| `minDeposit` | 100e6 | 500e6 | 1_000e6 |
| `withdrawalDelaySeconds` | 86_400 (24h) | 604_800 (7d) | 1_209_600 (14d) |
| `valuationStalenessSeconds` | 3_600 (1h) | 3_600 (1h) | 1_800 (30m) |
| `mgmtFeeBps` | 50 (0.5%/yr) | 100 (1%/yr) | 200 (2%/yr) |
| `perfFeeBps` | 500 (5%) | 1000 (10%) | 2000 (20%) |

---

## 12. Off-chain gating (NOT in contract)

Some product-level gates are enforced off-chain only:
- **MEI-token-gated deposits for Edge:** UI checks MEI balance ≥ threshold before showing the deposit button. A determined user can deposit directly via the contract; we accept this (the cap is small enough that it doesn't matter, and a hard on-chain gate adds attack surface).
- **Per-pool concentration limits:** enforced by the off-chain signer policy that approves `exec()` calldata. Not on-chain. The contract trusts the executor to respect concentration; the signer policy + AEON monitoring + audit trail are the enforcement.
- **Whitelist for Stage F:** enforced off-chain at deposit-call generation. Same accept-the-leak rationale as MEI gating.

Anything that's enforced only off-chain is documented in the public README so depositors aren't surprised.

---

## 13. Test plan (Foundry)

Minimum 60 tests across these buckets. Audit will demand fuzz invariants on top.

**Construction & roles (8 tests)**
- Constructor reverts on each bad-param case
- Owner is initialOwner
- Executor starts as `address(0)`
- Owner can set/unset executor
- Owner can set/unset allowedTarget
- Owner cannot set address(0) as allowedTarget
- Ownable2Step transfer works
- Pausable starts unpaused

**Deposit (10 tests)**
- Happy path: deposit assets → receive shares
- Reverts if paused
- Reverts if below minDeposit
- Reverts if cap exceeded
- Reverts if valuation stale
- First deposit gets 1:1 shares
- Second deposit after fee mint gets fewer shares than 1:1
- Cap check uses `totalAssets() + assets`, not just `asset.balanceOf`
- Receiver != msg.sender works
- Re-entrancy from a malicious asset reverts

**Redemption queue (12 tests)**
- requestRedeem locks shares in the request struct (not burned, transferred to vault address)
- Cannot claim before unlock
- Cannot claim someone else's request
- Cannot double-claim
- claim() correctly burns shares and pays assets-at-claim PPS
- cancelRedemption returns shares
- Cannot cancel after claim
- claim reverts if vault has insufficient `asset` balance
- Multiple concurrent requests work independently
- Queue continues during pause (claims work)
- New requestRedeem blocked during pause
- requestRedeem reverts on stale valuation

**Valuation (8 tests)**
- Only executor can call reportValuation
- Nonce must be strictly monotonic
- Reports update totalAssets
- Stale valuation blocks deposit and claim
- Valuation report mints mgmt fee shares
- Valuation report mints perf fee shares if PPS > HWM
- No perf fee if PPS <= HWM
- HWM updates after perf fee

**Exec (8 tests)**
- Only executor can call exec
- Only allowedTargets accepted
- Reverts if paused
- Bubbles up target's revert reason
- Emits Executed
- Non-reentrant
- Cannot send native ETH via exec
- Can call multiple targets sequentially

**Owner safety (6 tests)**
- Owner cannot mint shares (no code path)
- Owner cannot transfer underlying asset out (no withdraw function)
- emergencySweep cannot sweep the underlying asset
- emergencySweep requires pause
- pause blocks deposits + new redemption requests + exec
- pause does NOT block claims

**Fee accounting (8 tests)**
- Mgmt fee streams linearly with time
- No mgmt fee if no time elapsed
- Perf fee charges on NAV up
- No perf fee on NAV flat or down
- HWM never decreases
- Fee shares go to feeRecipient
- Owner can update feeRecipient mid-flight
- Total fees bounded by MAX_MGMT_FEE_BPS + MAX_PERF_FEE_BPS at construction

**ERC-4626 conformance (4 tests)**
- previewDeposit matches actual deposit result
- previewRedeem matches actual claim result (at fresh valuation)
- maxDeposit returns capacityCap - totalAssets when fresh
- maxDeposit returns 0 when paused

**Invariant fuzzing (top-level — let Foundry generate scenarios)**
- `totalAssets == asset.balanceOf(this) + lastValuation` always holds
- Sum of user shares + queued-redemption shares + fee-recipient shares == totalSupply
- After any sequence, owner cannot have caused asset balance to decrease without a corresponding claim or exec event

---

## 14. Out of scope for v1

These are deliberate omissions:

- **Multi-asset deposits.** USDC only for v1. Multi-asset adds router risk and slippage UX without yield-side benefit.
- **Cross-chain.** Base only. Bridges are excluded.
- **On-chain price oracle.** Executor reports NAV. This is the largest centralization. Phase 2 work: add a TWAP-based oracle that bounds reported NAV.
- **Slashing the executor.** If the executor reports bad valuations, owner can revoke executor but cannot punish on-chain. Documented trust assumption.
- **Permit / gasless deposits.** Possible add-on later.
- **Flash loan protection beyond reentrancy.** Deposit-then-immediate-redeem inside a single tx would still pay the fee delay; not exploitable in current design.
- **Insurance / coverage layer.** Off-chain product (Nexus Mutual, etc.). Not in contract.
- **Per-depositor caps.** All depositors equal up to global cap.

---

## 15. Open questions

These need answers before audit. Flag in the implementer's PR.

1. **Asset for v1:** USDC on Base (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)? Confirm.
2. **Decimals:** USDC is 6 decimals. Shares should be 18 (standard ERC-4626). Confirm rounding rules don't lose dust.
3. **Owner identity on mainnet:** Confirmed 3-of-5 Safe before deploy? Signer list?
4. **Fee recipient on mainnet:** Separate Safe? Owner Safe? (Recommend separate.)
5. **Should `pause` also block `reportValuation`?** Argument: yes, freeze NAV during pause. Counter: claims need fresh valuation to compute payout. **Recommendation: no.** Pause blocks new positions/deposits, valuation continues so claims work.
6. **Should the contract emit anything on raw native ETH receive?** **Resolved (2026-05-23):** No `receive` accepting ETH. `exec`'s `value` parameter removed in reconciliation. Vault is single-asset; any future ETH-handling vault is a separate deployment.

---

## 16. Comparison plan

This spec will be implemented twice:
1. **Truu draft:** `contracts/src/MeiVault.sol` written from this spec by hand
2. **Codex draft:** spec handed to Codex, output saved as `contracts/src/MeiVault.codex.sol`

Differences will be enumerated in `docs/vault-contract-comparison.md`. Final version reconciles the two, with rationale per-divergence. Both drafts run the full test suite; tests that pass on one and fail on the other are bugs to investigate.

The reconciled version is what goes to external audit.
