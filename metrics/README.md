# Phase 4 readiness

_Updated: 2026-08-11T14:56:06.114Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 94 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **55,074**
- Outcome patches resolved: **88,248**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 28.56% (n=14942) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.96% (n=1925) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14604  loss=4243  rate=29.05% |   n=1449  loss=339  rate=23.40% |   n=   5  loss=  0  rate=0.00% |   n=18216  loss=375  rate=2.06% |
| risky |   n= 338  loss= 24  rate=7.10% |   n=10898  loss=966  rate=8.86% |   n=1920  loss=134  rate=6.98% |   n=3444  loss=1096  rate=31.82% |
| **all** | **  n=14942  loss=4267  rate=28.56%** | **  n=12347  loss=1305  rate=10.57%** | **  n=1925  loss=134  rate=6.96%** | **  n=21660  loss=1471  rate=6.79%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11618  loss=3314  rate=28.52% |   n=1009  loss=241  rate=23.89% |   n=   5  loss=  0  rate=0.00% |   n=12642  loss=284  rate=2.25% |
| risky |   n= 231  loss= 23  rate=9.96% |   n=8040  loss=811  rate=10.09% |   n=1375  loss=114  rate=8.29% |   n=2454  loss=818  rate=33.33% |
| **all** | **  n=11849  loss=3337  rate=28.16%** | **  n=9049  loss=1052  rate=11.63%** | **  n=1380  loss=114  rate=8.26%** | **  n=15096  loss=1102  rate=7.30%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
