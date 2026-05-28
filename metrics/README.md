# Phase 4 readiness

_Updated: 2026-05-28T02:00:47.528Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 19 of 90)
- Earliest unlock: **2026-08-07** (70 days away)
- Probe rows collected: **11,274**
- Outcome patches resolved: **6,949**

## Phase 4 floors (7-day horizon)

- ✅ **ALLOW false-negative rate**: 1.68% (n=4943) — floor ≤ 2%
- ❌ **BLOCK precision**: 0.00% (n=198) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=4920  loss= 83  rate=1.69% |   n=  51  loss=  2  rate=3.92% |   n=   4  loss=  0  rate=0.00% |   n=  74  loss= 11  rate=14.86% |
| risky |   n=  23  loss=  0  rate=0.00% |   n=1663  loss=  9  rate=0.54% |   n= 194  loss=  0  rate=0.00% |   n=  20  loss=  5  rate=25.00% |
| **all** | **  n=4943  loss= 83  rate=1.68%** | **  n=1714  loss= 11  rate=0.64%** | **  n= 198  loss=  0  rate=0.00%** | **  n=  94  loss= 16  rate=17.02%** |

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
