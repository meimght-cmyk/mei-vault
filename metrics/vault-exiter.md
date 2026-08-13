# Vault-exiter

_Updated: 2026-08-13T04:43:12.548Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **2**
- positions exited: **446**
- total exit events logged: **446**

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
| 2026-08-12 15:52:27 | `spot-swap-base-2026-08-08-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-12 15:52:27 | `spot-swap-base-2026-08-12-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-12 15:52:25 | `spot-swap-base-2026-08-12-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-12 15:52:25 | `passive-lp-kumbaya-2026-08-12-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-12 15:47:21 | `passive-lp-kumbaya-2026-08-11-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-12 15:47:21 | `spot-swap-base-2026-08-11-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-12 15:47:20 | `spot-swap-base-2026-08-11-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-12 15:47:20 | `passive-lp-kumbaya-2026-08-10-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-12 06:49:13 | `passive-lp-kumbaya-2026-08-11-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-11 12:50:51 | `spot-swap-base-2026-08-10-003` | uniswap-v3-base | ALLOW/500 → WARN/8395 | +7895 | allow_to_warn |
| 2026-08-11 12:50:49 | `spot-swap-base-2026-08-08-003` | uniswap-v3-base | ALLOW/500 → WARN/8395 | +7895 | allow_to_warn |
| 2026-08-10 13:57:22 | `spot-swap-base-2026-08-10-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-10 13:57:20 | `spot-swap-base-2026-08-10-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-10 13:57:20 | `passive-lp-kumbaya-2026-08-10-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-10 13:57:18 | `spot-swap-base-2026-08-09-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-10 13:52:13 | `passive-lp-kumbaya-2026-08-09-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-09 12:57:06 | `spot-swap-base-2026-08-09-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-09 12:57:05 | `spot-swap-base-2026-08-09-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-09 12:57:05 | `passive-lp-kumbaya-2026-08-09-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-09 12:57:03 | `passive-lp-kumbaya-2026-08-08-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-08 11:56:54 | `passive-lp-kumbaya-2026-08-08-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-08 11:56:53 | `spot-swap-base-2026-08-08-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-08 11:16:37 | `spot-swap-base-2026-08-07-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-08 11:16:37 | `spot-swap-base-2026-08-07-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-07 10:58:19 | `passive-lp-kumbaya-2026-08-07-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-07 10:58:19 | `passive-lp-kumbaya-2026-08-07-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-07 10:58:17 | `spot-swap-base-2026-08-07-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-07 10:53:14 | `spot-swap-base-2026-08-05-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-07 10:53:13 | `passive-lp-kumbaya-2026-08-06-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-06 10:03:00 | `passive-lp-kumbaya-2026-08-05-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
