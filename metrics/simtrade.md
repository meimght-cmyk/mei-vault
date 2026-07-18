# Sim-trade P&L

_Updated: 2026-07-18T17:01:50.412Z_

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
| `spot-swap-base-2026-05-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 50.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 50.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 50.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 38.7d | -3.84% | TVL drift down |
| `passive-lp-kumbaya-2026-06-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 38.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 38.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 61.2d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 52.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 52.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 52.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 40.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 40.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 40.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 58.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 57.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 42.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 42.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 42.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 59.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 47.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-01-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 47.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 47.4d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 53.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 53.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 53.5d | 0.03% | stable/up |
| `spot-swap-base-2026-06-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 39.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 39.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 39.7d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 51.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 51.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 51.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 17.8d | 0.00% | flat |
| `spot-swap-base-2026-06-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 17.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 17.8d | 0.00% | stable/up |
| `spot-swap-base-2026-07-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 12.3d | 0.00% | flat |
| `spot-swap-base-2026-07-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 12.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 12.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-01-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 16.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-01-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 16.8d | 0.00% | flat |
| `spot-swap-base-2026-07-01-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 16.8d | 0.00% | flat |
| `spot-swap-base-2026-07-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 10.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 10.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 10.3d | 0.00% | flat |
| `spot-swap-base-2026-07-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 9.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 9.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 9.3d | 0.00% | flat |
| `spot-swap-base-2026-07-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 11.3d | 0.00% | flat |
| `spot-swap-base-2026-07-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 11.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 11.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 3.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 3.9d | 0.00% | flat |
| `spot-swap-base-2026-07-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 3.9d | 0.00% | flat |
| `spot-swap-base-2026-07-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 5.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-13-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 5.2d | 0.00% | stable/up |
| `spot-swap-base-2026-07-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 5.2d | 0.00% | flat |
| `spot-swap-base-2026-07-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 6.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 6.2d | 0.00% | stable/up |
| `spot-swap-base-2026-07-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 6.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 2.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 2.9d | 0.00% | flat |
| `spot-swap-base-2026-07-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 2.9d | 0.00% | flat |
| `spot-swap-base-2026-06-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 35.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 35.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 35.6d | 0.00% | flat |
| `spot-swap-base-2026-06-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 33.6d | 0.00% | flat |
| `spot-swap-base-2026-06-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 33.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 33.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 25.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 25.2d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 25.2d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 24.2d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-24-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 24.2d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 24.2d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 23.2d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 23.2d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 23.2d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 26.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 26.2d | 0.00% | flat |
| `spot-swap-base-2026-06-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 26.2d | 0.00% | flat |
| `spot-swap-base-2026-06-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 34.6d | 0.00% | flat |
| `spot-swap-base-2026-06-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 34.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 34.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 44.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 44.4d | -0.05% | TVL drift down |
| `passive-lp-kumbaya-2026-06-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 44.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 55.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 45.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-03-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 45.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 45.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 46.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-02-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 46.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 46.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 54.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 54.3d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 54.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 56.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 43.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 43.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 43.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 13.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 13.3d | 0.00% | flat |
| `spot-swap-base-2026-07-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 13.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 14.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 14.3d | 0.00% | flat |
| `spot-swap-base-2026-07-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 14.3d | 0.00% | flat |
| `spot-swap-base-2026-07-03-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 15.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-03-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 15.4d | 0.00% | flat |
| `spot-swap-base-2026-07-03-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 15.4d | 0.00% | flat |
| `spot-swap-base-2026-07-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 8.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 8.2d | 0.00% | stable/up |
| `spot-swap-base-2026-07-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 8.2d | 0.00% | flat |
| `spot-swap-base-2026-07-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 0.9d | 0.00% | flat |
| `spot-swap-base-2026-07-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 0.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 0.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 1.9d | 0.00% | flat |
| `spot-swap-base-2026-07-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 1.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 1.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 7.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 7.2d | 0.00% | stable/up |
| `spot-swap-base-2026-07-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 7.2d | 0.00% | flat |
| `spot-swap-base-2026-07-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 57.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 71d | 0.04% | stable/up |
| `spot-swap-base-2026-07-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 57.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 32.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 32.6d | 0.00% | flat |
| `spot-swap-base-2026-06-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 32.6d | 0.00% | flat |
| `spot-swap-base-2026-05-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 48.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-31-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 48.4d | 0.00% | stable/up |
| `spot-swap-base-2026-05-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 48.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 19.1d | 0.00% | stable/up |
| `spot-swap-base-2026-06-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 19.1d | 0.00% | flat |
| `spot-swap-base-2026-06-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 19.1d | 0.00% | flat |
| `spot-swap-base-2026-06-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 36.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 36.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 36.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 21.1d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 21.1d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 21.1d | 0.00% | flat |
| `spot-swap-base-2026-06-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 30.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 30.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 30.3d | 0.00% | flat |
| `spot-swap-base-2026-06-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 28.3d | 0.00% | flat |
| `spot-swap-base-2026-06-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 28.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 28.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 27.2d | 0.00% | flat |
| `spot-swap-base-2026-06-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 27.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 27.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 22.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 22.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 22.2d | 0.00% | flat |
| `spot-swap-base-2026-06-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 29.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 29.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 29.3d | 0.00% | flat |
| `spot-swap-base-2026-06-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 37.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 37.7d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 37.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 70d | -0.99% | TVL drift down |
| `spot-swap-base-2026-05-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 49.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 49.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 49.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 31.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 31.6d | 0.00% | flat |
| `spot-swap-base-2026-06-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 31.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 20.1d | 0.00% | stable/up |
| `spot-swap-base-2026-06-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 20.1d | 0.00% | flat |
| `spot-swap-base-2026-06-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 20.1d | 0.00% | flat |

