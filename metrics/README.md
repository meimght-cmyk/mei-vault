# Phase 4 readiness

_Updated: 2026-11-24T20:03:15.282Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 199 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **117,024**
- Outcome patches resolved: **212,148**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 20.74% (n=36778) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.72% (n=4552) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=36123  loss=7530  rate=20.85% |   n=4740  loss=703  rate=14.83% |   n=   6  loss=  0  rate=0.00% |   n=34705  loss=975  rate=2.81% |
| risky |   n= 655  loss= 96  rate=14.66% |   n=25492  loss=1547  rate=6.07% |   n=4546  loss=215  rate=4.73% |   n=6557  loss=2364  rate=36.05% |
| **all** | **  n=36778  loss=7626  rate=20.74%** | **  n=30232  loss=2250  rate=7.44%** | **  n=4552  loss=215  rate=4.72%** | **  n=41262  loss=3339  rate=8.09%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=28607  loss=6393  rate=22.35% |   n=3714  loss=573  rate=15.43% |   n=   6  loss=  0  rate=0.00% |   n=34247  loss=1359  rate=3.97% |
| risky |   n= 569  loss=177  rate=31.11% |   n=21910  loss=1454  rate=6.64% |   n=3933  loss=204  rate=5.19% |   n=6338  loss=2859  rate=45.11% |
| **all** | **  n=29176  loss=6570  rate=22.52%** | **  n=25624  loss=2027  rate=7.91%** | **  n=3939  loss=204  rate=5.18%** | **  n=40585  loss=4218  rate=10.39%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
