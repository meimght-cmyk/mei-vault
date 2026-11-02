# Phase 4 readiness

_Updated: 2026-11-02T08:03:04.111Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 177 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **103,824**
- Outcome patches resolved: **185,748**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 25.74% (n=29354) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.41% (n=3953) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=28783  loss=7462  rate=25.93% |   n=3738  loss=692  rate=18.51% |   n=   6  loss=  0  rate=0.00% |   n=34247  loss=921  rate=2.69% |
| risky |   n= 571  loss= 94  rate=16.46% |   n=21994  loss=1511  rate=6.87% |   n=3947  loss=214  rate=5.42% |   n=6338  loss=2149  rate=33.91% |
| **all** | **  n=29354  loss=7556  rate=25.74%** | **  n=25732  loss=2203  rate=8.56%** | **  n=3953  loss=214  rate=5.41%** | **  n=40585  loss=3070  rate=7.56%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22172  loss=6290  rate=28.37% |   n=2816  loss=562  rate=19.96% |   n=   5  loss=  0  rate=0.00% |   n=32781  loss=1218  rate=3.72% |
| risky |   n= 497  loss=174  rate=35.01% |   n=18480  loss=1402  rate=7.59% |   n=3344  loss=200  rate=5.98% |   n=6029  loss=2566  rate=42.56% |
| **all** | **  n=22669  loss=6464  rate=28.51%** | **  n=21296  loss=1964  rate=9.22%** | **  n=3349  loss=200  rate=5.97%** | **  n=38810  loss=3784  rate=9.75%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
