# mei-vault contracts

Phase 4 vault contract. **Not deployed.** Audit-ready sketch.

## Layout

```
contracts/
├── src/TreasuryVault.sol           — the contract (~150 lines)
├── test/TreasuryVault.t.sol        — Foundry tests (constructor, ownership,
│                                     executor delegation, allowlist, pause,
│                                     deposits, withdrawals, reentrancy)
├── script/DeployTreasuryVault.s.sol — deploy script (not run)
├── foundry.toml                    — Foundry config (solc 0.8.24, 200 runs)
└── remappings.txt                  — @openzeppelin/contracts, forge-std
```

## Design

`TreasuryVault` is an owner-funded treasury with a bounded-delegation executor:

- **Owner** (`Ownable2Step`) — single key for now, migrate to a Safe multisig before any material capital. The 2-step transfer makes that migration safe.
- **Executor** — the bounded-delegation signer (off-chain TEE-attested policy). Can only invoke `exec(target, value, data)` while not paused and only against allowlisted targets.
- **Target allowlist** — owner-managed set of contracts the executor can call (UniV3 PositionManager, UniV4 PositionManager, swap routers, etc.).
- **Pause** — owner-only kill switch on the executor. Existing positions stay live; new operations blocked.
- **Deposits** — anyone can deposit ERC20 (must approve first) or send ETH via `receive()`.
- **Withdrawals** — owner-only.
- **Reentrancy** — guarded on `exec()` and `withdrawETH()`.

**On-chain riskclaw enforcement is deliberately NOT here.** The off-chain executor policy enforces riskclaw gates; the contract only constrains *which* contracts the executor can hit, not *how*. This keeps the audit surface tiny. Phase 4.5 (post-launch) can add an on-chain riskclaw oracle for stronger guarantees.

## Build + test

Requires [Foundry](https://book.getfoundry.sh/getting-started/installation):

```bash
# install foundry (one-time)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# install deps + build + test
cd contracts/
forge install --no-commit OpenZeppelin/openzeppelin-contracts foundry-rs/forge-std
forge build
forge test -vv
```

## Deploy (not yet)

```bash
# Sepolia / Base Sepolia first — never deploy to mainnet without an audit.
VAULT_OWNER=0xYourSafeOrEOA PRIVATE_KEY=0x... \
  forge script script/DeployTreasuryVault.s.sol \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --broadcast
```

## Audit checklist (for the external auditor)

- [ ] OpenZeppelin imports are pinned to a known-good version (run `forge install` with a tag, not `main`)
- [ ] `exec()` cannot escape its `nonReentrant` guard via cross-function reentrancy
- [ ] `allowedTarget` set cannot be subverted by a malicious target (e.g. via `setAllowedTarget` callback) — current design has only owner setting, but worth confirming
- [ ] Bubble-up revert in `exec()` preserves the original revert data (selectors + arguments)
- [ ] `Ownable2Step` accept-ownership flow is the only path to set a new owner
- [ ] Pause state is properly checked in `exec()` (it is — `whenNotPaused`)
- [ ] No way for executor to upgrade itself or change allowlist (it can't — those are owner-only)
- [ ] Tests cover all reverting paths, not just happy paths

## What's deliberately NOT in this contract

- **Share tokens / ERC-4626** — this is a treasury, not a deposit vault. Users don't get shares; the owner accumulates MEI/XER directly.
- **On-chain riskclaw oracle** — Phase 4.5. Would add a signed attestation check on every `exec()`.
- **Multi-chain support** — Base-only for v1.
- **Fee splits / performance fees** — zero fees, simpler audit.
- **Flash-loan protection** — irrelevant; no public mint/redeem.
- **Position tracking** — the off-chain signer tracks positions; on-chain the vault doesn't care which positions it's in, only what targets it can hit.
