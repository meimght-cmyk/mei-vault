# Vault-exiter

_Updated: 2026-11-26T16:49:21.344Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **1**
- positions exited: **942**
- total exit events logged: **942**

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
| 2026-11-26 12:36:41 | `spot-swap-base-2026-11-24-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-26 12:36:41 | `passive-lp-kumbaya-2026-11-26-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-26 12:31:36 | `passive-lp-kumbaya-2026-11-22-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-26 12:31:34 | `passive-lp-kumbaya-2026-11-26-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-26 12:31:34 | `spot-swap-base-2026-11-26-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-26 12:31:33 | `spot-swap-base-2026-11-26-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-24 20:03:08 | `passive-lp-kumbaya-2026-11-24-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-24 19:58:03 | `passive-lp-kumbaya-2026-11-24-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-24 19:58:02 | `spot-swap-base-2026-11-24-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-24 19:58:01 | `spot-swap-base-2026-11-24-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-24 19:52:57 | `spot-swap-base-2026-11-23-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-24 19:47:52 | `passive-lp-kumbaya-2026-11-23-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-23 18:45:13 | `passive-lp-kumbaya-2026-11-23-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-23 18:45:13 | `spot-swap-base-2026-11-23-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-23 18:45:11 | `spot-swap-base-2026-11-23-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-23 18:14:52 | `spot-swap-base-2026-11-22-002` | uniswap-v3-base | ALLOW/0 → WARN/8000 | +8000 | allow_to_warn |
| 2026-11-22 17:34:53 | `passive-lp-kumbaya-2026-11-22-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-22 17:29:49 | `spot-swap-base-2026-11-22-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-22 17:29:48 | `spot-swap-base-2026-11-22-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-22 16:54:31 | `spot-swap-base-2026-11-17-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-21 08:54:07 | `spot-swap-base-2026-11-21-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-21 08:49:02 | `spot-swap-base-2026-11-21-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-21 08:43:59 | `passive-lp-kumbaya-2026-11-21-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-21 08:43:59 | `passive-lp-kumbaya-2026-11-21-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-21 08:43:57 | `spot-swap-base-2026-11-21-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-20 11:40:53 | `spot-swap-base-2026-11-20-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-20 11:40:53 | `passive-lp-kumbaya-2026-11-20-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-20 11:35:49 | `spot-swap-base-2026-11-20-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-20 11:35:48 | `spot-swap-base-2026-11-20-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-20 11:35:46 | `passive-lp-kumbaya-2026-11-20-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
