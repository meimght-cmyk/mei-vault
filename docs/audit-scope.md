# MeiVault — audit scope

**Date:** 2026-05-24
**Project:** mei-vault (Phase 4 v2 contract)
**Repo:** https://github.com/meimght-cmyk/mei-vault
**Contact:** Truu <meimght@gmail.com>
**Target audit start:** 2026-06-15 ±1 week
**Hard mainnet deploy gate:** 2026-08-07 (90-day ledger data floor; audit must complete by then)

This is the engagement-scope document for the external audit of `MeiVault.sol`. It exists so audit firms can quote against a fixed surface, not a moving target.

---

## 1. One-paragraph summary

`MeiVault` is a USDC-denominated, capacity-capped, queued-redemption ERC-4626-ish vault on Base. The owner is a 3-of-5 Safe multisig. An executor (separate hardware-wallet key) is bounded by an on-chain allowlist of DEX target contracts and an off-chain riskclaw-attested signer policy. The vault is deployed three times with per-tier constructor parameters (Conservative / Balanced / Edge). NAV of deployed positions is reported by the executor with a staleness gate; deposits and redemptions revert on stale valuation. The contract intentionally does not enforce per-pool concentration or strategy correctness on-chain — those are the off-chain signer's responsibility. The contract's role is to constrain blast radius if anything off-chain is compromised.

---

## 2. Files in scope

| File | nSLOC | Purpose |
|---|---|---|
| `contracts/src/MeiVault.sol` | **367** | Sole audit target. The canonical reconciled contract. |

Total nSLOC: **367**.

### Files explicitly out of scope

| File | Why out of scope |
|---|---|
| `contracts/src/MeiVault.codex.sol` | Preserved comparison artifact — proof of the dual-implementation process. Not deployed. |
| `contracts/src/TreasuryVault.sol` | Existing owner-funded vault. Already on Base Sepolia for Phase 4 v1; will be deprecated when v2 ships. Separate audit if revisited. |
| `contracts/test/**` | All test files. Auditor may read for context but they are not the deliverable. |
| `contracts/lib/**` | OpenZeppelin v5.4.0 and forge-std — trusted external dependencies. |
| `contracts/script/**` | Deployment scripts. Auditor may review for sanity but they are not custodial code. |
| `scripts/**` (TypeScript) | Off-chain signer, harness, exiter, ledger probe. Separate review if needed; not part of this engagement. |

---

## 3. Compiler and toolchain

| Item | Pinned value |
|---|---|
| Solidity | **0.8.24 exact** (pragma is `pragma solidity 0.8.24;`, not `^0.8.24`) |
| EVM target | `cancun` |
| Optimizer | enabled, runs = 200 (default Foundry) |
| Build tool | Foundry (forge 1.x) |
| Test framework | Foundry |
| Target chain | Base mainnet (chainId 8453) and Base Sepolia (chainId 84532). Both support PUSH0 (Shanghai+). |

The exact pragma version is enforced in source. `contracts/foundry.toml` will be additionally pinned before audit kickoff.

---

## 4. External dependencies

| Package | Version | Usage |
|---|---|---|
| `@openzeppelin/contracts` | **v5.4.0** | `ERC20`, `Ownable2Step`, `Pausable`, `ReentrancyGuard`, `SafeERC20`, `IERC20Metadata`, `Math` |
| `forge-std` | v1.x (test only) | Test framework |

Submodule SHAs are recorded in `.gitmodules`. The audit branch will be tagged `audit-v1` with the exact submodule commits locked.

---

## 5. Architecture overview

The vault has four state transitions and one observability surface:

```
                    ┌──────────────┐
                    │   depositor  │
                    └──────┬───────┘
                           │ deposit / mint
                           ▼
   ┌───────────────────────────────────────────────────┐
   │                  MeiVault                         │
   │  state: shares, allowlist, executor, lastValuation│
   │  invariants: totalAssets = idle + reported        │
   │              capacityCap respected                │
   │              owner cannot transfer underlying     │
   └─┬──────────────┬──────────────┬───────────────────┘
     │ exec         │ requestRedeem│ claim (after delay)
     ▼              ▼              ▼
   ┌──────────┐  ┌──────────┐  ┌──────────────┐
   │ DEX target│ │ queue    │  │ payout idle  │
   │ allowlist │ │  entry   │  │ asset balance│
   └──────────┘  └──────────┘  └──────────────┘
                       ▲
                       │ executor: reportValuation
                  ┌────┴─────┐
                  │ executor │
                  │ (off-chain
                  │  signer) │
                  └──────────┘
```

