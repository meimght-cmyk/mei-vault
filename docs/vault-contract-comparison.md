# MeiVault — independent implementation comparison

**Date:** 2026-05-23
**Spec:** `docs/vault-contract-spec.md`
**Drafts compared:**
- `contracts/src/MeiVault.sol` — Truu (Claude) draft, 414 lines, no test suite
- `contracts/src/MeiVault.codex.sol` — Codex draft, 496 lines, 86 passing tests

Both drafts compile clean under `solc ^0.8.24`. Codex's 86-test suite passes including a Foundry invariant (`totalAssets == idle + reported`) for 256 runs × 128k calls.

The point of dual implementation was to find spec ambiguity and implementation bugs that neither author would catch alone. It worked. Both drafts have issues. The reconciled contract takes Codex's as the base with specific improvements from Truu's draft and a handful of decisions documented below.

---

## 1. Headline findings

| # | Finding | Severity | Source | Resolution |
|---|---|---|---|---|
| F1 | **Truu's draft has a share-scaling bug** for non-18-decimal assets | High (UX) | Truu's contract | Adopt Codex's `_assetToShareScale` pattern |
| F2 | **Truu's draft omits `mint()` and `maxMint()`** required by spec §5.1 | Medium | Truu's contract | Adopt Codex's implementations |
| F3 | **Truu's draft has no tests**; Codex shipped 86 | High | Truu | Adopt Codex's test suite as the foundation |
| F4 | Fee accrual timing diverges (every-entry-point vs report-only) | Design choice | Both | Spec §6 is literal: report-only. Adopt Codex's approach. |
| F5 | `cancelRedemption` after unlock — spec silent | Spec ambiguity | Codex flagged | Adopt Codex's choice (allow until claim); patch spec |
| F6 | `receive()` reverts but `exec(value)` still accepts a value param | Both | Both | **Drop `value` from `exec` in reconciled version.** Vault is USDC-only; no ETH path needed. |
| F7 | Codex uses generic `ZeroAmount` for constructor range errors; loses debuggability | Low | Codex flagged it themselves | Add named errors (`InvalidDelay`, `InvalidStaleness`) per Codex's own suggestion |
| F8 | Codex uses OZ's `_spendAllowance`; Truu reinvented it | Low | Truu's contract | Adopt Codex's pattern (idiomatic) |
| F9 | Codex's `asset` is a public immutable IERC20 (auto-getter); Truu's has manual `asset()` function | Low | Truu's contract | Adopt Codex's pattern |
| F10 | HWM update math: Codex uses scaled `pricePerShare()`; Truu's HWM math is wrong for non-18-decimal asset | High (correctness) | Truu's contract | Adopt Codex's HWM via `pricePerShare()` |

---

## 2. Detailed diff

### 2.1 Share decimals & scaling (F1, F10)

**Truu's draft:**
```solidity
function decimals() public view override returns (uint8) {
    return _assetDecimals + 12; // 6-decimal USDC → 18-decimal shares
}

function convertToShares(uint256 assets) public view returns (uint256) {
    uint256 supply = totalSupply();
    if (supply == 0) return assets;            // ← BUG: returns raw asset units
    return assets.mulDiv(supply, totalAssets(), Math.Rounding.Floor);
}
```

For USDC (6 dec) at first deposit of 100 USDC: returns `100e6` shares. Combined with `decimals() = 18`, the depositor sees `0.0000001` of the share token. Subsequent deposits scale correctly relative to the broken first deposit, so internal math is consistent — but human-readable balances are nonsense.

HWM also broken: `totalAssets * 1e18 / totalSupply = 100e6 * 1e18 / 100e6 = 1e18` works by accident at inception, but breaks after any reportValuation that uses real human-scale numbers.

**Codex's draft:**
```solidity
uint256 private immutable _assetToShareScale;     // 10**(18 - assetDecimals)

function decimals() public pure override returns (uint8) { return 18; }

function _convertToShares(uint256 assets, Math.Rounding rounding) private view returns (uint256) {
    uint256 supply = totalSupply();
    uint256 total = totalAssets();
    if (supply == 0 || total == 0) return assets * _assetToShareScale;  // ← correct: scale up
    return Math.mulDiv(assets, supply, total, rounding);
}
```

For USDC at first deposit of 100 USDC: returns `100e6 * 1e12 = 100e18` shares = "100 shares" displayed. Correct.

