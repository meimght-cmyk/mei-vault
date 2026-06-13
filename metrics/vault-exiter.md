# Vault-exiter

_Updated: 2026-06-13T14:20:56.164Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **5**
- positions exited: **128**
- total exit events logged: **128**

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
| 2026-06-13 07:46:26 | `spot-swap-base-2026-06-12-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-13 07:46:24 | `passive-lp-kumbaya-2026-06-12-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-13 01:39:38 | `spot-swap-base-2026-06-11-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-13 01:39:38 | `spot-swap-base-2026-06-12-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-13 01:39:37 | `spot-swap-base-2026-06-12-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-13 01:39:36 | `passive-lp-kumbaya-2026-06-12-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-12 19:34:08 | `passive-lp-kumbaya-2026-06-11-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-12 04:55:13 | `passive-lp-kumbaya-2026-06-09-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-12 01:13:42 | `passive-lp-kumbaya-2026-06-11-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-12 01:13:41 | `passive-lp-kumbaya-2026-06-11-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-12 01:13:40 | `spot-swap-base-2026-06-11-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-12 01:13:40 | `spot-swap-base-2026-06-11-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-11 13:02:32 | `spot-swap-base-2026-06-10-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-11 00:47:44 | `spot-swap-base-2026-06-10-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-11 00:47:43 | `spot-swap-base-2026-06-10-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-11 00:47:42 | `passive-lp-kumbaya-2026-06-10-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-11 00:47:42 | `passive-lp-kumbaya-2026-06-10-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-11 00:47:41 | `passive-lp-kumbaya-2026-06-10-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-10 21:29:21 | `spot-swap-base-2026-06-09-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-10 21:08:50 | `spot-swap-base-2026-06-07-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-10 00:26:49 | `spot-swap-base-2026-06-07-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-10 00:26:49 | `spot-swap-base-2026-06-07-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-09 20:38:58 | `spot-swap-base-2026-06-08-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-09 20:38:57 | `passive-lp-kumbaya-2026-06-07-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-09 20:38:57 | `passive-lp-kumbaya-2026-06-07-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-08 19:44:13 | `passive-lp-kumbaya-2026-06-08-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-08 19:44:13 | `passive-lp-kumbaya-2026-06-08-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-08 19:44:12 | `passive-lp-kumbaya-2026-06-08-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-08 19:44:12 | `spot-swap-base-2026-06-08-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-08 19:44:10 | `spot-swap-base-2026-06-08-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |

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
