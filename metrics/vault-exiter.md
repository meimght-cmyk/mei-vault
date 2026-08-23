# Vault-exiter

_Updated: 2026-08-23T15:35:09.000Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **3**
- positions exited: **494**
- total exit events logged: **494**

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
| 2026-08-23 01:41:41 | `spot-swap-base-2026-08-23-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-23 01:41:41 | `spot-swap-base-2026-08-23-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-23 01:41:39 | `passive-lp-kumbaya-2026-08-23-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-23 01:41:39 | `passive-lp-kumbaya-2026-08-22-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-22 00:47:04 | `passive-lp-kumbaya-2026-08-22-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-22 00:47:04 | `spot-swap-base-2026-08-22-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-22 00:42:01 | `spot-swap-base-2026-08-20-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-22 00:42:00 | `spot-swap-base-2026-08-20-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-22 00:42:00 | `spot-swap-base-2026-08-20-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-22 00:41:59 | `passive-lp-kumbaya-2026-08-19-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-21 04:25:12 | `passive-lp-kumbaya-2026-08-20-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-21 04:25:11 | `passive-lp-kumbaya-2026-08-20-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-20 15:37:17 | `spot-swap-base-2026-08-19-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-20 15:37:17 | `spot-swap-base-2026-08-19-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-19 22:54:17 | `passive-lp-kumbaya-2026-08-19-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-19 22:54:16 | `spot-swap-base-2026-08-19-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-19 21:53:45 | `spot-swap-base-2026-08-18-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-19 21:53:45 | `spot-swap-base-2026-08-18-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-19 21:53:44 | `passive-lp-kumbaya-2026-08-18-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-19 21:53:44 | `passive-lp-kumbaya-2026-08-18-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-18 21:46:48 | `spot-swap-base-2026-08-18-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-18 21:41:41 | `spot-swap-base-2026-08-17-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-18 21:41:40 | `spot-swap-base-2026-08-13-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-18 21:31:33 | `spot-swap-base-2026-08-17-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-18 21:31:33 | `passive-lp-kumbaya-2026-08-17-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-18 21:31:32 | `passive-lp-kumbaya-2026-08-17-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-18 21:00:48 | `spot-swap-base-2026-08-16-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-18 03:09:01 | `spot-swap-base-2026-08-17-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-16 19:52:39 | `passive-lp-kumbaya-2026-08-16-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-16 19:52:39 | `passive-lp-kumbaya-2026-08-16-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
