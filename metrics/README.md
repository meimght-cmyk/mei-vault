# Phase 4 readiness

_Updated: 2026-11-23T18:49:38.575Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 198 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **116,424**
- Outcome patches resolved: **210,948**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 20.94% (n=36422) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.75% (n=4524) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=35771  loss=7530  rate=21.05% |   n=4692  loss=703  rate=14.98% |   n=   6  loss=  0  rate=0.00% |   n=34705  loss=975  rate=2.81% |
| risky |   n= 651  loss= 96  rate=14.75% |   n=25334  loss=1547  rate=6.11% |   n=4518  loss=215  rate=4.76% |   n=6547  loss=2354  rate=35.96% |
| **all** | **  n=36422  loss=7626  rate=20.94%** | **  n=30026  loss=2250  rate=7.49%** | **  n=4524  loss=215  rate=4.75%** | **  n=41252  loss=3329  rate=8.07%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=28255  loss=6393  rate=22.63% |   n=3666  loss=573  rate=15.63% |   n=   6  loss=  0  rate=0.00% |   n=34247  loss=1359  rate=3.97% |
| risky |   n= 565  loss=177  rate=31.33% |   n=21742  loss=1454  rate=6.69% |   n=3905  loss=204  rate=5.22% |   n=6338  loss=2859  rate=45.11% |
| **all** | **  n=28820  loss=6570  rate=22.80%** | **  n=25408  loss=2027  rate=7.98%** | **  n=3911  loss=204  rate=5.22%** | **  n=40585  loss=4218  rate=10.39%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