PPS also correctly scaled:
```solidity
function pricePerShare() public view returns (uint256) {
    uint256 supply = totalSupply();
    if (supply == 0) return 1e18;
    return Math.mulDiv(totalAssets(), _assetToShareScale * 1e18, supply);
}
```

**Resolution:** Adopt Codex's approach verbatim. This is a real bug in Truu's draft.

### 2.2 Missing `mint()` (F2)

Spec §5.1 lists `mint(uint256 shares, address receiver) returns (uint256 assets)`. Truu omitted it. Codex implemented it with `Math.Rounding.Ceil` for the assets calculation — the ERC-4626 convention (mint rounds up so the vault doesn't lose dust).

```solidity
function mint(uint256 shares, address receiver) external nonReentrant whenNotPaused returns (uint256 assets) {
    if (receiver == address(0)) revert ZeroAddress();
    if (shares == 0) revert ZeroAmount();
    _requireFreshValuation();
    assets = _convertToAssets(shares, Math.Rounding.Ceil);
    if (assets < minDeposit) revert BelowMinDeposit(assets, minDeposit);
    uint256 wouldBe = totalAssets() + assets;
    if (wouldBe > capacityCap) revert CapacityExceeded(wouldBe, capacityCap);
    asset.safeTransferFrom(msg.sender, address(this), assets);
    _mint(receiver, shares);
    emit Deposit(msg.sender, receiver, assets, shares);
}
```

Also `maxMint(address)` view. Truu omitted both. Adopt Codex's.

### 2.3 Fee accrual timing (F4)

**Truu:** `_accrueMgmtFee()` runs at the top of `deposit`, `requestRedeem`, `claim`, and `reportValuation`. Always current.

**Codex:** Fee accrual only inside `reportValuation`. Other entry points don't touch fees.

**Trade-off:**

| | Truu (every entry point) | Codex (reports only) |
|---|---|---|
| Fee state freshness | Always within seconds | Stale between reports |
| Leakage at deposit | None (depositor pays fee on time-they-weren't-in but it's already accrued) | Bounded by report cadence (1h Conservative, 30m Edge) |
| Auditability | Fee math runs in 5 places | Fee math runs in 1 place |
| Spec adherence | "Charged on every `reportValuation` call" — over-implements | Literal |
| Side effect at claim | Tiny PPS shift on claim — claimer indirectly pays a slice of mgmt fee | None — claim is a pure read of last-reported state |

**Resolution:** Adopt Codex's approach. Spec §6.1 is literal ("Charged on every `reportValuation` call"). Less code surface = smaller audit footprint. The leakage (depositor entering right before a report bears time-they-weren't-in) is bounded by the staleness window already enforced by `freshValuation` — at most 1h on Conservative, 30m on Edge. For a Conservative depositor: 100 USDC × 0.5% APY × (1h / 8760h) = **$0.0006 per 100 USDC of leakage worst case.** Not material.

### 2.4 cancelRedemption after unlock (F5)

Spec §5.5 says cancellation is "before unlock" but provides no error name and no rationale. Codex allows cancel any time before `claimed`, including after unlock. Truu's draft allows it without the unlock check too (didn't enforce it).

**Resolution:** Both implementations agree by accident. Make it explicit in the reconciled spec:

> `cancelRedemption` is allowed any time before claim, including after unlock. Rationale: it computes no NAV and moves no assets; it just returns the locked shares to the recipient. Blocking after unlock would trap users if liquidity is temporarily unavailable.

Patch spec §5.5 accordingly. No code change needed; both drafts already do this.

### 2.5 `receive()` vs `exec(value)` (F6)

Both drafts revert on raw ETH but keep `exec`'s `value` parameter. Both authors noted the inconsistency. Codex's notes: "exec still supports sending native ETH if ETH has been force-sent to the vault, such as in tests through `vm.deal`."

That's not a defense — a force-deal in tests doesn't translate to a real production path.

**Resolution: drop `value` from `exec` in the reconciled contract.** Vault is USDC-only. If a future strategy needs ETH (e.g., native ETH UniV4 pools), redeploy with a different contract that has a `receive` and properly accounted ETH. v1 is single-asset; the `value` parameter is dead surface.

```solidity
// reconciled
function exec(address target, bytes calldata data)
    external onlyExecutor whenNotPaused nonReentrant returns (bytes memory result);
```

Update spec §5.3.

