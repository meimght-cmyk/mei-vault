# Vault-exiter

_Updated: 2026-06-20T20:18:01.451Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **4**
- positions exited: **171**
- total exit events logged: **171**

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
| 2026-06-20 10:42:30 | `spot-swap-base-2026-06-19-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-20 05:51:24 | `passive-lp-kumbaya-2026-06-19-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-20 05:51:23 | `spot-swap-base-2026-06-19-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-20 05:51:23 | `spot-swap-base-2026-06-19-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-20 05:51:21 | `passive-lp-kumbaya-2026-06-20-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-20 05:51:19 | `passive-lp-kumbaya-2026-06-20-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-19 18:29:06 | `passive-lp-kumbaya-2026-06-19-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-19 10:17:36 | `passive-lp-kumbaya-2026-06-19-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-19 04:13:17 | `spot-swap-base-2026-06-18-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-19 04:13:17 | `spot-swap-base-2026-06-16-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-19 04:08:15 | `spot-swap-base-2026-06-18-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-19 04:08:14 | `passive-lp-kumbaya-2026-06-18-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-19 04:08:13 | `passive-lp-kumbaya-2026-06-18-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-19 04:08:13 | `passive-lp-kumbaya-2026-06-18-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-19 04:08:12 | `spot-swap-base-2026-06-16-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-18 09:49:13 | `spot-swap-base-2026-06-18-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-18 00:50:35 | `spot-swap-base-2026-06-16-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-17 19:10:56 | `passive-lp-kumbaya-2026-06-16-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-17 19:10:54 | `passive-lp-kumbaya-2026-06-16-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-17 03:18:50 | `spot-swap-base-2026-06-17-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-17 03:18:50 | `spot-swap-base-2026-06-17-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-17 03:18:49 | `spot-swap-base-2026-06-17-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-17 03:18:49 | `passive-lp-kumbaya-2026-06-17-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-17 03:18:48 | `passive-lp-kumbaya-2026-06-17-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-17 03:18:48 | `passive-lp-kumbaya-2026-06-17-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-17 02:37:32 | `passive-lp-kumbaya-2026-06-16-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-16 01:56:35 | `spot-swap-base-2026-06-09-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-16 01:56:35 | `spot-swap-base-2026-06-09-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-16 01:01:01 | `passive-lp-kumbaya-2026-06-09-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-15 17:28:06 | `passive-lp-kumbaya-2026-06-09-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
