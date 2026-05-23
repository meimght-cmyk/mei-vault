# Sim-trade P&L

_Updated: 2026-05-23T23:27:33.500Z_

Conservative simulation of "what would real capital have done if it had followed our signals." No fees assumed — we don't claim ungrounded gains.

## Model

| Condition | Assumed P&L |
|---|---|
| LOSS patch landed for entry | **-50%** (-5000 bps) |
| No LOSS but pool errors at horizon | **-20%** (-2000 bps) |
| Otherwise | **−Δ tvlDriftBps** (LP value tracks TVL drift) |

Horizon: 7 days.

## Real intents (the strategy as actually deployed)

These are the strategy intents the system actually produced. Equal-weight $1 per entry.

| intent | protocol | pool | entry decision | age | P&L | label |
|---|---|---|---|---|---|---|
| `passive-lp-kumbaya-2026-05-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 5.5d | -0.03% | TVL drift down |
| `passive-lp-kumbaya-2026-05-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 2.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 1.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 3.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 15.3d | 0.04% | stable/up |
| `passive-lp-kumbaya-2026-05-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 14.3d | -0.99% | TVL drift down |

- count: **7** (2 resolved at 7d, 0 loss-flagged)
- avg P&L per entry: **-0.14%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **71.4%** (5 wins)
- worst entry: -0.99% · best entry: 0.04%
- equal-weight portfolio: starting $1 per entry → **-0.14% return**

## Hypothetical: every ALLOW probe as an entry

Counterfactual portfolio — if we'd been more aggressive and entered every ALLOW signal at every probe cycle.

### All entries
- count: **5443** (3496 resolved at 7d, 49 loss-flagged)
- avg P&L per entry: **-0.48%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **91.7%** (4993 wins)
- worst entry: -50.00% · best entry: 6.13%
- equal-weight portfolio: starting $1 per entry → **-0.48% return**

### Safe cohort only
- count: **5406** (3489 resolved at 7d, 49 loss-flagged)
- avg P&L per entry: **-0.48%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **91.7%** (4958 wins)
- worst entry: -50.00% · best entry: 6.13%
- equal-weight portfolio: starting $1 per entry → **-0.48% return**

### Risky cohort only
- count: **37** (7 resolved at 7d, 0 loss-flagged)
- avg P&L per entry: **-0.05%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **94.6%** (35 wins)
- worst entry: -2.68% · best entry: 2.67%
- equal-weight portfolio: starting $1 per entry → **-0.05% return**

## How to read this

- **Real intents** is the honest answer: "if we'd actually deployed every strategy intent the system produced, what's the realized P&L?" Currently a tiny sample.
- **Hypothetical** is the exploratory answer: what if we'd entered every ALLOW signal? Bigger sample, but more aggressive than our actual strategy gates would allow.
- A passive LP's value moves roughly with pool TVL — that's the drift model. Catastrophic loss = LOSS patch flagged → -50% assumption.
- We don't simulate fees. Real LPs earn ~0.3-1% per week from trading fees in liquid pools, so realized P&L would be higher than shown. Conservative bias is intentional.

Raw data: [`metrics/simtrade-pnl.json`](simtrade-pnl.json). Source: [`scripts/compute-simtrade-pnl.ts`](../scripts/compute-simtrade-pnl.ts).
