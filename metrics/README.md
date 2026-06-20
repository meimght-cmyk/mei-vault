# Phase 4 readiness

_Updated: 2026-06-20T05:51:18.909Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 42 of 90)
- Earliest unlock: **2026-08-07** (47 days away)
- Probe rows collected: **24,324**
- Outcome patches resolved: **27,223**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 17.04% (n=8088) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.29% (n=730) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7977  loss=1378  rate=17.27% |   n= 437  loss= 71  rate=16.25% |   n=   5  loss=  0  rate=0.00% |   n=5355  loss= 86  rate=1.61% |
| risky |   n= 111  loss=  0  rate=0.00% |   n=4561  loss=232  rate=5.09% |   n= 725  loss= 24  rate=3.31% |   n= 953  loss=275  rate=28.86% |
| **all** | **  n=8088  loss=1378  rate=17.04%** | **  n=4998  loss=303  rate=6.06%** | **  n= 730  loss= 24  rate=3.29%** | **  n=6308  loss=361  rate=5.72%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=4955  loss=230  rate=4.64% |   n=  53  loss=  2  rate=3.77% |   n=   4  loss=  0  rate=0.00% |   n= 137  loss= 12  rate=8.76% |
| risky |   n=  24  loss=  2  rate=8.33% |   n=1697  loss= 51  rate=3.01% |   n= 199  loss=  3  rate=1.51% |   n=  30  loss=  8  rate=26.67% |
| **all** | **  n=4979  loss=232  rate=4.66%** | **  n=1750  loss= 53  rate=3.03%** | **  n= 203  loss=  3  rate=1.48%** | **  n= 167  loss= 20  rate=11.98%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
