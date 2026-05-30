# Phase 4 readiness

_Updated: 2026-05-30T02:57:02.466Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 21 of 90)
- Earliest unlock: **2026-08-07** (68 days away)
- Probe rows collected: **12,474**
- Outcome patches resolved: **8,274**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 4.44% (n=5290) — floor ≤ 2%
- ❌ **BLOCK precision**: 1.18% (n=254) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=5257  loss=235  rate=4.47% |   n=  76  loss=  2  rate=2.63% |   n=   4  loss=  0  rate=0.00% |   n= 537  loss= 15  rate=2.79% |
| risky |   n=  33  loss=  0  rate=0.00% |   n=2004  loss= 35  rate=1.75% |   n= 250  loss=  3  rate=1.20% |   n= 113  loss= 25  rate=22.12% |
| **all** | **  n=5290  loss=235  rate=4.44%** | **  n=2080  loss= 37  rate=1.78%** | **  n= 254  loss=  3  rate=1.18%** | **  n= 650  loss= 40  rate=6.15%** |

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
