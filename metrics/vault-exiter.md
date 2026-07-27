# Vault-exiter

_Updated: 2026-07-27T20:14:35.271Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **4**
- positions exited: **368**
- total exit events logged: **368**

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
| 2026-07-24 21:45:50 | `spot-swap-base-2026-07-23-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-24 21:45:48 | `passive-lp-kumbaya-2026-07-22-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-24 21:45:46 | `passive-lp-kumbaya-2026-07-22-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-24 21:45:45 | `passive-lp-kumbaya-2026-07-22-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-23 22:59:01 | `passive-lp-kumbaya-2026-07-23-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-23 21:42:00 | `passive-lp-kumbaya-2026-07-23-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-23 21:41:58 | `passive-lp-kumbaya-2026-07-23-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-23 21:41:58 | `spot-swap-base-2026-07-23-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-22 20:46:33 | `spot-swap-base-2026-07-20-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-22 20:46:32 | `passive-lp-kumbaya-2026-07-21-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-22 20:46:32 | `spot-swap-base-2026-07-21-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-22 20:46:31 | `spot-swap-base-2026-07-21-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-22 20:46:31 | `spot-swap-base-2026-07-22-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-22 20:46:30 | `spot-swap-base-2026-07-22-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-22 20:46:30 | `spot-swap-base-2026-07-22-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |

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
