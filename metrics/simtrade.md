# Sim-trade P&L

_Updated: 2026-11-22T17:36:15.909Z_

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
| `spot-swap-base-2026-05-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 177.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 177.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 177.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 165.7d | -3.84% | TVL drift down |
| `passive-lp-kumbaya-2026-06-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 165.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 165.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 188.2d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 179.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 179.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 179.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 167.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 167.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 167.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 185.7d | 0.00% | stable/up |
| `spot-swap-base-2026-11-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 11.8d | 0.00% | stable/up |
| `spot-swap-base-2026-11-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 11.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 11.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 59.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-24-001` | kumbaya | `0x6bD9eeF2…` | WARN | 59.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 59.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 5.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-17-001` | kumbaya | `0x6bD9eeF2…` | WARN | 5.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 5.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-23-001` | kumbaya | `0x6bD9eeF2…` | WARN | 60.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 60.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 60.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 1.2d | -0.03% | TVL drift down |
| `passive-lp-kumbaya-2026-11-21-001` | kumbaya | `0x6bD9eeF2…` | WARN | 1.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 1.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 68.6d | 0.00% | stable/up |
| `spot-swap-base-2026-09-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 68.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-15-001` | kumbaya | `0x6bD9eeF2…` | WARN | 68.6d | 0.00% | stable/up |
| `spot-swap-base-2026-09-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 70.7d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-12-001` | kumbaya | `0x6bD9eeF2…` | WARN | 70.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 70.7d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-11-19-001` | kumbaya | `0x6bD9eeF2…` | WARN | 3.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 3.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 3.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 184.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 169.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 169.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 169.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 186.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 174.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-01-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 174.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 174.4d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 180.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 180.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 180.6d | 0.03% | stable/up |
| `spot-swap-base-2026-06-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 166.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 166.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 166.7d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 178.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 178.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 178.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 144.9d | 0.00% | flat |
| `spot-swap-base-2026-06-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 144.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 144.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-18-001` | kumbaya | `0x6bD9eeF2…` | WARN | 4.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 4.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 4.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 69.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-13-001` | kumbaya | `0x6bD9eeF2…` | WARN | 69.6d | 0.00% | stable/up |
| `spot-swap-base-2026-09-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 69.6d | 0.00% | stable/up |
| `spot-swap-base-2026-11-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 2.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-20-001` | kumbaya | `0x6bD9eeF2…` | WARN | 2.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 2.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 6.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-16-001` | kumbaya | `0x6bD9eeF2…` | WARN | 6.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 6.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-22-001` | kumbaya | `0x6bD9eeF2…` | WARN | 61.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 61.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 61.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-11-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 10.8d | 0.00% | stable/up |
| `spot-swap-base-2026-11-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 10.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-11-001` | kumbaya | `0x6bD9eeF2…` | WARN | 10.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 58.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-25-001` | kumbaya | `0x6bD9eeF2…` | WARN | 58.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 58.2d | 0.00% | stable/up |
| `spot-swap-base-2026-07-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 139.3d | 0.00% | flat |
| `spot-swap-base-2026-07-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 139.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 139.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-01-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 143.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-01-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 143.8d | 0.00% | flat |
| `spot-swap-base-2026-07-01-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 143.8d | 0.00% | flat |
| `spot-swap-base-2026-07-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 137.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 137.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 137.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 115.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 115.4d | 0.00% | flat |
| `spot-swap-base-2026-07-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 115.4d | 0.00% | flat |
| `spot-swap-base-2026-10-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 25.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 25.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-27-001` | kumbaya | `0x6bD9eeF2…` | WARN | 25.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 35d | 0.00% | stable/up |
| `spot-swap-base-2026-10-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 35d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-18-001` | kumbaya | `0x6bD9eeF2…` | WARN | 35d | 0.00% | stable/up |
| `spot-swap-base-2026-08-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 100.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-13-001` | kumbaya | `0x6bD9eeF2…` | WARN | 100.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 100.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 33d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-10-20-001` | kumbaya | `0x6bD9eeF2…` | WARN | 33d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 33d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-08-14-001` | kumbaya | `0x6bD9eeF2…` | WARN | 99.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 99.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 99.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 37.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-16-001` | kumbaya | `0x6bD9eeF2…` | WARN | 37.3d | 0.00% | stable/up |
| `spot-swap-base-2026-10-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 37.3d | 0.00% | stable/up |
| `spot-swap-base-2026-08-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 92.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 92.5d | -0.27% | TVL drift down |
| `passive-lp-kumbaya-2026-08-22-001` | kumbaya | `0x6bD9eeF2…` | WARN | 92.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-11-001` | kumbaya | `0x6bD9eeF2…` | WARN | 42.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 42.4d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 42.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 89.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-25-001` | kumbaya | `0x6bD9eeF2…` | WARN | 89.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 89.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-31-001` | kumbaya | `0x6bD9eeF2…` | WARN | 114.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 114.4d | 0.00% | flat |
| `spot-swap-base-2026-07-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 114.4d | 0.00% | flat |
| `spot-swap-base-2026-07-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 136.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 136.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 136.3d | 0.00% | flat |
| `spot-swap-base-2026-07-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 138.3d | 0.00% | flat |
| `spot-swap-base-2026-07-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 138.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 138.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 43.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 43.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 43.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 90.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-24-001` | kumbaya | `0x6bD9eeF2…` | WARN | 90.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 90.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 36.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-17-001` | kumbaya | `0x6bD9eeF2…` | WARN | 36.3d | 0.00% | stable/up |
| `spot-swap-base-2026-10-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 36.3d | 0.00% | stable/up |
| `spot-swap-base-2026-10-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 24.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-28-001` | kumbaya | `0x6bD9eeF2…` | WARN | 24.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 24.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 91.5d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-08-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 91.5d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-23-001` | kumbaya | `0x6bD9eeF2…` | WARN | 91.5d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 32d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-21-001` | kumbaya | `0x6bD9eeF2…` | WARN | 32d | 0.00% | stable/up |
| `spot-swap-base-2026-10-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 32d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-15-001` | kumbaya | `0x6bD9eeF2…` | WARN | 98.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 98.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 98.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-26-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 26.9d | 0.00% | flat |
| `spot-swap-base-2026-10-26-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 26.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-10-26-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 26.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 101.9d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-12-001` | kumbaya | `0x6bD9eeF2…` | WARN | 101.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 101.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 34d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 34d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-10-19-001` | kumbaya | `0x6bD9eeF2…` | WARN | 34d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 84.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 84.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 84.1d | 0.00% | stable/up |
| `spot-swap-base-2026-10-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 48.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 48.8d | 0.00% | stable/up |
| `spot-swap-base-2026-10-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 48.8d | 0.00% | stable/up |
| `spot-swap-base-2026-10-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 49.8d | 0.00% | stable/up |
| `spot-swap-base-2026-10-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 49.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 49.8d | 0.00% | stable/up |
| `spot-swap-base-2026-08-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 106d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-08-001` | kumbaya | `0x6bD9eeF2…` | WARN | 106d | 0.00% | stable/up |
| `spot-swap-base-2026-08-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 106d | 0.00% | stable/up |
| `spot-swap-base-2026-08-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 113.4d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-01-001` | kumbaya | `0x6bD9eeF2…` | WARN | 113.4d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 113.4d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 108.3d | 0.00% | stable/up |
| `spot-swap-base-2026-08-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 108.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 108.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 119.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 119.7d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 119.7d | 0.00% | flat |
| `spot-swap-base-2026-07-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 122.8d | 0.00% | flat |
| `spot-swap-base-2026-07-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 122.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 122.8d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-07-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 130.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 130.9d | 0.00% | flat |
| `spot-swap-base-2026-07-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 130.9d | 0.00% | flat |
| `spot-swap-base-2026-07-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 132.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-13-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 132.2d | 0.00% | stable/up |
| `spot-swap-base-2026-07-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 132.2d | 0.00% | flat |
| `spot-swap-base-2026-08-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 107d | 0.00% | stable/up |
| `spot-swap-base-2026-08-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 107d | 0.08% | stable/up |
| `passive-lp-kumbaya-2026-08-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 107d | 0.00% | stable/up |
| `spot-swap-base-2026-08-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 105d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-09-001` | kumbaya | `0x6bD9eeF2…` | WARN | 105d | 0.00% | stable/up |
| `spot-swap-base-2026-08-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 105d | 0.00% | stable/up |
| `spot-swap-base-2026-10-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 50.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-10-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 50.8d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-10-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 50.8d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-31-001` | kumbaya | `0x6bD9eeF2…` | WARN | 83.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 83.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 83.1d | 0.00% | stable/up |
| `spot-swap-base-2026-10-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 47.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 47.8d | 0.00% | stable/up |
| `spot-swap-base-2026-10-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 47.8d | 0.00% | stable/up |
| `spot-swap-base-2026-07-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 133.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 133.2d | 0.00% | stable/up |
| `spot-swap-base-2026-07-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 133.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 129.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 129.9d | 0.00% | flat |
| `spot-swap-base-2026-07-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 129.9d | 0.00% | flat |
| `spot-swap-base-2026-07-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 121.8d | 0.00% | flat |
| `spot-swap-base-2026-07-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 121.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 121.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 120.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-24-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 120.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 120.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-09-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 76d | 0.00% | stable/up |
| `spot-swap-base-2026-09-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 76d | 0.00% | stable/up |
| `spot-swap-base-2026-09-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 76d | 0.00% | stable/up |
| `spot-swap-base-2026-09-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 73.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-09-001` | kumbaya | `0x6bD9eeF2…` | WARN | 73.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 73.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 20.2d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-11-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 20.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 20.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 17.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 17.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 17.1d | 0.00% | stable/up |
| `spot-swap-base-2026-06-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 162.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 162.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 162.7d | 0.00% | flat |
| `spot-swap-base-2026-06-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 160.6d | 0.00% | flat |
| `spot-swap-base-2026-06-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 160.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 160.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 152.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 152.2d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 152.2d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 151.2d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-24-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 151.2d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 151.2d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-09-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 52.9d | 0.00% | stable/up |
| `spot-swap-base-2026-09-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 52.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 52.9d | 0.00% | stable/up |
| `spot-swap-base-2026-11-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 18.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 18.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 18.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 19.2d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-11-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 19.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 19.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-08-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 75d | 0.00% | flat |
| `passive-lp-kumbaya-2026-09-08-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 75d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-09-08-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 75d | 0.00% | flat |
| `spot-swap-base-2026-09-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 82.1d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-01-001` | kumbaya | `0x6bD9eeF2…` | WARN | 82.1d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 82.1d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 77d | 0.00% | stable/up |
| `spot-swap-base-2026-09-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 77d | 0.00% | stable/up |
| `spot-swap-base-2026-09-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 77d | 0.00% | stable/up |
| `spot-swap-base-2026-06-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 150.2d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 150.2d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 150.2d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 153.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 153.3d | 0.00% | flat |
| `spot-swap-base-2026-06-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 153.3d | 0.00% | flat |
| `spot-swap-base-2026-06-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 161.6d | 0.00% | flat |
| `spot-swap-base-2026-06-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 161.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 161.6d | 0.00% | stable/up |
| `spot-swap-base-2026-11-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 7.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-14-001` | kumbaya | `0x6bD9eeF2…` | WARN | 7.7d | 0.00% | stable/up |
| `spot-swap-base-2026-11-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 7.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 63.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 63.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-20-001` | kumbaya | `0x6bD9eeF2…` | WARN | 63.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 65.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-18-001` | kumbaya | `0x6bD9eeF2…` | WARN | 65.6d | 0.00% | stable/up |
| `spot-swap-base-2026-09-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 65.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-13-001` | kumbaya | `0x6bD9eeF2…` | WARN | 8.7d | 0.00% | stable/up |
| `spot-swap-base-2026-11-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 8.7d | 0.00% | stable/up |
| `spot-swap-base-2026-11-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 8.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 56.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-27-001` | kumbaya | `0x6bD9eeF2…` | WARN | 56.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 56.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 71.7d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-11-001` | kumbaya | `0x6bD9eeF2…` | WARN | 71.7d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 71.7d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-11-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 184.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 198d | 0.04% | stable/up |
| `spot-swap-base-2026-11-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 184.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-29-001` | kumbaya | `0x6bD9eeF2…` | WARN | 53.9d | 0.00% | stable/up |
| `spot-swap-base-2026-09-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 53.9d | 0.00% | stable/up |
| `spot-swap-base-2026-09-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 53.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-16-001` | kumbaya | `0x6bD9eeF2…` | WARN | 67.6d | 0.00% | stable/up |
| `spot-swap-base-2026-09-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 67.6d | 0.00% | stable/up |
| `spot-swap-base-2026-09-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 67.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 171.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 171.4d | -0.05% | TVL drift down |
| `passive-lp-kumbaya-2026-06-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 171.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 182.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 172.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-03-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 172.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 172.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-28-001` | kumbaya | `0x6bD9eeF2…` | WARN | 55.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 55.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 55.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-17-001` | kumbaya | `0x6bD9eeF2…` | WARN | 66.6d | 0.00% | stable/up |
| `spot-swap-base-2026-09-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 66.6d | 0.00% | stable/up |
| `spot-swap-base-2026-09-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 66.6d | 0.00% | stable/up |
| `spot-swap-base-2026-09-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 72.7d | 0.18% | stable/up |
| `passive-lp-kumbaya-2026-09-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 72.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 72.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-12-001` | kumbaya | `0x6bD9eeF2…` | WARN | 9.7d | 0.00% | stable/up |
| `spot-swap-base-2026-11-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 9.7d | 0.00% | stable/up |
| `spot-swap-base-2026-11-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 9.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-19-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 64.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-09-19-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 64.6d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-09-19-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 64.6d | 0.00% | flat |
| `spot-swap-base-2026-09-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 57.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-26-001` | kumbaya | `0x6bD9eeF2…` | WARN | 57.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 57.2d | -0.02% | TVL drift down |
| `spot-swap-base-2026-11-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 6.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-15-001` | kumbaya | `0x6bD9eeF2…` | WARN | 6.7d | 0.00% | stable/up |
| `spot-swap-base-2026-11-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 6.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 62.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 62.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-21-001` | kumbaya | `0x6bD9eeF2…` | WARN | 62.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 173.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-02-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 173.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 173.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 181.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 181.3d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 181.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 183.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 170.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 170.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 170.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 86.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 86.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-28-001` | kumbaya | `0x6bD9eeF2…` | WARN | 86.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 29.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-23-001` | kumbaya | `0x6bD9eeF2…` | WARN | 29.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 29.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 96.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 96.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-17-001` | kumbaya | `0x6bD9eeF2…` | WARN | 96.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-24-001` | kumbaya | `0x6bD9eeF2…` | WARN | 28.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 28.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 28.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 104d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 104d | 0.00% | stable/up |
| `spot-swap-base-2026-08-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 104d | 0.00% | stable/up |
| `spot-swap-base-2026-10-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 41.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 41.4d | -0.06% | TVL drift down |
| `passive-lp-kumbaya-2026-10-12-001` | kumbaya | `0x6bD9eeF2…` | WARN | 41.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 94.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-19-001` | kumbaya | `0x6bD9eeF2…` | WARN | 94.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 94.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 88.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-26-001` | kumbaya | `0x6bD9eeF2…` | WARN | 88.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 88.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 38.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-15-001` | kumbaya | `0x6bD9eeF2…` | WARN | 38.3d | 0.00% | stable/up |
| `spot-swap-base-2026-10-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 38.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 140.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 140.3d | 0.00% | flat |
| `spot-swap-base-2026-07-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 140.3d | 0.00% | flat |
| `spot-swap-base-2026-10-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 39.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-14-001` | kumbaya | `0x6bD9eeF2…` | WARN | 39.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 39.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-20-001` | kumbaya | `0x6bD9eeF2…` | WARN | 93.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 93.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 93.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 95.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-18-001` | kumbaya | `0x6bD9eeF2…` | WARN | 95.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 95.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 40.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 40.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-13-001` | kumbaya | `0x6bD9eeF2…` | WARN | 40.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 87.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-27-001` | kumbaya | `0x6bD9eeF2…` | WARN | 87.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 87.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-25-001` | kumbaya | `0x6bD9eeF2…` | WARN | 27.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 27.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 27.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 103d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-11-001` | kumbaya | `0x6bD9eeF2…` | WARN | 103d | 0.00% | stable/up |
| `spot-swap-base-2026-08-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 103d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 31d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-22-001` | kumbaya | `0x6bD9eeF2…` | WARN | 31d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 31d | 0.00% | stable/up |
| `spot-swap-base-2026-08-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 85.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 85.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-29-001` | kumbaya | `0x6bD9eeF2…` | WARN | 85.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 97.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 97.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-16-001` | kumbaya | `0x6bD9eeF2…` | WARN | 97.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 141.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 141.4d | 0.00% | flat |
| `spot-swap-base-2026-07-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 141.4d | 0.00% | flat |
| `spot-swap-base-2026-07-03-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 142.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-03-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 142.4d | 0.00% | flat |
| `spot-swap-base-2026-07-03-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 142.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 123.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 123.8d | 0.00% | flat |
| `spot-swap-base-2026-07-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 123.8d | 0.00% | flat |
| `spot-swap-base-2026-07-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 125.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 125.8d | 0.00% | stable/up |
| `spot-swap-base-2026-07-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 125.8d | 0.00% | flat |
| `spot-swap-base-2026-07-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 135.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 135.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 135.3d | 0.00% | flat |
| `spot-swap-base-2026-07-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 127.9d | 0.00% | flat |
| `spot-swap-base-2026-07-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 127.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 127.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 117.5d | 0.00% | flat |
| `spot-swap-base-2026-07-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 117.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 117.5d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-10-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 45.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 45.7d | 0.00% | stable/up |
| `spot-swap-base-2026-10-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 45.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 109.3d | 0.00% | stable/up |
| `spot-swap-base-2026-08-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 109.3d | 0.00% | stable/up |
| `spot-swap-base-2026-08-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 109.3d | 0.00% | stable/up |
| `spot-swap-base-2026-10-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 22.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-31-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 22.5d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-10-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 22.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-09-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 44.7d | 0.00% | flat |
| `spot-swap-base-2026-10-09-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 44.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-10-09-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 44.7d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 112.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 112.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 112.4d | 0.00% | flat |
| `spot-swap-base-2026-07-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 128.9d | 0.00% | flat |
| `spot-swap-base-2026-07-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 128.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 128.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 116.4d | 0.00% | flat |
| `spot-swap-base-2026-07-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 116.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-29-001` | kumbaya | `0x6bD9eeF2…` | WARN | 116.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 134.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 134.2d | 0.00% | stable/up |
| `spot-swap-base-2026-07-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 134.2d | 0.00% | flat |
| `spot-swap-base-2026-07-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 118.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 118.5d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 118.5d | 0.00% | flat |
| `spot-swap-base-2026-07-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 126.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 126.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 126.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 124.8d | 0.00% | stable/up |
| `spot-swap-base-2026-07-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 124.8d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-07-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 124.8d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-08-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 111.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 111.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 111.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 110.3d | 0.00% | stable/up |
| `spot-swap-base-2026-08-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 110.3d | 0.00% | stable/up |
| `spot-swap-base-2026-08-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 110.3d | 0.00% | stable/up |
| `spot-swap-base-2026-10-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 23.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 23.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 23.6d | -0.47% | TVL drift down |
| `spot-swap-base-2026-10-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 46.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 46.7d | 0.00% | stable/up |
| `spot-swap-base-2026-10-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 46.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-01-001` | kumbaya | `0x6bD9eeF2…` | WARN | 51.8d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 51.8d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 51.8d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-06-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 159.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 159.6d | 0.00% | flat |
| `spot-swap-base-2026-06-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 159.6d | 0.00% | flat |
| `spot-swap-base-2026-05-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 175.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-31-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 175.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 175.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 146.1d | 0.00% | stable/up |
| `spot-swap-base-2026-06-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 146.1d | 0.00% | flat |
| `spot-swap-base-2026-06-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 146.1d | 0.00% | flat |
| `spot-swap-base-2026-06-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 163.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 163.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 163.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 148.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 148.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 148.2d | 0.00% | flat |
| `spot-swap-base-2026-06-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 157.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 157.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 157.3d | 0.00% | flat |
| `spot-swap-base-2026-06-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 155.3d | 0.00% | flat |
| `spot-swap-base-2026-06-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 155.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 155.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 80.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 80.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 80.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-08-001` | kumbaya | `0x6bD9eeF2…` | WARN | 14.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 14.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 14.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 79.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 79.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 79.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 16.1d | 5.87% | stable/up |
| `passive-lp-kumbaya-2026-11-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 16.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 16.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-01-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 21.5d | 0.00% | flat |
| `spot-swap-base-2026-11-01-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 21.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-11-01-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 21.5d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 154.3d | 0.00% | flat |
| `spot-swap-base-2026-06-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 154.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 154.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 149.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 149.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 149.2d | 0.00% | flat |
| `spot-swap-base-2026-06-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 156.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 156.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 156.3d | 0.00% | flat |
| `spot-swap-base-2026-06-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 164.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 164.7d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 164.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 197d | -0.99% | TVL drift down |
| `spot-swap-base-2026-05-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 176.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 176.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 176.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 158.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 158.6d | 0.00% | flat |
| `spot-swap-base-2026-06-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 158.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 147.1d | 0.00% | stable/up |
| `spot-swap-base-2026-06-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 147.1d | 0.00% | flat |
| `spot-swap-base-2026-06-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 147.1d | 0.00% | flat |
| `spot-swap-base-2026-11-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 15.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 15.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 15.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 78d | 85.71% | stable/up |
| `spot-swap-base-2026-09-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 78d | -4.98% | TVL drift down |
| `passive-lp-kumbaya-2026-09-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 78d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-09-001` | kumbaya | `0x6bD9eeF2…` | WARN | 12.8d | 0.00% | stable/up |
| `spot-swap-base-2026-11-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 12.8d | 0.00% | stable/up |
| `spot-swap-base-2026-11-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 12.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 81.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 81.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 81.1d | -20.00% | unexitable (errored) |

