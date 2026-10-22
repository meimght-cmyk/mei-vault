# Vault-exiter

_Updated: 2026-10-22T01:08:06.065Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **2**
- positions exited: **774**
- total exit events logged: **774**

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
| 2026-10-21 14:38:37 | `spot-swap-base-2026-10-21-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-21 14:33:32 | `spot-swap-base-2026-10-21-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-21 14:33:30 | `spot-swap-base-2026-10-21-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-21 14:33:30 | `passive-lp-kumbaya-2026-10-21-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-21 14:28:24 | `spot-swap-base-2026-10-20-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-20 13:27:23 | `spot-swap-base-2026-10-19-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-20 13:27:22 | `spot-swap-base-2026-10-20-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-20 13:22:17 | `passive-lp-kumbaya-2026-10-20-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-20 13:22:16 | `passive-lp-kumbaya-2026-10-20-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-20 13:22:15 | `spot-swap-base-2026-10-20-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-19 12:15:15 | `passive-lp-kumbaya-2026-10-19-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-19 12:15:15 | `passive-lp-kumbaya-2026-10-19-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-19 12:15:13 | `spot-swap-base-2026-10-19-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-19 12:15:13 | `spot-swap-base-2026-10-19-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-19 11:09:35 | `spot-swap-base-2026-10-18-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-18 10:59:57 | `spot-swap-base-2026-10-18-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-18 10:59:57 | `spot-swap-base-2026-10-18-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-18 10:59:55 | `passive-lp-kumbaya-2026-10-18-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-18 10:39:46 | `spot-swap-base-2026-10-16-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-17 09:56:29 | `passive-lp-kumbaya-2026-10-16-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-17 09:51:26 | `passive-lp-kumbaya-2026-10-17-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-17 09:46:21 | `spot-swap-base-2026-10-17-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-17 09:46:21 | `spot-swap-base-2026-10-17-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-17 09:46:20 | `spot-swap-base-2026-10-17-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-17 09:46:20 | `passive-lp-kumbaya-2026-10-17-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-16 08:44:09 | `passive-lp-kumbaya-2026-10-15-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-16 08:44:07 | `spot-swap-base-2026-10-16-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-16 08:39:04 | `spot-swap-base-2026-10-15-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-16 08:39:02 | `passive-lp-kumbaya-2026-10-12-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-16 08:39:02 | `spot-swap-base-2026-10-11-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |

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
