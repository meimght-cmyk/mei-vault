# Vault-exiter

_Updated: 2026-10-07T20:03:52.070Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **4**
- positions exited: **704**
- total exit events logged: **704**

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
| 2026-10-07 05:49:51 | `spot-swap-base-2026-10-06-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-06 23:41:19 | `spot-swap-base-2026-10-06-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-05 21:23:37 | `spot-swap-base-2026-10-05-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-05 21:18:33 | `passive-lp-kumbaya-2026-10-05-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-05 21:18:32 | `passive-lp-kumbaya-2026-10-05-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-05 21:18:32 | `spot-swap-base-2026-10-05-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-05 21:18:31 | `spot-swap-base-2026-10-05-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-05 21:13:27 | `passive-lp-kumbaya-2026-10-04-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-04 20:17:40 | `passive-lp-kumbaya-2026-10-03-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-04 20:17:40 | `spot-swap-base-2026-10-04-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-04 20:12:35 | `spot-swap-base-2026-10-02-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-04 20:12:33 | `passive-lp-kumbaya-2026-10-03-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-04 20:12:33 | `spot-swap-base-2026-10-04-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-04 20:12:31 | `spot-swap-base-2026-10-04-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-04 20:07:25 | `spot-swap-base-2026-10-03-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-03 19:09:48 | `spot-swap-base-2026-10-03-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-03 19:09:46 | `spot-swap-base-2026-10-03-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-03 19:04:42 | `passive-lp-kumbaya-2026-10-01-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-03 19:04:41 | `spot-swap-base-2026-10-02-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-02 18:08:11 | `passive-lp-kumbaya-2026-10-02-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-02 18:08:10 | `spot-swap-base-2026-10-02-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-02 18:03:06 | `spot-swap-base-2026-10-01-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-02 18:03:04 | `spot-swap-base-2026-09-29-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-02 18:03:04 | `spot-swap-base-2026-09-30-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-02 18:03:02 | `passive-lp-kumbaya-2026-10-02-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-02 09:37:37 | `spot-swap-base-2026-10-01-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-01 21:26:01 | `spot-swap-base-2026-10-01-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-01 05:24:42 | `spot-swap-base-2026-09-30-003` | uniswap-v3-base | ALLOW/500 → WARN/6240 | +5740 | allow_to_warn |
| 2026-09-30 16:00:30 | `passive-lp-kumbaya-2026-09-29-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-09-30 16:00:29 | `passive-lp-kumbaya-2026-09-30-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
