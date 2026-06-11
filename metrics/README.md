# Phase 4 readiness

_Updated: 2026-06-11T22:31:13.697Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 33 of 90)
- Earliest unlock: **2026-08-07** (56 days away)
- Probe rows collected: **19,374**
- Outcome patches resolved: **18,163**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 13.65% (n=7121) — floor ≤ 2%
- ❌ **BLOCK precision**: 2.65% (n=566) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7038  loss=972  rate=13.81% |   n= 295  loss= 47  rate=15.93% |   n=   5  loss=  0  rate=0.00% |   n=3636  loss= 57  rate=1.57% |
| risky |   n=  83  loss=  0  rate=0.00% |   n=3642  loss=158  rate=4.34% |   n= 561  loss= 15  rate=2.67% |   n= 664  loss=192  rate=28.92% |
| **all** | **  n=7121  loss=972  rate=13.65%** | **  n=3937  loss=205  rate=5.21%** | **  n= 566  loss= 15  rate=2.65%** | **  n=4300  loss=249  rate=5.79%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=1897  loss= 59  rate=3.11% |   n=  27  loss=  0  rate=0.00% |   n=   4  loss=  0  rate=0.00% |   n=  11  loss= 10  rate=90.91% |
| risky |   n=0 |   n= 269  loss=  0  rate=0.00% |   n=  30  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=1897  loss= 59  rate=3.11%** | **  n= 296  loss=  0  rate=0.00%** | **  n=  34  loss=  0  rate=0.00%** | **  n=  12  loss= 11  rate=91.67%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
