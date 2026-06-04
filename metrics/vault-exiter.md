# Vault-exiter

_Updated: 2026-06-04T09:46:26.784Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **6**
- positions exited: **79**
- total exit events logged: **79**

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
| 2026-06-04 08:13:33 | `passive-lp-kumbaya-2026-06-03-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-04 08:13:32 | `passive-lp-kumbaya-2026-06-03-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-04 08:13:32 | `spot-swap-base-2026-06-04-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-04 08:13:30 | `spot-swap-base-2026-06-04-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-04 08:13:30 | `passive-lp-kumbaya-2026-06-04-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-04 02:05:03 | `spot-swap-base-2026-06-03-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-04 02:05:03 | `passive-lp-kumbaya-2026-06-03-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-03 07:46:23 | `spot-swap-base-2026-06-02-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-03 07:46:23 | `spot-swap-base-2026-06-02-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-03 07:46:22 | `spot-swap-base-2026-06-03-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-03 07:46:21 | `spot-swap-base-2026-06-03-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-03 04:17:33 | `spot-swap-base-2026-06-02-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-03 01:38:20 | `passive-lp-kumbaya-2026-06-02-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-02 13:25:13 | `passive-lp-kumbaya-2026-05-31-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-02 13:25:12 | `passive-lp-kumbaya-2026-06-02-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-02 07:20:35 | `passive-lp-kumbaya-2026-06-02-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-01 18:24:54 | `spot-swap-base-2026-06-01-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-01 18:24:54 | `spot-swap-base-2026-06-01-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-01 18:24:53 | `spot-swap-base-2026-06-01-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-01 14:32:21 | `passive-lp-kumbaya-2026-05-31-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-01 06:55:21 | `spot-swap-base-2026-05-31-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-01 06:55:20 | `passive-lp-kumbaya-2026-05-31-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-01 03:47:50 | `spot-swap-base-2026-05-31-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-01 03:37:37 | `spot-swap-base-2026-05-31-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-30 11:21:37 | `passive-lp-kumbaya-2026-05-30-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-30 11:21:36 | `spot-swap-base-2026-05-30-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-30 11:21:34 | `spot-swap-base-2026-05-30-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-05-30 11:21:33 | `spot-swap-base-2026-05-30-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-30 11:21:31 | `passive-lp-kumbaya-2026-05-29-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-30 11:21:29 | `spot-swap-base-2026-05-29-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |

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
