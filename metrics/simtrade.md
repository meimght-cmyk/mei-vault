# Sim-trade P&L

_Updated: 2026-11-11T19:09:04.411Z_

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
| `spot-swap-base-2026-05-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 166.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 166.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 166.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 154.8d | -3.84% | TVL drift down |
| `passive-lp-kumbaya-2026-06-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 154.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 154.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 177.3d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 168.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 168.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 168.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 156.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 156.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 156.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 174.7d | 0.00% | stable/up |
| `spot-swap-base-2026-11-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 0.8d | 0.00% | stable/up |
| `spot-swap-base-2026-11-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 0.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 0.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 48.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-24-001` | kumbaya | `0x6bD9eeF2…` | WARN | 48.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 48.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-23-001` | kumbaya | `0x6bD9eeF2…` | WARN | 49.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 49.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 49.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 57.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 57.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-15-001` | kumbaya | `0x6bD9eeF2…` | WARN | 57.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 59.7d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-12-001` | kumbaya | `0x6bD9eeF2…` | WARN | 59.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 59.7d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-05-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 173.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 158.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 158.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 158.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 175.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 163.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-01-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 163.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 163.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 169.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 169.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 169.6d | 0.03% | stable/up |
| `spot-swap-base-2026-06-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 155.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 155.8d | 0.00% | stable/up |
| `spot-swap-base-2026-06-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 155.8d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 167.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 167.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 167.6d | 0.00% | stable/up |
| `spot-swap-base-2026-06-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 133.9d | 0.00% | flat |
| `spot-swap-base-2026-06-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 133.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 133.9d | 0.00% | stable/up |
| `spot-swap-base-2026-09-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 58.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-13-001` | kumbaya | `0x6bD9eeF2…` | WARN | 58.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 58.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-22-001` | kumbaya | `0x6bD9eeF2…` | WARN | 50.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 50.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 50.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-11-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 173.4d | 0.00% | stable/up |
| `spot-swap-base-2026-11-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 173.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 187.1d | 0.04% | stable/up |
| `spot-swap-base-2026-09-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 47.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-25-001` | kumbaya | `0x6bD9eeF2…` | WARN | 47.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 47.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 128.4d | 0.00% | flat |
| `spot-swap-base-2026-07-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 128.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-06-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 128.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-01-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 132.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-01-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 132.9d | 0.00% | flat |
| `spot-swap-base-2026-07-01-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 132.9d | 0.00% | flat |
| `spot-swap-base-2026-07-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 126.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 126.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 126.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 104.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 104.5d | 0.00% | flat |
| `spot-swap-base-2026-07-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 104.5d | 0.00% | flat |
| `spot-swap-base-2026-10-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 14.7d | 0.00% | stable/up |
| `spot-swap-base-2026-10-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 14.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-27-001` | kumbaya | `0x6bD9eeF2…` | WARN | 14.7d | 0.00% | stable/up |
| `spot-swap-base-2026-10-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 24.1d | 0.00% | stable/up |
| `spot-swap-base-2026-10-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 24.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-18-001` | kumbaya | `0x6bD9eeF2…` | WARN | 24.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 90d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-13-001` | kumbaya | `0x6bD9eeF2…` | WARN | 90d | 0.00% | stable/up |
| `spot-swap-base-2026-08-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 90d | 0.00% | stable/up |
| `spot-swap-base-2026-10-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 22.1d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-10-20-001` | kumbaya | `0x6bD9eeF2…` | WARN | 22.1d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 22.1d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-08-14-001` | kumbaya | `0x6bD9eeF2…` | WARN | 89d | 0.00% | stable/up |
| `spot-swap-base-2026-08-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 89d | 0.00% | stable/up |
| `spot-swap-base-2026-08-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 89d | 0.00% | stable/up |
| `spot-swap-base-2026-10-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 26.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-16-001` | kumbaya | `0x6bD9eeF2…` | WARN | 26.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 26.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 81.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 81.6d | -0.27% | TVL drift down |
| `passive-lp-kumbaya-2026-08-22-001` | kumbaya | `0x6bD9eeF2…` | WARN | 81.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-11-001` | kumbaya | `0x6bD9eeF2…` | WARN | 31.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 31.5d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 31.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 78.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-25-001` | kumbaya | `0x6bD9eeF2…` | WARN | 78.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 78.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-31-001` | kumbaya | `0x6bD9eeF2…` | WARN | 103.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 103.5d | 0.00% | flat |
| `spot-swap-base-2026-07-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 103.5d | 0.00% | flat |
| `spot-swap-base-2026-07-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 125.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-09-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 125.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 125.3d | 0.00% | flat |
| `spot-swap-base-2026-07-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 127.4d | 0.00% | flat |
| `spot-swap-base-2026-07-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 127.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-07-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 127.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 32.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 32.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 32.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 79.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-24-001` | kumbaya | `0x6bD9eeF2…` | WARN | 79.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 79.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 25.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-17-001` | kumbaya | `0x6bD9eeF2…` | WARN | 25.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 25.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 13.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-28-001` | kumbaya | `0x6bD9eeF2…` | WARN | 13.7d | 0.00% | stable/up |
| `spot-swap-base-2026-10-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 13.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 80.6d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-08-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 80.6d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-23-001` | kumbaya | `0x6bD9eeF2…` | WARN | 80.6d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 21d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-21-001` | kumbaya | `0x6bD9eeF2…` | WARN | 21d | 0.00% | stable/up |
| `spot-swap-base-2026-10-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 21d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-15-001` | kumbaya | `0x6bD9eeF2…` | WARN | 88d | 0.00% | stable/up |
| `spot-swap-base-2026-08-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 88d | 0.00% | stable/up |
| `spot-swap-base-2026-08-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 88d | 0.00% | stable/up |
| `spot-swap-base-2026-10-26-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 15.9d | 0.00% | flat |
| `spot-swap-base-2026-10-26-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 15.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-10-26-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 15.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 91d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-12-001` | kumbaya | `0x6bD9eeF2…` | WARN | 91d | 0.00% | stable/up |
| `spot-swap-base-2026-08-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 91d | 0.00% | stable/up |
| `spot-swap-base-2026-10-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 23.1d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 23.1d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-10-19-001` | kumbaya | `0x6bD9eeF2…` | WARN | 23.1d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 73.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 73.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 73.2d | 0.00% | stable/up |
| `spot-swap-base-2026-10-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 37.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 37.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 37.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 38.9d | 0.00% | stable/up |
| `spot-swap-base-2026-10-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 38.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 38.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 95.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-08-001` | kumbaya | `0x6bD9eeF2…` | WARN | 95.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 95.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 102.5d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-01-001` | kumbaya | `0x6bD9eeF2…` | WARN | 102.5d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 102.5d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 97.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 97.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 97.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 108.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 108.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 108.8d | 0.00% | flat |
| `spot-swap-base-2026-07-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 111.9d | 0.00% | flat |
| `spot-swap-base-2026-07-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 111.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 111.9d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-07-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 120d | 0.00% | stable/up |
| `spot-swap-base-2026-07-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 120d | 0.00% | flat |
| `spot-swap-base-2026-07-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 120d | 0.00% | flat |
| `spot-swap-base-2026-07-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 121.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-13-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 121.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 121.3d | 0.00% | flat |
| `spot-swap-base-2026-08-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 96.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 96.1d | 0.08% | stable/up |
| `passive-lp-kumbaya-2026-08-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 96.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 94.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-09-001` | kumbaya | `0x6bD9eeF2…` | WARN | 94.1d | 0.00% | stable/up |
| `spot-swap-base-2026-08-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 94.1d | 0.00% | stable/up |
| `spot-swap-base-2026-10-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 39.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-10-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 39.9d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-10-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 39.9d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-08-31-001` | kumbaya | `0x6bD9eeF2…` | WARN | 72.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 72.2d | 0.00% | stable/up |
| `spot-swap-base-2026-08-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 72.2d | 0.00% | stable/up |
| `spot-swap-base-2026-10-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 36.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 36.8d | 0.00% | stable/up |
| `spot-swap-base-2026-10-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 36.8d | 0.00% | stable/up |
| `spot-swap-base-2026-07-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 122.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 122.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 122.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 119d | 0.00% | stable/up |
| `spot-swap-base-2026-07-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 119d | 0.00% | flat |
| `spot-swap-base-2026-07-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 119d | 0.00% | flat |
| `spot-swap-base-2026-07-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 110.8d | 0.00% | flat |
| `spot-swap-base-2026-07-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 110.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 110.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 109.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-24-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 109.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 109.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-09-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 65.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 65.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 65.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 62.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-09-001` | kumbaya | `0x6bD9eeF2…` | WARN | 62.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 62.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 9.2d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-11-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 9.3d | 0.00% | stable/up |
| `spot-swap-base-2026-11-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 9.3d | 0.00% | stable/up |
| `spot-swap-base-2026-11-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 6.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 6.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 6.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 151.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-12-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 151.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 151.7d | 0.00% | flat |
| `spot-swap-base-2026-06-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 149.7d | 0.00% | flat |
| `spot-swap-base-2026-06-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 149.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-15-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 149.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 141.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 141.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 141.3d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-06-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 140.3d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-24-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 140.3d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 140.3d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-09-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 41.9d | 0.00% | stable/up |
| `spot-swap-base-2026-09-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 41.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 41.9d | 0.00% | stable/up |
| `spot-swap-base-2026-11-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 7.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 7.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 7.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 8.2d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-11-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 8.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 8.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-08-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 64d | 0.00% | flat |
| `passive-lp-kumbaya-2026-09-08-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 64d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-09-08-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 64d | 0.00% | flat |
| `spot-swap-base-2026-09-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 71.2d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-01-001` | kumbaya | `0x6bD9eeF2…` | WARN | 71.2d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 71.2d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 66.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 66.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 66.1d | 0.00% | stable/up |
| `spot-swap-base-2026-06-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 139.3d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 139.3d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 139.3d | -50.00% | LOSS (patch) |
| `passive-lp-kumbaya-2026-06-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 142.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 142.3d | 0.00% | flat |
| `spot-swap-base-2026-06-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 142.3d | 0.00% | flat |
| `spot-swap-base-2026-06-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 150.7d | 0.00% | flat |
| `spot-swap-base-2026-06-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 150.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-14-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 150.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 52.4d | 0.00% | stable/up |
| `spot-swap-base-2026-09-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 52.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-20-001` | kumbaya | `0x6bD9eeF2…` | WARN | 52.4d | 0.00% | stable/up |
| `spot-swap-base-2026-09-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 54.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-18-001` | kumbaya | `0x6bD9eeF2…` | WARN | 54.6d | 0.00% | stable/up |
| `spot-swap-base-2026-09-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 54.6d | 0.00% | stable/up |
| `spot-swap-base-2026-09-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 45.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-27-001` | kumbaya | `0x6bD9eeF2…` | WARN | 45.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 45.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 60.7d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-11-001` | kumbaya | `0x6bD9eeF2…` | WARN | 60.7d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-09-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 60.7d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-09-29-001` | kumbaya | `0x6bD9eeF2…` | WARN | 42.9d | 0.00% | stable/up |
| `spot-swap-base-2026-09-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 42.9d | 0.00% | stable/up |
| `spot-swap-base-2026-09-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 42.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-16-001` | kumbaya | `0x6bD9eeF2…` | WARN | 56.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 56.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 56.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 160.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 160.5d | -0.05% | TVL drift down |
| `passive-lp-kumbaya-2026-06-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 160.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-23-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 171.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 161.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-03-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 161.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 161.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-28-001` | kumbaya | `0x6bD9eeF2…` | WARN | 44.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 44.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 44.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-17-001` | kumbaya | `0x6bD9eeF2…` | WARN | 55.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 55.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 55.7d | 0.00% | stable/up |
| `spot-swap-base-2026-09-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 61.8d | 0.18% | stable/up |
| `passive-lp-kumbaya-2026-09-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 61.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 61.8d | 0.00% | stable/up |
| `spot-swap-base-2026-09-19-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 53.6d | 0.00% | flat |
| `passive-lp-kumbaya-2026-09-19-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 53.6d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-09-19-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 53.6d | 0.00% | flat |
| `spot-swap-base-2026-09-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 46.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-26-001` | kumbaya | `0x6bD9eeF2…` | WARN | 46.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 46.2d | -0.02% | TVL drift down |
| `spot-swap-base-2026-09-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 51.3d | 0.00% | stable/up |
| `spot-swap-base-2026-09-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 51.3d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-21-001` | kumbaya | `0x6bD9eeF2…` | WARN | 51.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 162.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-02-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 162.5d | 0.00% | stable/up |
| `spot-swap-base-2026-06-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 162.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-25-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 170.6d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 170.4d | 0.00% | stable/up |
| `spot-swap-base-2026-05-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 170.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-22-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 172.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 159.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 159.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 159.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 75.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 75.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-28-001` | kumbaya | `0x6bD9eeF2…` | WARN | 75.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-23-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 19d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-23-001` | kumbaya | `0x6bD9eeF2…` | WARN | 19d | 0.00% | stable/up |
| `spot-swap-base-2026-10-23-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 19d | 0.00% | stable/up |
| `spot-swap-base-2026-08-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 85.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 85.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-17-001` | kumbaya | `0x6bD9eeF2…` | WARN | 85.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-24-001` | kumbaya | `0x6bD9eeF2…` | WARN | 18d | 0.00% | stable/up |
| `spot-swap-base-2026-10-24-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 18d | 0.00% | stable/up |
| `spot-swap-base-2026-10-24-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 18d | 0.00% | stable/up |
| `spot-swap-base-2026-08-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 93d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-10-001` | kumbaya | `0x6bD9eeF2…` | WARN | 93d | 0.00% | stable/up |
| `spot-swap-base-2026-08-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 93d | 0.00% | stable/up |
| `spot-swap-base-2026-10-12-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 30.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-12-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 30.5d | -0.06% | TVL drift down |
| `passive-lp-kumbaya-2026-10-12-001` | kumbaya | `0x6bD9eeF2…` | WARN | 30.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 83.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-19-001` | kumbaya | `0x6bD9eeF2…` | WARN | 83.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 83.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 77.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-26-001` | kumbaya | `0x6bD9eeF2…` | WARN | 77.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 77.5d | 0.00% | stable/up |
| `spot-swap-base-2026-10-15-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 27.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-15-001` | kumbaya | `0x6bD9eeF2…` | WARN | 27.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-15-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 27.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-05-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 129.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 129.4d | 0.00% | flat |
| `spot-swap-base-2026-07-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 129.4d | 0.00% | flat |
| `spot-swap-base-2026-10-14-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 28.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-14-001` | kumbaya | `0x6bD9eeF2…` | WARN | 28.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-14-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 28.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-20-001` | kumbaya | `0x6bD9eeF2…` | WARN | 82.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 82.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 82.6d | 0.00% | stable/up |
| `spot-swap-base-2026-08-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 84.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-18-001` | kumbaya | `0x6bD9eeF2…` | WARN | 84.7d | 0.00% | stable/up |
| `spot-swap-base-2026-08-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 84.7d | 0.00% | stable/up |
| `spot-swap-base-2026-10-13-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 29.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-13-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 29.4d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-13-001` | kumbaya | `0x6bD9eeF2…` | WARN | 29.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 76.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-27-001` | kumbaya | `0x6bD9eeF2…` | WARN | 76.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 76.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-25-001` | kumbaya | `0x6bD9eeF2…` | WARN | 17d | 0.00% | stable/up |
| `spot-swap-base-2026-10-25-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 17d | 0.00% | stable/up |
| `spot-swap-base-2026-10-25-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 17d | 0.00% | stable/up |
| `spot-swap-base-2026-08-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 92d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-11-001` | kumbaya | `0x6bD9eeF2…` | WARN | 92d | 0.00% | stable/up |
| `spot-swap-base-2026-08-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 92d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-22-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 20d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-22-001` | kumbaya | `0x6bD9eeF2…` | WARN | 20d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-22-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 20d | 0.00% | stable/up |
| `spot-swap-base-2026-08-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 74.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 74.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-29-001` | kumbaya | `0x6bD9eeF2…` | WARN | 74.5d | 0.00% | stable/up |
| `spot-swap-base-2026-08-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 86.9d | 0.00% | stable/up |
| `spot-swap-base-2026-08-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 86.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-16-001` | kumbaya | `0x6bD9eeF2…` | WARN | 86.9d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-07-04-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 130.4d | 0.00% | stable/up |
| `spot-swap-base-2026-07-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 130.4d | 0.00% | flat |
| `spot-swap-base-2026-07-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 130.4d | 0.00% | flat |
| `spot-swap-base-2026-07-03-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 131.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-03-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 131.5d | 0.00% | flat |
| `spot-swap-base-2026-07-03-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 131.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 112.9d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 112.9d | 0.00% | flat |
| `spot-swap-base-2026-07-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 112.9d | 0.00% | flat |
| `spot-swap-base-2026-07-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 114.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 114.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 114.9d | 0.00% | flat |
| `spot-swap-base-2026-07-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 124.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 124.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 124.3d | 0.00% | flat |
| `spot-swap-base-2026-07-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 116.9d | 0.00% | flat |
| `spot-swap-base-2026-07-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 116.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 116.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 106.5d | 0.00% | flat |
| `spot-swap-base-2026-07-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 106.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 106.5d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-10-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 34.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 34.8d | 0.00% | stable/up |
| `spot-swap-base-2026-10-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 34.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-08-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 98.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 98.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 98.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 11.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-31-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 11.6d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-10-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 11.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-09-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 33.8d | 0.00% | flat |
| `spot-swap-base-2026-10-09-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 33.8d | 0.00% | flat |
| `passive-lp-kumbaya-2026-10-09-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 33.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-08-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 101.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 101.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 101.4d | 0.00% | flat |
| `spot-swap-base-2026-07-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 118d | 0.00% | flat |
| `spot-swap-base-2026-07-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 118d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 118d | 0.00% | stable/up |
| `spot-swap-base-2026-07-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 105.5d | 0.00% | flat |
| `spot-swap-base-2026-07-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 105.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-29-001` | kumbaya | `0x6bD9eeF2…` | WARN | 105.5d | 0.00% | stable/up |
| `spot-swap-base-2026-07-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 123.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 123.3d | 0.00% | stable/up |
| `spot-swap-base-2026-07-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 123.3d | 0.00% | flat |
| `spot-swap-base-2026-07-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 107.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 107.5d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-07-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 107.5d | 0.00% | flat |
| `spot-swap-base-2026-07-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 115.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 115.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 115.9d | 0.00% | flat |
| `passive-lp-kumbaya-2026-07-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 113.9d | 0.00% | stable/up |
| `spot-swap-base-2026-07-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 113.9d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-07-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 113.9d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-08-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 100.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 100.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 100.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-08-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 99.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 99.4d | 0.00% | stable/up |
| `spot-swap-base-2026-08-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 99.4d | 0.00% | stable/up |
| `spot-swap-base-2026-10-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 12.6d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-30-001` | kumbaya | `0x6bD9eeF2…` | WARN | 12.6d | 0.00% | stable/up |
| `spot-swap-base-2026-10-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 12.6d | -0.47% | TVL drift down |
| `spot-swap-base-2026-10-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 35.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 35.8d | 0.00% | stable/up |
| `spot-swap-base-2026-10-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 35.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-10-01-001` | kumbaya | `0x6bD9eeF2…` | WARN | 40.9d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-01-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 40.9d | -20.00% | unexitable (errored) |
| `spot-swap-base-2026-10-01-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 40.9d | -20.00% | unexitable (errored) |
| `passive-lp-kumbaya-2026-06-16-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 148.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-16-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 148.7d | 0.00% | flat |
| `spot-swap-base-2026-06-16-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 148.7d | 0.00% | flat |
| `spot-swap-base-2026-05-31-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 164.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-31-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 164.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-31-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 164.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-29-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 135.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-29-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 135.2d | 0.00% | flat |
| `spot-swap-base-2026-06-29-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 135.2d | 0.00% | flat |
| `spot-swap-base-2026-06-11-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 152.7d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-11-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 152.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-11-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 152.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 137.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-27-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 137.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-27-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 137.2d | 0.00% | flat |
| `spot-swap-base-2026-06-18-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 146.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-18-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 146.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-18-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 146.4d | 0.00% | flat |
| `spot-swap-base-2026-06-20-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 144.4d | 0.00% | flat |
| `spot-swap-base-2026-06-20-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 144.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-20-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 144.4d | 0.00% | stable/up |
| `spot-swap-base-2026-09-03-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 69.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-03-001` | kumbaya | `0x6bD9eeF2…` | WARN | 69.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-03-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 69.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-08-001` | kumbaya | `0x6bD9eeF2…` | WARN | 3.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-08-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 3.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-08-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 3.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-04-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 68.1d | 0.00% | stable/up |
| `spot-swap-base-2026-09-04-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 68.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-04-001` | kumbaya | `0x6bD9eeF2…` | WARN | 68.1d | 0.00% | stable/up |
| `spot-swap-base-2026-11-06-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 5.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-06-001` | kumbaya | `0x6bD9eeF2…` | WARN | 5.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-06-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 5.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-01-001` | uniswap-v3-base | `0x94bfc057…` | ERROR | 10.5d | 0.00% | flat |
| `spot-swap-base-2026-11-01-002` | uniswap-v3-base | `0x46880b40…` | ERROR | 10.5d | 0.00% | flat |
| `passive-lp-kumbaya-2026-11-01-001` | kumbaya | `0x6bD9eeF2…` | ERROR | 10.5d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-21-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 143.3d | 0.00% | flat |
| `spot-swap-base-2026-06-21-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 143.3d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-21-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 143.3d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 138.2d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-26-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 138.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-26-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 138.2d | 0.00% | flat |
| `spot-swap-base-2026-06-19-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 145.4d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-19-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 145.4d | 0.00% | stable/up |
| `spot-swap-base-2026-06-19-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 145.4d | 0.00% | flat |
| `spot-swap-base-2026-06-10-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 153.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-10-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 153.8d | -50.00% | LOSS (patch) |
| `spot-swap-base-2026-06-10-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 153.8d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-08-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 186.1d | -0.99% | TVL drift down |
| `spot-swap-base-2026-05-30-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 165.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-05-30-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 165.5d | 0.00% | stable/up |
| `spot-swap-base-2026-05-30-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 165.5d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-06-17-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 147.7d | 0.00% | stable/up |
| `spot-swap-base-2026-06-17-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 147.7d | 0.00% | flat |
| `spot-swap-base-2026-06-17-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 147.7d | 0.00% | flat |
| `passive-lp-kumbaya-2026-06-28-001` | kumbaya | `0x6bD9eeF2…` | ALLOW | 136.2d | 0.00% | stable/up |
| `spot-swap-base-2026-06-28-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 136.2d | 0.00% | flat |
| `spot-swap-base-2026-06-28-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 136.2d | 0.00% | flat |
| `spot-swap-base-2026-11-07-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 4.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-07-001` | kumbaya | `0x6bD9eeF2…` | WARN | 4.2d | 0.00% | stable/up |
| `spot-swap-base-2026-11-07-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 4.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-05-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 67.1d | 85.71% | stable/up |
| `spot-swap-base-2026-09-05-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 67.1d | -4.98% | TVL drift down |
| `passive-lp-kumbaya-2026-09-05-001` | kumbaya | `0x6bD9eeF2…` | WARN | 67.1d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-11-09-001` | kumbaya | `0x6bD9eeF2…` | WARN | 1.9d | 0.00% | stable/up |
| `spot-swap-base-2026-11-09-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 1.9d | 0.00% | stable/up |
| `spot-swap-base-2026-11-09-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 1.9d | 0.00% | stable/up |
| `spot-swap-base-2026-09-02-001` | uniswap-v3-base | `0x94bfc057…` | ALLOW | 70.2d | 0.00% | stable/up |
| `passive-lp-kumbaya-2026-09-02-001` | kumbaya | `0x6bD9eeF2…` | WARN | 70.2d | 0.00% | stable/up |
| `spot-swap-base-2026-09-02-002` | uniswap-v3-base | `0x46880b40…` | ALLOW | 70.2d | -20.00% | unexitable (errored) |

