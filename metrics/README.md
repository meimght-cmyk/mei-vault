# Phase 4 readiness

_Updated: 2026-07-11T10:19:24.235Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 63 of 90)
- Earliest unlock: **2026-08-07** (26 days away)
- Probe rows collected: **36,624**
- Outcome patches resolved: **51,648**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 24.14% (n=10714) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.91% (n=1189) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10524  loss=2574  rate=24.46% |   n= 841  loss=183  rate=21.76% |   n=   5  loss=  0  rate=0.00% |   n=10704  loss=212  rate=1.98% |
| risky |   n= 190  loss= 12  rate=6.32% |   n=7004  loss=671  rate=9.58% |   n=1184  loss= 94  rate=7.94% |   n=2122  loss=756  rate=35.63% |
| **all** | **  n=10714  loss=2586  rate=24.14%** | **  n=7845  loss=854  rate=10.89%** | **  n=1189  loss= 94  rate=7.91%** | **  n=12826  loss=968  rate=7.55%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7736  loss=1624  rate=20.99% |   n= 398  loss=110  rate=27.64% |   n=   5  loss=  0  rate=0.00% |   n=4935  loss= 91  rate=1.84% |
| risky |   n= 104  loss= 12  rate=11.54% |   n=4330  loss=548  rate=12.66% |   n= 682  loss= 81  rate=11.88% |   n= 884  loss=229  rate=25.90% |
| **all** | **  n=7840  loss=1636  rate=20.87%** | **  n=4728  loss=658  rate=13.92%** | **  n= 687  loss= 81  rate=11.79%** | **  n=5819  loss=320  rate=5.50%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
