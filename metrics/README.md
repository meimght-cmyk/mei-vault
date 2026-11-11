# Phase 4 readiness

_Updated: 2026-11-11T19:09:02.338Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 186 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **109,374**
- Outcome patches resolved: **196,848**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 23.46% (n=32347) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.12% (n=4197) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=31742  loss=7495  rate=23.61% |   n=4143  loss=697  rate=16.82% |   n=   6  loss=  0  rate=0.00% |   n=34583  loss=960  rate=2.78% |
| risky |   n= 605  loss= 95  rate=15.70% |   n=23426  loss=1525  rate=6.51% |   n=4191  loss=215  rate=5.13% |   n=6478  loss=2286  rate=35.29% |
| **all** | **  n=32347  loss=7590  rate=23.46%** | **  n=27569  loss=2222  rate=8.06%** | **  n=4197  loss=215  rate=5.12%** | **  n=41061  loss=3246  rate=7.91%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=24170  loss=6317  rate=26.14% |   n=3106  loss=563  rate=18.13% |   n=   5  loss=  0  rate=0.00% |   n=34193  loss=1356  rate=3.97% |
| risky |   n= 518  loss=175  rate=33.78% |   n=19803  loss=1419  rate=7.17% |   n=3578  loss=203  rate=5.67% |   n=6301  loss=2822  rate=44.79% |
| **all** | **  n=24688  loss=6492  rate=26.30%** | **  n=22909  loss=1982  rate=8.65%** | **  n=3583  loss=203  rate=5.67%** | **  n=40494  loss=4178  rate=10.32%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
