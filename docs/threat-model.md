# MeiVault — threat model

**Date:** 2026-05-24
**Target:** `contracts/src/MeiVault.sol` (canonical reconciled contract, 367 nSLOC)
**Companion docs:** `vault-contract-spec.md`, `audit-scope.md`, `static-analysis.md`

This document enumerates the attack surface of `MeiVault.sol`, the on-chain defenses against each attack, and the residual risk we accept (with rationale). It is the auditor's starting checklist — findings outside this set are net-new value, findings inside this set should focus on whether the documented defense actually works.

---

## 1. Attacker models

We consider three attacker profiles and their capabilities. Defenses are evaluated against the most powerful relevant attacker for each surface.

| Profile | Capabilities | Doesn't have |
|---|---|---|
| **External — anonymous** | Arbitrary calls to public functions, deposits, redemptions, ERC-20 approvals, MEV/sandwich, flashloans against on-chain state | Privileged roles |
| **Compromised executor** | Calls to `exec(allowedTarget, data)`, `reportValuation(any, any)`. Off-chain riskclaw policy assumed bypassed. | Owner role, ability to add allowedTargets, ability to pause/unpause |
| **Malicious / coerced owner** | All owner functions: set executor, manage allowlist, pause/unpause, sweep non-asset tokens, transfer ownership | Cannot directly transfer the underlying asset out; cannot mint shares |

Out of scope for this threat model:
- Multisig signer collusion (governance trust assumption; multisig setup is out of contract scope)
- Off-chain riskclaw daemon bugs (separate audit if/when relevant)
- Hardware wallet / TEE compromise of executor (separate trust layer)
- USDC issuer actions (Circle freezing the asset, blacklisting addresses)
- Base sequencer downtime or reorgs
- Solidity compiler bugs in 0.8.24 (assumed-trusted, mitigations exist via static analysis)

---

## 2. Attack catalog

Each row: attack vector → on-chain defense → residual risk → relevant tests.

### Capital protection

| # | Attack | Defense | Residual | Tests |
|---|---|---|---|---|
| C1 | External attacker drains underlying via crafted `exec` calldata | `exec` can only be called by `executor`. `executor` is set by owner. If executor key is uncompromised, external attacker has no path. | None | `test_execOnlyExecutor`, `test_execRevertsOnNonAllowedTarget` |
| C2 | Owner drains user assets directly | **No function exists** to transfer `assetToken` out of the vault except via `claim()` (paid to redeemer) or `exec()` (paid to allowlisted target). `emergencySweep` rejects the underlying asset. | None | `test_ownerCannotWithdrawUnderlying`, `test_emergencySweepRejectsAsset` |
| C3 | Owner mints shares to themselves | **No function exists** for owner to mint shares. Shares mint only in `deposit`, `mint`, and the two fee paths (which mint to `feeRecipient`). | None | Coverage of all share-minting paths |
| C4 | Compromised executor drains underlying by calling `exec(allowedTarget, data)` with malicious data | The executor can call any allowedTarget with any calldata. **An allowedTarget is trusted to honor its public interface honestly.** Mitigation: only known DEX contracts (UniV3/V4 PM, UniversalRouter) are allowlisted. Owner must vet each addition. | **Bounded by allowlist contents.** A compromised executor calling, e.g., `transfer` on a malicious allowlisted ERC-20 could exfiltrate. Therefore: NEVER allowlist arbitrary ERC-20s. Allowlist is for DEX router/PM contracts only. | `test_execOnAllowedTarget` |
| C5 | Compromised executor swaps vault assets to attacker-controlled tokens via UniversalRouter | UniversalRouter is allowlisted. Executor could route a swap to USDC→ATTACKER_TOKEN, draining to a worthless asset. **The executor's `exec` payload is unbounded calldata.** | **Real residual.** Mitigation: off-chain signer requires fresh riskclaw attestation matching the pool being touched. Owner can pause within ~minutes via AEON alert. Loss is bounded by single-cycle drift before pause. Multisig owner = bounded blast radius. | Off-chain; out of contract scope |
| C6 | Reentrancy through malicious asset token | Every external entry point (`deposit`, `mint`, `requestRedeem`, `claim`, `exec`, `reportValuation`, `cancelRedemption`) has OZ `ReentrancyGuard.nonReentrant`. | None | `test_reentrancy_*` (multiple via mock malicious asset) |
| C7 | Force-funded ETH stuck or drained maliciously | `receive()` reverts with `EtherNotAccepted()`. `exec` has no `value` parameter (dropped in reconciliation). Force-funded ETH (via `selfdestruct` or pre-deploy-address) is permanently stuck. | **Permanently stuck ETH is accepted residual.** Alternative (owner ETH sweep) would expand trust surface. | `test_receiveRevertsWithNamedError`, `test_execCannotForceValueViaForceFundedEth` |

