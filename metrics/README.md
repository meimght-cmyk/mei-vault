# Phase 4 readiness

_Updated: 2026-07-01T19:51:37.019Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 53 of 90)
- Earliest unlock: **2026-08-07** (36 days away)
- Probe rows collected: **31,074**
- Outcome patches resolved: **40,848**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 21.14% (n=9627) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.88% (n=1003) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9471  loss=2031  rate=21.44% |   n= 687  loss=135  rate=19.65% |   n=   5  loss=  0  rate=0.00% |   n=8111  loss=135  rate=1.66% |
| risky |   n= 156  loss=  4  rate=2.56% |   n=6004  loss=453  rate=7.54% |   n= 998  loss= 59  rate=5.91% |   n=1442  loss=407  rate=28.22% |
| **all** | **  n=9627  loss=2035  rate=21.14%** | **  n=6691  loss=588  rate=8.79%** | **  n=1003  loss= 59  rate=5.88%** | **  n=9553  loss=542  rate=5.67%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=6571  loss=1017  rate=15.48% |   n= 235  loss= 59  rate=25.11% |   n=   5  loss=  0  rate=0.00% |   n=2863  loss= 52  rate=1.82% |
| risky |   n=  70  loss=  7  rate=10.00% |   n=3213  loss=295  rate=9.18% |   n= 477  loss= 42  rate=8.81% |   n= 540  loss=142  rate=26.30% |
| **all** | **  n=6641  loss=1024  rate=15.42%** | **  n=3448  loss=354  rate=10.27%** | **  n= 482  loss= 42  rate=8.71%** | **  n=3403  loss=194  rate=5.70%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
