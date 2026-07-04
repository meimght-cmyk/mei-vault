# Phase 4 readiness

_Updated: 2026-07-04T04:14:59.899Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 56 of 90)
- Earliest unlock: **2026-08-07** (33 days away)
- Probe rows collected: **32,424**
- Outcome patches resolved: **43,848**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 22.87% (n=9985) — floor ≤ 2%
- ❌ **BLOCK precision**: 8.37% (n=1063) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9819  loss=2275  rate=23.17% |   n= 740  loss=166  rate=22.43% |   n=   5  loss=  0  rate=0.00% |   n=8710  loss=140  rate=1.61% |
| risky |   n= 166  loss=  9  rate=5.42% |   n=6333  loss=628  rate=9.92% |   n=1058  loss= 89  rate=8.41% |   n=1543  loss=420  rate=27.22% |
| **all** | **  n=9985  loss=2284  rate=22.87%** | **  n=7073  loss=794  rate=11.23%** | **  n=1063  loss= 89  rate=8.37%** | **  n=10253  loss=560  rate=5.46%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=6939  loss=1285  rate=18.52% |   n= 278  loss= 85  rate=30.58% |   n=   5  loss=  0  rate=0.00% |   n=3452  loss= 65  rate=1.88% |
| risky |   n=  80  loss= 12  rate=15.00% |   n=3541  loss=474  rate=13.39% |   n= 541  loss= 75  rate=13.86% |   n= 638  loss=157  rate=24.61% |
| **all** | **  n=7019  loss=1297  rate=18.48%** | **  n=3819  loss=559  rate=14.64%** | **  n= 546  loss= 75  rate=13.74%** | **  n=4090  loss=222  rate=5.43%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
