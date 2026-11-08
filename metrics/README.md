# Phase 4 readiness

_Updated: 2026-11-08T15:30:45.793Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 183 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **107,424**
- Outcome patches resolved: **193,248**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 24.13% (n=31318) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.20% (n=4114) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=30725  loss=7462  rate=24.29% |   n=4003  loss=692  rate=17.29% |   n=   6  loss=  0  rate=0.00% |   n=34540  loss=956  rate=2.77% |
| risky |   n= 593  loss= 94  rate=15.85% |   n=22940  loss=1511  rate=6.59% |   n=4108  loss=214  rate=5.21% |   n=6459  loss=2267  rate=35.10% |
| **all** | **  n=31318  loss=7556  rate=24.13%** | **  n=26943  loss=2203  rate=8.18%** | **  n=4114  loss=214  rate=5.20%** | **  n=40999  loss=3223  rate=7.86%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=23145  loss=6298  rate=27.21% |   n=2977  loss=562  rate=18.88% |   n=   5  loss=  0  rate=0.00% |   n=34147  loss=1349  rate=3.95% |
| risky |   n= 507  loss=174  rate=34.32% |   n=19318  loss=1402  rate=7.26% |   n=3495  loss=200  rate=5.72% |   n=6280  loss=2802  rate=44.62% |
| **all** | **  n=23652  loss=6472  rate=27.36%** | **  n=22295  loss=1964  rate=8.81%** | **  n=3500  loss=200  rate=5.71%** | **  n=40427  loss=4151  rate=10.27%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
