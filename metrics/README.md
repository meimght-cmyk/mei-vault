# Phase 4 readiness

_Updated: 2026-11-03T09:14:24.291Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 178 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **104,424**
- Outcome patches resolved: **186,948**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 25.50% (n=29627) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.38% (n=3978) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=29053  loss=7462  rate=25.68% |   n=3775  loss=692  rate=18.33% |   n=   6  loss=  0  rate=0.00% |   n=34340  loss=932  rate=2.71% |
| risky |   n= 574  loss= 94  rate=16.38% |   n=22125  loss=1511  rate=6.83% |   n=3972  loss=214  rate=5.39% |   n=6379  loss=2189  rate=34.32% |
| **all** | **  n=29627  loss=7556  rate=25.50%** | **  n=25900  loss=2203  rate=8.51%** | **  n=3978  loss=214  rate=5.38%** | **  n=40719  loss=3121  rate=7.66%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22304  loss=6290  rate=28.20% |   n=2840  loss=562  rate=19.79% |   n=   5  loss=  0  rate=0.00% |   n=33025  loss=1242  rate=3.76% |
| risky |   n= 499  loss=174  rate=34.87% |   n=18613  loss=1402  rate=7.53% |   n=3368  loss=200  rate=5.94% |   n=6070  loss=2605  rate=42.92% |
| **all** | **  n=22803  loss=6464  rate=28.35%** | **  n=21453  loss=1964  rate=9.15%** | **  n=3373  loss=200  rate=5.93%** | **  n=39095  loss=3847  rate=9.84%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
