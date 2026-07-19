# Vault-exiter

_Updated: 2026-07-19T09:27:41.004Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **5**
- positions exited: **319**
- total exit events logged: **319**

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
| 2026-07-18 12:59:02 | `spot-swap-base-2026-07-17-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-18 12:59:01 | `spot-swap-base-2026-07-17-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-18 12:58:59 | `spot-swap-base-2026-07-17-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-18 12:58:57 | `passive-lp-kumbaya-2026-07-15-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-18 12:58:56 | `passive-lp-kumbaya-2026-07-15-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-18 08:43:03 | `passive-lp-kumbaya-2026-07-17-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-17 20:28:26 | `passive-lp-kumbaya-2026-07-16-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-17 20:28:24 | `passive-lp-kumbaya-2026-07-17-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-17 20:28:23 | `passive-lp-kumbaya-2026-07-17-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-17 15:56:28 | `passive-lp-kumbaya-2026-07-16-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-17 15:56:27 | `passive-lp-kumbaya-2026-07-16-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-17 14:24:13 | `spot-swap-base-2026-07-16-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-17 14:24:12 | `spot-swap-base-2026-07-16-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-16 20:04:38 | `spot-swap-base-2026-07-16-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-16 15:01:22 | `passive-lp-kumbaya-2026-07-15-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-15 20:12:23 | `spot-swap-base-2026-07-15-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-15 19:45:50 | `spot-swap-base-2026-07-15-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-15 19:40:29 | `spot-swap-base-2026-07-15-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-15 13:32:51 | `passive-lp-kumbaya-2026-07-13-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-15 13:32:50 | `passive-lp-kumbaya-2026-07-07-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-14 13:08:23 | `spot-swap-base-2026-07-14-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-14 13:08:23 | `spot-swap-base-2026-07-14-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-14 13:08:22 | `spot-swap-base-2026-07-14-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-14 13:08:22 | `passive-lp-kumbaya-2026-07-14-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-14 13:08:21 | `passive-lp-kumbaya-2026-07-14-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-14 13:08:21 | `passive-lp-kumbaya-2026-07-14-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-14 13:08:19 | `passive-lp-kumbaya-2026-07-08-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-13 20:41:30 | `spot-swap-base-2026-07-12-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-13 12:09:40 | `spot-swap-base-2026-07-12-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-13 12:09:40 | `spot-swap-base-2026-07-12-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |

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
