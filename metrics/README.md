# Phase 4 readiness

_Updated: 2026-06-10T21:34:07.324Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 32 of 90)
- Earliest unlock: **2026-08-07** (57 days away)
- Probe rows collected: **18,774**
- Outcome patches resolved: **16,963**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 13.19% (n=6983) — floor ≤ 2%
- ❌ **BLOCK precision**: 2.59% (n=540) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=6904  loss=921  rate=13.34% |   n= 275  loss= 41  rate=14.91% |   n=   5  loss=  0  rate=0.00% |   n=3390  loss= 55  rate=1.62% |
| risky |   n=  79  loss=  0  rate=0.00% |   n=3509  loss=147  rate=4.19% |   n= 535  loss= 14  rate=2.62% |   n= 627  loss=181  rate=28.87% |
| **all** | **  n=6983  loss=921  rate=13.19%** | **  n=3784  loss=188  rate=4.97%** | **  n= 540  loss= 14  rate=2.59%** | **  n=4017  loss=236  rate=5.88%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=1499  loss= 49  rate=3.27% |   n=  25  loss=  0  rate=0.00% |   n=   4  loss=  0  rate=0.00% |   n=  11  loss= 10  rate=90.91% |
| risky |   n=0 |   n=  89  loss=  0  rate=0.00% |   n=  10  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=1499  loss= 49  rate=3.27%** | **  n= 114  loss=  0  rate=0.00%** | **  n=  14  loss=  0  rate=0.00%** | **  n=  12  loss= 11  rate=91.67%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
