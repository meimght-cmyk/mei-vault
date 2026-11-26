# Phase 4 readiness

_Updated: 2026-11-26T12:48:50.967Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 201 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **117,624**
- Outcome patches resolved: **214,247**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 20.39% (n=37401) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.67% (n=4601) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=36739  loss=7530  rate=20.50% |   n=4824  loss=703  rate=14.57% |   n=   6  loss=  0  rate=0.00% |   n=34705  loss=975  rate=2.81% |
| risky |   n= 662  loss= 96  rate=14.50% |   n=25786  loss=1547  rate=6.00% |   n=4595  loss=215  rate=4.68% |   n=6557  loss=2364  rate=36.05% |
| **all** | **  n=37401  loss=7626  rate=20.39%** | **  n=30610  loss=2250  rate=7.35%** | **  n=4601  loss=215  rate=4.67%** | **  n=41262  loss=3339  rate=8.09%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=29140  loss=6427  rate=22.06% |   n=3787  loss=576  rate=15.21% |   n=   6  loss=  0  rate=0.00% |   n=34340  loss=1370  rate=3.99% |
| risky |   n= 575  loss=178  rate=30.96% |   n=22167  loss=1471  rate=6.64% |   n=3979  loss=207  rate=5.20% |   n=6379  loss=2899  rate=45.45% |
| **all** | **  n=29715  loss=6605  rate=22.23%** | **  n=25954  loss=2047  rate=7.89%** | **  n=3985  loss=207  rate=5.19%** | **  n=40719  loss=4269  rate=10.48%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
