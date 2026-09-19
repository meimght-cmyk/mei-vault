# Phase 4 readiness

_Updated: 2026-09-19T04:21:43.323Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 133 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **77,874**
- Outcome patches resolved: **133,698**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.83% (n=19960) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.01% (n=2845) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19483  loss=6279  rate=32.23% |   n=2324  loss=558  rate=24.01% |   n=   5  loss=  0  rate=0.00% |   n=27662  loss=633  rate=2.29% |
| risky |   n= 477  loss= 74  rate=15.51% |   n=15787  loss=1279  rate=8.10% |   n=2840  loss=171  rate=6.02% |   n=5096  loss=1515  rate=29.73% |
| **all** | **  n=19960  loss=6353  rate=31.83%** | **  n=18111  loss=1837  rate=10.14%** | **  n=2845  loss=171  rate=6.01%** | **  n=32758  loss=2148  rate=6.56%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16541  loss=5298  rate=32.03% |   n=1805  loss=454  rate=25.15% |   n=   5  loss=  0  rate=0.00% |   n=22023  loss=514  rate=2.33% |
| risky |   n= 405  loss=105  rate=25.93% |   n=12829  loss=1205  rate=9.39% |   n=2283  loss=172  rate=7.53% |   n=4133  loss=1315  rate=31.82% |
| **all** | **  n=16946  loss=5403  rate=31.88%** | **  n=14634  loss=1659  rate=11.34%** | **  n=2288  loss=172  rate=7.52%** | **  n=26156  loss=1829  rate=6.99%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