### Share accounting

| # | Attack | Defense | Residual | Tests |
|---|---|---|---|---|
| S1 | First-deposit inflation attack | 18-decimal share offset (`_assetToShareScale = 10^(18-assetDecimals)`). For USDC: attacker would need ~$1e12 USDC of donation to move PPS measurably. | None at vault sizes (max $250k Conservative cap) | `test_decimalsOffsetCorrectForUSDClikeAsset`, `test_firstDepositInflationResistance` |
| S2 | Deposit then immediate redeem to extract fees | Redemption queue with 24h–14d delay. Even instant deposit+request burns no value (assets-at-claim PPS), and the delay window forces NAV exposure. | None | `test_redemptionDelayEnforced` |
| S3 | Cap bypass via mint() | `mint` independently checks `totalAssets() + assets <= capacityCap` after computing required assets. | None | `test_mintRespectsCap`, `test_depositRespectsCap` |
| S4 | Cap bypass via deposit + mint race | Both `deposit` and `mint` use the same cap check based on `totalAssets()` at execution time. Same-block ordering enforces serial check. | None | `test_capRespectedAcrossDepositAndMint` |
| S5 | Share dilution via fee mint between deposit + redeem | Mgmt + perf fees mint shares to `feeRecipient`, diluting existing LPs. **By design.** Mgmt fee bounded by `MAX_MGMT_FEE_BPS = 200` (2%/yr). Perf fee bounded by `MAX_PERF_FEE_BPS = 2500` (25%) and only on NAV above HWM. | None — economic terms disclosed in spec §11 | `test_mgmtFeeBoundedByMax`, `test_perfFeeOnlyAboveHWM` |
| S6 | High-water mark manipulation | HWM updates only in `_chargePerfFee` after the fee mints. HWM uses post-mint PPS, so it can only ratchet up. Strict-monotonic `valuationNonce` prevents replay. | None | `test_hwmNeverDecreases`, `test_perfFeeNotChargedAtFlatNAV` |
| S7 | Donation attack between requestRedeem and claim | Anyone can `safeTransfer` to the vault to inflate idle balance. This raises `totalAssets`, therefore PPS, therefore the claimer's payout. **This is a gift to redeemers, not an attack.** Inverse: an attacker cannot drain via donation. | Donation → claimer's PPS increases. Donation is one-way. | N/A (gift case) |
| S8 | NAV mis-report to mint extra perf fee shares | `reportValuation` is `onlyExecutor`. Strict-monotonic nonce prevents replay. **Executor can over-report NAV to trigger fee mint.** | **Real residual.** Mitigations: AEON off-chain monitor compares reported NAV to on-chain position values + flags drift; owner can rotate executor + pause; staleness window forces re-reports; HWM only ratchets up so a single misreport is bounded. | `test_perfFeeOnNAVIncrease`, off-chain AEON tests |

### Liveness and DoS

