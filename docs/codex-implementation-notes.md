# Codex implementation notes — MeiVault

## Summary

This draft implements `MeiVault` from `docs/vault-contract-spec.md` in
`contracts/src/MeiVault.codex.sol`, with a Foundry suite in
`contracts/test/MeiVault.codex.t.sol`.

The implementation follows the v1 redemption choice in the spec: shares are
locked in the vault at request time, assets are computed at claim time, and the
locked shares absorb NAV movement during the delay window.

## Spec ambiguities and choices

1. **Share decimals vs PPS formula.** The spec's raw `pricePerShare()` formula
   assumes asset and share units have the same decimals, but the handoff asks
   for 18-decimal shares for a 6-decimal USDC asset. I implemented an asset to
   share scale factor derived from `IERC20Metadata.decimals()`, so one human
   USDC initially mints one human vault share and `pricePerShare()` starts at
   `1e18`.

2. **Cancel after unlock.** §5.1 says `cancelRedemption` can cancel before
   unlock, but does not define an error or explain why cancellation should stop
   after unlock. I allow cancellation until claim. It does not compute NAV or
   move assets, and it gives users a clean escape if liquidity is unavailable.

3. **Constructor range errors.** The spec requires validation for valuation
   staleness and withdrawal delay bounds but does not name custom errors for
   those invalid ranges. I used `ZeroAmount()` for these generic bad-parameter
   cases to avoid inventing additional error names beyond §9.

4. **Native ETH and `exec`.** I implemented no payable fallback/receive path,
   so accidental raw ETH sends revert. `exec` still carries the spec's `value`
   argument and can forward ETH that was forced into the contract, for example
   by `SELFDESTRUCT` or test `vm.deal`.

5. **Fee timing.** Fees are charged on `reportValuation`, as §6 specifies. I
   did not add fee accrual to `deposit`, `mint`, `requestRedeem`, or `claim`.
   This keeps fee minting observable through `ValuationReported`.

## Design decisions

- `MeiVault` inherits `ERC20`, `Ownable2Step`, `Pausable`, and
  `ReentrancyGuard`; the vault shares are the ERC-20 token.
- `deposit`, `mint`, `requestRedeem`, `claim`, and `exec` are all
  `nonReentrant`.
- Management fees are minted first on valuation reports, then performance fees
  are computed against the post-management-fee PPS.
- The high-water mark is updated only after a performance fee is minted and is
  recomputed from the post-mint PPS.
- `emergencySweep` is only available while paused and rejects the vault asset.

## Concerns for reviewer

1. **Centralized valuation is load-bearing.** The executor can report NAV that
   changes share price materially. This is in the spec, but it is the biggest
   trust assumption.

2. **Delay exceeds freshness for configured tiers.** Conservative withdrawals
   unlock after 24h, while valuations expire after 1h. Claims therefore require
   an executor report after the unlock window. The spec acknowledges this
   operational risk.

3. **Fee shares remain after full user exit.** If fees accrue at the claim-time
   refresh report, feeRecipient shares can remain even after all queued user
   shares are claimed. This follows the fee model, but reviewers should confirm
   it matches intended economics.

4. **Generic parameter reverts are awkward.** The lack of named constructor
   errors for delay/staleness bounds makes tests and integration less readable.
   I would add `InvalidDelay` / `InvalidStaleness` or a generic
   `ParameterOutOfRange`.

5. **No donation shield beyond the decimals offset.** The 18-decimal share
   offset strongly reduces first-deposit inflation risk for USDC, but the spec
   does not mandate virtual assets/shares. A reviewer may prefer explicit
   virtual liquidity.

## Suggested spec edits

- Normalize all conversion and PPS formulas for differing asset/share decimals.
- Resolve the `requestRedeem` contradiction in §5.1 by removing the stale
  burned-shares text.
- State whether `cancelRedemption` is allowed after unlock.
- Add named errors for constructor bound failures.
- Explicitly state whether fees are charged only on reports or also before
  deposits/mints.
