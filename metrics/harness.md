# Wallet harness

_Updated: 2026-07-13T12:11:59.471Z_

Bounded-delegation signer simulation. For every strategy intent, the harness re-checks pool state at "would-sign time," decides sign/no-sign against intent gates, and logs the would-be transaction payload. **No keys, no wallet, no broadcast.** Phase 4 swaps the boolean for a real signer.

## Summary

- harnessed intents: **307**
- would-sign: **295** · would-skip: **12**
- sign rate: **96.1%**

## Recent (last 30)

| intent | protocol | pool | live decision | live riskBps | Δ from intent | harness verdict |
|---|---|---|---|---|---|---|
| `passive-lp-kumbaya-2026-07-13-003` | kumbaya | `0xA8275D88…` | ALLOW | 2000 | +0 | ✓ sign |
| `spot-swap-base-2026-07-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-13-002` | kumbaya | `0x5fB29184…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-13-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0 | +0 | ✓ sign |
| `spot-swap-base-2026-07-13-003` | uniswap-v3-base | `0x57183717…` | ALLOW | 500 | +0 | ✓ sign |
| `spot-swap-base-2026-07-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 0 | +0 | ✓ sign |
| `spot-swap-base-2026-07-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-12-003` | kumbaya | `0xA8275D88…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-12-002` | kumbaya | `0x5fB29184…` | ALLOW | 2000 | +0 | ✓ sign |
| `spot-swap-base-2026-07-12-003` | uniswap-v3-base | `0x57183717…` | ALLOW | 500 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0 | +0 | ✓ sign |
| `spot-swap-base-2026-07-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 0 | +0 | ✓ sign |
| `spot-swap-base-2026-07-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 0 | +0 | ✓ sign |
| `spot-swap-base-2026-07-11-003` | uniswap-v3-base | `0x57183717…` | ALLOW | 500 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-11-002` | kumbaya | `0x5fB29184…` | ALLOW | 2000 | +0 | ✓ sign |
| `spot-swap-base-2026-07-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-11-003` | kumbaya | `0xA8275D88…` | ALLOW | 2000 | +0 | ✓ sign |
| `spot-swap-base-2026-07-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0 | +0 | ✓ sign |
| `spot-swap-base-2026-07-10-003` | uniswap-v3-base | `0x57183717…` | ALLOW | 500 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-10-002` | kumbaya | `0x5fB29184…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-10-003` | kumbaya | `0xA8275D88…` | ALLOW | 2000 | +0 | ✓ sign |
| `spot-swap-base-2026-07-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 0 | +0 | ✓ sign |
| `spot-swap-base-2026-07-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-09-003` | kumbaya | `0xA8275D88…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-09-002` | kumbaya | `0x5fB29184…` | ALLOW | 2000 | +0 | ✓ sign |
| `spot-swap-base-2026-07-09-003` | uniswap-v3-base | `0x57183717…` | ALLOW | 500 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-07-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0 | +0 | ✓ sign |
| `spot-swap-base-2026-07-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 0 | +0 | ✓ sign |

## How to read this

- **live decision / riskBps** = what `/api/score` returns RIGHT NOW for the intent's target pool (not at intent creation time).
- **Δ from intent** = how far the pool's risk has drifted since the intent was generated. Positive = pool got riskier.
- **harness verdict**:
  - **sign**: live decision is ALLOW AND live riskBps ≤ intent's gate threshold. In production this would route to the bounded-delegation signer.
  - **skip**: at least one gate failed. Logged with rationale; signer never invoked.

## What "signer-less" means here

The harness exercises every step of the deployment codepath EXCEPT the actual signing:

✓ load intent from disk
✓ re-check pool state via riskclaw `/api/score`
✓ decide against intent gates + live state
✓ build the would-be-tx payload in signer-ready shape
✗ construct real calldata (Phase 4: positionManager ABI + tick math)
✗ sign with a wallet (Phase 4: bounded-delegation signer)
✗ broadcast to chain (Phase 4: `/api/preflight-raw` → `realtime_sendRawTransaction`)

Per-intent harness results live in [`intents/YYYY-MM-DD/<id>.harness-result.json`](../intents/).
