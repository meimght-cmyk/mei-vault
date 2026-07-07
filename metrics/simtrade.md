# Sim-trade P&L

_Updated: 2026-07-07T06:42:05.004Z_

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
| `spot-swap-base-2026-05-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 39d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 39d | 0.00% | stable/up |
| `spot-swap-base-2026-05-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 39d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 27.3d | -3.84% | TVL drift down |
| `passive-lp-kumbaya-2026-06-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 27.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 27.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 49.8d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 41.1d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 41.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 41.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 29.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 29.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 29.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 47.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 46.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 30.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 30.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 30.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 48.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 36d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-01-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 36d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 36d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 42.1d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 42.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 42.1d | 0.03% | stable/up |
| `spot-swap-base-2026-06-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 28.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 28.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 28.3d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 40.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 40.1d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 40.1d | 0.00% | stable/up |
| `spot-swap-base-2026-06-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 6.4d | 0.00% | flat |
| `spot-swap-base-2026-06-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 6.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 6.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 0.9d | 0.00% | flat |
| `spot-swap-base-2026-07-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 0.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-01-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 5.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-01-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 5.4d | 0.00% | flat |
| `spot-swap-base-2026-07-01-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 5.4d | 0.00% | flat |
| `spot-swap-base-2026-07-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 45.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 45.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 59.6d | 0.04% | stable/up |
| `spot-swap-base-2026-06-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 24.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 24.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 24.2d | 0.00% | flat |
| `spot-swap-base-2026-06-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 22.2d | 0.00% | flat |
| `spot-swap-base-2026-06-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 22.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 22.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 13.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 13.8d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 13.8d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 12.8d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-24-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 12.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 12.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 11.7d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 11.7d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 11.7d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 14.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 14.8d | 0.00% | flat |
| `spot-swap-base-2026-06-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 14.8d | 0.00% | flat |
| `spot-swap-base-2026-06-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 23.2d | 0.00% | flat |
| `spot-swap-base-2026-06-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 23.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 23.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 32.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 32.9d | -0.05% | TVL drift down |
| `passive-lp-kumbaya-2026-06-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 32.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 44.1d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 34d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-03-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 34d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 34d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 35d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-02-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 35d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 35d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 43.1d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 42.9d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 42.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 45.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 31.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 31.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 31.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 1.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 1.9d | 0.00% | flat |
| `spot-swap-base-2026-07-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 1.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 2.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 2.9d | 0.00% | flat |
| `spot-swap-base-2026-07-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 2.9d | 0.00% | flat |
| `spot-swap-base-2026-07-03-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-03-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 4d | 0.00% | flat |
| `spot-swap-base-2026-07-03-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 21.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 21.2d | 0.00% | flat |
| `spot-swap-base-2026-06-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 21.2d | 0.00% | flat |
| `spot-swap-base-2026-05-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 37d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-31-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 37d | 0.00% | stable/up |
| `spot-swap-base-2026-05-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 37d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 7.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 7.7d | 0.00% | flat |
| `spot-swap-base-2026-06-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 7.7d | 0.00% | flat |
| `spot-swap-base-2026-06-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 25.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 25.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 25.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 9.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 9.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 9.7d | 0.00% | flat |
| `spot-swap-base-2026-06-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 18.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 18.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 18.9d | 0.00% | flat |
| `spot-swap-base-2026-06-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 16.8d | 0.00% | flat |
| `spot-swap-base-2026-06-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 16.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 16.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 15.8d | 0.00% | flat |
| `spot-swap-base-2026-06-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 15.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 15.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 10.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 10.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 10.7d | 0.00% | flat |
| `spot-swap-base-2026-06-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 17.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 17.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 17.9d | 0.00% | flat |
| `spot-swap-base-2026-06-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 26.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 26.2d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 26.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 58.6d | -0.99% | TVL drift down |
| `spot-swap-base-2026-05-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 38d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 38d | 0.00% | stable/up |
| `spot-swap-base-2026-05-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 38d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 20.1d | 0.00% | stable/up |
| `spot-swap-base-2026-06-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 20.1d | 0.00% | flat |
| `spot-swap-base-2026-06-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 20.1d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 8.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 8.7d | 0.00% | flat |
| `spot-swap-base-2026-06-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 8.7d | 0.00% | flat |

- count: **133** (115 resolved at 7d, 7 loss-flagged)
- avg P&L per entry: **-2.97%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **91.0%** (121 wins)
- worst entry: -50.00% · best entry: 0.04%
- equal-weight portfolio: starting $1 per entry → **-2.97% return**

## Hypothetical: every ALLOW probe as an entry

Counterfactual portfolio — if we'd been more aggressive and entered every ALLOW signal at every probe cycle.

### All entries
- count: **11106** (10407 resolved at 7d, 2457 loss-flagged)
- avg P&L per entry: **-12.15%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **67.4%** (7488 wins)
- worst entry: -50.00% · best entry: 8.01%
- equal-weight portfolio: starting $1 per entry → **-12.15% return**

### Safe cohort only
- count: **10903** (10228 resolved at 7d, 2447 loss-flagged)
- avg P&L per entry: **-12.33%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **67.0%** (7306 wins)
- worst entry: -50.00% · best entry: 6.13%
- equal-weight portfolio: starting $1 per entry → **-12.33% return**

### Risky cohort only
- count: **203** (179 resolved at 7d, 10 loss-flagged)
- avg P&L per entry: **-2.97%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **89.7%** (182 wins)
- worst entry: -50.00% · best entry: 8.01%
- equal-weight portfolio: starting $1 per entry → **-2.97% return**

## How to read this

- **Real intents** is the honest answer: "if we'd actually deployed every strategy intent the system produced, what's the realized P&L?" Currently a tiny sample.
- **Hypothetical** is the exploratory answer: what if we'd entered every ALLOW signal? Bigger sample, but more aggressive than our actual strategy gates would allow.
- A passive LP's value moves roughly with pool TVL — that's the drift model. Catastrophic loss = LOSS patch flagged → -50% assumption.
- We don't simulate fees. Real LPs earn ~0.3-1% per week from trading fees in liquid pools, so realized P&L would be higher than shown. Conservative bias is intentional.

Raw data: [`metrics/simtrade-pnl.json`](simtrade-pnl.json). Source: [`scripts/compute-simtrade-pnl.ts`](../scripts/compute-simtrade-pnl.ts).
