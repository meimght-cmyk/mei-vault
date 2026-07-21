# Phase 4 readiness

_Updated: 2026-07-21T19:48:16.637Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 73 of 90)
- Earliest unlock: **2026-08-07** (16 days away)
- Probe rows collected: **42,774**
- Outcome patches resolved: **63,798**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 25.80% (n=12114) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.16% (n=1424) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11873  loss=3108  rate=26.18% |   n=1053  loss=230  rate=21.84% |   n=   5  loss=  0  rate=0.00% |   n=13143  loss=255  rate=1.94% |
| risky |   n= 241  loss= 17  rate=7.05% |   n=8279  loss=760  rate=9.18% |   n=1419  loss=102  rate=7.19% |   n=2561  loss=872  rate=34.05% |
| **all** | **  n=12114  loss=3125  rate=25.80%** | **  n=9332  loss=990  rate=10.61%** | **  n=1424  loss=102  rate=7.16%** | **  n=15704  loss=1127  rate=7.18%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9099  loss=2178  rate=23.94% |   n= 633  loss=163  rate=25.75% |   n=   5  loss=  0  rate=0.00% |   n=7437  loss=133  rate=1.79% |
| risky |   n= 145  loss= 12  rate=8.28% |   n=5645  loss=648  rate=11.48% |   n= 933  loss= 98  rate=10.50% |   n=1327  loss=353  rate=26.60% |
| **all** | **  n=9244  loss=2190  rate=23.69%** | **  n=6278  loss=811  rate=12.92%** | **  n= 938  loss= 98  rate=10.45%** | **  n=8764  loss=486  rate=5.55%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