| # | Attack | Defense | Residual | Tests |
|---|---|---|---|---|
| L1 | Executor stops reporting → deposits/redeems freeze on staleness | `_requireFreshValuation` reverts after `valuationStalenessSeconds` (10m–24h). Owner can pause if executor is unresponsive. **Claims of unlocked redemptions also require fresh valuation.** | **Real residual.** If executor is down, claims block until next report. Mitigation: AEON alerts on stale valuation. Operator on-call rotation. | `test_staleValuationBlocksDeposit`, `test_staleValuationBlocksClaim` |
| L2 | Owner pauses indefinitely, trapping user funds | **Claims of already-queued redemptions are NOT blocked by pause.** Once a user has queued and unlock has passed, they can always claim. New deposits and new redemption requests are blocked. | **`cancelRedemption` is also unaffected by pause** — user can always cancel a queued request and get shares back. | `test_pauseBlocksDepositNotClaim`, `test_pauseBlocksRequestRedeem`, `test_cancelRedemptionDuringPause` |
| L3 | Owner sets executor to malicious address | Owner action — governance trust. 3-of-5 multisig threshold for owner action. Pre-deploy: owner is single key (testnet only). | Governance trust on multisig | `test_ownerCanRotateExecutor` |
| L4 | DoS by spamming `requestRedeem` with min-share requests | Each request takes O(1) storage. Cost is paid by attacker (gas). No per-user cap, but no economic incentive either — request locks attacker's shares. | None material | `test_multipleConcurrentRedemptions` |
| L5 | DoS by spamming deposit at cap edge | Each `deposit` is gas-bounded. Cap is enforced on-chain. Attacker pays gas to reach cap; once reached, further deposits revert cleanly. | None material | `test_capDepositSequence` |
| L6 | Insufficient liquidity at claim time | `claim` reverts with `InsufficientLiquidity` if `asset.balanceOf(vault) < assets`. User can retry after executor unwinds. **No funds are lost.** | **Operational risk** — if executor never unwinds, user is stuck. Mitigation: owner can pause + manually instruct executor to unwind; ultimately the operator's commitment is the load-bearing piece. | `test_claimRevertsOnInsufficientLiquidity` |
| L7 | Withdrawal delay > valuation staleness window | Conservative: 24h delay, 1h staleness. Edge: 14d delay, 30m staleness. Claims require a fresh report **at claim time**. If executor's last report at delay-end is >1h old, claim reverts until executor reports again. | **Real, documented operational risk.** AEON alerts on near-unlock + stale valuation conditions. | Operational test (offchain) |

### Replay & ordering

| # | Attack | Defense | Residual | Tests |
|---|---|---|---|---|
| R1 | Replay of valuation report with old nonce | `reportValuation` requires `nonce > valuationNonce`. Strict-monotonic. | None | `test_nonceMustBeMonotonic` |
| R2 | Replay of `requestRedeem` (e.g., signed-permit pattern) | `requestRedeem` consumes ERC-20 allowance via OZ `_spendAllowance`. Replays naturally fail on second call. | None | `test_requestRedeemWithAllowanceWorks`, `test_requestRedeemRevertsWithoutAllowance` |
| R3 | Replay of `claim` for same redemptionId | `claim` flips `request.claimed = true` before any external call; double-claim reverts on `AlreadyClaimed`. | None | `test_cannotDoubleClaim` |
| R4 | Front-running deposit to extract fees | Mgmt + perf fees only mint at `reportValuation` time. Depositor entering right before a report bears time-they-weren't-in (bounded by staleness window). Worst case: 1h of mgmt fee on entered capital = $0.0006 per $100 Conservative. | None material | `test_secondDepositAfterFeeMintGetsFewerShares` |
| R5 | Re-entering deposit during transfer callback (ERC-777 style asset) | Asset is USDC (no callback). For audit's hypothetical safety: `ReentrancyGuard` on all entry points provides defense even against callback-token surface. | None | `test_reentrancyFromMaliciousAsset` |

### Governance

| # | Attack | Defense | Residual | Tests |
|---|---|---|---|---|
| G1 | Hostile ownership takeover via stolen owner key | `Ownable2Step` — `transferOwnership` requires recipient to `acceptOwnership`. If owner key is compromised, attacker can `transferOwnership` to themselves and call `acceptOwnership` — but mainnet owner is a 3-of-5 multisig, so single-key compromise doesn't suffice. | Governance trust on multisig | `test_ownable2StepRequiresAccept` |
| G2 | Owner adds malicious target to allowlist | Governance action; bounded by multisig. Mitigation: allowlist additions should be public-PR'd and reviewed off-chain. | Governance trust + procedural | `test_ownerCanSetAllowedTarget` |
| G3 | Owner sets `feeRecipient` to attacker address mid-flight, captures future fees | Bounded by multisig. Past fee shares (already minted to old recipient) are unaffected — they remain owned by the old recipient and can be redeemed normally. | Governance trust | `test_setFeeRecipient` |
| G4 | Owner uses `emergencySweep` to drain non-asset tokens | By design: `emergencySweep` exists to recover non-asset tokens accidentally sent. It cannot touch the underlying. Requires the contract to be paused — adds friction to abuse. | Governance trust on the recovery semantic | `test_emergencySweepRequiresPause`, `test_emergencySweepRejectsAsset` |

