# Sim-trade P&L

_Updated: 2026-05-18T19:51:15.512Z_

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
| `passive-lp-kumbaya-2026-05-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0.3d | -0.03% | TVL drift down |
| `passive-lp-kumbaya-2026-05-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 9.1d | -0.99% | TVL drift down |

- count: **2** (1 resolved at 7d, 0 loss-flagged)
- avg P&L per entry: **-0.51%**
- median P&L per entry: **-0.51%**
- win rate (P&L ≥ 0): **0.0%** (0 wins)
- worst entry: -0.99% · best entry: -0.03%
- equal-weight portfolio: starting $1 per entry → **-0.51% return**

## Hypothetical: every ALLOW probe as an entry

Counterfactual portfolio — if we'd been more aggressive and entered every ALLOW signal at every probe cycle.

### All entries
- count: **4196** (1499 resolved at 7d, 14 loss-flagged)
- avg P&L per entry: **-0.18%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **89.8%** (3766 wins)
- worst entry: -50.00% · best entry: 5.12%
- equal-weight portfolio: starting $1 per entry → **-0.18% return**

### Safe cohort only
- count: **4182** (1499 resolved at 7d, 14 loss-flagged)
- avg P&L per entry: **-0.18%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **89.7%** (3752 wins)
- worst entry: -50.00% · best entry: 5.12%
- equal-weight portfolio: starting $1 per entry → **-0.18% return**

### Risky cohort only
- count: **14** (0 resolved at 7d, 0 loss-flagged)
- avg P&L per entry: **0.19%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **100.0%** (14 wins)
- worst entry: 0.00% · best entry: 2.67%
- equal-weight portfolio: starting $1 per entry → **0.19% return**

## How to read this

- **Real intents** is the honest answer: "if we'd actually deployed every strategy intent the system produced, what's the realized P&L?" Currently a tiny sample.
- **Hypothetical** is the exploratory answer: what if we'd entered every ALLOW signal? Bigger sample, but more aggressive than our actual strategy gates would allow.
- A passive LP's value moves roughly with pool TVL — that's the drift model. Catastrophic loss = LOSS patch flagged → -50% assumption.
- We don't simulate fees. Real LPs earn ~0.3-1% per week from trading fees in liquid pools, so realized P&L would be higher than shown. Conservative bias is intentional.

Raw data: [`metrics/simtrade-pnl.json`](simtrade-pnl.json). Source: [`scripts/compute-simtrade-pnl.ts`](../scripts/compute-simtrade-pnl.ts).
