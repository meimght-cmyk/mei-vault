# Phase 4 readiness

_Updated: 2026-06-05T05:36:10.860Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 27 of 90)
- Earliest unlock: **2026-08-07** (62 days away)
- Probe rows collected: **16,074**
- Outcome patches resolved: **11,874**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 9.41% (n=6174) — floor ≤ 2%
- ❌ **BLOCK precision**: 1.51% (n=398) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=6117  loss=581  rate=9.50% |   n= 174  loss= 12  rate=6.90% |   n=   4  loss=  0  rate=0.00% |   n=1979  loss= 35  rate=1.77% |
| risky |   n=  57  loss=  0  rate=0.00% |   n=2793  loss= 88  rate=3.15% |   n= 394  loss=  6  rate=1.52% |   n= 356  loss= 86  rate=24.16% |
| **all** | **  n=6174  loss=581  rate=9.41%** | **  n=2967  loss=100  rate=3.37%** | **  n= 398  loss=  6  rate=1.51%** | **  n=2335  loss=121  rate=5.18%** |

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
