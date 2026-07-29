# Phase 4 readiness

_Updated: 2026-07-29T02:22:54.872Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 81 of 90)
- Earliest unlock: **2026-08-07** (8 days away)
- Probe rows collected: **47,124**
- Outcome patches resolved: **72,348**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 27.13% (n=13136) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.39% (n=1597) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12859  loss=3545  rate=27.57% |   n=1176  loss=262  rate=22.28% |   n=   5  loss=  0  rate=0.00% |   n=14934  loss=293  rate=1.96% |
| risky |   n= 277  loss= 19  rate=6.86% |   n=9201  loss=841  rate=9.14% |   n=1592  loss=118  rate=7.41% |   n=2880  loss=950  rate=32.99% |
| **all** | **  n=13136  loss=3564  rate=27.13%** | **  n=10377  loss=1103  rate=10.63%** | **  n=1597  loss=118  rate=7.39%** | **  n=17814  loss=1243  rate=6.98%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10058  loss=2596  rate=25.81% |   n= 775  loss=192  rate=24.77% |   n=   5  loss=  0  rate=0.00% |   n=9136  loss=161  rate=1.76% |
| risky |   n= 173  loss= 13  rate=7.51% |   n=6559  loss=708  rate=10.79% |   n=1102  loss=105  rate=9.53% |   n=1616  loss=422  rate=26.11% |
| **all** | **  n=10231  loss=2609  rate=25.50%** | **  n=7334  loss=900  rate=12.27%** | **  n=1107  loss=105  rate=9.49%** | **  n=10752  loss=583  rate=5.42%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