- count: **166** (148 resolved at 7d, 7 loss-flagged)
- avg P&L per entry: **-2.38%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **92.8%** (154 wins)
- worst entry: -50.00% · best entry: 0.04%
- equal-weight portfolio: starting $1 per entry → **-2.38% return**

## Hypothetical: every ALLOW probe as an entry

Counterfactual portfolio — if we'd been more aggressive and entered every ALLOW signal at every probe cycle.

### All entries
- count: **12669** (11704 resolved at 7d, 2959 loss-flagged)
- avg P&L per entry: **-12.87%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **66.2%** (8381 wins)
- worst entry: -50.00% · best entry: 9.50%
- equal-weight portfolio: starting $1 per entry → **-12.87% return**

### Safe cohort only
- count: **12408** (11478 resolved at 7d, 2943 loss-flagged)
- avg P&L per entry: **-13.07%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **65.7%** (8152 wins)
- worst entry: -50.00% · best entry: 9.50%
- equal-weight portfolio: starting $1 per entry → **-13.07% return**

### Risky cohort only
- count: **261** (226 resolved at 7d, 16 loss-flagged)
- avg P&L per entry: **-3.76%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **87.7%** (229 wins)
- worst entry: -50.00% · best entry: 8.11%
- equal-weight portfolio: starting $1 per entry → **-3.76% return**

## How to read this

- **Real intents** is the honest answer: "if we'd actually deployed every strategy intent the system produced, what's the realized P&L?" Currently a tiny sample.
- **Hypothetical** is the exploratory answer: what if we'd entered every ALLOW signal? Bigger sample, but more aggressive than our actual strategy gates would allow.
- A passive LP's value moves roughly with pool TVL — that's the drift model. Catastrophic loss = LOSS patch flagged → -50% assumption.
- We don't simulate fees. Real LPs earn ~0.3-1% per week from trading fees in liquid pools, so realized P&L would be higher than shown. Conservative bias is intentional.

Raw data: [`metrics/simtrade-pnl.json`](simtrade-pnl.json). Source: [`scripts/compute-simtrade-pnl.ts`](../scripts/compute-simtrade-pnl.ts).
