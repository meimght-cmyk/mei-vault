# Vault-exiter

_Updated: 2026-10-16T05:24:55.413Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **4**
- positions exited: **742**
- total exit events logged: **742**

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
| 2026-10-15 07:36:41 | `spot-swap-base-2026-10-15-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-15 07:36:41 | `spot-swap-base-2026-10-15-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-15 07:36:39 | `passive-lp-kumbaya-2026-10-15-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-15 07:26:31 | `spot-swap-base-2026-10-14-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-14 06:20:07 | `passive-lp-kumbaya-2026-10-14-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-14 06:20:07 | `passive-lp-kumbaya-2026-10-14-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-14 06:20:06 | `spot-swap-base-2026-10-14-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-14 06:20:06 | `spot-swap-base-2026-10-14-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-14 06:15:01 | `passive-lp-kumbaya-2026-10-13-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-14 06:15:00 | `spot-swap-base-2026-10-13-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-13 05:12:05 | `passive-lp-kumbaya-2026-10-13-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-13 05:12:04 | `spot-swap-base-2026-10-13-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-13 05:12:04 | `spot-swap-base-2026-10-13-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-13 05:06:58 | `spot-swap-base-2026-10-12-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-12 04:05:53 | `spot-swap-base-2026-10-12-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-12 04:05:53 | `spot-swap-base-2026-10-12-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-12 04:05:51 | `passive-lp-kumbaya-2026-10-12-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-11 02:56:57 | `passive-lp-kumbaya-2026-10-10-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-11 02:56:56 | `spot-swap-base-2026-10-11-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-11 02:51:52 | `passive-lp-kumbaya-2026-10-11-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-11 02:51:52 | `passive-lp-kumbaya-2026-10-11-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-11 02:51:50 | `spot-swap-base-2026-10-11-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-10 01:51:27 | `spot-swap-base-2026-10-10-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-10 01:51:26 | `passive-lp-kumbaya-2026-10-10-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-10 01:46:22 | `spot-swap-base-2026-10-10-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-10 01:46:21 | `spot-swap-base-2026-10-10-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-09 01:31:11 | `spot-swap-base-2026-10-09-002` | uniswap-v3-base | ALLOW/0 → WARN/8000 | +8000 | allow_to_warn |
| 2026-10-09 01:31:10 | `spot-swap-base-2026-10-07-002` | uniswap-v3-base | ALLOW/0 → WARN/8000 | +8000 | allow_to_warn |
| 2026-10-09 00:35:31 | `passive-lp-kumbaya-2026-10-09-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-10-09 00:35:30 | `passive-lp-kumbaya-2026-10-09-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
