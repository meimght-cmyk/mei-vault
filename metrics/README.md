# Phase 4 readiness

_Updated: 2026-06-03T04:42:07.749Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 25 of 90)
- Earliest unlock: **2026-08-07** (64 days away)
- Probe rows collected: **14,874**
- Outcome patches resolved: **10,674**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 7.92% (n=5885) — floor ≤ 2%
- ❌ **BLOCK precision**: 1.43% (n=349) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=5836  loss=466  rate=7.98% |   n= 141  loss=  6  rate=4.26% |   n=   4  loss=  0  rate=0.00% |   n=1493  loss= 28  rate=1.88% |
| risky |   n=  49  loss=  0  rate=0.00% |   n=2531  loss= 70  rate=2.77% |   n= 345  loss=  5  rate=1.45% |   n= 275  loss= 62  rate=22.55% |
| **all** | **  n=5885  loss=466  rate=7.92%** | **  n=2672  loss= 76  rate=2.84%** | **  n= 349  loss=  5  rate=1.43%** | **  n=1768  loss= 90  rate=5.09%** |

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
