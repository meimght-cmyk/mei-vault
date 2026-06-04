# Phase 4 readiness

_Updated: 2026-06-04T05:09:30.822Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 26 of 90)
- Earliest unlock: **2026-08-07** (63 days away)
- Probe rows collected: **15,474**
- Outcome patches resolved: **11,274**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 8.80% (n=6031) — floor ≤ 2%
- ❌ **BLOCK precision**: 1.34% (n=373) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=5978  loss=531  rate=8.88% |   n= 156  loss=  8  rate=5.13% |   n=   4  loss=  0  rate=0.00% |   n=1736  loss= 33  rate=1.90% |
| risky |   n=  53  loss=  0  rate=0.00% |   n=2661  loss= 79  rate=2.97% |   n= 369  loss=  5  rate=1.36% |   n= 317  loss= 75  rate=23.66% |
| **all** | **  n=6031  loss=531  rate=8.80%** | **  n=2817  loss= 87  rate=3.09%** | **  n= 373  loss=  5  rate=1.34%** | **  n=2053  loss=108  rate=5.26%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=0 |   n=0 |   n=0 |   n=0 |
| risky |   n=0 |   n=0 |   n=0 |   n=0 |
| **all** | **  n=0** | **  n=0** | **  n=0** | **  n=0** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
