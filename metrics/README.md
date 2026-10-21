# Phase 4 readiness

_Updated: 2026-10-21T14:41:48.875Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 165 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **96,924**
- Outcome patches resolved: **171,948**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.54% (n=25311) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.75% (n=3632) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=24786  loss=7384  rate=29.79% |   n=3190  loss=685  rate=21.47% |   n=   5  loss=  0  rate=0.00% |   n=34193  loss=918  rate=2.68% |
| risky |   n= 525  loss= 92  rate=17.52% |   n=20097  loss=1483  rate=7.38% |   n=3627  loss=209  rate=5.76% |   n=6301  loss=2112  rate=33.52% |
| **all** | **  n=25311  loss=7476  rate=29.54%** | **  n=23287  loss=2168  rate=9.31%** | **  n=3632  loss=209  rate=5.75%** | **  n=40494  loss=3030  rate=7.48%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20665  loss=6256  rate=30.27% |   n=2542  loss=558  rate=21.95% |   n=   5  loss=  0  rate=0.00% |   n=29962  loss=949  rate=3.17% |
| risky |   n= 490  loss=174  rate=35.51% |   n=16978  loss=1379  rate=8.12% |   n=3060  loss=197  rate=6.44% |   n=5522  loss=2106  rate=38.14% |
| **all** | **  n=21155  loss=6430  rate=30.39%** | **  n=19520  loss=1937  rate=9.92%** | **  n=3065  loss=197  rate=6.43%** | **  n=35484  loss=3055  rate=8.61%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
