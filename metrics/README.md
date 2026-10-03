# Phase 4 readiness

_Updated: 2026-10-03T19:14:30.554Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 147 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **86,424**
- Outcome patches resolved: **150,948**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.89% (n=21816) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.21% (n=3189) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21321  loss=7084  rate=33.23% |   n=2663  loss=654  rate=24.56% |   n=   5  loss=  0  rate=0.00% |   n=31185  loss=720  rate=2.31% |
| risky |   n= 495  loss= 91  rate=18.38% |   n=17644  loss=1431  rate=8.11% |   n=3184  loss=198  rate=6.22% |   n=5727  loss=1699  rate=29.67% |
| **all** | **  n=21816  loss=7175  rate=32.89%** | **  n=20307  loss=2085  rate=10.27%** | **  n=3189  loss=198  rate=6.21%** | **  n=36912  loss=2419  rate=6.55%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18429  loss=6023  rate=32.68% |   n=2135  loss=531  rate=24.87% |   n=   5  loss=  0  rate=0.00% |   n=25605  loss=604  rate=2.36% |
| risky |   n= 470  loss=169  rate=35.96% |   n=14703  loss=1342  rate=9.13% |   n=2641  loss=194  rate=7.35% |   n=4736  loss=1486  rate=31.38% |
| **all** | **  n=18899  loss=6192  rate=32.76%** | **  n=16838  loss=1873  rate=11.12%** | **  n=2646  loss=194  rate=7.33%** | **  n=30341  loss=2090  rate=6.89%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
