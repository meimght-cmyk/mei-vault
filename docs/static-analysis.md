# Static analysis — MeiVault.sol

**Date:** 2026-05-24
**Tools run:** Slither v0.11.5, Aderyn v0.6.8
**Target:** `contracts/src/MeiVault.sol` (canonical reconciled contract)
**Status:** All findings triaged. 4 fixes applied. No outstanding real findings.

**Final state:**
- Slither: **0 findings** (was 21 raw) — config-based exclusions documented below
- Aderyn: **4 findings** (was 9 raw), all documented false-positives or intentional design

This document exists so auditors don't spend cycles on findings the automated tools already surfaced and we already addressed. The raw `report.md` from Aderyn lives in `contracts/report.md` (not checked in — regenerated on demand).

## Tool invocations

```bash
# Slither — uses contracts/slither.config.json for scope + noise filtering
slither src/MeiVault.sol --config-file slither.config.json

# Aderyn — same scope
aderyn --src src --path-excludes "src/MeiVault.codex.sol,src/TreasuryVault.sol,test,lib"
```

The Slither config file (`contracts/slither.config.json`) lists detector exclusions that were reviewed and accepted as documented in this file. Aderyn does not support config-file suppression at v0.6.8; its remaining 4 findings are documented as FP/intentional in §"Aderyn findings — full triage" below.

## Summary

| Tool | Raw findings | Fixes applied | Final count | Notes |
|---|---|---|---|---|
| Slither | 21 | Config silences detector noise (timestamp, strict-equality, locked-ether FP, etc.) | **0** | Config at `contracts/slither.config.json` |
| Aderyn | 9 | L-2 (BPS literal → 1e4), L-2-new (1e18 → PPS_PRECISION constant), L-4 (nonReentrant ordering), L-7 (pragma pin) | **4** | All remaining are documented FPs or intentional design |

Both Highs from Aderyn are false positives (heuristic detectors confused by intentional design — see triage below). No tool reported a Medium. The 4 actionable Lows have been fixed; the remaining 3 Aderyn findings are accepted residual notes that auditors should know about.

## Aderyn findings — full triage

### H-1: Contract locks Ether without a withdraw function — FALSE POSITIVE

> Aderyn flags any contract with a `payable` function and no Ether-withdraw path.

**Why this is wrong:** the `receive()` function in `MeiVault` reverts with `EtherNotAccepted()`:

```solidity
receive() external payable {
    revert EtherNotAccepted();
}
```

The vault cannot accumulate Ether through normal transfers. The only way Ether could land in the contract is via `selfdestruct` from another contract or pre-deploy-address transfers — neither of which is in normal flow, and both are documented as accepted risk: any forced-funded ETH is permanently stuck in the vault (no recovery path is exposed by design — the alternative would mean an owner-callable ETH sweep, which expands the trust surface).

**Coverage:** `test_receiveRevertsWithNamedError` confirms the revert. `test_execCannotForceValueViaForceFundedEth` confirms `exec` cannot forward force-funded ETH because the `value` parameter was removed in reconciliation.

### H-2: Reentrancy: State change after external call — FALSE POSITIVE (×2)

> Aderyn's reentrancy heuristic flags state writes that follow any external call, including view calls.

**Instance 1 (line 125, constructor):**

```solidity
uint8 assetDecimals = IERC20Metadata(address(asset_)).decimals();
// ...immutable assignments follow
```

`decimals()` is a `view` function. The constructor is non-reentrant by definition (contract not yet deployed; no entry surface). All "state changes" flagged are immutable assignments.

**Instance 2 (line 229, `claim()`):**

```solidity
uint256 available = asset.balanceOf(address(this));   // view call
if (available < assets) revert InsufficientLiquidity(assets, available);
request.claimed = true;                                // ← Aderyn flag
_burn(address(this), shares);
asset.safeTransfer(msg.sender, assets);                // ← real external call
```

The genuine external call (`safeTransfer`) happens *after* `request.claimed = true`. Aderyn's heuristic misidentified `balanceOf` (a view) as the relevant call. The function is also wrapped in `nonReentrant`. Checks-effects-interactions is correctly followed.

### L-1: Centralization Risk — ACCEPTED AS DESIGN

The contract has privileged roles (`owner`, `executor`, `feeRecipient`). This is intentional and documented in spec §2 and `docs/threat-model.md`. Mitigations:
- Owner is a 3-of-5 multisig on mainnet (constructor takes the address)
- Owner cannot drain user assets — no withdraw function exists for the underlying
- Executor is bounded by the on-chain allowlist; off-chain signer policy adds further gates
- All three roles can be rotated via owner action

### L-2: Large Numeric Literal — FIXED

> `BPS = 10_000` should be `1e4`.

