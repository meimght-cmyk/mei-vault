# Vault-exiter

_Updated: 2026-07-04T16:23:07.283Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **6**
- positions exited: **235**
- total exit events logged: **235**

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
| 2026-07-01 11:35:58 | `spot-swap-base-2026-06-30-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-01 11:35:42 | `spot-swap-base-2026-06-30-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-01 11:35:27 | `spot-swap-base-2026-06-30-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-01 11:35:11 | `passive-lp-kumbaya-2026-06-30-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-01 11:34:56 | `passive-lp-kumbaya-2026-06-30-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-01 11:34:40 | `passive-lp-kumbaya-2026-06-30-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-30 21:06:13 | `spot-swap-base-2026-06-29-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-30 14:59:54 | `passive-lp-kumbaya-2026-06-29-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-30 14:59:54 | `spot-swap-base-2026-06-25-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-30 14:59:53 | `spot-swap-base-2026-06-23-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-29 20:40:41 | `spot-swap-base-2026-06-28-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-29 14:17:40 | `spot-swap-base-2026-06-28-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-29 14:17:39 | `spot-swap-base-2026-06-28-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-29 14:17:38 | `spot-swap-base-2026-06-27-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-29 14:17:37 | `spot-swap-base-2026-06-29-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-29 14:17:36 | `spot-swap-base-2026-06-29-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-29 14:17:35 | `passive-lp-kumbaya-2026-06-29-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-29 14:17:34 | `passive-lp-kumbaya-2026-06-29-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-29 02:22:32 | `passive-lp-kumbaya-2026-06-28-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-29 02:22:32 | `passive-lp-kumbaya-2026-06-28-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-28 14:10:41 | `passive-lp-kumbaya-2026-06-28-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-28 14:04:57 | `passive-lp-kumbaya-2026-06-23-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-28 14:04:41 | `passive-lp-kumbaya-2026-06-23-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-28 08:00:35 | `passive-lp-kumbaya-2026-06-27-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-27 19:46:14 | `spot-swap-base-2026-06-27-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-27 19:46:13 | `spot-swap-base-2026-06-27-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-27 13:38:57 | `passive-lp-kumbaya-2026-06-27-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-27 13:38:56 | `passive-lp-kumbaya-2026-06-27-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-27 12:25:58 | `passive-lp-kumbaya-2026-06-24-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-27 07:34:09 | `passive-lp-kumbaya-2026-06-26-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
