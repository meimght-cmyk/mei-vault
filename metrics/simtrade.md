# Sim-trade P&L

_Updated: 2026-10-27T21:52:12.905Z_

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
| `spot-swap-base-2026-05-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 151.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 151.7d | 0.00% | stable/up |
| `spot-swap-base-2026-05-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 151.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 139.9d | -3.84% | TVL drift down |
| `passive-lp-kumbaya-2026-06-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 139.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 139.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 162.4d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 153.7d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 153.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 153.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 141.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 141.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 141.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 159.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 33.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-24-001` | kumbaya | `0x6bD9eeF2…` | WARN | 33.4d | 0.00% | stable/up |
| `spot-swap-base-2026-09-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 33.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-23-001` | kumbaya | `0x6bD9eeF2…` | WARN | 34.4d | 0.00% | stable/up |
| `spot-swap-base-2026-09-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 34.4d | 0.00% | stable/up |
| `spot-swap-base-2026-09-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 34.4d | 0.00% | stable/up |
| `spot-swap-base-2026-09-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 42.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 42.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-15-001` | kumbaya | `0x6bD9eeF2…` | WARN | 42.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 44.8d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-12-001` | kumbaya | `0x6bD9eeF2…` | WARN | 44.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 44.8d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-05-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 158.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 143.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 143.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 143.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 160.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 148.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-01-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 148.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 148.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 154.7d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 154.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 154.7d | 0.03% | stable/up |
| `spot-swap-base-2026-06-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 140.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 140.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 140.9d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 152.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 152.7d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 152.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 119d | 0.00% | flat |
| `spot-swap-base-2026-06-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 119d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 119d | 0.00% | stable/up |
| `spot-swap-base-2026-09-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 43.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-13-001` | kumbaya | `0x6bD9eeF2…` | WARN | 43.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 43.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-22-001` | kumbaya | `0x6bD9eeF2…` | WARN | 35.4d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 35.4d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 35.4d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 32.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-25-001` | kumbaya | `0x6bD9eeF2…` | WARN | 32.4d | 0.00% | stable/up |
| `spot-swap-base-2026-09-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 32.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 113.5d | 0.00% | flat |
| `spot-swap-base-2026-07-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 113.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 113.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-01-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 118d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-01-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 118d | 0.00% | flat |
| `spot-swap-base-2026-07-01-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 118d | 0.00% | flat |
| `spot-swap-base-2026-07-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 111.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 111.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 111.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 89.6d | 0.00% | stable/up |
| `spot-swap-base-2026-07-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 89.6d | 0.00% | flat |
| `spot-swap-base-2026-07-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 89.6d | 0.00% | flat |
| `spot-swap-base-2026-10-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 158.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 158.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 172.2d | 0.04% | stable/up |
| `spot-swap-base-2026-10-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 9.2d | 0.00% | stable/up |
| `spot-swap-base-2026-10-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 9.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-18-001` | kumbaya | `0x6bD9eeF2…` | WARN | 9.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 75.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-13-001` | kumbaya | `0x6bD9eeF2…` | WARN | 75.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 75.1d | 0.00% | stable/up |
| `spot-swap-base-2026-10-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 7.2d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-10-20-001` | kumbaya | `0x6bD9eeF2…` | WARN | 7.2d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 7.2d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-08-14-001` | kumbaya | `0x6bD9eeF2…` | WARN | 74.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 74.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 74.1d | 0.00% | stable/up |
| `spot-swap-base-2026-10-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 11.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-16-001` | kumbaya | `0x6bD9eeF2…` | WARN | 11.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 11.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 66.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 66.7d | -0.27% | TVL drift down |
| `passive-lp-kumbaya-2026-08-22-001` | kumbaya | `0x6bD9eeF2…` | WARN | 66.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-11-001` | kumbaya | `0x6bD9eeF2…` | WARN | 16.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 16.6d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 16.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 63.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-25-001` | kumbaya | `0x6bD9eeF2…` | WARN | 63.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 63.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-31-001` | kumbaya | `0x6bD9eeF2…` | WARN | 88.6d | 0.00% | stable/up |
| `spot-swap-base-2026-07-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 88.6d | 0.00% | flat |
| `spot-swap-base-2026-07-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 88.6d | 0.00% | flat |
| `spot-swap-base-2026-07-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 110.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 110.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 110.5d | 0.00% | flat |
| `spot-swap-base-2026-07-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 112.5d | 0.00% | flat |
| `spot-swap-base-2026-07-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 112.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 112.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 17.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 17.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 17.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 64.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-24-001` | kumbaya | `0x6bD9eeF2…` | WARN | 64.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 64.7d | 0.00% | stable/up |
| `spot-swap-base-2026-10-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 10.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-17-001` | kumbaya | `0x6bD9eeF2…` | WARN | 10.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 10.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 65.7d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-08-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 65.7d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-23-001` | kumbaya | `0x6bD9eeF2…` | WARN | 65.7d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 6.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-21-001` | kumbaya | `0x6bD9eeF2…` | WARN | 6.2d | 0.00% | flat |
| `spot-swap-base-2026-10-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 6.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-15-001` | kumbaya | `0x6bD9eeF2…` | WARN | 73.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 73.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 73.1d | 0.00% | stable/up |
| `spot-swap-base-2026-10-26-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 1.1d | 0.00% | flat |
| `spot-swap-base-2026-10-26-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 1.1d | 0.00% | flat |
| `passive-lp-kumbaya-2026-10-26-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 1.1d | 0.00% | flat |
| `spot-swap-base-2026-08-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 76.1d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-12-001` | kumbaya | `0x6bD9eeF2…` | WARN | 76.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 76.1d | 0.00% | stable/up |
| `spot-swap-base-2026-10-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 8.2d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 8.2d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-10-19-001` | kumbaya | `0x6bD9eeF2…` | WARN | 8.2d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 58.3d | 0.00% | stable/up |
| `spot-swap-base-2026-08-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 58.3d | 0.00% | stable/up |
| `spot-swap-base-2026-08-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 58.3d | 0.00% | stable/up |
| `spot-swap-base-2026-10-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 23d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 23d | 0.00% | stable/up |
| `spot-swap-base-2026-10-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 23d | 0.00% | stable/up |
| `spot-swap-base-2026-10-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 24d | 0.00% | stable/up |
| `spot-swap-base-2026-10-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 24d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 24d | 0.00% | stable/up |
| `spot-swap-base-2026-08-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 80.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-08-001` | kumbaya | `0x6bD9eeF2…` | WARN | 80.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 80.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 87.6d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-01-001` | kumbaya | `0x6bD9eeF2…` | WARN | 87.6d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 87.6d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 82.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 82.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 82.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 93.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 93.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 93.9d | 0.00% | flat |
| `spot-swap-base-2026-07-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 97d | 0.00% | flat |
| `spot-swap-base-2026-07-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 97d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 97d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-07-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 105.1d | 0.00% | stable/up |
| `spot-swap-base-2026-07-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 105.1d | 0.00% | flat |
| `spot-swap-base-2026-07-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 105.1d | 0.00% | flat |
| `spot-swap-base-2026-07-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 106.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-13-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 106.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 106.4d | 0.00% | flat |
| `spot-swap-base-2026-08-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 81.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 81.2d | 0.08% | stable/up |
| `passive-lp-kumbaya-2026-08-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 81.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 79.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-09-001` | kumbaya | `0x6bD9eeF2…` | WARN | 79.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 79.2d | 0.00% | stable/up |
| `spot-swap-base-2026-10-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 25d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-10-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 25d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-10-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 25d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-31-001` | kumbaya | `0x6bD9eeF2…` | WARN | 57.3d | 0.00% | stable/up |
| `spot-swap-base-2026-08-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 57.3d | 0.00% | stable/up |
| `spot-swap-base-2026-08-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 57.3d | 0.00% | stable/up |
| `spot-swap-base-2026-10-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 21.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 21.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 21.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 107.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 107.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 107.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 104.1d | 0.00% | stable/up |
| `spot-swap-base-2026-07-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 104.1d | 0.00% | flat |
| `spot-swap-base-2026-07-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 104.1d | 0.00% | flat |
| `spot-swap-base-2026-07-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 96d | 0.00% | flat |
| `spot-swap-base-2026-07-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 96d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 96d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 94.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-24-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 94.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 94.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-09-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 50.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 50.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 50.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 47.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-09-001` | kumbaya | `0x6bD9eeF2…` | WARN | 47.9d | 0.00% | stable/up |
| `spot-swap-base-2026-09-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 47.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 136.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 136.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 136.8d | 0.00% | flat |
| `spot-swap-base-2026-06-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 134.8d | 0.00% | flat |
| `spot-swap-base-2026-06-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 134.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 134.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 126.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 126.4d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 126.4d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 125.4d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-24-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 125.4d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 125.4d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-09-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 27d | 0.00% | stable/up |
| `spot-swap-base-2026-09-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 27d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 27d | 0.00% | stable/up |
| `spot-swap-base-2026-09-08-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 49.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-09-08-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 49.2d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-09-08-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 49.2d | 0.00% | flat |
| `spot-swap-base-2026-09-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 56.3d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-01-001` | kumbaya | `0x6bD9eeF2…` | WARN | 56.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 56.3d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 51.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 51.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 51.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 124.4d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 124.4d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 124.4d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 127.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 127.4d | 0.00% | flat |
| `spot-swap-base-2026-06-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 127.4d | 0.00% | flat |
| `spot-swap-base-2026-06-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 135.8d | 0.00% | flat |
| `spot-swap-base-2026-06-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 135.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 135.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 37.5d | 0.00% | stable/up |
| `spot-swap-base-2026-09-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 37.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-20-001` | kumbaya | `0x6bD9eeF2…` | WARN | 37.5d | 0.00% | stable/up |
| `spot-swap-base-2026-09-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 39.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-18-001` | kumbaya | `0x6bD9eeF2…` | WARN | 39.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 39.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 30.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-27-001` | kumbaya | `0x6bD9eeF2…` | WARN | 30.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 30.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 45.9d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-11-001` | kumbaya | `0x6bD9eeF2…` | WARN | 45.9d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 45.9d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-29-001` | kumbaya | `0x6bD9eeF2…` | WARN | 28.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 28.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 28.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-16-001` | kumbaya | `0x6bD9eeF2…` | WARN | 41.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 41.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 41.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 145.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 145.6d | -0.05% | TVL drift down |
| `passive-lp-kumbaya-2026-06-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 145.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 156.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 146.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-03-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 146.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 146.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-28-001` | kumbaya | `0x6bD9eeF2…` | WARN | 29.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 29.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 29.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-17-001` | kumbaya | `0x6bD9eeF2…` | WARN | 40.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 40.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 40.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 46.9d | 0.18% | stable/up |
| `passive-lp-kumbaya-2026-09-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 46.9d | 0.00% | stable/up |
| `spot-swap-base-2026-09-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 46.9d | 0.00% | stable/up |
| `spot-swap-base-2026-09-19-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 38.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-09-19-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 38.7d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-09-19-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 38.7d | 0.00% | flat |
| `spot-swap-base-2026-09-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 31.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-26-001` | kumbaya | `0x6bD9eeF2…` | WARN | 31.4d | 0.00% | stable/up |
| `spot-swap-base-2026-09-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 31.4d | -0.02% | TVL drift down |
| `spot-swap-base-2026-09-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 36.4d | 0.00% | stable/up |
| `spot-swap-base-2026-09-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 36.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-21-001` | kumbaya | `0x6bD9eeF2…` | WARN | 36.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 147.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-02-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 147.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 147.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 155.8d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 155.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 155.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 157.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 144.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 144.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 144.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 60.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 60.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-28-001` | kumbaya | `0x6bD9eeF2…` | WARN | 60.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 4.1d | 0.00% | flat |
| `passive-lp-kumbaya-2026-10-23-001` | kumbaya | `0x6bD9eeF2…` | WARN | 4.1d | 0.00% | flat |
| `spot-swap-base-2026-10-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 4.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 71d | 0.00% | stable/up |
| `spot-swap-base-2026-08-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 71d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-17-001` | kumbaya | `0x6bD9eeF2…` | WARN | 71d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-24-001` | kumbaya | `0x6bD9eeF2…` | WARN | 3.1d | 0.00% | flat |
| `spot-swap-base-2026-10-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 3.1d | 0.00% | flat |
| `spot-swap-base-2026-10-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 3.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 78.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 78.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 78.2d | 0.00% | stable/up |
| `spot-swap-base-2026-10-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 15.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 15.6d | -0.06% | TVL drift down |
| `passive-lp-kumbaya-2026-10-12-001` | kumbaya | `0x6bD9eeF2…` | WARN | 15.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 68.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-19-001` | kumbaya | `0x6bD9eeF2…` | WARN | 68.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 68.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 62.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-26-001` | kumbaya | `0x6bD9eeF2…` | WARN | 62.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 62.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 12.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-15-001` | kumbaya | `0x6bD9eeF2…` | WARN | 12.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 12.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 114.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 114.5d | 0.00% | flat |
| `spot-swap-base-2026-07-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 114.5d | 0.00% | flat |
| `spot-swap-base-2026-10-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 13.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-14-001` | kumbaya | `0x6bD9eeF2…` | WARN | 13.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 13.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-20-001` | kumbaya | `0x6bD9eeF2…` | WARN | 67.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 67.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 67.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 69.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-18-001` | kumbaya | `0x6bD9eeF2…` | WARN | 69.8d | 0.00% | stable/up |
| `spot-swap-base-2026-08-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 69.8d | 0.00% | stable/up |
| `spot-swap-base-2026-10-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 14.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 14.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-13-001` | kumbaya | `0x6bD9eeF2…` | WARN | 14.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 61.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-27-001` | kumbaya | `0x6bD9eeF2…` | WARN | 61.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 61.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-25-001` | kumbaya | `0x6bD9eeF2…` | WARN | 2.1d | 0.00% | flat |
| `spot-swap-base-2026-10-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 2.1d | 0.00% | flat |
| `spot-swap-base-2026-10-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 2.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 77.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-11-001` | kumbaya | `0x6bD9eeF2…` | WARN | 77.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 77.1d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 5.1d | 0.00% | flat |
| `passive-lp-kumbaya-2026-10-22-001` | kumbaya | `0x6bD9eeF2…` | WARN | 5.1d | 0.00% | flat |
| `spot-swap-base-2026-10-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 5.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 59.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 59.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-29-001` | kumbaya | `0x6bD9eeF2…` | WARN | 59.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 72.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 72.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-16-001` | kumbaya | `0x6bD9eeF2…` | WARN | 72.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 115.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 115.5d | 0.00% | flat |
| `spot-swap-base-2026-07-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 115.5d | 0.00% | flat |
| `spot-swap-base-2026-07-03-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 116.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-03-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 116.6d | 0.00% | flat |
| `spot-swap-base-2026-07-03-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 116.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 98d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 98d | 0.00% | flat |
| `spot-swap-base-2026-07-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 98d | 0.00% | flat |
| `spot-swap-base-2026-07-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 100d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 100d | 0.00% | stable/up |
| `spot-swap-base-2026-07-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 100d | 0.00% | flat |
| `spot-swap-base-2026-07-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 109.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 109.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 109.4d | 0.00% | flat |
| `spot-swap-base-2026-07-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 102.1d | 0.00% | flat |
| `spot-swap-base-2026-07-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 102.1d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 102.1d | 0.00% | stable/up |
| `spot-swap-base-2026-07-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 91.6d | 0.00% | flat |
| `spot-swap-base-2026-07-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 91.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 91.6d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-10-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 19.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 19.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 19.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 83.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 83.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 83.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-09-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 18.9d | 0.00% | flat |
| `spot-swap-base-2026-10-09-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 18.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-10-09-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 18.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 86.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 86.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 86.5d | 0.00% | flat |
| `spot-swap-base-2026-07-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 103.1d | 0.00% | flat |
| `spot-swap-base-2026-07-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 103.1d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 103.1d | 0.00% | stable/up |
| `spot-swap-base-2026-07-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 90.6d | 0.00% | flat |
| `spot-swap-base-2026-07-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 90.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-29-001` | kumbaya | `0x6bD9eeF2…` | WARN | 90.6d | 0.00% | stable/up |
| `spot-swap-base-2026-07-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 108.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 108.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 108.4d | 0.00% | flat |
| `spot-swap-base-2026-07-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 92.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 92.7d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 92.7d | 0.00% | flat |
| `spot-swap-base-2026-07-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 101d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 101d | 0.00% | stable/up |
| `spot-swap-base-2026-07-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 101d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 99d | 0.00% | stable/up |
| `spot-swap-base-2026-07-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 99d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-07-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 99d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-08-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 85.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 85.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 85.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 84.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 84.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 84.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 20.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 20.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 20.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-01-001` | kumbaya | `0x6bD9eeF2…` | WARN | 26d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 26d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 26d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-06-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 133.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 133.8d | 0.00% | flat |
| `spot-swap-base-2026-06-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 133.8d | 0.00% | flat |
| `spot-swap-base-2026-05-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 149.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-31-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 149.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 149.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 120.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 120.3d | 0.00% | flat |
| `spot-swap-base-2026-06-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 120.3d | 0.00% | flat |
| `spot-swap-base-2026-06-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 137.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 137.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 137.9d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 122.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 122.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 122.3d | 0.00% | flat |
| `spot-swap-base-2026-06-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 131.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 131.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 131.5d | 0.00% | flat |
| `spot-swap-base-2026-06-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 129.5d | 0.00% | flat |
| `spot-swap-base-2026-06-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 129.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 129.5d | 0.00% | stable/up |
| `spot-swap-base-2026-09-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 54.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 54.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 54.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 53.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 53.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 53.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 128.5d | 0.00% | flat |
| `spot-swap-base-2026-06-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 128.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 128.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 123.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 123.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 123.4d | 0.00% | flat |
| `spot-swap-base-2026-06-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 130.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 130.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 130.5d | 0.00% | flat |
| `spot-swap-base-2026-06-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 138.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 138.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 138.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 171.2d | -0.99% | TVL drift down |
| `spot-swap-base-2026-05-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 150.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 150.7d | 0.00% | stable/up |
| `spot-swap-base-2026-05-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 150.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 132.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 132.8d | 0.00% | flat |
| `spot-swap-base-2026-06-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 132.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 121.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 121.3d | 0.00% | flat |
| `spot-swap-base-2026-06-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 121.3d | 0.00% | flat |
| `spot-swap-base-2026-09-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 52.2d | 85.71% | stable/up |
| `spot-swap-base-2026-09-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 52.2d | -4.98% | TVL drift down |
| `passive-lp-kumbaya-2026-09-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 52.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 55.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 55.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 55.3d | -20.00% | unexitable (errored) |