**Applied:** `uint256 public constant BPS = 1e4;`. Functionally identical, lint-clean.

### L-3 (original) / L-2 (re-run): Literal Instead of Constant — FIXED

> Four occurrences of `1e18` in HWM math and `pricePerShare`.

**Applied:** introduced `uint256 public constant PPS_PRECISION = 1e18;` and replaced all four literal sites in `pricePerShare`, `_chargePerfFee`, and the constructor HWM initializer. Reads better and silences the lint.

### L-4: `nonReentrant` is Not the First Modifier — FIXED

> The `nonReentrant` modifier should be the first modifier in the list.

**Before (`exec`):**
```solidity
function exec(address target, bytes calldata data)
    external onlyExecutor whenNotPaused nonReentrant
```

**After:**
```solidity
function exec(address target, bytes calldata data)
    external nonReentrant onlyExecutor whenNotPaused
```

Other entry points (`deposit`, `mint`, `requestRedeem`, `claim`, `reportValuation`, `cancelRedemption`) already had `nonReentrant` first.

### L-5: PUSH0 Opcode — ACKNOWLEDGED, NO ACTION

> Compiler will emit PUSH0 (Shanghai+). Some chains don't support it.

Base, Base Sepolia, and Ethereum mainnet all support PUSH0. The vault deploys to Base only. Documented in `docs/audit-scope.md` §3.

### L-6: Address State Variable Set Without Checks — INTENTIONAL

> `setExecutor(newExecutor)` does not check `newExecutor != address(0)`.

This is by design. Per spec §5.5: passing `address(0)` to `setExecutor` is the documented mechanism to **disable the executor** without disturbing the allowlist. A zero-check here would break that interface.

Covered by `test_ownerCanDisableExecutorWithZeroAddress`.

### L-7: Unspecific Solidity Pragma — FIXED

**Before:** `pragma solidity ^0.8.24;`
**After:** `pragma solidity 0.8.24;`

The contract is now pinned to exactly 0.8.24 for audit reproducibility. `foundry.toml` will also pin the compiler in §4 of the audit scope doc.

## Slither findings — full triage

Slither produced 21 findings across 5 detector categories. All triaged below.

### incorrect-equality (×7) — INTENTIONAL

All instances are `supply == 0`, `elapsed == 0`, `feeShares != 0`, or similar zero-check guards on internal computations. These are **standard ERC-4626 first-deposit and fee-skip guards**; using non-strict comparisons (`<= 0` for unsigned) would not change behavior. Strict equality is correct and idiomatic here.

### locked-ether — FALSE POSITIVE

Same as Aderyn H-1. Receive reverts. See above.

### missing-zero-check — INTENTIONAL

Same as Aderyn L-6. `setExecutor(address(0))` is the disable path. See above.

### timestamp (×11) — INTENTIONAL

Slither flags every `block.timestamp` comparison. All instances are:
- Withdrawal unlock check (`block.timestamp < request.unlockAt`) — required by design
- Valuation freshness check (`block.timestamp - lastValuationAt <= valuationStalenessSeconds`) — required by design
- Mgmt fee elapsed-time calculation — required by design

Validator manipulation of `block.timestamp` is bounded to ±15 seconds and cannot move past `block.timestamp + 1`. None of these checks have sub-minute precision requirements (smallest is the 10-min `MIN_STALENESS_SECONDS`), so validator influence is not exploitable.

### assembly — JUSTIFIED

`exec` uses inline assembly for the standard revert-bubble pattern:

```solidity
if (!ok) {
    assembly {
        revert(add(ret, 32), mload(ret))
    }
}
```

This is the canonical OZ/Foundry pattern for forwarding revert reasons from low-level calls. No state writes, no memory mutation beyond revert payload. Safe.

## Re-run instructions

For reproducibility (e.g., during the audit window):

```bash
cd ~/Desktop/mei-vault/contracts

# Slither
slither src/MeiVault.sol \
  --filter-paths "lib/|test/|src/MeiVault.codex.sol|src/TreasuryVault.sol" \
  --exclude naming-convention,solc-version,low-level-calls

# Aderyn
aderyn --src src \
  --path-excludes "src/MeiVault.codex.sol,src/TreasuryVault.sol,test,lib"
# Output: contracts/report.md (overwrites)
```

Expected after the two fixes in this pass:
- Aderyn: H-1 and H-2 remain (FPs), L-4 and L-7 resolved, others unchanged
- Slither: locked-ether remains (FP), missing-zero-check remains (intentional), others unchanged

## Outstanding follow-ups for the audit window

None. All findings are either fixed, false positive, or intentional design with documented rationale.

If a firm wants additional tooling: Mythril (symbolic exec), Manticore, or Halmos (formal verification) can be run as part of the engagement. Truu is willing to run any extra tool the firm specifies during quote response.
