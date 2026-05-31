# Vault-exiter

_Updated: 2026-05-31T09:49:39.013Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **6**
- positions exited: **55**
- total exit events logged: **55**

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
| 2026-05-30 11:21:37 | `passive-lp-kumbaya-2026-05-30-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-30 11:21:36 | `spot-swap-base-2026-05-30-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-30 11:21:34 | `spot-swap-base-2026-05-30-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-05-30 11:21:33 | `spot-swap-base-2026-05-30-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-30 11:21:31 | `passive-lp-kumbaya-2026-05-29-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-30 11:21:29 | `spot-swap-base-2026-05-29-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-30 11:21:28 | `spot-swap-base-2026-05-29-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-05-30 06:02:29 | `passive-lp-kumbaya-2026-05-30-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-30 06:02:29 | `passive-lp-kumbaya-2026-05-30-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-29 14:19:52 | `spot-swap-base-2026-05-29-001` | uniswap-v3-base | ALLOW/0 → WARN/8000 | +8000 | allow_to_warn |
| 2026-05-29 14:09:42 | `passive-lp-kumbaya-2026-05-29-003` | kumbaya | ALLOW/2000 → WARN/6302 | +4302 | allow_to_warn |
| 2026-05-29 11:41:20 | `passive-lp-kumbaya-2026-05-18-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-29 05:36:18 | `passive-lp-kumbaya-2026-05-27-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-29 05:36:17 | `passive-lp-kumbaya-2026-05-27-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-29 05:36:16 | `passive-lp-kumbaya-2026-05-18-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-29 05:36:15 | `passive-lp-kumbaya-2026-05-29-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-29 02:03:42 | `passive-lp-kumbaya-2026-05-28-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-29 02:03:42 | `passive-lp-kumbaya-2026-05-28-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-28 11:16:25 | `spot-swap-base-2026-05-28-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-28 09:32:29 | `passive-lp-kumbaya-2026-05-27-003` | kumbaya | ALLOW/2000 → WARN/7000 | +5000 | allow_to_warn |
| 2026-05-28 05:12:17 | `spot-swap-base-2026-05-28-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-28 05:12:17 | `spot-swap-base-2026-05-28-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-05-28 05:12:15 | `passive-lp-kumbaya-2026-05-28-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-27 10:49:35 | `spot-swap-base-2026-05-27-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-27 10:49:35 | `spot-swap-base-2026-05-27-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-05-27 04:42:13 | `spot-swap-base-2026-05-26-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-27 04:42:13 | `passive-lp-kumbaya-2026-05-20-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-27 04:42:12 | `passive-lp-kumbaya-2026-05-20-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-27 04:42:12 | `spot-swap-base-2026-05-27-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-26 10:23:36 | `passive-lp-kumbaya-2026-05-26-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
