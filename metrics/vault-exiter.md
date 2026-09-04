# Vault-exiter

_Updated: 2026-09-04T00:56:04.746Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **4**
- positions exited: **548**
- total exit events logged: **548**

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
| 2026-09-03 12:52:19 | `spot-swap-base-2026-09-02-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-03 12:52:18 | `passive-lp-kumbaya-2026-09-03-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-03 12:52:16 | `spot-swap-base-2026-09-03-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-03 12:47:11 | `spot-swap-base-2026-09-02-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-09-03 12:47:10 | `passive-lp-kumbaya-2026-09-02-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-03 12:47:09 | `passive-lp-kumbaya-2026-09-02-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-03 03:43:35 | `spot-swap-base-2026-09-02-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-02 11:47:09 | `spot-swap-base-2026-09-01-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-01 10:51:44 | `passive-lp-kumbaya-2026-09-01-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-01 10:51:43 | `spot-swap-base-2026-09-01-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-09-01 10:46:38 | `passive-lp-kumbaya-2026-09-01-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-01 10:46:37 | `spot-swap-base-2026-09-01-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-31 09:51:36 | `spot-swap-base-2026-08-31-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-31 09:51:35 | `spot-swap-base-2026-08-30-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-31 09:46:32 | `passive-lp-kumbaya-2026-08-31-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-31 09:46:31 | `passive-lp-kumbaya-2026-08-31-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-31 09:46:31 | `spot-swap-base-2026-08-31-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-31 09:46:30 | `spot-swap-base-2026-08-31-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-30 08:41:33 | `spot-swap-base-2026-08-29-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-30 08:41:33 | `spot-swap-base-2026-08-28-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-30 08:41:32 | `spot-swap-base-2026-08-30-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-30 08:41:31 | `spot-swap-base-2026-08-30-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-30 08:41:30 | `passive-lp-kumbaya-2026-08-30-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-30 08:11:10 | `passive-lp-kumbaya-2026-08-29-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-30 08:11:09 | `passive-lp-kumbaya-2026-08-29-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-30 08:11:07 | `spot-swap-base-2026-08-22-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-29 07:47:30 | `spot-swap-base-2026-08-29-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-08-29 07:47:29 | `spot-swap-base-2026-08-29-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-08-29 07:37:18 | `passive-lp-kumbaya-2026-08-27-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-08-29 07:37:18 | `passive-lp-kumbaya-2026-08-28-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