- count: **457** (439 resolved at 7d, 23 loss-flagged)
- avg P&L per entry: **-3.71%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **86.7%** (396 wins)
- worst entry: -50.00% · best entry: 85.71%
- equal-weight portfolio: starting $1 per entry → **-3.71% return**

## Hypothetical: every ALLOW probe as an entry

Counterfactual portfolio — if we'd been more aggressive and entered every ALLOW signal at every probe cycle.

### All entries
- count: **29859** (27486 resolved at 7d, 7518 loss-flagged)
- avg P&L per entry: **-13.92%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **65.5%** (19553 wins)
- worst entry: -85.71% · best entry: 85.71%
- equal-weight portfolio: starting $1 per entry → **-13.92% return**

### Safe cohort only
- count: **29282** (26936 resolved at 7d, 7425 loss-flagged)
- avg P&L per entry: **-14.02%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **65.2%** (19102 wins)
- worst entry: -85.71% · best entry: 85.71%
- equal-weight portfolio: starting $1 per entry → **-14.02% return**

### Risky cohort only
- count: **577** (550 resolved at 7d, 93 loss-flagged)
- avg P&L per entry: **-8.96%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **78.2%** (451 wins)
- worst entry: -50.00% · best entry: 8.11%
- equal-weight portfolio: starting $1 per entry → **-8.96% return**

## How to read this

- **Real intents** is the honest answer: "if we'd actually deployed every strategy intent the system produced, what's the realized P&L?" Currently a tiny sample.
- **Hypothetical** is the exploratory answer: what if we'd entered every ALLOW signal? Bigger sample, but more aggressive than our actual strategy gates would allow.
- A passive LP's value moves roughly with pool TVL — that's the drift model. Catastrophic loss = LOSS patch flagged → -50% assumption.
- We don't simulate fees. Real LPs earn ~0.3-1% per week from trading fees in liquid pools, so realized P&L would be higher than shown. Conservative bias is intentional.

Raw data: [`metrics/simtrade-pnl.json`](simtrade-pnl.json). Source: [`scripts/compute-simtrade-pnl.ts`](../scripts/compute-simtrade-pnl.ts).
