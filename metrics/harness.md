# Wallet harness

_Updated: 2026-05-23T23:27:33.396Z_

Bounded-delegation signer simulation. For every strategy intent, the harness re-checks pool state at "would-sign time," decides sign/no-sign against intent gates, and logs the would-be transaction payload. **No keys, no wallet, no broadcast.** Phase 4 swaps the boolean for a real signer.

## Summary

- harnessed intents: **19**
- would-sign: **19** · would-skip: **0**
- sign rate: **100.0%**

## Recent (last 30)

| intent | protocol | pool | live decision | live riskBps | Δ from intent | harness verdict |
|---|---|---|---|---|---|---|
| `passive-lp-kumbaya-2026-05-23-003` | kumbaya | `0xA8275D88…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-23-002` | kumbaya | `0x5fB29184…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-22-003` | kumbaya | `0xA8275D88…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-22-002` | kumbaya | `0x5fB29184…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-21-002` | kumbaya | `0x5fB29184…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-21-003` | kumbaya | `0xA8275D88…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-20-002` | kumbaya | `0x5fB29184…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-20-003` | kumbaya | `0xA8275D88…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-19-003` | kumbaya | `0xA8275D88…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-19-002` | kumbaya | `0x5fB29184…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-18-003` | kumbaya | `0xA8275D88…` | ALLOW | 2000 | +0 | ✓ sign |
| `passive-lp-kumbaya-2026-05-18-002` | kumbaya | `0x5fB29184…` | ALLOW | 2000 | +0 | ✓ sign |

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
