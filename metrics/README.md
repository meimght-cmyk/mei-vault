# Phase 4 readiness

_Updated: 2026-08-14T17:50:01.736Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 97 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **56,874**
- Outcome patches resolved: **91,848**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 28.93% (n=15334) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.77% (n=1993) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14982  loss=4411  rate=29.44% |   n=1522  loss=358  rate=23.52% |   n=   5  loss=  0  rate=0.00% |   n=18965  loss=394  rate=2.08% |
| risky |   n= 352  loss= 25  rate=7.10% |   n=11281  loss=989  rate=8.77% |   n=1988  loss=135  rate=6.79% |   n=3579  loss=1137  rate=31.77% |
| **all** | **  n=15334  loss=4436  rate=28.93%** | **  n=12803  loss=1347  rate=10.52%** | **  n=1993  loss=135  rate=6.77%** | **  n=22544  loss=1531  rate=6.79%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12003  loss=3485  rate=29.03% |   n=1070  loss=258  rate=24.11% |   n=   5  loss=  0  rate=0.00% |   n=13396  loss=304  rate=2.27% |
| risky |   n= 246  loss= 25  rate=10.16% |   n=8395  loss=834  rate=9.93% |   n=1442  loss=116  rate=8.04% |   n=2617  loss=885  rate=33.82% |
| **all** | **  n=12249  loss=3510  rate=28.66%** | **  n=9465  loss=1092  rate=11.54%** | **  n=1447  loss=116  rate=8.02%** | **  n=16013  loss=1189  rate=7.43%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
