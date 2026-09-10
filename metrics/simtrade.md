# Sim-trade P&L

_Updated: 2026-09-10T20:08:14.740Z_

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
| `spot-swap-base-2026-05-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 104.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 104.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 104.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 92.8d | -3.84% | TVL drift down |
| `passive-lp-kumbaya-2026-06-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 92.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 92.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 115.3d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 106.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 106.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 106.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 94.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 94.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 94.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 112.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 111.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 96.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 96.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 96.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 113.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 101.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-01-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 101.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 101.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 107.7d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 107.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 107.7d | 0.03% | stable/up |
| `spot-swap-base-2026-06-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 93.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 93.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 93.8d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 105.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 105.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 105.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 72d | 0.00% | flat |
| `spot-swap-base-2026-06-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 72d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 72d | 0.00% | stable/up |
| `spot-swap-base-2026-07-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 66.4d | 0.00% | flat |
| `spot-swap-base-2026-07-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 66.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 66.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-01-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 70.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-01-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 70.9d | 0.00% | flat |
| `spot-swap-base-2026-07-01-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 70.9d | 0.00% | flat |
| `spot-swap-base-2026-07-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 64.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 64.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 64.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 42.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 42.5d | 0.00% | flat |
| `spot-swap-base-2026-07-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 42.5d | 0.00% | flat |
| `spot-swap-base-2026-08-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 28d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-13-001` | kumbaya | `0x6bD9eeF2…` | WARN | 28d | 0.00% | stable/up |
| `spot-swap-base-2026-08-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 28d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-14-001` | kumbaya | `0x6bD9eeF2…` | WARN | 27d | 0.00% | stable/up |
| `spot-swap-base-2026-08-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 27d | 0.00% | stable/up |
| `spot-swap-base-2026-08-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 27d | 0.00% | stable/up |
| `spot-swap-base-2026-08-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 19.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 19.6d | -0.27% | TVL drift down |
| `passive-lp-kumbaya-2026-08-22-001` | kumbaya | `0x6bD9eeF2…` | WARN | 19.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 16.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-25-001` | kumbaya | `0x6bD9eeF2…` | WARN | 16.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 16.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-31-001` | kumbaya | `0x6bD9eeF2…` | WARN | 41.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 41.5d | 0.00% | flat |
| `spot-swap-base-2026-07-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 41.5d | 0.00% | flat |
| `spot-swap-base-2026-07-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 63.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 63.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 63.4d | 0.00% | flat |
| `spot-swap-base-2026-07-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 65.4d | 0.00% | flat |
| `spot-swap-base-2026-07-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 65.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 65.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 17.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-24-001` | kumbaya | `0x6bD9eeF2…` | WARN | 17.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 17.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 18.6d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-08-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 18.6d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-23-001` | kumbaya | `0x6bD9eeF2…` | WARN | 18.6d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-15-001` | kumbaya | `0x6bD9eeF2…` | WARN | 26d | 0.00% | stable/up |
| `spot-swap-base-2026-08-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 26d | 0.00% | stable/up |
| `spot-swap-base-2026-08-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 26d | 0.00% | stable/up |
| `spot-swap-base-2026-08-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 29d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-12-001` | kumbaya | `0x6bD9eeF2…` | WARN | 29d | 0.00% | stable/up |
| `spot-swap-base-2026-08-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 29d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 11.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 11.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 11.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 33.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-08-001` | kumbaya | `0x6bD9eeF2…` | WARN | 33.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 33.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 40.5d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-01-001` | kumbaya | `0x6bD9eeF2…` | WARN | 40.5d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 40.5d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 35.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 35.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 35.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 46.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 46.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 46.9d | 0.00% | flat |
| `spot-swap-base-2026-07-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 49.9d | 0.00% | flat |
| `spot-swap-base-2026-07-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 49.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 49.9d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-07-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 58d | 0.00% | stable/up |
| `spot-swap-base-2026-07-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 58d | 0.00% | flat |
| `spot-swap-base-2026-07-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 58d | 0.00% | flat |
| `spot-swap-base-2026-07-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 59.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-13-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 59.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 59.3d | 0.00% | flat |
| `spot-swap-base-2026-08-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 34.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 34.1d | 0.08% | stable/up |
| `passive-lp-kumbaya-2026-08-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 34.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 32.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-09-001` | kumbaya | `0x6bD9eeF2…` | WARN | 32.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 32.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-31-001` | kumbaya | `0x6bD9eeF2…` | WARN | 10.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 10.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 10.2d | 0.00% | stable/up |
| `spot-swap-base-2026-07-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 60.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 60.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 60.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 57d | 0.00% | stable/up |
| `spot-swap-base-2026-07-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 57d | 0.00% | flat |
| `spot-swap-base-2026-07-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 57d | 0.00% | flat |
| `spot-swap-base-2026-07-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 48.9d | 0.00% | flat |
| `spot-swap-base-2026-07-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 48.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 48.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 47.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-24-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 47.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 47.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-09-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 3.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 3.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 3.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 0.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-09-001` | kumbaya | `0x6bD9eeF2…` | WARN | 0.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 0.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 89.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 89.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 89.8d | 0.00% | flat |
| `spot-swap-base-2026-06-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 87.7d | 0.00% | flat |
| `spot-swap-base-2026-06-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 87.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 87.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 79.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 79.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 79.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 78.3d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-24-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 78.3d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 78.3d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-09-08-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 2.1d | 0.00% | flat |
| `passive-lp-kumbaya-2026-09-08-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 2.1d | 0.00% | flat |
| `spot-swap-base-2026-09-08-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 2.1d | 0.00% | flat |
| `spot-swap-base-2026-09-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 9.2d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-01-001` | kumbaya | `0x6bD9eeF2…` | WARN | 9.2d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 9.2d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 4.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 4.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 4.1d | 0.00% | stable/up |
| `spot-swap-base-2026-06-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 77.3d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 77.3d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 77.3d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 80.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 80.4d | 0.00% | flat |
| `spot-swap-base-2026-06-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 80.4d | 0.00% | flat |
| `spot-swap-base-2026-06-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 88.8d | 0.00% | flat |
| `spot-swap-base-2026-06-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 88.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 88.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 98.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 98.5d | -0.05% | TVL drift down |
| `passive-lp-kumbaya-2026-06-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 98.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 109.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 99.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-03-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 99.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 99.5d | 0.00% | stable/up |
| `spot-swap-base-2026-09-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 111.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 125.1d | 0.04% | stable/up |
| `spot-swap-base-2026-09-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 111.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 100.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-02-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 100.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 100.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 108.7d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 108.4d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 108.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 110.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 97.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 97.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 97.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 13.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 13.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-28-001` | kumbaya | `0x6bD9eeF2…` | WARN | 13.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 24d | 0.00% | stable/up |
| `spot-swap-base-2026-08-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 24d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-17-001` | kumbaya | `0x6bD9eeF2…` | WARN | 24d | 0.00% | stable/up |
| `spot-swap-base-2026-08-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 31.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 31.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 31.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 21.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-19-001` | kumbaya | `0x6bD9eeF2…` | WARN | 21.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 21.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 15.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-26-001` | kumbaya | `0x6bD9eeF2…` | WARN | 15.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 15.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 67.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 67.5d | 0.00% | flat |
| `spot-swap-base-2026-07-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 67.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-20-001` | kumbaya | `0x6bD9eeF2…` | WARN | 20.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 20.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 20.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 22.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-18-001` | kumbaya | `0x6bD9eeF2…` | WARN | 22.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 22.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 14.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-27-001` | kumbaya | `0x6bD9eeF2…` | WARN | 14.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 14.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 30.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-11-001` | kumbaya | `0x6bD9eeF2…` | WARN | 30.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 30.1d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-08-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 12.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 12.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-29-001` | kumbaya | `0x6bD9eeF2…` | WARN | 12.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 25d | 0.00% | stable/up |
| `spot-swap-base-2026-08-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 25d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-16-001` | kumbaya | `0x6bD9eeF2…` | WARN | 25d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 68.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 68.5d | 0.00% | flat |
| `spot-swap-base-2026-07-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 68.5d | 0.00% | flat |
| `spot-swap-base-2026-07-03-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 69.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-03-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 69.5d | 0.00% | flat |
| `spot-swap-base-2026-07-03-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 69.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 50.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 50.9d | 0.00% | flat |
| `spot-swap-base-2026-07-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 50.9d | 0.00% | flat |
| `spot-swap-base-2026-07-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 53d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 53d | 0.00% | stable/up |
| `spot-swap-base-2026-07-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 53d | 0.00% | flat |
| `spot-swap-base-2026-07-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 62.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 62.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 62.4d | 0.00% | flat |
| `spot-swap-base-2026-07-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 55d | 0.00% | flat |
| `spot-swap-base-2026-07-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 55d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 55d | 0.00% | stable/up |
| `spot-swap-base-2026-07-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 44.6d | 0.00% | flat |
| `spot-swap-base-2026-07-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 44.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 44.6d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-08-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 36.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 36.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 36.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 39.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 39.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 39.5d | 0.00% | flat |
| `spot-swap-base-2026-07-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 56d | 0.00% | flat |
| `spot-swap-base-2026-07-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 56d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 56d | 0.00% | stable/up |
| `spot-swap-base-2026-07-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 43.5d | 0.00% | flat |
| `spot-swap-base-2026-07-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 43.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-29-001` | kumbaya | `0x6bD9eeF2…` | WARN | 43.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 61.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 61.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 61.3d | 0.00% | flat |
| `spot-swap-base-2026-07-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 45.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 45.6d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 45.6d | 0.00% | flat |
| `spot-swap-base-2026-07-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 54d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 54d | 0.00% | stable/up |
| `spot-swap-base-2026-07-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 54d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 51.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 51.9d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-07-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 51.9d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-08-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 38.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 38.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 38.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 37.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 37.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 37.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 86.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 86.7d | 0.00% | flat |
| `spot-swap-base-2026-06-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 86.7d | 0.00% | flat |
| `spot-swap-base-2026-05-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 102.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-31-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 102.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 102.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 73.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 73.2d | 0.00% | flat |
| `spot-swap-base-2026-06-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 73.2d | 0.00% | flat |
| `spot-swap-base-2026-06-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 90.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 90.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 90.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 75.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 75.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 75.3d | 0.00% | flat |
| `spot-swap-base-2026-06-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 84.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 84.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 84.4d | 0.00% | flat |
| `spot-swap-base-2026-06-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 82.4d | 0.00% | flat |
| `spot-swap-base-2026-06-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 82.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 82.4d | 0.00% | stable/up |
| `spot-swap-base-2026-09-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 7.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 7.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 7.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 6.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 6.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 6.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 81.4d | 0.00% | flat |
| `spot-swap-base-2026-06-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 81.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 81.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 76.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 76.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 76.3d | 0.00% | flat |
| `spot-swap-base-2026-06-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 83.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 83.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 83.4d | 0.00% | flat |
| `spot-swap-base-2026-06-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 91.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 91.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 91.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 124.1d | -0.99% | TVL drift down |
| `spot-swap-base-2026-05-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 103.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 103.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 103.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 85.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 85.7d | 0.00% | flat |
| `spot-swap-base-2026-06-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 85.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 74.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 74.3d | 0.00% | flat |
| `spot-swap-base-2026-06-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 74.3d | 0.00% | flat |
| `spot-swap-base-2026-09-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 5.1d | 85.71% | stable/up |
| `spot-swap-base-2026-09-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 5.1d | -4.98% | TVL drift down |
| `passive-lp-kumbaya-2026-09-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 5.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 8.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 8.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 8.2d | -20.00% | unexitable (errored) |

