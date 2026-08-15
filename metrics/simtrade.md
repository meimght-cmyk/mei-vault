# Sim-trade P&L

_Updated: 2026-08-15T18:54:12.328Z_

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
| `spot-swap-base-2026-05-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 78.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 78.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 78.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 66.8d | -3.84% | TVL drift down |
| `passive-lp-kumbaya-2026-06-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 66.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 66.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 89.3d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 80.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 80.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 80.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 68.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 68.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 68.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 86.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 85.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 70.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 70.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 70.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 87.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 75.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-01-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 75.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 75.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 81.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 81.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 81.6d | 0.03% | stable/up |
| `spot-swap-base-2026-06-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 67.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 67.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 67.8d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 79.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 79.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 79.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 45.9d | 0.00% | flat |
| `spot-swap-base-2026-06-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 45.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 45.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 40.4d | 0.00% | flat |
| `spot-swap-base-2026-07-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 40.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 40.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-01-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 44.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-01-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 44.9d | 0.00% | flat |
| `spot-swap-base-2026-07-01-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 44.9d | 0.00% | flat |
| `spot-swap-base-2026-07-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 38.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 38.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 38.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 16.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 16.5d | 0.00% | flat |
| `spot-swap-base-2026-07-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 16.5d | 0.00% | flat |
| `spot-swap-base-2026-08-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-13-001` | kumbaya | `0x6bD9eeF2…` | WARN | 2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-14-001` | kumbaya | `0x6bD9eeF2…` | WARN | 1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-31-001` | kumbaya | `0x6bD9eeF2…` | WARN | 15.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 15.5d | 0.00% | flat |
| `spot-swap-base-2026-07-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 15.5d | 0.00% | flat |
| `spot-swap-base-2026-07-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 37.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 37.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 37.3d | 0.00% | flat |
| `spot-swap-base-2026-07-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 39.4d | 0.00% | flat |
| `spot-swap-base-2026-07-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 39.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 39.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 99.1d | 0.04% | stable/up |
| `spot-swap-base-2026-08-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 85.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 85.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-12-001` | kumbaya | `0x6bD9eeF2…` | WARN | 3d | 0.00% | stable/up |
| `spot-swap-base-2026-08-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 3d | 0.00% | stable/up |
| `spot-swap-base-2026-08-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 7.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-08-001` | kumbaya | `0x6bD9eeF2…` | WARN | 7.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 7.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 14.4d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-01-001` | kumbaya | `0x6bD9eeF2…` | WARN | 14.4d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 14.4d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 9.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 9.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 9.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 20.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 20.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 20.8d | 0.00% | flat |
| `spot-swap-base-2026-07-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 23.9d | 0.00% | flat |
| `spot-swap-base-2026-07-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 23.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 23.9d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-07-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 32d | 0.00% | stable/up |
| `spot-swap-base-2026-07-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 32d | 0.00% | flat |
| `spot-swap-base-2026-07-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 32d | 0.00% | flat |
| `spot-swap-base-2026-07-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 33.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-13-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 33.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 33.3d | 0.00% | flat |
| `spot-swap-base-2026-08-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 8.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 8.1d | 0.08% | stable/up |
| `passive-lp-kumbaya-2026-08-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 8.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-09-001` | kumbaya | `0x6bD9eeF2…` | WARN | 6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 6d | 0.00% | stable/up |
| `spot-swap-base-2026-07-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 34.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 34.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 34.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 31d | 0.00% | stable/up |
| `spot-swap-base-2026-07-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 31d | 0.00% | flat |
| `spot-swap-base-2026-07-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 31d | 0.00% | flat |
| `spot-swap-base-2026-07-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 22.8d | 0.00% | flat |
| `spot-swap-base-2026-07-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 22.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 22.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 21.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-24-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 21.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 21.8d | 0.00% | flat |
| `spot-swap-base-2026-06-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 63.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 63.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 63.7d | 0.00% | flat |
| `spot-swap-base-2026-06-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 61.7d | 0.00% | flat |
| `spot-swap-base-2026-06-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 61.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 61.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 53.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 53.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 53.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 52.3d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-24-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 52.3d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 52.3d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 51.3d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 51.3d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 51.3d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 54.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 54.3d | 0.00% | flat |
| `spot-swap-base-2026-06-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 54.3d | 0.00% | flat |
| `spot-swap-base-2026-06-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 62.7d | 0.00% | flat |
| `spot-swap-base-2026-06-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 62.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 62.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 72.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 72.4d | -0.05% | TVL drift down |
| `passive-lp-kumbaya-2026-06-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 72.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 83.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 73.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-03-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 73.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 73.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 74.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-02-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 74.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 74.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 82.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 82.4d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 82.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 84.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 71.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 71.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 71.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 41.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 41.4d | 0.00% | flat |
| `spot-swap-base-2026-07-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 41.4d | 0.00% | flat |
| `spot-swap-base-2026-08-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-11-001` | kumbaya | `0x6bD9eeF2…` | WARN | 4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 42.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 42.4d | 0.00% | flat |
| `spot-swap-base-2026-07-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 42.4d | 0.00% | flat |
| `spot-swap-base-2026-07-03-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 43.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-03-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 43.5d | 0.00% | flat |
| `spot-swap-base-2026-07-03-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 43.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 24.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 24.9d | 0.00% | flat |
| `spot-swap-base-2026-07-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 24.9d | 0.00% | flat |
| `spot-swap-base-2026-07-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 26.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 26.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 26.9d | 0.00% | flat |
| `spot-swap-base-2026-07-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 36.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 36.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 36.3d | 0.00% | flat |
| `spot-swap-base-2026-07-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 28.9d | 0.00% | flat |
| `spot-swap-base-2026-07-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 28.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 28.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 18.5d | 0.00% | flat |
| `spot-swap-base-2026-07-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 18.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 18.5d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-08-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 10.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 10.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 10.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 13.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 13.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 13.4d | 0.00% | flat |
| `spot-swap-base-2026-07-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 30d | 0.00% | flat |
| `spot-swap-base-2026-07-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 30d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 30d | 0.00% | stable/up |
| `spot-swap-base-2026-07-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 17.5d | 0.00% | flat |
| `spot-swap-base-2026-07-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 17.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-29-001` | kumbaya | `0x6bD9eeF2…` | WARN | 17.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 35.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 35.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 35.3d | 0.00% | flat |
| `spot-swap-base-2026-07-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 19.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 19.5d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 19.5d | 0.00% | flat |
| `spot-swap-base-2026-07-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 27.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 27.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 27.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 25.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 25.9d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-07-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 25.9d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-08-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 12.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 12.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 12.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 11.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 11.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 11.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 60.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 60.7d | 0.00% | flat |
| `spot-swap-base-2026-06-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 60.7d | 0.00% | flat |
| `spot-swap-base-2026-05-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 76.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-31-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 76.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 76.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 47.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 47.2d | 0.00% | flat |
| `spot-swap-base-2026-06-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 47.2d | 0.00% | flat |
| `spot-swap-base-2026-06-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 64.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 64.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 64.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 49.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 49.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 49.2d | 0.00% | flat |
| `spot-swap-base-2026-06-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 58.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 58.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 58.4d | 0.00% | flat |
| `spot-swap-base-2026-06-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 56.3d | 0.00% | flat |
| `spot-swap-base-2026-06-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 56.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 56.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 55.3d | 0.00% | flat |
| `spot-swap-base-2026-06-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 55.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 55.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 50.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 50.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 50.2d | 0.00% | flat |
| `spot-swap-base-2026-06-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 57.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 57.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 57.4d | 0.00% | flat |
| `spot-swap-base-2026-06-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 65.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 65.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 65.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 98.1d | -0.99% | TVL drift down |
| `spot-swap-base-2026-05-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 77.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 77.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 77.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 59.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 59.7d | 0.00% | flat |
| `spot-swap-base-2026-06-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 59.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 48.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 48.2d | 0.00% | flat |
| `spot-swap-base-2026-06-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 48.2d | 0.00% | flat |

