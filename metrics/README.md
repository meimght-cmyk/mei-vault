# Phase 4 readiness

_Updated: 2026-10-22T15:51:19.044Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 166 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **97,524**
- Outcome patches resolved: **173,148**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.13% (n=25667) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.71% (n=3660) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=25138  loss=7384  rate=29.37% |   n=3238  loss=685  rate=21.16% |   n=   5  loss=  0  rate=0.00% |   n=34193  loss=918  rate=2.68% |
| risky |   n= 529  loss= 92  rate=17.39% |   n=20265  loss=1483  rate=7.32% |   n=3655  loss=209  rate=5.72% |   n=6301  loss=2112  rate=33.52% |
| **all** | **  n=25667  loss=7476  rate=29.13%** | **  n=23503  loss=2168  rate=9.22%** | **  n=3660  loss=209  rate=5.71%** | **  n=40494  loss=3030  rate=7.48%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20795  loss=6256  rate=30.08% |   n=2566  loss=558  rate=21.75% |   n=   5  loss=  0  rate=0.00% |   n=30208  loss=974  rate=3.22% |
| risky |   n= 491  loss=174  rate=35.44% |   n=17110  loss=1379  rate=8.06% |   n=3084  loss=197  rate=6.39% |   n=5565  loss=2146  rate=38.56% |
| **all** | **  n=21286  loss=6430  rate=30.21%** | **  n=19676  loss=1937  rate=9.84%** | **  n=3089  loss=197  rate=6.38%** | **  n=35773  loss=3120  rate=8.72%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