Five external entry points:
1. `deposit(assets, receiver)` — depositor → shares
2. `mint(shares, receiver)` — depositor → shares (exact-shares variant)
3. `requestRedeem(shares, recipient, owner)` — locks shares in queue
4. `claim(redemptionId)` — after delay → assets paid out
5. `cancelRedemption(redemptionId)` — return locked shares
6. `exec(target, data)` — executor calls allowlisted target
7. `reportValuation(value, nonce)` — executor updates NAV

Plus owner-only governance functions and ERC-20/ERC-4626-ish view functions.

Full design rationale in `docs/vault-contract-spec.md` (529 lines).

---

## 6. Threat model summary

Full threat model in `docs/threat-model.md` (to ship before audit kickoff). High-level summary:

| Attack vector | On-chain defense | Accepted residual risk |
|---|---|---|
| First-deposit inflation | 18-decimal share offset (~$1e12 attack cost) | Residual = none material for capped vault sizes |
| Executor key compromise | Target allowlist; pause; multisig owner can rotate executor | Bounded by allowlist |
| Centralized NAV mis-reporting | Strict-monotonic nonce; staleness gate; immutable cap | **Accepted trust assumption** |
| Reentrancy | OZ `ReentrancyGuard` on every entry point | None |
| Owner draining user assets | No function exists to transfer the underlying ERC20 out except via `claim()` to redeemer or `exec()` to allowlist | None |
| Cap bypass | `deposit` and `mint` both check `totalAssets() + assets <= capacityCap` | None |
| Force-funded ETH | `receive()` reverts; `exec` has no `value` parameter | Any ETH sent via `selfdestruct` is permanently stuck (no recovery path; this is by design) |
| Pause griefing | Owner-only; queued claims continue to work even when paused | Governance trust on multisig |
| Replay of valuation report | Monotonic `valuationNonce` | None |
| Malicious feeRecipient | Cannot do anything beyond hold shares; redeems through normal queue | None |
| Stale-valuation deposit | `_requireFreshValuation` reverts | None |

**The biggest residual is centralized NAV.** The executor can move PPS materially by reporting a NAV that doesn't match reality. Mitigations: short staleness windows (30m–1h per tier), strict-monotonic nonce prevents replay, off-chain AEON monitor flags divergence, multisig owner can rotate executor key + pause. This is documented as an explicit trust assumption to depositors, not a bug.

---

## 7. Test coverage

```
forge test  → 101 tests passing, 0 failed, 0 skipped
            including 1 invariant test:
            invariant_totalAssetsEqualsIdlePlusReported
            runs: 256, calls: 128,000

forge coverage (on src/MeiVault.sol):
  Lines:      95.77%  (181/189)
  Statements: 94.74%  (234/247)
  Branches:   88.64%  (39/44)
  Functions:  100.00% (36/36)  ← every entry + helper exercised
```

Coverage exceeds pre-engagement targets (≥90% line, ≥85% branch, 100% function). The remaining 8 uncovered lines are lcov-instrumentation phantoms in `--ir-minimum` mode (internal call sites for `_requireFreshValuation()` and the inline-assembly revert in `exec`); the underlying control-flow paths ARE exercised by passing tests, but lcov's IR-mode counter doesn't attribute them. Documented as accepted in `docs/static-analysis.md`.

A second test suite exists for the preserved comparison artifact (`test/MeiVault.codex.t.sol`, 86 tests). Auditors may ignore it; it is documentary, not custodial.

---

## 8. Static analysis pre-pass

| Tool | Version | Findings | Triage |
|---|---|---|---|
| Slither | 0.11.5 | 21 | All Lows; all triaged in `docs/static-analysis.md` |
| Aderyn | 0.6.8 | 9 (2 H, 7 L) | Both Highs are detector false positives; 2 Lows fixed; 5 documented |

Detailed triage with reasoning per finding in `docs/static-analysis.md`. Two fixes applied as a result of the scan:
- L-4: `nonReentrant` moved to be the first modifier on `exec`
- L-7: solc pragma pinned from `^0.8.24` to `0.8.24`

Outstanding "findings" after triage: zero real issues.

---

## 9. Deployment plan