- count: **322** (304 resolved at 7d, 16 loss-flagged)
- avg P&L per entry: **-3.12%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **89.1%** (287 wins)
- worst entry: -50.00% · best entry: 85.71%
- equal-weight portfolio: starting $1 per entry → **-3.12% return**

## Hypothetical: every ALLOW probe as an entry

Counterfactual portfolio — if we'd been more aggressive and entered every ALLOW signal at every probe cycle.

### All entries
- count: **19796** (18899 resolved at 7d, 5931 loss-flagged)
- avg P&L per entry: **-16.44%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **59.3%** (11733 wins)
- worst entry: -85.71% · best entry: 85.71%
- equal-weight portfolio: starting $1 per entry → **-16.44% return**

### Safe cohort only
- count: **19321** (18429 resolved at 7d, 5864 loss-flagged)
- avg P&L per entry: **-16.65%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **58.8%** (11356 wins)
- worst entry: -85.71% · best entry: 85.71%
- equal-weight portfolio: starting $1 per entry → **-16.65% return**

### Risky cohort only
- count: **475** (470 resolved at 7d, 67 loss-flagged)
- avg P&L per entry: **-8.07%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **79.4%** (377 wins)
- worst entry: -50.00% · best entry: 8.11%
- equal-weight portfolio: starting $1 per entry → **-8.07% return**

## How to read this

- **Real intents** is the honest answer: "if we'd actually deployed every strategy intent the system produced, what's the realized P&L?" Currently a tiny sample.
- **Hypothetical** is the exploratory answer: what if we'd entered every ALLOW signal? Bigger sample, but more aggressive than our actual strategy gates would allow.
- A passive LP's value moves roughly with pool TVL — that's the drift model. Catastrophic loss = LOSS patch flagged → -50% assumption.
- We don't simulate fees. Real LPs earn ~0.3-1% per week from trading fees in liquid pools, so realized P&L would be higher than shown. Conservative bias is intentional.

Raw data: [`metrics/simtrade-pnl.json`](simtrade-pnl.json). Source: [`scripts/compute-simtrade-pnl.ts`](../scripts/compute-simtrade-pnl.ts).
