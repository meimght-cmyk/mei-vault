# Phase 4 readiness

_Updated: 2026-11-01T06:51:19.685Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 176 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **103,224**
- Outcome patches resolved: **184,548**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 26.06% (n=28998) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.45% (n=3925) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=28431  loss=7462  rate=26.25% |   n=3690  loss=692  rate=18.75% |   n=   6  loss=  0  rate=0.00% |   n=34247  loss=921  rate=2.69% |
| risky |   n= 567  loss= 94  rate=16.58% |   n=21826  loss=1511  rate=6.92% |   n=3919  loss=214  rate=5.46% |   n=6338  loss=2149  rate=33.91% |
| **all** | **  n=28998  loss=7556  rate=26.06%** | **  n=25516  loss=2203  rate=8.63%** | **  n=3925  loss=214  rate=5.45%** | **  n=40585  loss=3070  rate=7.56%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22039  loss=6278  rate=28.49% |   n=2792  loss=561  rate=20.09% |   n=   5  loss=  0  rate=0.00% |   n=32538  loss=1198  rate=3.68% |
| risky |   n= 497  loss=174  rate=35.01% |   n=18345  loss=1392  rate=7.59% |   n=3319  loss=197  rate=5.94% |   n=5989  loss=2531  rate=42.26% |
| **all** | **  n=22536  loss=6452  rate=28.63%** | **  n=21137  loss=1953  rate=9.24%** | **  n=3324  loss=197  rate=5.93%** | **  n=38527  loss=3729  rate=9.68%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
