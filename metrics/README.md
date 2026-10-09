# Phase 4 readiness

_Updated: 2026-10-09T00:38:30.293Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 153 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **89,574**
- Outcome patches resolved: **157,098**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.80% (n=22501) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.09% (n=3318) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22005  loss=7288  rate=33.12% |   n=2786  loss=674  rate=24.19% |   n=   5  loss=  0  rate=0.00% |   n=32478  loss=761  rate=2.34% |
| risky |   n= 496  loss= 92  rate=18.55% |   n=18312  loss=1467  rate=8.01% |   n=3313  loss=202  rate=6.10% |   n=5979  loss=1810  rate=30.27% |
| **all** | **  n=22501  loss=7380  rate=32.80%** | **  n=21098  loss=2141  rate=10.15%** | **  n=3318  loss=202  rate=6.09%** | **  n=38457  loss=2571  rate=6.69%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19066  loss=6242  rate=32.74% |   n=2252  loss=558  rate=24.78% |   n=   5  loss=  0  rate=0.00% |   n=26851  loss=654  rate=2.44% |
| risky |   n= 475  loss=174  rate=36.63% |   n=15366  loss=1379  rate=8.97% |   n=2762  loss=197  rate=7.13% |   n=4947  loss=1566  rate=31.66% |
| **all** | **  n=19541  loss=6416  rate=32.83%** | **  n=17618  loss=1937  rate=10.99%** | **  n=2767  loss=197  rate=7.12%** | **  n=31798  loss=2220  rate=6.98%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
