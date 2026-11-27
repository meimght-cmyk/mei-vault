# Phase 4 readiness

_Updated: 2026-11-27T14:02:28.435Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 202 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **118,224**
- Outcome patches resolved: **215,448**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 20.20% (n=37757) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.64% (n=4629) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=37091  loss=7530  rate=20.30% |   n=4872  loss=703  rate=14.43% |   n=   6  loss=  0  rate=0.00% |   n=34705  loss=975  rate=2.81% |
| risky |   n= 666  loss= 96  rate=14.41% |   n=25954  loss=1547  rate=5.96% |   n=4623  loss=215  rate=4.65% |   n=6557  loss=2364  rate=36.05% |
| **all** | **  n=37757  loss=7626  rate=20.20%** | **  n=30826  loss=2250  rate=7.30%** | **  n=4629  loss=215  rate=4.64%** | **  n=41262  loss=3339  rate=8.09%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=29456  loss=6427  rate=21.82% |   n=3830  loss=576  rate=15.04% |   n=   6  loss=  0  rate=0.00% |   n=34382  loss=1375  rate=4.00% |
| risky |   n= 579  loss=178  rate=30.74% |   n=22319  loss=1471  rate=6.59% |   n=4006  loss=207  rate=5.17% |   n=6396  loss=2916  rate=45.59% |
| **all** | **  n=30035  loss=6605  rate=21.99%** | **  n=26149  loss=2047  rate=7.83%** | **  n=4012  loss=207  rate=5.16%** | **  n=40778  loss=4291  rate=10.52%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
