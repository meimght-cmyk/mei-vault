# Vault-exiter

_Updated: 2026-11-06T02:26:42.111Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **1**
- positions exited: **842**
- total exit events logged: **842**

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
| 2026-11-05 11:45:38 | `spot-swap-base-2026-11-05-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-05 11:40:34 | `spot-swap-base-2026-11-05-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-05 11:40:34 | `spot-swap-base-2026-11-05-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-05 11:40:32 | `passive-lp-kumbaya-2026-11-05-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-05 11:40:31 | `passive-lp-kumbaya-2026-11-05-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-04 10:28:30 | `spot-swap-base-2026-11-04-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-04 10:28:29 | `spot-swap-base-2026-11-04-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-04 10:23:06 | `passive-lp-kumbaya-2026-11-04-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-04 10:23:05 | `passive-lp-kumbaya-2026-11-04-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-04 10:23:04 | `spot-swap-base-2026-11-04-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-04 10:17:31 | `spot-swap-base-2026-11-02-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-03 09:11:38 | `spot-swap-base-2026-11-03-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-03 09:06:33 | `passive-lp-kumbaya-2026-11-03-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-03 09:06:32 | `passive-lp-kumbaya-2026-11-03-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-03 09:06:31 | `spot-swap-base-2026-11-03-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-03 09:06:30 | `spot-swap-base-2026-11-03-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-02 07:56:22 | `spot-swap-base-2026-11-01-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-02 07:56:22 | `spot-swap-base-2026-11-01-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-02 07:56:21 | `spot-swap-base-2026-11-02-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-02 07:56:20 | `spot-swap-base-2026-11-02-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-02 07:56:19 | `passive-lp-kumbaya-2026-11-02-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-02 07:05:41 | `passive-lp-kumbaya-2026-11-01-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-02 07:05:40 | `passive-lp-kumbaya-2026-11-01-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-02 07:05:38 | `spot-swap-base-2026-11-01-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-31 08:34:09 | `spot-swap-base-2026-10-31-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-31 08:21:58 | `spot-swap-base-2026-10-31-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-30 12:17:07 | `spot-swap-base-2026-10-30-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-10-30 04:08:40 | `spot-swap-base-2026-10-30-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-30 03:14:52 | `spot-swap-base-2026-10-30-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-10-30 01:09:23 | `passive-lp-kumbaya-2026-10-30-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
