# Phase 4 readiness

_Updated: 2026-05-29T02:31:10.724Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 20 of 90)
- Earliest unlock: **2026-08-07** (69 days away)
- Probe rows collected: **11,874**
- Outcome patches resolved: **7,674**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 3.31% (n=5138) — floor ≤ 2%
- ❌ **BLOCK precision**: 0.43% (n=232) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=5109  loss=170  rate=3.33% |   n=  62  loss=  2  rate=3.23% |   n=   4  loss=  0  rate=0.00% |   n= 299  loss= 14  rate=4.68% |
| risky |   n=  29  loss=  0  rate=0.00% |   n=1867  loss= 24  rate=1.29% |   n= 228  loss=  1  rate=0.44% |   n=  76  loss= 18  rate=23.68% |
| **all** | **  n=5138  loss=170  rate=3.31%** | **  n=1929  loss= 26  rate=1.35%** | **  n= 232  loss=  1  rate=0.43%** | **  n= 375  loss= 32  rate=8.53%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=0 |   n=0 |   n=0 |   n=0 |
| risky |   n=0 |   n=0 |   n=0 |   n=0 |
| **all** | **  n=0** | **  n=0** | **  n=0** | **  n=0** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
