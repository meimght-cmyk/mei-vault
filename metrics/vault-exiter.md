# Vault-exiter

_Updated: 2026-11-11T16:27:44.476Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **2**
- positions exited: **866**
- total exit events logged: **866**

## Trigger rules

| trigger | condition |
|---|---|
| `allow_to_warn` | entry decision was ALLOW, current is WARN |
| `allow_to_block` | entry decision was ALLOW, current is BLOCK |
| `became_error` | current decision is ERROR (pool unreachable / state corrupt) |
| `risk_jump` | live riskBps − entry riskBps ≥ 3000 |

## Recent exit events (last 30)

| ts | intent | protocol | entry → current | drift | trigger |
|---|---|---|---|---|---|
| 2026-11-10 17:48:56 | `passive-lp-kumbaya-2026-11-10-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-10 17:43:49 | `passive-lp-kumbaya-2026-11-10-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-10 17:43:49 | `spot-swap-base-2026-11-10-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-10 16:53:14 | `spot-swap-base-2026-11-09-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-10 16:48:10 | `passive-lp-kumbaya-2026-11-09-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-10 16:48:10 | `passive-lp-kumbaya-2026-11-09-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-10 16:48:08 | `spot-swap-base-2026-11-09-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-10 16:48:08 | `spot-swap-base-2026-11-09-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-09 16:25:00 | `spot-swap-base-2026-11-08-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-09 16:25:00 | `passive-lp-kumbaya-2026-11-08-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-09 16:24:59 | `passive-lp-kumbaya-2026-11-02-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-08 15:30:31 | `spot-swap-base-2026-11-07-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-08 15:30:30 | `spot-swap-base-2026-11-08-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-08 15:30:29 | `spot-swap-base-2026-11-08-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-08 15:30:27 | `passive-lp-kumbaya-2026-11-08-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-08 15:15:13 | `spot-swap-base-2026-11-07-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-08 15:15:12 | `spot-swap-base-2026-11-07-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-08 15:15:11 | `passive-lp-kumbaya-2026-11-07-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-08 15:15:11 | `passive-lp-kumbaya-2026-11-07-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-07 14:02:20 | `spot-swap-base-2026-11-06-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-06 12:59:01 | `passive-lp-kumbaya-2026-11-06-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-06 12:59:00 | `passive-lp-kumbaya-2026-11-06-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-06 12:59:00 | `spot-swap-base-2026-11-06-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-06 12:58:59 | `spot-swap-base-2026-11-06-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-05 11:45:38 | `spot-swap-base-2026-11-05-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-05 11:40:34 | `spot-swap-base-2026-11-05-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-05 11:40:34 | `spot-swap-base-2026-11-05-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-05 11:40:32 | `passive-lp-kumbaya-2026-11-05-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-05 11:40:31 | `passive-lp-kumbaya-2026-11-05-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-04 10:28:30 | `spot-swap-base-2026-11-04-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |

## How to read this

- An exit event means: "if the vault were holding this position, the guardian would now route a withdraw to the signer."
- Multiple triggers can fire on the same position over time, but once a position is marked `EXITED` it's removed from the watch list.
- Raw events: [`ledger/exit-events.jsonl`](../ledger/exit-events.jsonl). State cache: [`ledger/exit-state.json`](../ledger/exit-state.json).

## What "signer-less" means

✓ load positions from harness-confirmed intents
✓ poll `/api/score` for each
✓ detect degradation transitions
✓ build the would-be-withdraw payload
✗ construct real `decreaseLiquidity` calldata (Phase 4: positionManager ABI + tick math)
✗ sign with a wallet (Phase 4: bounded-delegation signer)
✗ broadcast to chain (Phase 4: `/api/preflight-raw` + `eth_sendRawTransaction`)
