# Deployments

Canonical record of every on-chain artifact. Mainnet rows added only after the external audit + 90-day data floor clear.

## Base Sepolia (chainId 84532)

| Contract | Address | Deploy tx | Deploy date | Notes |
|---|---|---|---|---|
| `TreasuryVault` | [`0x5328f7c9b6CE55d1f25c20d903F44d33E8F9B5e6`](https://sepolia.basescan.org/address/0x5328f7c9b6CE55d1f25c20d903F44d33E8F9B5e6) | [`0xce8e4aeb…f5c814`](https://sepolia.basescan.org/tx/0xce8e4aeb751699d443134f8dac85816903b08bf0b26340988711f07978f5c814) | 2026-05-21 | Phase 4 v1. Deployer = initial owner = Kewe operator wallet `0x5C7bD42E…` (collapsed roles on testnet; production must separate). Bytecode 3,360 bytes. |

### TreasuryVault initial state (Base Sepolia)

- `owner()` → `0x5C7bD42EB443fb8bBB78301E240D9378582e8237` (Kewe operator)
- `pendingOwner()` → `0x0` (no transfer in flight)
- `executor()` → `0x0` (no executor configured yet — set via `setExecutor`)
- `paused()` → `false`
- `allowedTarget[*]` → all `false` (no targets allowlisted yet)

### Next configuration steps (owner-only)

1. `setExecutor(<executor address>)` — turn on the bounded-delegation signer. Can be the same address as owner on testnet for v1; production must separate.
2. `setAllowedTarget(<positionManager>, true)` — allowlist the contracts the executor is permitted to call.
3. `(optional)` Verify the contract on BaseScan with `forge verify-contract` so the source is browsable.

## Base mainnet (chainId 8453)

**Not deployed.** Gated on:
- External audit
- Phase 4 data floor (≥90 days probe data with ALLOW false-neg ≤2% + BLOCK precision ≥70%)
- Migration of owner from EOA to a Safe multisig
- Separate executor key (must not equal deployer/owner key)
