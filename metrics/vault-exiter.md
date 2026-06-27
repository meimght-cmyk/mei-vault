# Vault-exiter

_Updated: 2026-06-27T07:59:45.229Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **5**
- positions exited: **206**
- total exit events logged: **206**

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
| 2026-06-27 07:34:09 | `passive-lp-kumbaya-2026-06-26-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-27 01:29:33 | `passive-lp-kumbaya-2026-06-26-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-26 19:23:06 | `spot-swap-base-2026-06-26-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-26 13:14:28 | `spot-swap-base-2026-06-26-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-26 13:14:27 | `spot-swap-base-2026-06-26-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-26 13:14:26 | `passive-lp-kumbaya-2026-06-26-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-26 07:08:12 | `passive-lp-kumbaya-2026-06-25-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-26 01:03:43 | `passive-lp-kumbaya-2026-06-25-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-25 12:50:07 | `passive-lp-kumbaya-2026-06-25-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-25 12:50:05 | `spot-swap-base-2026-06-25-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-25 12:50:05 | `spot-swap-base-2026-06-25-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-24 12:20:49 | `spot-swap-base-2026-06-24-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-24 09:31:40 | `spot-swap-base-2026-06-22-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-24 09:31:40 | `spot-swap-base-2026-06-24-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-24 09:31:38 | `spot-swap-base-2026-06-24-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-24 09:31:38 | `passive-lp-kumbaya-2026-06-24-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-24 09:31:36 | `passive-lp-kumbaya-2026-06-24-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-24 01:12:14 | `passive-lp-kumbaya-2026-06-23-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-23 11:57:45 | `passive-lp-kumbaya-2026-06-22-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-23 08:36:53 | `passive-lp-kumbaya-2026-06-22-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-23 08:36:51 | `spot-swap-base-2026-06-22-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-23 08:36:51 | `spot-swap-base-2026-06-22-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-23 08:36:49 | `spot-swap-base-2026-06-23-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-23 08:36:49 | `spot-swap-base-2026-06-23-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-23 07:45:43 | `passive-lp-kumbaya-2026-06-22-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-22 17:37:36 | `passive-lp-kumbaya-2026-06-21-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-22 11:30:36 | `passive-lp-kumbaya-2026-06-21-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-22 11:30:35 | `spot-swap-base-2026-06-20-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-22 07:41:38 | `passive-lp-kumbaya-2026-06-21-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-22 07:41:36 | `passive-lp-kumbaya-2026-06-20-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
