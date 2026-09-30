# Phase 4 readiness

_Updated: 2026-09-30T16:04:20.670Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 144 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **84,624**
- Outcome patches resolved: **147,348**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.60% (n=21419) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.26% (n=3114) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20926  loss=6894  rate=32.94% |   n=2592  loss=634  rate=24.46% |   n=   5  loss=  0  rate=0.00% |   n=30451  loss=702  rate=2.31% |
| risky |   n= 493  loss= 89  rate=18.05% |   n=17243  loss=1406  rate=8.15% |   n=3109  loss=195  rate=6.27% |   n=5605  loss=1668  rate=29.76% |
| **all** | **  n=21419  loss=6983  rate=32.60%** | **  n=19835  loss=2040  rate=10.28%** | **  n=3114  loss=195  rate=6.26%** | **  n=36056  loss=2370  rate=6.57%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18040  loss=5859  rate=32.48% |   n=2061  loss=512  rate=24.84% |   n=   5  loss=  0  rate=0.00% |   n=24868  loss=585  rate=2.35% |
| risky |   n= 461  loss=160  rate=34.71% |   n=14315  loss=1318  rate=9.21% |   n=2567  loss=191  rate=7.44% |   n=4607  loss=1454  rate=31.56% |
| **all** | **  n=18501  loss=6019  rate=32.53%** | **  n=16376  loss=1830  rate=11.17%** | **  n=2572  loss=191  rate=7.43%** | **  n=29475  loss=2039  rate=6.92%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
