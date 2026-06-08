# Vault-exiter

_Updated: 2026-06-08T23:36:20.438Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **6**
- positions exited: **103**
- total exit events logged: **103**

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
| 2026-06-08 19:44:13 | `passive-lp-kumbaya-2026-06-08-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-08 19:44:13 | `passive-lp-kumbaya-2026-06-08-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-08 19:44:12 | `passive-lp-kumbaya-2026-06-08-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-08 19:44:12 | `spot-swap-base-2026-06-08-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-08 19:44:10 | `spot-swap-base-2026-06-08-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-08 19:44:10 | `passive-lp-kumbaya-2026-06-07-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-07 17:29:12 | `spot-swap-base-2026-06-05-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-07 17:24:07 | `spot-swap-base-2026-06-06-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-07 17:24:06 | `spot-swap-base-2026-06-06-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-07 17:24:04 | `passive-lp-kumbaya-2026-06-06-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-07 17:24:03 | `passive-lp-kumbaya-2026-06-06-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-07 17:24:01 | `passive-lp-kumbaya-2026-06-06-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-06 09:03:10 | `spot-swap-base-2026-06-05-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-06 09:03:09 | `passive-lp-kumbaya-2026-06-04-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-06 09:03:08 | `passive-lp-kumbaya-2026-06-01-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-06 09:03:08 | `passive-lp-kumbaya-2026-06-01-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-06 09:03:06 | `spot-swap-base-2026-06-06-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-06 02:56:51 | `passive-lp-kumbaya-2026-06-05-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-05 08:36:51 | `passive-lp-kumbaya-2026-06-05-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-05 08:36:49 | `passive-lp-kumbaya-2026-06-05-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-05 08:36:49 | `spot-swap-base-2026-06-05-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-04 14:14:05 | `passive-lp-kumbaya-2026-06-04-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-04 13:12:31 | `spot-swap-base-2026-06-04-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-04 10:38:06 | `passive-lp-kumbaya-2026-06-01-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-04 08:13:33 | `passive-lp-kumbaya-2026-06-03-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-04 08:13:32 | `passive-lp-kumbaya-2026-06-03-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-04 08:13:32 | `spot-swap-base-2026-06-04-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-06-04 08:13:30 | `spot-swap-base-2026-06-04-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-06-04 08:13:30 | `passive-lp-kumbaya-2026-06-04-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-06-04 02:05:03 | `spot-swap-base-2026-06-03-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |

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
