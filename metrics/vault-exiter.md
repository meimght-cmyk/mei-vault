# Vault-exiter

_Updated: 2026-11-18T09:16:59.072Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **2**
- positions exited: **906**
- total exit events logged: **906**

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
| 2026-11-18 09:16:57 | `spot-swap-base-2026-11-18-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-18 09:11:54 | `passive-lp-kumbaya-2026-11-18-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-18 09:11:52 | `spot-swap-base-2026-11-18-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-18 09:11:52 | `spot-swap-base-2026-11-18-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-17 08:07:49 | `spot-swap-base-2026-11-17-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-17 07:57:41 | `passive-lp-kumbaya-2026-11-17-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-17 07:57:41 | `passive-lp-kumbaya-2026-11-17-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-17 07:57:40 | `spot-swap-base-2026-11-17-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-16 19:47:30 | `passive-lp-kumbaya-2026-11-16-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-16 06:59:10 | `spot-swap-base-2026-11-16-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-16 06:49:02 | `spot-swap-base-2026-11-16-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-16 06:49:00 | `passive-lp-kumbaya-2026-11-16-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-16 06:43:57 | `passive-lp-kumbaya-2026-11-15-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-16 06:43:56 | `spot-swap-base-2026-11-15-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-16 06:43:56 | `spot-swap-base-2026-11-16-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-16 00:13:53 | `spot-swap-base-2026-11-15-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-16 00:08:50 | `passive-lp-kumbaya-2026-11-15-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-16 00:08:48 | `spot-swap-base-2026-11-15-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-15 01:11:46 | `spot-swap-base-2026-11-14-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-15 01:11:30 | `passive-lp-kumbaya-2026-11-14-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-14 22:49:19 | `spot-swap-base-2026-11-14-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-14 22:49:19 | `spot-swap-base-2026-11-14-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-14 22:49:17 | `passive-lp-kumbaya-2026-11-14-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-14 06:36:28 | `passive-lp-kumbaya-2026-11-13-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-14 06:36:13 | `passive-lp-kumbaya-2026-11-13-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-13 21:33:12 | `spot-swap-base-2026-11-13-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-13 21:28:06 | `spot-swap-base-2026-11-13-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-11-13 21:28:04 | `spot-swap-base-2026-11-13-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-11-13 05:38:28 | `passive-lp-kumbaya-2026-11-12-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-11-13 05:38:27 | `spot-swap-base-2026-11-12-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |

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
