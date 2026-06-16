# Phase 4 readiness

_Updated: 2026-06-16T01:58:19.854Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 38 of 90)
- Earliest unlock: **2026-08-07** (51 days away)
- Probe rows collected: **21,774**
- Outcome patches resolved: **22,363**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 14.90% (n=7521) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.01% (n=632) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7426  loss=1121  rate=15.10% |   n= 354  loss= 55  rate=15.54% |   n=   5  loss=  0  rate=0.00% |   n=4389  loss= 70  rate=1.59% |
| risky |   n=  95  loss=  0  rate=0.00% |   n=4030  loss=188  rate=4.67% |   n= 627  loss= 19  rate=3.03% |   n= 798  loss=239  rate=29.95% |
| **all** | **  n=7521  loss=1121  rate=14.90%** | **  n=4384  loss=243  rate=5.54%** | **  n= 632  loss= 19  rate=3.01%** | **  n=5187  loss=309  rate=5.96%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=3489  loss=103  rate=2.95% |   n=  33  loss=  2  rate=6.06% |   n=   4  loss=  0  rate=0.00% |   n=  13  loss= 10  rate=76.92% |
| risky |   n=   7  loss=  0  rate=0.00% |   n= 982  loss=  1  rate=0.10% |   n= 110  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=3496  loss=103  rate=2.95%** | **  n=1015  loss=  3  rate=0.30%** | **  n= 114  loss=  0  rate=0.00%** | **  n=  14  loss= 11  rate=78.57%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
