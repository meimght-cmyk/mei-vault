# Phase 4 readiness

_Updated: 2026-06-24T09:32:57.660Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 46 of 90)
- Earliest unlock: **2026-08-07** (43 days away)
- Probe rows collected: **26,724**
- Outcome patches resolved: **32,148**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 18.34% (n=8640) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.61% (n=831) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8513  loss=1585  rate=18.62% |   n= 527  loss= 89  rate=16.89% |   n=   5  loss=  0  rate=0.00% |   n=6329  loss=103  rate=1.63% |
| risky |   n= 127  loss=  0  rate=0.00% |   n=5083  loss=270  rate=5.31% |   n= 826  loss= 30  rate=3.63% |   n=1114  loss=314  rate=28.19% |
| **all** | **  n=8640  loss=1585  rate=18.34%** | **  n=5610  loss=359  rate=6.40%** | **  n= 831  loss= 30  rate=3.61%** | **  n=7443  loss=417  rate=5.60%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=5586  loss=487  rate=8.72% |   n= 111  loss= 11  rate=9.91% |   n=   4  loss=  0  rate=0.00% |   n=1073  loss= 23  rate=2.14% |
| risky |   n=  42  loss=  2  rate=4.76% |   n=2303  loss= 89  rate=3.86% |   n= 304  loss=  8  rate=2.63% |   n= 201  loss= 40  rate=19.90% |
| **all** | **  n=5628  loss=489  rate=8.69%** | **  n=2414  loss=100  rate=4.14%** | **  n= 308  loss=  8  rate=2.60%** | **  n=1274  loss= 63  rate=4.95%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