- count: **532** (511 resolved at 7d, 26 loss-flagged)
- avg P&L per entry: **-3.57%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **87.0%** (463 wins)
- worst entry: -50.00% · best entry: 85.71%
- equal-weight portfolio: starting $1 per entry → **-3.57% return**

## Hypothetical: every ALLOW probe as an entry

Counterfactual portfolio — if we'd been more aggressive and entered every ALLOW signal at every probe cycle.

### All entries
- count: **38486** (36101 resolved at 7d, 7626 loss-flagged)
- avg P&L per entry: **-11.11%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **72.0%** (27706 wins)
- worst entry: -85.71% · best entry: 85.71%
- equal-weight portfolio: starting $1 per entry → **-11.11% return**

### Safe cohort only
- count: **37813** (35453 resolved at 7d, 7530 loss-flagged)
- avg P&L per entry: **-11.16%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **71.8%** (27166 wins)
- worst entry: -85.71% · best entry: 85.71%
- equal-weight portfolio: starting $1 per entry → **-11.16% return**

### Risky cohort only
- count: **673** (648 resolved at 7d, 96 loss-flagged)
- avg P&L per entry: **-8.03%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **80.2%** (540 wins)
- worst entry: -50.00% · best entry: 8.11%
- equal-weight portfolio: starting $1 per entry → **-8.03% return**

## How to read this

- **Real intents** is the honest answer: "if we'd actually deployed every strategy intent the system produced, what's the realized P&L?" Currently a tiny sample.
- **Hypothetical** is the exploratory answer: what if we'd entered every ALLOW signal? Bigger sample, but more aggressive than our actual strategy gates would allow.
- A passive LP's value moves roughly with pool TVL — that's the drift model. Catastrophic loss = LOSS patch flagged → -50% assumption.
- We don't simulate fees. Real LPs earn ~0.3-1% per week from trading fees in liquid pools, so realized P&L would be higher than shown. Conservative bias is intentional.

Raw data: [`metrics/simtrade-pnl.json`](simtrade-pnl.json). Source: [`scripts/compute-simtrade-pnl.ts`](../scripts/compute-simtrade-pnl.ts).
