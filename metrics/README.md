# Phase 4 readiness

_Updated: 2026-06-12T23:28:30.043Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 34 of 90)
- Earliest unlock: **2026-08-07** (55 days away)
- Probe rows collected: **19,974**
- Outcome patches resolved: **19,363**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 14.18% (n=7265) — floor ≤ 2%
- ❌ **BLOCK precision**: 2.71% (n=591) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7178  loss=1030  rate=14.35% |   n= 315  loss= 51  rate=16.19% |   n=   5  loss=  0  rate=0.00% |   n=3876  loss= 58  rate=1.50% |
| risky |   n=  87  loss=  0  rate=0.00% |   n=3774  loss=167  rate=4.43% |   n= 586  loss= 16  rate=2.73% |   n= 703  loss=203  rate=28.88% |
| **all** | **  n=7265  loss=1030  rate=14.18%** | **  n=4089  loss=218  rate=5.33%** | **  n= 591  loss= 16  rate=2.71%** | **  n=4579  loss=261  rate=5.70%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=2294  loss= 69  rate=3.01% |   n=  30  loss=  1  rate=3.33% |   n=   4  loss=  0  rate=0.00% |   n=  11  loss= 10  rate=90.91% |
| risky |   n=0 |   n= 449  loss=  0  rate=0.00% |   n=  50  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=2294  loss= 69  rate=3.01%** | **  n= 479  loss=  1  rate=0.21%** | **  n=  54  loss=  0  rate=0.00%** | **  n=  12  loss= 11  rate=91.67%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
