# Vault-exiter

_Updated: 2026-09-11T23:23:01.855Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **3**
- positions exited: **589**
- total exit events logged: **589**

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
| 2026-09-11 21:10:33 | `spot-swap-base-2026-09-11-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-11 21:10:32 | `spot-swap-base-2026-09-11-003` | uniswap-v3-base | ALLOW/1535.5 → ERROR/-1 | -1536.5 | became_error |
| 2026-09-11 21:10:29 | `passive-lp-kumbaya-2026-09-11-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-11 21:05:24 | `spot-swap-base-2026-09-10-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-11 15:09:29 | `spot-swap-base-2026-09-10-002` | uniswap-v3-base | ALLOW/0 → WARN/6102.5 | +6102.5 | allow_to_warn |
| 2026-09-10 20:03:24 | `passive-lp-kumbaya-2026-09-10-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-10 20:03:23 | `passive-lp-kumbaya-2026-09-10-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-10 20:03:23 | `spot-swap-base-2026-09-10-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-10 19:58:16 | `spot-swap-base-2026-09-09-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-09 18:56:26 | `passive-lp-kumbaya-2026-09-09-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-09 18:56:25 | `spot-swap-base-2026-09-09-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-09 18:56:25 | `spot-swap-base-2026-09-09-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-09 18:26:09 | `passive-lp-kumbaya-2026-09-08-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-08 18:00:14 | `spot-swap-base-2026-09-08-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-08 18:00:12 | `passive-lp-kumbaya-2026-09-08-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-08 18:00:12 | `passive-lp-kumbaya-2026-09-07-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-08 17:55:09 | `spot-swap-base-2026-09-08-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-08 17:55:09 | `spot-swap-base-2026-09-08-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-08 17:50:02 | `spot-swap-base-2026-09-06-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-08 17:50:01 | `spot-swap-base-2026-09-07-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-08 17:50:01 | `passive-lp-kumbaya-2026-09-07-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-07 16:58:23 | `spot-swap-base-2026-09-06-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-07 16:58:22 | `spot-swap-base-2026-09-07-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-07 16:58:21 | `spot-swap-base-2026-09-07-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-07 16:53:16 | `passive-lp-kumbaya-2026-09-05-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-06 15:56:52 | `spot-swap-base-2026-09-05-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-06 15:56:50 | `spot-swap-base-2026-09-04-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-06 15:56:49 | `passive-lp-kumbaya-2026-09-06-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-06 15:56:49 | `passive-lp-kumbaya-2026-09-06-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-06 15:56:48 | `spot-swap-base-2026-09-06-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |

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
