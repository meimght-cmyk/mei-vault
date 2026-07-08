# Phase 4 readiness

_Updated: 2026-07-08T07:32:15.507Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 60 of 90)
- Earliest unlock: **2026-08-07** (29 days away)
- Probe rows collected: **34,824**
- Outcome patches resolved: **48,048**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 23.85% (n=10535) — floor ≤ 2%
- ❌ **BLOCK precision**: 8.11% (n=1159) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10351  loss=2502  rate=24.17% |   n= 816  loss=179  rate=21.94% |   n=   5  loss=  0  rate=0.00% |   n=9702  loss=171  rate=1.76% |
| risky |   n= 184  loss= 11  rate=5.98% |   n=6841  loss=656  rate=9.59% |   n=1154  loss= 94  rate=8.15% |   n=1721  loss=470  rate=27.31% |
| **all** | **  n=10535  loss=2513  rate=23.85%** | **  n=7657  loss=835  rate=10.91%** | **  n=1159  loss= 94  rate=8.11%** | **  n=11423  loss=641  rate=5.61%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7323  loss=1447  rate=19.76% |   n= 339  loss= 99  rate=29.20% |   n=   5  loss=  0  rate=0.00% |   n=4207  loss= 78  rate=1.85% |
| risky |   n=  92  loss= 12  rate=13.04% |   n=3929  loss=512  rate=13.03% |   n= 610  loss= 78  rate=12.79% |   n= 769  loss=201  rate=26.14% |
| **all** | **  n=7415  loss=1459  rate=19.68%** | **  n=4268  loss=611  rate=14.32%** | **  n= 615  loss= 78  rate=12.68%** | **  n=4976  loss=279  rate=5.61%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