---

## 3. Invariants

These are the invariants that must hold across **every** sequence of permitted operations. Fuzz testing targets these.

| # | Invariant | Mechanism | Test |
|---|---|---|---|
| I1 | `totalAssets() == asset.balanceOf(vault) + lastValuation` | No code path mutates these independently | `invariant_totalAssetsEqualsIdlePlusReported` (256 runs × 128k calls) |
| I2 | `totalSupply() == Σ(balanceOf) + Σ(queued shares) + balanceOf(feeRecipient)` | Standard ERC-20 conservation | Implicit via OZ ERC20 |
| I3 | `capacityCap` is never exceeded by `totalAssets()` after a successful `deposit` or `mint` | Both functions check pre-state; reverts on overflow | `test_capRespected*` |
| I4 | Owner cannot reduce `asset.balanceOf(vault)` via any direct call | No owner-callable function transfers `asset` out | Static analysis + code review |
| I5 | `highWaterMark` monotonically non-decreasing | Only set in `_chargePerfFee` after fee mint, using post-mint PPS | `test_hwmNeverDecreases` |
| I6 | `valuationNonce` monotonically increasing | Strict `>` check in `reportValuation` | `test_nonceMustBeMonotonic` |
| I7 | Claim cannot pay more than the locked shares' converted assets at claim PPS | `assets = convertToAssets(shares)` with floor rounding | `test_claimPayoutMatchesPPS` |
| I8 | A claimed `RedemptionRequest` is never re-claimable | `request.claimed = true` set before external call (CEI) | `test_cannotDoubleClaim` |
| I9 | Pause does not affect previously-queued claims (assuming valuation fresh) | `claim` has no `whenNotPaused` modifier | `test_pauseDoesNotBlockClaim` |
| I10 | Executor cannot call non-allowed targets | `exec` reverts on `!allowedTarget[target]` | `test_execRevertsOnNonAllowedTarget` |

---

## 4. Accepted residual risks (the explicit "we know about this" list)

In audit response, we expect the firm to either:
1. Confirm these are correctly bounded by the documented mitigations, OR
2. Identify a residual we have miscategorized as "accepted."

| Risk | Why we accept it | Bound |
|---|---|---|
| Executor mis-reports NAV | On-chain detection requires an oracle the spec defers to v2 | Bounded by staleness window + multisig pause + AEON alerts |
| Executor swaps to attacker-controlled token via allowed router | Allowing arbitrary calldata is the design that keeps the contract general | Bounded by off-chain signer policy + AEON + pause |
| ETH force-funded via selfdestruct is stuck forever | An owner sweep for ETH would expand trust surface; the cost is symbolic | $0 economic damage — no path to user funds |
| Owner pauses indefinitely | Claims and cancellations continue to work | Bounded by multisig governance trust |
| Withdrawal delay > valuation staleness blocks claims briefly | Operational concern, not security | Bounded by AEON alerting + on-call response |
| `cancelRedemption` allowed after unlock | Spec was silent; reconciliation explicitly permits | None — pure user-side escape hatch |
| Fee shares remain after full user exit | Economic terms disclosed in spec | None — feeRecipient redeems through normal queue |
| Mgmt fee charged at next report covers depositor's pre-deposit time slice | Bounded by staleness window (1h max) | $0.0006 per $100 at Conservative tier |

---

## 5. Bounded blast radius (the "if everything goes wrong" scenarios)

Worst-case loss scenarios, assuming we lose the relevant trust assumption:

