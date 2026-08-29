# Vault-exiter

_Updated: 2026-08-29T06:25:55.181Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **4**
- positions exited: **518**
- total exit events logged: **518**

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
| 2026-08-28 06:45:21 | `spot-swap-base-2026-08-27-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-28 06:45:19 | `passive-lp-kumbaya-2026-08-28-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-28 06:45:19 | `spot-swap-base-2026-08-28-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-28 06:45:18 | `spot-swap-base-2026-08-28-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-28 06:40:13 | `spot-swap-base-2026-08-27-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-28 06:40:12 | `spot-swap-base-2026-08-27-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-27 13:00:11 | `passive-lp-kumbaya-2026-08-27-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-27 05:38:21 | `passive-lp-kumbaya-2026-08-26-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-27 05:38:20 | `passive-lp-kumbaya-2026-08-26-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-26 09:20:43 | `spot-swap-base-2026-08-26-003` | uniswap-v3-base | ALLOW/500 → WARN/7442 | +6942 | allow_to_warn |
| 2026-08-26 04:44:50 | `spot-swap-base-2026-08-26-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-26 04:44:50 | `spot-swap-base-2026-08-26-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-26 04:39:44 | `passive-lp-kumbaya-2026-08-23-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-25 03:42:58 | `passive-lp-kumbaya-2026-08-25-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-25 03:42:57 | `spot-swap-base-2026-08-25-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-25 03:37:53 | `spot-swap-base-2026-08-24-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-25 03:37:53 | `passive-lp-kumbaya-2026-08-24-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-25 03:37:51 | `passive-lp-kumbaya-2026-08-25-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-25 03:37:50 | `spot-swap-base-2026-08-25-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-25 03:37:49 | `spot-swap-base-2026-08-25-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-24 02:40:58 | `spot-swap-base-2026-08-23-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-24 02:40:56 | `spot-swap-base-2026-08-24-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-24 02:40:56 | `spot-swap-base-2026-08-24-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-24 02:40:55 | `passive-lp-kumbaya-2026-08-24-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-23 01:41:41 | `spot-swap-base-2026-08-23-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-23 01:41:41 | `spot-swap-base-2026-08-23-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-23 01:41:39 | `passive-lp-kumbaya-2026-08-23-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-23 01:41:39 | `passive-lp-kumbaya-2026-08-22-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-22 00:47:04 | `passive-lp-kumbaya-2026-08-22-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-22 00:47:04 | `spot-swap-base-2026-08-22-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |

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