### 2.6 Errors granularity (F7)

Codex uses generic `ZeroAmount()` for invalid constructor ranges (staleness, delay). Codex's notes explicitly flag this:

> Generic parameter reverts are awkward. The lack of named constructor errors for delay/staleness bounds makes tests and integration less readable. Suggested improvement: add `InvalidDelay`, `InvalidStaleness`, or a generic `ParameterOutOfRange`.

Truu's draft already has these as `StalenessOutOfRange` and `DelayOutOfRange`. The reconciled version should keep Codex's general structure but add:
- `StalenessOutOfRange(uint256 provided)`
- `DelayOutOfRange(uint256 provided)`

Update spec §9 errors list.

### 2.7 Allowance handling (F8)

**Truu:**
```solidity
if (msg.sender != owner_) {
    uint256 allowed = allowance(owner_, msg.sender);
    if (allowed < shares) revert InsufficientAllowance(shares, allowed);
    if (allowed != type(uint256).max) {
        _approve(owner_, msg.sender, allowed - shares);
    }
}
```

**Codex:**
```solidity
if (msg.sender != owner_) {
    _spendAllowance(owner_, msg.sender, shares);
}
```

`_spendAllowance` is OZ's internal helper that does exactly what Truu reinvented, including the max-allowance shortcut. Adopt Codex's pattern.

### 2.8 `asset` as public immutable vs function (F9)

Truu: `IERC20 public immutable assetToken; function asset() external view returns (address) { return address(assetToken); }`

Codex: `IERC20 public immutable asset;` (Solidity auto-generates `asset() external view returns (IERC20)`)

Codex's approach saves bytecode and matches ERC-4626 standard return-type expectations (`IERC20` rather than `address`). Adopt Codex's.

Caveat: some test code expects `asset()` to return `address`, not `IERC20`. The two are ABI-compatible (a 20-byte word) but the typed return is cleaner.

### 2.9 NatSpec coverage

Codex has `@notice` + `@param`/`@return` on every external function. Truu's draft has minimal comments by design.

**Resolution:** Adopt Codex's NatSpec verbatim. Auditors will appreciate it; it's free safety.

---

## 3. What both drafts got right (and the spec didn't need to change)

- **`totalAssets() = balance + lastValuation`** — both implementations identical. Conservation invariant holds.
- **Valuation freshness check** — both use the same gate; both apply it on deposit, requestRedeem, claim, mint.
- **Redemption queue mechanics** — assets-at-claim semantics (§5.4) — both implementations identical.
- **Pause semantics** — both block deposit/exec/new-requests but allow claims. Both add `whenPaused` to `emergencySweep`.
- **Owner cannot drain user assets** — neither contract has a function to transfer the underlying asset out except via `claim` (to depositors) or `exec` (to allowlisted targets).
- **ReentrancyGuard** on all four entry points (deposit/requestRedeem/claim/exec) — both.
- **Strictly monotonic valuation nonce** — both.
- **Ownable2Step** — both.
- **HWM never decreases** — both.
- **Perf fee gated on PPS > HWM** — both.

The convergence on these is itself a useful signal: the spec was unambiguous on the load-bearing parts.

---

## 4. Concerns Codex flagged that survive into the reconciled version

From `docs/codex-implementation-notes.md`:

1. **Centralized valuation is load-bearing.** Executor can mis-report NAV and change PPS materially. Not fixable at contract level — bounded by short staleness windows, off-chain monitoring (AEON), and operator-key separation. Documented trust assumption; no contract change.

2. **Delay exceeds freshness for configured tiers.** Conservative has 24h delay + 1h freshness. Claims require the executor to issue a fresh report within 1h of claim time. If executor is down for >1h, claims block until they're back. Documented operational risk; mitigated by AEON alert on stale valuation.

3. **Fee shares remain after full user exit.** If all queued user shares are claimed, fee recipient still holds fee shares against a non-empty `lastValuation`. They can claim normally. Matches intended economics (fees earned are fees owed regardless of who else stayed).

4. **No donation shield beyond decimals offset.** 18-decimal share offset substantially mitigates the ERC-4626 first-deposit inflation attack on a 6-decimal asset (attacker would need ~$1e12 USDC of donation to move PPS measurably). Acceptable for capped vaults. If a future vault uses an 18-decimal underlying, add OZ ERC4626's virtual shares pattern.

---

