# Phase 4 readiness

_Updated: 2026-05-22T22:48:39.009Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 13 of 90)
- Earliest unlock: **2026-08-07** (76 days away)
- Probe rows collected: **8,274**
- Outcome patches resolved: **3,996**

## Phase 4 floors (7-day horizon)

- ✅ **ALLOW false-negative rate**: 1.39% (n=3094) — floor ≤ 2%
- ❌ **BLOCK precision**: 0.00% (n=94) _(n=94 < 100 required)_ — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=3092  loss= 43  rate=1.39% |   n=  31  loss=  2  rate=6.45% |   n=   4  loss=  0  rate=0.00% |   n=  12  loss= 10  rate=83.33% |
| risky |   n=   2  loss=  0  rate=0.00% |   n= 764  loss=  4  rate=0.52% |   n=  90  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=3094  loss= 43  rate=1.39%** | **  n= 795  loss=  6  rate=0.75%** | **  n=  94  loss=  0  rate=0.00%** | **  n=  13  loss= 11  rate=84.62%** |

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
