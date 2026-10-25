# Phase 4 readiness

_Updated: 2026-10-25T19:25:36.446Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 169 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **99,324**
- Outcome patches resolved: **176,898**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 27.91% (n=26784) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.57% (n=3750) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=26242  loss=7384  rate=28.14% |   n=3391  loss=685  rate=20.20% |   n=   5  loss=  0  rate=0.00% |   n=34236  loss=921  rate=2.69% |
| risky |   n= 542  loss= 92  rate=16.97% |   n=20793  loss=1483  rate=7.13% |   n=3745  loss=209  rate=5.58% |   n=6320  loss=2131  rate=33.72% |
| **all** | **  n=26784  loss=7476  rate=27.91%** | **  n=24184  loss=2168  rate=8.96%** | **  n=3750  loss=209  rate=5.57%** | **  n=40556  loss=3052  rate=7.53%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21190  loss=6257  rate=29.53% |   n=2642  loss=558  rate=21.12% |   n=   5  loss=  0  rate=0.00% |   n=30937  loss=1044  rate=3.37% |
| risky |   n= 494  loss=174  rate=35.22% |   n=17508  loss=1379  rate=7.88% |   n=3157  loss=197  rate=6.24% |   n=5691  loss=2263  rate=39.76% |
| **all** | **  n=21684  loss=6431  rate=29.66%** | **  n=20150  loss=1937  rate=9.61%** | **  n=3162  loss=197  rate=6.23%** | **  n=36628  loss=3307  rate=9.03%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