- count: **499** (481 resolved at 7d, 26 loss-flagged)
- avg P&L per entry: **-3.82%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **86.4%** (431 wins)
- worst entry: -50.00% · best entry: 85.71%
- equal-weight portfolio: starting $1 per entry → **-3.82% return**

## Hypothetical: every ALLOW probe as an entry

Counterfactual portfolio — if we'd been more aggressive and entered every ALLOW signal at every probe cycle.

### All entries
- count: **34766** (32347 resolved at 7d, 7590 loss-flagged)
- avg P&L per entry: **-12.20%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **69.4%** (24123 wins)
- worst entry: -85.71% · best entry: 85.71%
- equal-weight portfolio: starting $1 per entry → **-12.20% return**

### Safe cohort only
- count: **34133** (31742 resolved at 7d, 7495 loss-flagged)
- avg P&L per entry: **-12.27%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **69.2%** (23620 wins)
- worst entry: -85.71% · best entry: 85.71%
- equal-weight portfolio: starting $1 per entry → **-12.27% return**

### Risky cohort only
- count: **633** (605 resolved at 7d, 95 loss-flagged)
- avg P&L per entry: **-8.39%**
- median P&L per entry: **0.00%**
- win rate (P&L ≥ 0): **79.5%** (503 wins)
- worst entry: -50.00% · best entry: 8.11%
- equal-weight portfolio: starting $1 per entry → **-8.39% return**

## How to read this

- **Real intents** is the honest answer: "if we'd actually deployed every strategy intent the system produced, what's the realized P&L?" Currently a tiny sample.
- **Hypothetical** is the exploratory answer: what if we'd entered every ALLOW signal? Bigger sample, but more aggressive than our actual strategy gates would allow.
- A passive LP's value moves roughly with pool TVL — that's the drift model. Catastrophic loss = LOSS patch flagged → -50% assumption.
- We don't simulate fees. Real LPs earn ~0.3-1% per week from trading fees in liquid pools, so realized P&L would be higher than shown. Conservative bias is intentional.

Raw data: [`metrics/simtrade-pnl.json`](simtrade-pnl.json). Source: [`scripts/compute-simtrade-pnl.ts`](../scripts/compute-simtrade-pnl.ts).
