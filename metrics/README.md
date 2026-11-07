# Phase 4 readiness

_Updated: 2026-11-07T14:18:12.892Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 182 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **106,824**
- Outcome patches resolved: **192,048**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 24.33% (n=31053) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.23% (n=4093) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=30463  loss=7462  rate=24.50% |   n=3970  loss=692  rate=17.43% |   n=   6  loss=  0  rate=0.00% |   n=34435  loss=941  rate=2.73% |
| risky |   n= 590  loss= 94  rate=15.93% |   n=22807  loss=1511  rate=6.63% |   n=4087  loss=214  rate=5.24% |   n=6416  loss=2225  rate=34.68% |
| **all** | **  n=31053  loss=7556  rate=24.33%** | **  n=26777  loss=2203  rate=8.23%** | **  n=4093  loss=214  rate=5.23%** | **  n=40851  loss=3166  rate=7.75%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22857  loss=6295  rate=27.54% |   n=2941  loss=562  rate=19.11% |   n=   5  loss=  0  rate=0.00% |   n=34071  loss=1340  rate=3.93% |
| risky |   n= 504  loss=174  rate=34.52% |   n=19179  loss=1402  rate=7.31% |   n=3474  loss=200  rate=5.76% |   n=6243  loss=2766  rate=44.31% |
| **all** | **  n=23361  loss=6469  rate=27.69%** | **  n=22120  loss=1964  rate=8.88%** | **  n=3479  loss=200  rate=5.75%** | **  n=40314  loss=4106  rate=10.19%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
