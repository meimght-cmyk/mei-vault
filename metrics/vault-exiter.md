# Vault-exiter

_Updated: 2026-05-27T04:31:48.925Z_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls `/api/score` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +3000 bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **11**
- positions exited: **26**
- total exit events logged: **26**

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
| 2026-05-26 10:23:36 | `passive-lp-kumbaya-2026-05-26-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-26 09:42:14 | `spot-swap-base-2026-05-26-001` | uniswap-v3-base | ALLOW/0 → WARN/5000 | +5000 | allow_to_warn |
| 2026-05-26 04:16:15 | `spot-swap-base-2026-05-25-001` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-26 04:16:14 | `spot-swap-base-2026-05-25-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-05-26 04:16:14 | `spot-swap-base-2026-05-25-002` | uniswap-v3-base | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-26 04:16:13 | `passive-lp-kumbaya-2026-05-25-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-26 04:16:13 | `passive-lp-kumbaya-2026-05-23-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-26 04:16:12 | `passive-lp-kumbaya-2026-05-26-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-26 04:16:09 | `passive-lp-kumbaya-2026-05-26-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-26 04:16:08 | `spot-swap-base-2026-05-26-003` | uniswap-v3-base | ALLOW/500 → ERROR/-1 | -501 | became_error |
| 2026-05-25 16:04:03 | `passive-lp-kumbaya-2026-05-25-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-25 16:04:03 | `passive-lp-kumbaya-2026-05-25-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-24 03:19:38 | `passive-lp-kumbaya-2026-05-22-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-24 03:19:38 | `passive-lp-kumbaya-2026-05-23-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-24 03:19:37 | `passive-lp-kumbaya-2026-05-23-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-24 01:31:28 | `passive-lp-kumbaya-2026-05-18-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-23 08:58:29 | `passive-lp-kumbaya-2026-05-22-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-23 08:58:28 | `passive-lp-kumbaya-2026-05-22-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-22 08:27:30 | `passive-lp-kumbaya-2026-05-21-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-22 02:20:38 | `passive-lp-kumbaya-2026-05-19-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-22 02:20:38 | `passive-lp-kumbaya-2026-05-19-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-22 02:20:35 | `passive-lp-kumbaya-2026-05-21-003` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |
| 2026-05-22 02:20:34 | `passive-lp-kumbaya-2026-05-21-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-22 02:20:34 | `passive-lp-kumbaya-2026-05-20-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-21 21:22:41 | `passive-lp-kumbaya-2026-05-08-001` | kumbaya | ALLOW/0 → ERROR/-1 | -1 | became_error |
| 2026-05-21 21:22:26 | `passive-lp-kumbaya-2026-05-19-002` | kumbaya | ALLOW/2000 → ERROR/-1 | -2001 | became_error |

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