Three deployments per spec §11 (Conservative / Balanced / Edge). Deploy script will live at `contracts/script/DeployMeiVaults.s.sol` (shipping before audit kickoff). Each deployment:

| Tier | name | symbol | capacityCap | minDeposit | withdrawal delay | mgmt / perf bps | staleness |
|---|---|---|---|---|---|---|---|
| Conservative | "Mei Conservative Vault" | mvUSDC-C | 250_000e6 | 100e6 | 86_400 (24h) | 50 / 500 | 3_600 |
| Balanced | "Mei Balanced Vault" | mvUSDC-B | 100_000e6 | 500e6 | 604_800 (7d) | 100 / 1000 | 3_600 |
| Edge | "Mei Edge Vault" | mvUSDC-E | 25_000e6 | 1_000e6 | 1_209_600 (14d) | 200 / 2000 | 1_800 |

Common parameters per deployment:
- `asset` = USDC on Base = `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- `initialOwner` = 3-of-5 Safe multisig (address TBD before deploy; placeholder for audit)
- `feeRecipient` = separate Safe (address TBD)
- Executor wired via `setExecutor` post-deploy
- Allowlist seeded with V3 PositionManager, V4 PositionManager, UniversalRouter on Base mainnet (addresses in `docs/deployments.md`)

Post-deploy verification: Sourcify + Basescan, exact-pragma reproducible build.

---

## 10. What's explicitly out of scope

These are documented as not-the-contract's-job per spec §14:
- Multi-asset deposits (USDC only for v1)
- Cross-chain (Base only)
- On-chain price oracle for NAV (executor reports off-chain; spec defers oracle to v2)
- Slashing the executor on bad reports (only revocation + pause available)
- Per-depositor caps
- Insurance / coverage layer
- ETH handling (no `receive`, no `value` on `exec`)

These are off-chain product gates, not contract logic:
- MEI-token-gated deposits for Edge tier
- Per-pool concentration limits
- Whitelist enforcement during Stage F mainnet rollout

If the audit firm believes any of the above belong on-chain for safety, that is feedback we want to hear in the engagement, but they are not part of the current contract surface.

---

## 11. Engagement parameters

- **Scope:** single contract, 367 nSLOC, no upgradeability, no proxy patterns
- **Complexity:** Low-to-medium. Standard ERC-4626 shape with custom redemption queue and executor-reported valuation. No novel cryptography, no MEV-sensitive paths.
- **Preferred window:** 2026-06-15 to 2026-08-01 (gives ~1 week post-audit for remediation before the 2026-08-07 data-floor mainnet target)
- **Preferred format:** spot audit (one firm, fixed scope) or competitive review (Cantina contest, 3–5 days). Sherlock/Code4rena formal contests acceptable if a firm slot isn't available.
- **Budget:** $30k–$80k depending on firm and timeline. We accept that the cheaper end means contest format.
- **Reporting:** standard finding-severity report + remediation review. Public publication of the report acceptable and preferred after fixes land.

---

## 12. Documents we'll provide on engagement start

| Document | Path | Status |
|---|---|---|
| Spec | `docs/vault-contract-spec.md` | Done |
| Threat model | `docs/threat-model.md` | Done |
| Static analysis | `docs/static-analysis.md` | Done |
| Implementation comparison | `docs/vault-contract-comparison.md` | Done |
| Codex implementation notes | `docs/codex-implementation-notes.md` | Done |
| Reconciliation notes | `docs/codex-reconciliation-notes.md` | Done |
| Deployment scripts | `contracts/script/DeployMeiVaults.s.sol` | Done — multi-tier deploy with env-overridable roles |
| Fork integration tests | `contracts/test/integration/MeiVaultFork.t.sol` | Done — 7 tests against Base Sepolia, skip without RPC |
| Test coverage report | inline in §7 | Done |
| Gas snapshot | `contracts/.gas-snapshot` | Tier 3 |
| Auditor README | `contracts/README.md` | Tier 3 |

---

## 13. Communication

- Primary contact: Truu, meimght@gmail.com
- Telegram: available on request
- Working hours: UTC+2 (Helsinki)
- Response SLA during engagement: <24h on weekdays
- Branch to audit: `audit-v1` (tagged at engagement start, frozen for duration)

---

## 14. One-line ask

We want a tight engagement against a 367-line single-contract surface, starting mid-June, completing by end-July, returning either "ship it" or a finding list we can remediate in <1 week. The contract is small on purpose; the engagement should be too.
