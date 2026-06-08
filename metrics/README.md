# Phase 4 readiness

_Updated: 2026-06-08T19:44:49.976Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 30 of 90)
- Earliest unlock: **2026-08-07** (59 days away)
- Probe rows collected: **17,574**
- Outcome patches resolved: **14,713**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 11.73% (n=6641) — floor ≤ 2%
- ❌ **BLOCK precision**: 2.49% (n=482) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=6571  loss=779  rate=11.86% |   n= 235  loss= 30  rate=12.77% |   n=   5  loss=  0  rate=0.00% |   n=2863  loss= 50  rate=1.75% |
| risky |   n=  70  loss=  0  rate=0.00% |   n=3213  loss=124  rate=3.86% |   n= 477  loss= 12  rate=2.52% |   n= 540  loss=156  rate=28.89% |
| **all** | **  n=6641  loss=779  rate=11.73%** | **  n=3448  loss=154  rate=4.47%** | **  n= 482  loss= 12  rate=2.49%** | **  n=3403  loss=206  rate=6.05%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n= 701  loss= 25  rate=3.57% |   n=  24  loss=  0  rate=0.00% |   n=   4  loss=  0  rate=0.00% |   n=  10  loss= 10  rate=100.00% |
| risky |   n=0 |   n=0 |   n=0 |   n=0 |
| **all** | **  n= 701  loss= 25  rate=3.57%** | **  n=  24  loss=  0  rate=0.00%** | **  n=   4  loss=  0  rate=0.00%** | **  n=  10  loss= 10  rate=100.00%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
