# Phase 4 readiness

_Updated: 2026-10-18T11:08:26.452Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 162 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **95,124**
- Outcome patches resolved: **168,261**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 30.71% (n=24241) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.89% (n=3548) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=23728  loss=7352  rate=30.98% |   n=3048  loss=681  rate=22.34% |   n=   5  loss=  0  rate=0.00% |   n=34193  loss=918  rate=2.68% |
| risky |   n= 513  loss= 92  rate=17.93% |   n=19593  loss=1483  rate=7.57% |   n=3543  loss=209  rate=5.90% |   n=6301  loss=2112  rate=33.52% |
| **all** | **  n=24241  loss=7444  rate=30.71%** | **  n=22641  loss=2164  rate=9.56%** | **  n=3548  loss=209  rate=5.89%** | **  n=40494  loss=3030  rate=7.48%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20304  loss=6253  rate=30.80% |   n=2474  loss=558  rate=22.55% |   n=   5  loss=  0  rate=0.00% |   n=29154  loss=869  rate=2.98% |
| risky |   n= 484  loss=174  rate=35.95% |   n=16593  loss=1379  rate=8.31% |   n=2991  loss=197  rate=6.59% |   n=5332  loss=1923  rate=36.07% |
| **all** | **  n=20788  loss=6427  rate=30.92%** | **  n=19067  loss=1937  rate=10.16%** | **  n=2996  loss=197  rate=6.58%** | **  n=34486  loss=2792  rate=8.10%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