| Scenario | Maximum loss | Recovery |
|---|---|---|
| Executor key fully compromised, attacker swaps all idle USDC to a worthless token via UniversalRouter | Up to `idle USDC balance` at moment of attack | Owner pauses (AEON alert); owner rotates executor; affected vault TVL = lost. Bounded by current TVL of the targeted tier ($25k Edge / $100k Balanced / $250k Conservative). |
| Owner multisig fully compromised (>2 of 5 signers colluding or stolen) | Owner can set malicious executor + add malicious allowlist + drain via that path. **Total TVL across all three vaults: $375k max at design caps.** | None on-chain. Off-chain: public outcry, MEI buyback wallet's reputation, social slashing of signers. |
| NAV mis-report inflates PPS, fee mint extracts shares | Up to `perfFee * (false_NAV - HWM)` per report cycle, capped by `MAX_PERF_FEE_BPS = 25%` | Owner rotates executor; HWM ratchet means later honest reports cannot reverse the gain, but multisig can manually withdraw fee shares pre-redemption if proven malicious. |
| Solidity 0.8.24 compiler bug | Unknown until found | None proactive; mitigated by exact-pragma + static analysis pre-pass |
| OZ v5.4.0 latent bug in `ERC20`, `Ownable2Step`, `Pausable`, or `ReentrancyGuard` | Unknown until found | Mitigated by using audited, well-deployed library version |

**The total $375k design-cap blast radius is the load-bearing safety argument.** Caps are not just a marketing point; they are the worst-case loss bound, and they exist because we are not yet confident enough in the system to take more risk.

---

## 6. Areas where we explicitly invite auditor scrutiny

Not a finding list — these are the parts where we think we did the right thing but want the audit to confirm:

1. **The `assets-at-claim` redemption semantic.** Locking shares in the vault address (not burning) and computing assets at claim time. We believe this is sound and fair; auditor should confirm there's no front-running attack we missed.

2. **Fee accrual only on `reportValuation`.** Comparison doc §2.3 explored this trade-off. We chose report-only for spec-literality and audit-surface simplicity. Auditor should confirm the bounded leakage is acceptable.

3. **The `_assetToShareScale` decimals offset.** Codex's choice over Truu's `decimals() = assetDecimals + 12`. Auditor should confirm the offset correctly mitigates the first-deposit inflation attack.

4. **The interaction between pause and claim.** Spec says pause should NOT block claims. We implemented that. Auditor should confirm there's no path where pause + cancel + re-request creates an unexpected state.

5. **The `exec` allowlist's blast radius.** Allowing arbitrary calldata to allowlisted contracts gives the executor power that no on-chain check can constrain. The off-chain signer policy is the actual gate. Auditor should confirm this trust assumption is correctly bounded by the allowlist set we plan to seed (UniV3 PM, UniV4 PM, UniversalRouter — all on Base mainnet).

6. **The `emergencySweep` semantic.** Owner can sweep non-asset tokens while paused. Auditor should confirm there's no creative tokenization where this becomes a path to user funds (e.g., a malicious token that pretends to be the underlying via reentrancy-on-`address` calls).

7. **Edge cases of `convertToShares` / `convertToAssets` at boundary conditions** — `totalSupply == 0`, `totalAssets == 0`, rounding direction interactions, the case where `_assetToShareScale * supply` could overflow for extreme parameters.

---

## 7. Out-of-scope threats (intentionally not modeled)

For auditor reference — these are real risks we accept as not contract-level:

- USDC issuer freezing the vault address
- Base sequencer downtime or reorgs
- A 51% attack on Base
- Riskclaw daemon producing incorrect attestations (separate audit if requested)
- The multisig signers getting kidnapped / coerced (governance trust)
- Operational mistakes by the human operator (e.g., setting allowedTarget to the wrong address)
- Front-end / RPC compromise causing depositors to interact with a malicious clone
- A nation-state-level supply chain attack on the OZ dependency

If the audit firm thinks any of these should be in scope, that's a productive conversation to have during engagement scoping.

---

## 8. One-paragraph summary for the audit firm

The vault's safety argument is: (a) the contract has no path for any actor to transfer the underlying asset out except via `claim()` to redeemers or `exec()` to allowlisted DEX contracts; (b) the executor's `exec` power is bounded by the on-chain allowlist set, which is governed by a 3-of-5 multisig; (c) NAV reporting is centralized but bounded by short staleness windows, strict-monotonic nonces, and off-chain AEON monitoring; (d) capacity caps ($250k Conservative / $100k Balanced / $25k Edge) bound total possible loss at $375k regardless of how many things go wrong. Anything that breaks (a), (b), (c), or (d) is a finding we want to hear about.
