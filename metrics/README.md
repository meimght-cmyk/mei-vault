# Phase 4 readiness

_Updated: 2026-06-28T13:22:05.096Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 50 of 90)
- Earliest unlock: **2026-08-07** (39 days away)
- Probe rows collected: **29,124**
- Outcome patches resolved: **37,248**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 19.46% (n=9207) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.64% (n=933) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9063  loss=1792  rate=19.77% |   n= 628  loss=111  rate=17.68% |   n=   5  loss=  0  rate=0.00% |   n=7378  loss=124  rate=1.68% |
| risky |   n= 144  loss=  0  rate=0.00% |   n=5614  loss=305  rate=5.43% |   n= 928  loss= 34  rate=3.66% |   n=1314  loss=382  rate=29.07% |
| **all** | **  n=9207  loss=1792  rate=19.46%** | **  n=6242  loss=416  rate=6.66%** | **  n= 933  loss= 34  rate=3.64%** | **  n=8692  loss=506  rate=5.82%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=6188  loss=769  rate=12.43% |   n= 183  loss= 28  rate=15.30% |   n=   4  loss=  0  rate=0.00% |   n=2099  loss= 43  rate=2.05% |
| risky |   n=  59  loss=  2  rate=3.39% |   n=2856  loss=136  rate=4.76% |   n= 406  loss= 11  rate=2.71% |   n= 379  loss= 89  rate=23.48% |
| **all** | **  n=6247  loss=771  rate=12.34%** | **  n=3039  loss=164  rate=5.40%** | **  n= 410  loss= 11  rate=2.68%** | **  n=2478  loss=132  rate=5.33%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
