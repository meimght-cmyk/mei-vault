# Upstream riskclaw-daemon changes for Base

Tracks the local changes Mei has made to the upstream `Truunik/riskclaw-daemon` clone at `~/Desktop/Trading/riskclaw-daemon/` to enable Base (chainId 8453) audits and `/api/score`. These changes are **not yet PR'd back to Truunik** — they live as a local diff.

Status: **Phase 2 (Base decoders) viable end-to-end as of 2026-05-18.**

## Files added

### `packages/claw-protocols/src/uniswap-v3-base/`
New protocol package. Canonical Uniswap V3 deployment on Base mainnet (factory `0x33128…`). Mechanical clone of the existing `prism/` package — same Promise.all reads, same scoring math, same canonical UniV3 init code hash. Differences: addresses, name (`uniswap-v3-base`), supports chainId 8453, comment notes Base's 2s block time means `TVL_LOOKBACK_SHORT` is ~10min on Base vs ~5min on MegaETH.

- `addresses.ts` — UniV3 Base factory, position manager, router, quoter, WETH
- `abi.ts` — canonical UniV3 pool ABI
- `index.ts` — `UniswapV3BaseDecoder` (SwapDecoder implementation)

## Files modified

### `packages/claw-protocols/src/index.ts`
Re-exports the new `UniswapV3BaseDecoder` + addresses + init code hash.

### `apps/daemon/src/audit.ts`
- Added `'uniswap-v3-base'` to `ProtocolName` union
- Registered in `PROTOCOLS` map
- `defaultRpc()` extended:
  - chainId 8453 → `process.env.BASE_RPC_URL ?? 'https://mainnet.base.org'`
  - chainId 4326 → `process.env.MEGAETH_RPC_URL ?? 'https://mainnet.megaeth.com/rpc'` (now respects env)
- `AUDIT_CHUNK_SIZE` env override added (default 50000, set 10000 for Base public RPC limits)
- `AUDIT_BATCH_SIZE` env override added (default 6, set 2-4 for tighter public RPC rate limits)

### `apps/cli/src/index.ts`
- `audit` command allows `uniswap-v3-base`, defaults chain to 8453 if not specified
- Help text updated

### `apps/web/src/server.ts`
- `SCORE_PROTOCOLS` extended with `uniswap-v3-base`
- `ALLOWED_CHAIN_IDS` extended with `8453`
- `/api/score` and `/api/audit` accept Base
- New `defaultRpcForChain()` helper that handles all three chains
- `MEGAETH_RPC_URL` env now wired through to `defaultRpcForChain` for Base requests

### `skills/mega-aggregator/src/index.ts`
- Registered `UniswapV3BaseDecoder` in `DECODERS` array
- Version bumped: `v0.3-kumbaya+prism` → `v0.4-kumbaya+prism+uniswap-v3-base`
- Manifest description updated

## Operational notes

### Free RPCs tested for Base
| RPC | Works for audit? | Notes |
|---|---|---|
| `https://mainnet.base.org` | ❌ rate limit | 50k chunk → fail. 10k chunk → discovery OK but per-pool scoring throttled |
| `https://base.publicnode.com` | ✅ | Used for the first successful Base audit (306/314 pools scored OK) |
| `https://1rpc.io/base` | ✅ basic | Untested at audit scale |
| `https://base-mainnet.public.blastapi.io` | ✅ basic | Untested at audit scale |
| `https://base.gateway.tenderly.co` | ✅ basic | Untested at audit scale |
| `https://base.drpc.org` | ✅ basic | Untested at audit scale |
| `https://base.llamarpc.com` | ❌ | Timed out on `eth_blockNumber` from this machine |

**Default recommendation:** `BASE_RPC_URL=https://base.publicnode.com` for audits. For per-pool `/api/score` calls, public `mainnet.base.org` works fine since concurrency is low.

### First successful Base audit run
```bash
BASE_RPC_URL=https://base.publicnode.com \
AUDIT_MAX_LOOKBACK=200000 \
AUDIT_CHUNK_SIZE=10000 \
AUDIT_BATCH_SIZE=4 \
JSON=1 \
bun run apps/cli/src/index.ts audit uniswap-v3-base 8453 > /tmp/base-audit.json
```

Result: 314 pools discovered in 200k blocks (~4 days), 306 scored OK (97.5%), 1 healthy (`riskBps=0`), 151 dead pools. Output saved to [`audits/uniswap-v3-base-mainnet.json`](../audits/uniswap-v3-base-mainnet.json).

## Open decisions

1. **Push upstream?** Three paths:
   - PR to `Truunik/riskclaw-daemon` — clean, contributes back. Per project rules, requires explicit go-ahead before opening on Truunik.
   - Fork to `meimght-cmyk/riskclaw-daemon-base` — full ownership, no upstream dependency, easier to evolve. Recommended for Mei's risk surface.
   - Keep as local diff — current state. Works but vulnerable to upstream pulls overwriting.

2. **Aerodrome decoder.** UniV3 Base covers a lot of Base liquidity but the dominant Base DEX by volume is Aerodrome (Solidly fork — different pool math). Required if MEI's main pool is on Aerodrome rather than UniV3. Next decoder to write if so.

3. **mei-vault probe integration.** Currently `preflight-ledger.ts` probes only MegaETH (kumbaya + prism). To probe Base UniV3 pools through the same pipeline, we need:
   - Add `uniswap-v3-base` to `SCORE_PROTOCOLS` set in `preflight-ledger.ts`
   - Either merge Base pools into `audits/ranked.json` (rebuild via rank-pools) or maintain a parallel `audits/ranked-base.json` and probe both
   - Per-pool POST needs `chainId: 8453` for Base entries
