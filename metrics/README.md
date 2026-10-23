# Phase 4 readiness

_Updated: 2026-10-23T17:00:30.893Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 167 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **98,124**
- Outcome patches resolved: **174,348**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 28.73% (n=26022) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.67% (n=3688) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=25489  loss=7384  rate=28.97% |   n=3286  loss=685  rate=20.85% |   n=   5  loss=  0  rate=0.00% |   n=34194  loss=918  rate=2.68% |
| risky |   n= 533  loss= 92  rate=17.26% |   n=20433  loss=1483  rate=7.26% |   n=3683  loss=209  rate=5.67% |   n=6301  loss=2112  rate=33.52% |
| **all** | **  n=26022  loss=7476  rate=28.73%** | **  n=23719  loss=2168  rate=9.14%** | **  n=3688  loss=209  rate=5.67%** | **  n=40495  loss=3030  rate=7.48%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20926  loss=6256  rate=29.90% |   n=2592  loss=558  rate=21.53% |   n=   5  loss=  0  rate=0.00% |   n=30451  loss=997  rate=3.27% |
| risky |   n= 493  loss=174  rate=35.29% |   n=17243  loss=1379  rate=8.00% |   n=3109  loss=197  rate=6.34% |   n=5605  loss=2184  rate=38.97% |
| **all** | **  n=21419  loss=6430  rate=30.02%** | **  n=19835  loss=1937  rate=9.77%** | **  n=3114  loss=197  rate=6.33%** | **  n=36056  loss=3181  rate=8.82%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
