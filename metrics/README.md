# Phase 4 readiness

_Updated: 2026-06-09T20:40:41.917Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 31 of 90)
- Earliest unlock: **2026-08-07** (58 days away)
- Probe rows collected: **18,174**
- Outcome patches resolved: **15,863**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 12.58% (n=6834) — floor ≤ 2%
- ❌ **BLOCK precision**: 2.72% (n=515) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=6759  loss=860  rate=12.72% |   n= 255  loss= 35  rate=13.73% |   n=   5  loss=  0  rate=0.00% |   n=3155  loss= 54  rate=1.71% |
| risky |   n=  75  loss=  0  rate=0.00% |   n=3378  loss=138  rate=4.09% |   n= 510  loss= 14  rate=2.75% |   n= 587  loss=169  rate=28.79% |
| **all** | **  n=6834  loss=860  rate=12.58%** | **  n=3633  loss=173  rate=4.76%** | **  n= 515  loss= 14  rate=2.72%** | **  n=3742  loss=223  rate=5.96%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=1100  loss= 37  rate=3.36% |   n=  25  loss=  0  rate=0.00% |   n=   4  loss=  0  rate=0.00% |   n=  10  loss= 10  rate=100.00% |
| risky |   n=0 |   n=0 |   n=0 |   n=0 |
| **all** | **  n=1100  loss= 37  rate=3.36%** | **  n=  25  loss=  0  rate=0.00%** | **  n=   4  loss=  0  rate=0.00%** | **  n=  10  loss= 10  rate=100.00%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
