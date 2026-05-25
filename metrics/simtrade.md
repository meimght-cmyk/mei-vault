# Sim-trade P&L

_Updated: 2026-05-25T00:08:23.357Z_

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
| `passive-lp-kumbaya-2026-05-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 6.5d | -0.04% | TVL drift down |
| `passive-lp-kumbaya-2026-05-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 3.9d | -0.01% | TVL drift down |
| `passive-lp-kumbaya-2026-05-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 2.9d | -0.01% | TVL drift down |
| `passive-lp-kumbaya-2026-05-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 5d | -0.01% | TVL drift down |
| `passive-lp-kumbaya-2026-05-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0.9d | -0.01% | TVL drift down |
| `passive-lp-kumbaya-2026-05-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 16.3d | 0.04% | stable/up |
| `passive-lp-kumbaya-2026-05-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 1.9d | -0.01% | TVL drift down |
| `passive-lp-kumbaya-2026-05-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 15.3d | -0.99% | TVL drift down |

- count: **8** (2 resolved at 7d, 0 loss-flagged)
- avg P&L per entry: **-0.13%**
- median P&L per entry: **-0.01%**
- win rate (P&L ≥ 0): **12.5%** (1 wins)
- worst entry: -0.99% · best entry: 0.04%
- equal-weight portfolio: starting $1 per entry → **-0.13% return**

## Hypothetical: every ALLOW probe as an entry

Counterfactual portfolio — if we'd been more aggressive and entered every ALLOW signal at every probe cycle.

### All entries
- count: **5591** (3896 resolved at 7d, 55 loss-flagged)
- avg P&L per entry: **-0.58%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **88.6%** (4954 wins)
- worst entry: -50.00% · best entry: 6.13%
- equal-weight portfolio: starting $1 per entry → **-0.58% return**

### Safe cohort only
- count: **5550** (3885 resolved at 7d, 55 loss-flagged)
- avg P&L per entry: **-0.57%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **89.1%** (4944 wins)
- worst entry: -50.00% · best entry: 6.13%
- equal-weight portfolio: starting $1 per entry → **-0.57% return**

### Risky cohort only
- count: **41** (11 resolved at 7d, 0 loss-flagged)
- avg P&L per entry: **-1.17%**
- median P&L per entry: **-1.48%**
- win rate (P&L ≥ 0): **24.4%** (10 wins)
- worst entry: -4.16% · best entry: 2.67%
- equal-weight portfolio: starting $1 per entry → **-1.17% return**

## How to read this

- **Real intents** is the honest answer: "if we'd actually deployed every strategy intent the system produced, what's the realized P&L?" Currently a tiny sample.
- **Hypothetical** is the exploratory answer: what if we'd entered every ALLOW signal? Bigger sample, but more aggressive than our actual strategy gates would allow.
- A passive LP's value moves roughly with pool TVL — that's the drift model. Catastrophic loss = LOSS patch flagged → -50% assumption.
- We don't simulate fees. Real LPs earn ~0.3-1% per week from trading fees in liquid pools, so realized P&L would be higher than shown. Conservative bias is intentional.

Raw data: [`metrics/simtrade-pnl.json`](simtrade-pnl.json). Source: [`scripts/compute-simtrade-pnl.ts`](../scripts/compute-simtrade-pnl.ts).
