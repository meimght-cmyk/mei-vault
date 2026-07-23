# Vault-exiter

_Updated: 2026-07-23T00:14:59.792Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **3**
- positions exited: **345**
- total exit events logged: **345**

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
| 2026-07-22 20:46:33 | `spot-swap-base-2026-07-20-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-22 20:46:32 | `passive-lp-kumbaya-2026-07-21-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-22 20:46:32 | `spot-swap-base-2026-07-21-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-22 20:46:31 | `spot-swap-base-2026-07-21-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-22 20:46:31 | `spot-swap-base-2026-07-22-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-22 20:46:30 | `spot-swap-base-2026-07-22-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-22 20:46:30 | `spot-swap-base-2026-07-22-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-21 19:47:33 | `passive-lp-kumbaya-2026-07-20-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-21 19:47:32 | `passive-lp-kumbaya-2026-07-19-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-21 19:47:31 | `passive-lp-kumbaya-2026-07-21-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-21 19:47:30 | `passive-lp-kumbaya-2026-07-21-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-21 19:47:28 | `spot-swap-base-2026-07-21-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-20 18:52:46 | `spot-swap-base-2026-07-20-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-20 18:52:44 | `spot-swap-base-2026-07-20-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-20 18:52:44 | `passive-lp-kumbaya-2026-07-20-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-20 18:52:42 | `passive-lp-kumbaya-2026-07-20-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-20 18:47:39 | `spot-swap-base-2026-07-19-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-20 18:47:39 | `spot-swap-base-2026-07-19-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-20 18:47:38 | `passive-lp-kumbaya-2026-07-19-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-20 18:06:54 | `spot-swap-base-2026-07-19-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-20 10:25:19 | `passive-lp-kumbaya-2026-07-19-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-20 09:33:47 | `passive-lp-kumbaya-2026-07-18-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-20 03:22:45 | `spot-swap-base-2026-07-18-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-19 17:54:11 | `passive-lp-kumbaya-2026-07-18-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-19 17:54:09 | `passive-lp-kumbaya-2026-07-18-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-07-19 17:54:08 | `spot-swap-base-2026-07-18-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-18 12:59:02 | `spot-swap-base-2026-07-17-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-07-18 12:59:01 | `spot-swap-base-2026-07-17-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-18 12:58:59 | `spot-swap-base-2026-07-17-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-07-18 12:58:57 | `passive-lp-kumbaya-2026-07-15-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |

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
