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

3. ~~mei-vault probe integration~~ **DONE 2026-05-20.** Probe pipeline now includes Base UniV3 pools alongside MegaETH. Changes:
   - `scripts/preflight-ledger.ts` — added `uniswap-v3-base` to `SCORE_PROTOCOLS`. ChainId per pool already flowed from `ranked.json` to the request body.
   - `ops/run-ledger.sh` + `ops/run-backfill.sh` — export `BASE_RPC_URL=https://base.publicnode.com` so launchd-fired servers don't fall back to rate-limited `mainnet.base.org`.
   - `audits/ranked.json` regenerated — 1133 pools total (679 kumbaya mainnet + 306 Base + 108 kumbaya testnet + 40 prism).
   - First live cross-chain probe: 2026-05-20, top-10 cohort included the Base pool `0xbe7B4299…` which the May-18 audit had flagged as healthy. Two days later the probe correctly returned `WARN (riskBps=5000, liquidity is 0)` — the pool had been drained. **Cross-chain safety oracle working as designed.**

4. **MEI venue is Uniswap V4, not V3.** Confirmed 2026-05-20 by hunting Initialize events on the V4 PoolManager `0x498581fF…`. Three MEI pools exist:
   - `0x515e72aF…/MEI` fee=10000 tickSpacing=200 hooks=0x0
   - `MEI/USDC` fee=880000 tickSpacing=17600 hooks=0x0
   - `MEI/USDC` fee=800000 tickSpacing=16000 hooks=0x0

   All three have `hooks=0x0` (no V4 hook callbacks). Math is still concentrated-liquidity, but storage layout is fundamentally different from V3 — single `PoolManager` contract, pools tracked by `bytes32 poolId` keys, state read via `extsload` rather than per-pool `slot0()` calls. **UniV3 Base decoder does not cover MEI.** Need a separate UniV4 decoder for MEI-specific positions; UniV3 Base remains useful for treasury swap gating (WETH/USDC, WBTC/USDC, etc.).

6. ~~UniV4 Base decoder~~ **DONE 2026-05-21 (skeleton).** New package `packages/claw-protocols/src/uniswap-v4-base/`:
   - `addresses.ts` — PoolManager `0x498581fF…`, StateView `0xA3c0c9b6…`, PositionManager, UniversalRouter (shared), Quoter, WETH (all verified live via getCode())
   - `abi.ts` — V4 StateView ABI (`getSlot0`, `getLiquidity`) + PoolManager `Initialize` event
   - `index.ts` — `UniswapV4BaseDecoder` (SwapDecoder) + `computeUniswapV4PoolId(PoolKey)` exported

   Reads state via StateView (poolId-keyed) rather than per-pool `slot0()`. Scoring matches V3 minus the oracle-cardinality signal (V4 removed the built-in TWAP; hooks can implement one — for hooks=0 pools `oracleHealthBps` is reported as `null`). Adds a new high-fee signal (`lpFee ≥ 50000` → +1000 bps) since bankr.bot-launched memecoins frequently configure 80%+ fees.

   Verified end-to-end against MEI/USDC poolId `0x976e654f…`:
   - poolId derivation matches on-chain Initialize event byte-for-byte
   - `getSlot0` + `getLiquidity` read cleanly (liquidity 3.09e14)
   - Score returns `riskBps=1000` with `"unusually high lpFee 80.00%"` reason

   Known v1 limitation: TVL drift via `token.balanceOf(poolAddress)` doesn't work for V4 (tokens live in PoolManager, not at a per-pool address). Decoder gracefully reports `tvl-drift unavailable`. Real V4 TVL signal needs PoolManager-scoped reads — deferred to v2.

   Decoder registered in `packages/claw-protocols/src/index.ts`, `skills/mega-aggregator/src/index.ts` (version bumped to `v0.5-kumbaya+prism+uniswap-v3-base+uniswap-v4-base`).

7. **Server + pipeline integration for V4 — still pending** (next session):
   - `apps/web/src/server.ts` — `isHexAddress()` validates 40-char hex; V4 needs 66-char poolId. Add a path that accepts bytes32 pool identifier when `protocol === 'uniswap-v4-base'`.
   - V4 audit script — walks `Initialize` events on PoolManager, derives the pool inventory + PoolKey for each entry, outputs JSON matching the V3 audit shape (with `pool` = poolId). Needs to also persist `currency0`/`currency1` per row so the decoder can do token-side checks during probing.
   - `scripts/preflight-ledger.ts` — pass `chainId: 8453` and `pool: <poolId>` for V4 entries; server has to accept the bigger pool string.

5. **Trader Joe Liquidity Book token (LBT) appears in MEI's recent transfer logs.** The recipient `0x7B43440F1A7982c8D95aEf3936cca12FB83b3A9a` is an LBT (TJ's LP position token). Could indicate MEI also has TJ Liquidity Book pools. Worth confirming once V4 decoder is in flight — LB has its own (Solidly-style bin) math and would need its own decoder.