## 5. Reconciled contract — build instructions

Take `MeiVault.codex.sol` as the base and apply these changes:

| # | Change | Why |
|---|---|---|
| 1 | Drop `value` from `exec(address, uint256, bytes)` → `exec(address, bytes)` | F6 — vault is USDC-only |
| 2 | Add `error StalenessOutOfRange(uint256)` and `error DelayOutOfRange(uint256)`; use in constructor instead of generic `ZeroAmount` | F7 — Codex's own recommendation |
| 3 | Add `error EtherNotAccepted()` in `receive()` instead of bare `revert()` | Debuggability |
| 4 | Add `error InsufficientAllowance(uint256, uint256)` as a typed wrapper around the OZ underflow when desired, OR keep `_spendAllowance` and accept OZ's generic revert | Trade-off; recommend keeping OZ's behavior |
| 5 | Update spec §5.3 to drop `value` parameter, §5.5 to clarify cancelRedemption-after-unlock is allowed, §9 to add the two range errors | Documentation sync |
| 6 | Adopt full Codex test suite as `MeiVault.t.sol`, deleting the `.codex` infix | This becomes the canonical test suite |
| 7 | Add ~10 additional tests for the `exec` signature change and the new named errors | Coverage |

Resulting file structure:

```
contracts/src/MeiVault.sol         ← reconciled (currently Truu's; will be overwritten)
contracts/src/MeiVault.codex.sol   ← preserved as artifact of comparison process
contracts/test/MeiVault.t.sol      ← reconciled test suite
contracts/test/MeiVault.codex.t.sol← preserved as artifact
```

Estimated effort: 1–2 hours to apply the changes, run tests, format, commit.

---

## 6. Spec patches required

Update `docs/vault-contract-spec.md` in these places before audit:

- **§5.3 exec signature:** drop `value` parameter; note that the v1 vault does not handle native ETH.
- **§5.5 cancelRedemption:** clarify "any time before claim, including after unlock."
- **§9 errors list:** add `StalenessOutOfRange(uint256)`, `DelayOutOfRange(uint256)`, `EtherNotAccepted()`.
- **§10 constructor:** confirm USDC on Base = `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` for v1.
- **§15 Q6:** resolve in favor of "no `receive`, drop exec value" — answer in spec body.

---

## 7. What this exercise revealed about the spec

Codex's notes proposed these spec improvements; agreeing with all and folding into next spec revision:

1. **Normalize all conversion and PPS formulas for differing asset/share decimals.** The spec assumed same-decimal asset and shares. Add a §10.1 subsection on the decimals offset pattern.

2. **Resolve the requestRedeem contradiction in §5.1.** Earlier draft had "burns shares at request" then corrected to "locks at request, burns at claim." Strip the obsolete text.

3. **State whether `cancelRedemption` is allowed after unlock.** Yes — clarify.

4. **Add named errors for constructor bound failures.** Done above.

5. **Explicitly state whether fees are charged only on reports or also before deposits/mints.** Reports only. Update §6 to be explicit.

These spec defects didn't cause any test failures in either implementation — both authors made defensible interpretations — but they're the kind of thing an external auditor would write up as findings. Cleaner to fix them in spec before audit than to have the auditor flag them.

---

## 8. Executive summary

**Codex's draft is closer to audit-ready.** Two real bugs in Truu's draft (share scaling for non-18-decimal asset, broken HWM math at PPS computation) would have been caught by Codex's test suite within minutes. The fee-accrual divergence is a defensible design choice both ways, but Codex's matches spec literally and is easier to reason about.

**Truu's draft contributed three improvements worth keeping:** granular constructor errors (`StalenessOutOfRange`, `DelayOutOfRange`), named `EtherNotAccepted` on receive(), and the architectural recommendation to drop `value` from `exec` entirely rather than half-supporting ETH.

**The two real ambiguities** Codex flagged (`cancelRedemption` post-unlock, decimals offset) are spec defects, not implementation bugs. Patch the spec.

**Reconciled contract = Codex base + Truu's 3 patches.** Estimated 1–2 hours to produce. Then run the existing 86-test suite + ~10 new tests + invariant fuzzing for 1000+ runs. That's the artifact that goes to external audit.

Next: Truu approves this comparison, then either applies the reconciliation patches inline or hands this doc back to Codex with instructions to produce the reconciled `MeiVault.sol` and updated `MeiVault.t.sol`.
