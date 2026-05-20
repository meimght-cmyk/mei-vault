# Phase 4 readiness

_Updated: 2026-05-20T21:22:05.502Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 11 of 90)
- Earliest unlock: **2026-08-07** (78 days away)
- Probe rows collected: **6,949**
- Outcome patches resolved: **2,836**

## Phase 4 floors (7-day horizon)

- ✅ **ALLOW false-negative rate**: 1.05% (n=2294) — floor ≤ 2%
- ❌ **BLOCK precision**: 0.00% (n=54) _(n=54 < 100 required)_ — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=2294  loss= 24  rate=1.05% |   n=  30  loss=  1  rate=3.33% |   n=   4  loss=  0  rate=0.00% |   n=  11  loss= 10  rate=90.91% |
| risky |   n=0 |   n= 446  loss=  1  rate=0.22% |   n=  50  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=2294  loss= 24  rate=1.05%** | **  n= 476  loss=  2  rate=0.42%** | **  n=  54  loss=  0  rate=0.00%** | **  n=  12  loss= 11  rate=91.67%** |

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
