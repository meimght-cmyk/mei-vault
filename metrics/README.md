# Phase 4 readiness

_Updated: 2026-06-30T15:13:26.736Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 52 of 90)
- Earliest unlock: **2026-08-07** (37 days away)
- Probe rows collected: **30,474**
- Outcome patches resolved: **39,648**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 19.99% (n=9489) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.67% (n=980) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9337  loss=1897  rate=20.32% |   n= 667  loss=115  rate=17.24% |   n=   5  loss=  0  rate=0.00% |   n=7865  loss=135  rate=1.72% |
| risky |   n= 152  loss=  0  rate=0.00% |   n=5873  loss=322  rate=5.48% |   n= 975  loss= 36  rate=3.69% |   n=1400  loss=407  rate=29.07% |
| **all** | **  n=9489  loss=1897  rate=19.99%** | **  n=6540  loss=437  rate=6.68%** | **  n= 980  loss= 36  rate=3.67%** | **  n=9265  loss=542  rate=5.85%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=6434  loss=880  rate=13.68% |   n= 215  loss= 39  rate=18.14% |   n=   5  loss=  0  rate=0.00% |   n=2620  loss= 52  rate=1.98% |
| risky |   n=  66  loss=  3  rate=4.55% |   n=3083  loss=165  rate=5.35% |   n= 452  loss= 17  rate=3.76% |   n= 499  loss=142  rate=28.46% |
| **all** | **  n=6500  loss=883  rate=13.58%** | **  n=3298  loss=204  rate=6.19%** | **  n= 457  loss= 17  rate=3.72%** | **  n=3119  loss=194  rate=6.22%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
