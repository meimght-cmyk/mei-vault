# Phase 4 readiness

_Updated: 2026-07-22T20:50:01.932Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 74 of 90)
- Earliest unlock: **2026-08-07** (15 days away)
- Probe rows collected: **43,374**
- Outcome patches resolved: **65,148**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 25.95% (n=12283) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.15% (n=1454) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12035  loss=3170  rate=26.34% |   n=1077  loss=238  rate=22.10% |   n=   5  loss=  0  rate=0.00% |   n=13457  loss=263  rate=1.95% |
| risky |   n= 248  loss= 17  rate=6.85% |   n=8427  loss=767  rate=9.10% |   n=1449  loss=104  rate=7.18% |   n=2626  loss=891  rate=33.93% |
| **all** | **  n=12283  loss=3187  rate=25.95%** | **  n=9504  loss=1005  rate=10.57%** | **  n=1454  loss=104  rate=7.15%** | **  n=16083  loss=1154  rate=7.18%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9235  loss=2211  rate=23.94% |   n= 653  loss=163  rate=24.96% |   n=   5  loss=  0  rate=0.00% |   n=7681  loss=136  rate=1.77% |
| risky |   n= 149  loss= 12  rate=8.05% |   n=5775  loss=656  rate=11.36% |   n= 956  loss= 98  rate=10.25% |   n=1370  loss=361  rate=26.35% |
| **all** | **  n=9384  loss=2223  rate=23.69%** | **  n=6428  loss=819  rate=12.74%** | **  n= 961  loss= 98  rate=10.20%** | **  n=9051  loss=497  rate=5.49%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
