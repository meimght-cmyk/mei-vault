# Vault-exiter

_Updated: 2026-09-21T19:13:33.443Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **3**
- positions exited: **632**
- total exit events logged: **632**

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
| 2026-09-21 06:29:34 | `passive-lp-kumbaya-2026-09-21-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-21 06:29:34 | `spot-swap-base-2026-09-21-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-21 06:29:32 | `spot-swap-base-2026-09-21-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-21 06:24:29 | `spot-swap-base-2026-09-20-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-20 05:20:43 | `spot-swap-base-2026-09-20-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-20 05:20:42 | `spot-swap-base-2026-09-20-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-20 05:20:41 | `passive-lp-kumbaya-2026-09-20-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-20 05:20:40 | `passive-lp-kumbaya-2026-09-20-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-20 04:40:19 | `spot-swap-base-2026-09-19-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-19 04:17:10 | `spot-swap-base-2026-09-19-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-19 04:17:09 | `passive-lp-kumbaya-2026-09-19-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-18 03:20:52 | `passive-lp-kumbaya-2026-09-18-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-18 03:20:52 | `spot-swap-base-2026-09-18-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-18 03:20:51 | `spot-swap-base-2026-09-18-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-18 03:15:48 | `spot-swap-base-2026-09-17-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-18 03:15:47 | `spot-swap-base-2026-09-16-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-18 03:15:46 | `passive-lp-kumbaya-2026-09-18-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-18 03:15:45 | `spot-swap-base-2026-09-18-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-18 03:10:40 | `passive-lp-kumbaya-2026-09-17-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-17 02:15:40 | `passive-lp-kumbaya-2026-09-17-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-17 02:15:39 | `spot-swap-base-2026-09-17-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-17 02:15:38 | `spot-swap-base-2026-09-17-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-17 02:10:32 | `spot-swap-base-2026-09-15-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-16 01:17:35 | `spot-swap-base-2026-09-16-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-16 01:17:34 | `spot-swap-base-2026-09-16-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-16 01:17:33 | `passive-lp-kumbaya-2026-09-16-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-16 01:17:32 | `passive-lp-kumbaya-2026-09-16-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-15 00:08:37 | `passive-lp-kumbaya-2026-09-15-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-15 00:08:36 | `spot-swap-base-2026-09-15-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-15 00:03:31 | `passive-lp-kumbaya-2026-09-15-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
