# Phase 4 readiness

_Updated: 2026-07-15T14:06:59.304Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 67 of 90)
- Earliest unlock: **2026-08-07** (22 days away)
- Probe rows collected: **39,174**
- Outcome patches resolved: **56,448**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 24.72% (n=11285) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.48% (n=1284) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11075  loss=2777  rate=25.07% |   n= 924  loss=199  rate=21.54% |   n=   5  loss=  0  rate=0.00% |   n=11670  loss=225  rate=1.93% |
| risky |   n= 210  loss= 13  rate=6.19% |   n=7526  loss=713  rate=9.47% |   n=1279  loss= 96  rate=7.51% |   n=2285  loss=796  rate=34.84% |
| **all** | **  n=11285  loss=2790  rate=24.72%** | **  n=8450  loss=912  rate=10.79%** | **  n=1284  loss= 96  rate=7.48%** | **  n=13955  loss=1021  rate=7.32%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8280  loss=1839  rate=22.21% |   n= 486  loss=130  rate=26.75% |   n=   5  loss=  0  rate=0.00% |   n=5903  loss=108  rate=1.83% |
| risky |   n= 120  loss= 12  rate=10.00% |   n=4856  loss=597  rate=12.29% |   n= 781  loss= 89  rate=11.40% |   n=1043  loss=267  rate=25.60% |
| **all** | **  n=8400  loss=1851  rate=22.04%** | **  n=5342  loss=727  rate=13.61%** | **  n= 786  loss= 89  rate=11.32%** | **  n=6946  loss=375  rate=5.40%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
