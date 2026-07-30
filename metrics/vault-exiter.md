# Vault-exiter

_Updated: 2026-07-30T05:43:34.530Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **4**
- positions exited: **383**
- total exit events logged: **383**

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
| 2026-07-30 03:15:45 | `spot-swap-base-2026-07-28-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-30 03:15:44 | `passive-lp-kumbaya-2026-07-28-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-30 03:15:43 | `passive-lp-kumbaya-2026-07-30-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-30 03:15:43 | `spot-swap-base-2026-07-30-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-29 13:12:37 | `passive-lp-kumbaya-2026-07-29-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-29 02:21:35 | `passive-lp-kumbaya-2026-07-29-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-29 02:21:33 | `spot-swap-base-2026-07-29-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-29 02:21:33 | `spot-swap-base-2026-07-29-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-29 02:16:27 | `spot-swap-base-2026-07-28-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-28 20:29:35 | `passive-lp-kumbaya-2026-07-28-001` | kumbaya | ALLOW/0 → WARN/8000 | +8000 | allow_to_warn |
| 2026-07-28 01:25:44 | `passive-lp-kumbaya-2026-07-27-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-28 01:25:43 | `spot-swap-base-2026-07-28-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-28 00:35:13 | `spot-swap-base-2026-07-27-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-28 00:35:12 | `passive-lp-kumbaya-2026-07-27-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-28 00:35:11 | `passive-lp-kumbaya-2026-07-27-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-27 12:24:04 | `spot-swap-base-2026-07-27-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-27 12:24:04 | `spot-swap-base-2026-07-27-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-27 00:09:35 | `spot-swap-base-2026-07-25-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-27 00:09:35 | `passive-lp-kumbaya-2026-07-25-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-27 00:09:34 | `passive-lp-kumbaya-2026-07-25-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-25 23:35:00 | `passive-lp-kumbaya-2026-07-24-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-25 23:35:00 | `spot-swap-base-2026-07-24-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-25 23:34:59 | `spot-swap-base-2026-07-25-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-25 23:34:58 | `spot-swap-base-2026-07-25-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-25 23:34:57 | `passive-lp-kumbaya-2026-07-25-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-24 22:41:12 | `passive-lp-kumbaya-2026-07-24-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-24 22:41:12 | `passive-lp-kumbaya-2026-07-24-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-24 22:41:10 | `spot-swap-base-2026-07-24-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-24 22:41:10 | `spot-swap-base-2026-07-24-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-24 21:45:51 | `spot-swap-base-2026-07-23-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |

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
