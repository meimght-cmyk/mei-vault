# Phase 4 readiness

_Updated: 2026-07-23T21:45:24.701Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 75 of 90)
- Earliest unlock: **2026-08-07** (14 days away)
- Probe rows collected: **43,974**
- Outcome patches resolved: **66,348**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 26.12% (n=12428) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.10% (n=1478) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12175  loss=3228  rate=26.51% |   n=1095  loss=243  rate=22.19% |   n=   5  loss=  0  rate=0.00% |   n=13699  loss=266  rate=1.94% |
| risky |   n= 253  loss= 18  rate=7.11% |   n=8557  loss=774  rate=9.05% |   n=1473  loss=105  rate=7.13% |   n=2667  loss=900  rate=33.75% |
| **all** | **  n=12428  loss=3246  rate=26.12%** | **  n=9652  loss=1017  rate=10.54%** | **  n=1478  loss=105  rate=7.10%** | **  n=16366  loss=1166  rate=7.12%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9369  loss=2278  rate=24.31% |   n= 672  loss=167  rate=24.85% |   n=   5  loss=  0  rate=0.00% |   n=7928  loss=141  rate=1.78% |
| risky |   n= 153  loss= 12  rate=7.84% |   n=5906  loss=667  rate=11.29% |   n= 980  loss= 98  rate=10.00% |   n=1411  loss=369  rate=26.15% |
| **all** | **  n=9522  loss=2290  rate=24.05%** | **  n=6578  loss=834  rate=12.68%** | **  n= 985  loss= 98  rate=9.95%** | **  n=9339  loss=510  rate=5.46%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
