# Codex reconciliation notes — MeiVault

## What was applied

This pass used `contracts/src/MeiVault.codex.sol` as the base and overwrote
`contracts/src/MeiVault.sol` with the reconciled contract. The Codex test suite
was copied to `contracts/test/MeiVault.t.sol` and updated to target the
canonical contract.

All 7 requested reconciliation patches landed:

1. Dropped the native ETH `value` parameter from `exec`.
2. Added named constructor range errors:
   `StalenessOutOfRange(uint256)` and `DelayOutOfRange(uint256)`.
3. Added named raw ETH receive error: `EtherNotAccepted()`.
4. Kept OpenZeppelin `_spendAllowance`.
5. Updated `docs/vault-contract-spec.md` for the reconciled `exec`,
   cancellation timing, error list, Base USDC asset note, resolved ETH question,
   and decimals-offset subsection.
6. Copied the Codex test suite to `contracts/test/MeiVault.t.sol`.
7. Added reconciliation coverage for the patch surface.

## What did not fit cleanly

The handoff says final `forge test -vvv` should be roughly 122 tests, but the
`.codex` test artifact is intentionally preserved and Foundry still discovers
it. As a result, a full test run includes:

- `TreasuryVault.t.sol`
- `MeiVault.codex.t.sol`
- `MeiVault.t.sol`

This is expected unless the preserved Codex test artifact is excluded from
Foundry discovery.

## Tests added

The reconciliation test pass adds 10 tests net to the canonical suite and
replaces the old ETH-value exec test with a no-value exec test. Patch coverage
now includes these 11 named tests:

1. `test_execDropsValueParam`
2. `test_oldExecValueSignatureIsAbsent`
3. `test_execCannotForceValueViaForceFundedEth`
4. `test_constructorRevertsStalenessTooLow`
5. `test_constructorRevertsStalenessTooHigh`
6. `test_constructorRevertsDelayTooLow`
7. `test_constructorRevertsDelayTooHigh`
8. `test_receiveRevertsWithNamedError`
9. `test_executedEventDoesNotIncludeValue`
10. `test_cancelRedemptionAfterUnlockSucceeds`
11. `test_decimalsOffsetCorrectForUSDClikeAsset`

`test_execDropsValueParam` replaces the pre-existing ETH-value exec test, so
the canonical suite increased from 86 to 96 tests net.

## Surprises

The comparison doc missed one practical Foundry detail: preserving
`MeiVault.codex.t.sol` means `forge test` continues running both the archived
Codex suite and the canonical reconciled suite. That increases the full test
count but preserves the audit trail exactly as requested.

The forced-ETH regression test uses `selfdestruct` to model ETH already present
in the vault. Solc warns about `selfdestruct` deprecation, but this is test-only
and used only to prove the reconciled `exec` has no ETH forwarding path.

## Remaining audit concerns

1. **Centralized valuation remains load-bearing.** The executor can materially
   affect PPS by reporting deployed NAV. This is an explicit design choice but
   should be front and center for audit.

2. **Withdrawal delay exceeds valuation freshness.** Claims require a fresh
   executor report after the unlock window; executor downtime can temporarily
   block claims.

3. **Fee shares after full user exit.** Fee recipient shares can remain after
   all queued user shares are claimed. This matches the fee model, but auditors
   should confirm the economics are intended in all edge cases.
