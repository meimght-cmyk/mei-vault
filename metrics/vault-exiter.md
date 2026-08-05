# Vault-exiter

_Updated: 2026-08-05T13:46:49.460Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **7**
- positions exited: **410**
- total exit events logged: **410**

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
| 2026-08-05 09:02:15 | `spot-swap-base-2026-08-04-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-05 09:02:15 | `spot-swap-base-2026-08-04-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-05 08:11:14 | `spot-swap-base-2026-08-04-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-04 08:35:51 | `passive-lp-kumbaya-2026-08-03-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-04 08:35:36 | `passive-lp-kumbaya-2026-08-02-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-04 08:04:23 | `spot-swap-base-2026-08-03-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-04 08:04:22 | `passive-lp-kumbaya-2026-08-03-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-03 07:04:21 | `spot-swap-base-2026-08-03-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-03 07:04:20 | `spot-swap-base-2026-08-03-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-02 13:44:54 | `spot-swap-base-2026-07-30-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-02 13:39:49 | `spot-swap-base-2026-08-02-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-02 06:07:37 | `passive-lp-kumbaya-2026-08-02-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-02 06:07:36 | `spot-swap-base-2026-08-02-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-02 06:07:35 | `spot-swap-base-2026-08-02-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-02 06:02:31 | `spot-swap-base-2026-08-01-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-02 06:02:31 | `passive-lp-kumbaya-2026-08-01-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-01 05:08:44 | `spot-swap-base-2026-08-01-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-01 05:08:43 | `spot-swap-base-2026-08-01-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-01 05:08:42 | `passive-lp-kumbaya-2026-08-01-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-01 05:08:41 | `spot-swap-base-2026-07-31-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-01 05:08:40 | `spot-swap-base-2026-07-30-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-31 04:20:25 | `spot-swap-base-2026-07-31-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-31 04:20:24 | `spot-swap-base-2026-07-31-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-31 04:20:23 | `passive-lp-kumbaya-2026-07-31-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-31 04:20:22 | `passive-lp-kumbaya-2026-07-31-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-31 04:15:19 | `spot-swap-base-2026-07-29-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-31 04:15:18 | `passive-lp-kumbaya-2026-07-28-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-30 03:15:45 | `spot-swap-base-2026-07-28-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-30 03:15:44 | `passive-lp-kumbaya-2026-07-28-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-30 03:15:43 | `passive-lp-kumbaya-2026-07-30-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
