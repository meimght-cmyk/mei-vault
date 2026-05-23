# Deployments

Canonical record of every on-chain artifact. Mainnet rows added only after the external audit + 90-day data floor clear.

## Base Sepolia (chainId 84532)

| Contract | Address | Deploy tx | Deploy date | Notes |
|---|---|---|---|---|
| `TreasuryVault` | [`0x5328f7c9b6CE55d1f25c20d903F44d33E8F9B5e6`](https://sepolia.basescan.org/address/0x5328f7c9b6CE55d1f25c20d903F44d33E8F9B5e6) | [`0xce8e4aeb…f5c814`](https://sepolia.basescan.org/tx/0xce8e4aeb751699d443134f8dac85816903b08bf0b26340988711f07978f5c814) | 2026-05-21 | Phase 4 v1. Deployer = initial owner = Kewe operator wallet `0x5C7bD42E…` (collapsed roles on testnet; production must separate). Bytecode 3,360 bytes. |

### TreasuryVault configured state (Base Sepolia, as of 2026-05-21)

- `owner()` → `0x5C7bD42EB443fb8bBB78301E240D9378582e8237` (Kewe operator)
- `pendingOwner()` → `0x0` (no transfer in flight)
- `executor()` → `0x5C7bD42EB443fb8bBB78301E240D9378582e8237` (collapsed with owner on testnet — production must separate)
- `paused()` → `false`
- `allowedTarget[V3 PositionManager 0x27F971cb…]` → `true`
- `allowedTarget[V4 PositionManager 0x4B2C77d2…]` → `true`
- `allowedTarget[UniversalRouter 0x492E6456…]` → `true`
- `allowedTarget[<anything else>]` → `false`

### Owner config txs (Base Sepolia)

| # | Action | Tx hash |
|---|---|---|
| 1 | `setExecutor(0x5C7bD42E…)` | [`0xf6c4b321…b4b763`](https://sepolia.basescan.org/tx/0xf6c4b32143b7764f6fa7183e22d2894c08033cc65214760f205c26e931b4b763) |
| 2 | `setAllowedTarget(V3 PM, true)` | [`0xd96c25a0…a8ecb2`](https://sepolia.basescan.org/tx/0xd96c25a08c14eacfb162ee7e8f74dac03782fb8422b658a909bc115e93a8ecb2) |
| 3 | `setAllowedTarget(V4 PM, true)` | [`0xc824e302…5cdd9`](https://sepolia.basescan.org/tx/0xc824e30218a6e2cba870a3618c1ff63314f3061a3f5f8b0c600251cf8f15cdd9) |
| 4 | `setAllowedTarget(UR, true)` | [`0xe62d45e7…c11202`](https://sepolia.basescan.org/tx/0xe62d45e7b22ac1440622c7737819069403105e1d93be98688917c9b518c11202) |

✅ **Verified on Sourcify** (2026-05-21). Source browsable at https://sourcify.dev/#/lookup/0x5328f7c9b6CE55d1f25c20d903F44d33E8F9B5e6 ; BaseScan inherits the metadata.

### End-to-end smoke test (2026-05-21)

First real `vault.exec` call on-chain. Built a SignRequest pointed at the allowlisted V3 PositionManager with `name()` selector (`0x06fdde03`), signed via `signer-cli` with the executor key, broadcast to Base Sepolia. The vault correctly:

- accepted the executor's call
- checked `allowedTarget[V3 PM] == true`
- called `target.call{value: 0}(data)`
- bubbled up the return value (`"Uniswap V3 Positions NFT-V1"`)
- emitted `Executed(target, value, data)`

| | |
|---|---|
| Tx | [`0x373c2946…cdea625`](https://sepolia.basescan.org/tx/0x373c2946570e8b11be16a8757111b809605439346c691ad300feb14cecdea625) |
| Block | 41,809,853 |
| Gas | 40,243 |
| Status | success |

The whole bounded-delegation pipeline is now proven end-to-end on testnet. Pieces validated: SignRequest → policy gates → EIP-1559 sign → broadcast → vault auth check → target allowlist check → external call → return-data bubble → Executed event emission.

### AEON v0 monitor live (2026-05-23)

Read-only vault intelligence layer running on Vercel cron at `/api/mei-vault/monitor` (every 4h). Codex shipped the build between May 22 and 23: ERC-4626 adapter, then a TreasuryVault-specific adapter when it found our vault isn't ERC-4626. Source in [mei-terminal repo](https://github.com/meimght-cmyk/mei-terminal): `lib/mei-vault-monitor.ts`, `app/api/mei-vault/monitor/route.ts`, `docs/mei-aeon-vault-monitor.md`. Snapshots persist to Supabase `public.mei_vault_monitor_snapshots`.

**Production issue caught + fixed 2026-05-23:** Vercel Cron was firing every 4h but every invocation returned HTTP 301. The mei-terminal middleware's canonical-host redirect was catching `.vercel.app` cron hits (Vercel Cron doesn't follow redirects). Fix in commit [`3a0d8ab`](https://github.com/meimght-cmyk/mei-terminal/commit/3a0d8ab) — skip the host redirect when `pathname.startsWith('/api/')`. After fix the cron lands snapshots successfully every 4h.

**End-to-end pipeline test 2026-05-23**

| Snapshot | nativeBalance | delta | flags |
|---|---|---|---|
| `15:06Z` post-funding | 0.01 ETH | n/a (0→non-zero) | info + collapsed-roles warning |
| `15:07Z` post-withdrawal | 0 ETH | **-100.00%** | info + collapsed-roles + **TOTAL_ASSETS_DROP** ⚠ |

Two on-chain txs drove the state changes:
- Deposit: [`0xc0caef62…600599`](https://sepolia.basescan.org/tx/0xc0caef62d7ceeeda69452cc79e9dac5638153df719f4f2b557dbd2f532600599) — Kewe → Vault, 0.01 ETH via `receive()`
- Withdrawal: [`0x745b69da…77cde4`](https://sepolia.basescan.org/tx/0x745b69dabf6793a8224a069eb6a2686c34022460c2a392da5b859eaa2677cde4) — Vault → Kewe via owner-only `withdrawETH`

The full observe → flag → persist pipeline works. Alert delivery (Discord/GitHub) and additional risk rules are the next AEON layers.

### Base Sepolia Uniswap addresses (verified on-chain 2026-05-21)

Both V3 and V4 are fully deployed on Base Sepolia (chainId 84532):

| Protocol | Contract | Address |
|---|---|---|
| V3 | Factory          | `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24` |
| V3 | PositionManager  | `0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2` |
| V3 | SwapRouter02     | `0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4` |
| V3 | QuoterV2         | `0xC5290058841028F1614F3A6F0F5816cAd0df5E27` |
| V3 / V4 | UniversalRouter | `0x492E6456D9528771018DeB9E87ef7750EF184104` |
| V4 | PoolManager      | `0x05E73354cFDd6745C338b50BcFDfA3Aa6fA03408` |
| V4 | PositionManager  | `0x4B2C77d209D3405F41a037Ec6c77F7F5b8e2ca80` |
| V4 | StateView        | `0x571291b572ed32ce6751a2cb2486ebee8defb9b4` |
| V4 | Quoter           | `0x4A6513c898fe1B2d0E78d3b0e0A4a151589B1cBa` |

These are wired into the PositionManager mapping in `scripts/wallet-harness.ts` + `scripts/vault-exiter-base.ts` under the `:84532` keys, so any harness/exiter SignRequest for a Sepolia pool targets the correct PositionManager.

## Base mainnet (chainId 8453)

**Not deployed.** Gated on:
- External audit
- Phase 4 data floor (≥90 days probe data with ALLOW false-neg ≤2% + BLOCK precision ≥70%)
- Migration of owner from EOA to a Safe multisig
- Separate executor key (must not equal deployer/owner key)
