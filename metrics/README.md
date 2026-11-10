# Phase 4 readiness

_Updated: 2026-11-10T17:55:52.975Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 185 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **108,774**
- Outcome patches resolved: **195,648**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 23.73% (n=31991) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.16% (n=4169) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=31390  loss=7495  rate=23.88% |   n=4095  loss=697  rate=17.02% |   n=   6  loss=  0  rate=0.00% |   n=34583  loss=960  rate=2.78% |
| risky |   n= 601  loss= 95  rate=15.81% |   n=23258  loss=1525  rate=6.56% |   n=4163  loss=215  rate=5.16% |   n=6478  loss=2286  rate=35.29% |
| **all** | **  n=31991  loss=7590  rate=23.73%** | **  n=27353  loss=2222  rate=8.12%** | **  n=4169  loss=215  rate=5.16%** | **  n=41061  loss=3246  rate=7.91%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=23817  loss=6316  rate=26.52% |   n=3059  loss=563  rate=18.40% |   n=   5  loss=  0  rate=0.00% |   n=34193  loss=1356  rate=3.97% |
| risky |   n= 514  loss=175  rate=34.05% |   n=19635  loss=1419  rate=7.23% |   n=3550  loss=203  rate=5.72% |   n=6301  loss=2822  rate=44.79% |
| **all** | **  n=24331  loss=6491  rate=26.68%** | **  n=22694  loss=1982  rate=8.73%** | **  n=3555  loss=203  rate=5.71%** | **  n=40494  loss=4178  rate=10.32%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
