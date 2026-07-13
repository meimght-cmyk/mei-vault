# Vault-exiter

_Updated: 2026-07-13T09:46:14.071Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **5**
- positions exited: **284**
- total exit events logged: **284**

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
| 2026-07-13 00:28:07 | `passive-lp-kumbaya-2026-07-12-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-12 18:23:03 | `passive-lp-kumbaya-2026-07-12-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-12 18:23:01 | `passive-lp-kumbaya-2026-07-12-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-12 12:19:45 | `passive-lp-kumbaya-2026-07-11-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-12 11:12:05 | `spot-swap-base-2026-07-11-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-12 11:12:03 | `passive-lp-kumbaya-2026-07-11-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-12 11:12:03 | `spot-swap-base-2026-07-10-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-11 17:57:43 | `spot-swap-base-2026-07-11-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-11 17:57:43 | `passive-lp-kumbaya-2026-07-11-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-11 11:54:36 | `spot-swap-base-2026-07-11-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-11 10:15:48 | `spot-swap-base-2026-07-10-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-11 09:40:08 | `passive-lp-kumbaya-2026-07-10-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-10 20:46:12 | `spot-swap-base-2026-07-06-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-10 11:24:47 | `passive-lp-kumbaya-2026-07-10-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-10 11:24:45 | `passive-lp-kumbaya-2026-07-10-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-10 11:24:44 | `spot-swap-base-2026-07-10-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-10 09:19:48 | `spot-swap-base-2026-07-09-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-09 11:22:12 | `passive-lp-kumbaya-2026-07-09-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-09 08:27:38 | `passive-lp-kumbaya-2026-07-09-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-09 08:27:38 | `passive-lp-kumbaya-2026-07-09-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-09 08:27:36 | `spot-swap-base-2026-07-09-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-09 08:27:36 | `spot-swap-base-2026-07-09-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-09 08:27:34 | `spot-swap-base-2026-07-08-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-09 08:27:32 | `passive-lp-kumbaya-2026-07-08-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-08 07:30:54 | `spot-swap-base-2026-07-07-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-08 07:30:53 | `passive-lp-kumbaya-2026-07-07-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-08 07:30:51 | `passive-lp-kumbaya-2026-07-07-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-08 07:30:51 | `spot-swap-base-2026-07-08-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-08 07:30:49 | `spot-swap-base-2026-07-08-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-08 07:30:47 | `passive-lp-kumbaya-2026-07-08-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