- count: **247** (229 resolved at 7d, 16 loss-flagged)
- avg P&L per entry: **-3.66%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **90.3%** (223 wins)
- worst entry: -50.00% · best entry: 0.08%
- equal-weight portfolio: starting $1 per entry → **-3.66% return**

## Hypothetical: every ALLOW probe as an entry

Counterfactual portfolio — if we'd been more aggressive and entered every ALLOW signal at every probe cycle.

### All entries
- count: **16405** (15489 resolved at 7d, 4507 loss-flagged)
- avg P&L per entry: **-15.10%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **61.9%** (10161 wins)
- worst entry: -50.00% · best entry: 19.84%
- equal-weight portfolio: starting $1 per entry → **-15.10% return**

### Safe cohort only
- count: **16016** (15132 resolved at 7d, 4482 loss-flagged)
- avg P&L per entry: **-15.36%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **61.3%** (9825 wins)
- worst entry: -50.00% · best entry: 19.84%
- equal-weight portfolio: starting $1 per entry → **-15.36% return**

### Risky cohort only
- count: **389** (357 resolved at 7d, 25 loss-flagged)
- avg P&L per entry: **-4.30%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **86.4%** (336 wins)
- worst entry: -50.00% · best entry: 8.11%
- equal-weight portfolio: starting $1 per entry → **-4.30% return**

## How to read this

- **Real intents** is the honest answer: "if we'd actually deployed every strategy intent the system produced, what's the realized P&L?" Currently a tiny sample.
- **Hypothetical** is the exploratory answer: what if we'd entered every ALLOW signal? Bigger sample, but more aggressive than our actual strategy gates would allow.
- A passive LP's value moves roughly with pool TVL — that's the drift model. Catastrophic loss = LOSS patch flagged → -50% assumption.
- We don't simulate fees. Real LPs earn ~0.3-1% per week from trading fees in liquid pools, so realized P&L would be higher than shown. Conservative bias is intentional.

Raw data: [`metrics/simtrade-pnl.json`](simtrade-pnl.json). Source: [`scripts/compute-simtrade-pnl.ts`](../scripts/compute-simtrade-pnl.ts).
