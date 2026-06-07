# Phase 4 readiness

_Updated: 2026-06-07T18:08:32.403Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 29 of 90)
- Earliest unlock: **2026-08-07** (60 days away)
- Probe rows collected: **16,974**
- Outcome patches resolved: **12,632**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 10.41% (n=6359) — floor ≤ 2%
- ❌ **BLOCK precision**: 2.79% (n=430) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=6297  loss=662  rate=10.51% |   n= 196  loss= 21  rate=10.71% |   n=   4  loss=  0  rate=0.00% |   n=2282  loss= 40  rate=1.75% |
| risky |   n=  62  loss=  0  rate=0.00% |   n=2955  loss=109  rate=3.69% |   n= 426  loss= 12  rate=2.82% |   n= 408  loss=101  rate=24.75% |
| **all** | **  n=6359  loss=662  rate=10.41%** | **  n=3151  loss=130  rate=4.13%** | **  n= 430  loss= 12  rate=2.79%** | **  n=2690  loss=141  rate=5.24%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=   2  loss=  1  rate=50.00% |   n=0 |   n=0 |   n=0 |
| risky |   n=0 |   n=0 |   n=0 |   n=0 |
| **all** | **  n=   2  loss=  1  rate=50.00%** | **  n=0** | **  n=0** | **  n=0** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
