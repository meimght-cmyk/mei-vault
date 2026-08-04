# Phase 4 readiness

_Updated: 2026-08-04T08:08:28.507Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 87 of 90)
- Earliest unlock: **2026-08-07** (2 days away)
- Probe rows collected: **50,724**
- Outcome patches resolved: **79,698**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 27.89% (n=13988) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.14% (n=1751) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13684  loss=3880  rate=28.35% |   n=1279  loss=288  rate=22.52% |   n=   5  loss=  0  rate=0.00% |   n=16506  loss=342  rate=2.07% |
| risky |   n= 304  loss= 21  rate=6.91% |   n=9993  loss=894  rate=8.95% |   n=1746  loss=125  rate=7.16% |   n=3157  loss=1033  rate=32.72% |
| **all** | **  n=13988  loss=3901  rate=27.89%** | **  n=11272  loss=1182  rate=10.49%** | **  n=1751  loss=125  rate=7.14%** | **  n=19663  loss=1375  rate=6.99%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10627  loss=2876  rate=27.06% |   n= 857  loss=208  rate=24.27% |   n=   5  loss=  0  rate=0.00% |   n=10885  loss=237  rate=2.18% |
| risky |   n= 193  loss= 15  rate=7.77% |   n=7103  loss=743  rate=10.46% |   n=1201  loss=108  rate=8.99% |   n=2153  loss=749  rate=34.79% |
| **all** | **  n=10820  loss=2891  rate=26.72%** | **  n=7960  loss=951  rate=11.95%** | **  n=1206  loss=108  rate=8.96%** | **  n=13038  loss=986  rate=7.56%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
