# Phase 4 readiness

_Updated: 2026-11-21T09:00:19.938Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 196 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **115,074**
- Outcome patches resolved: **208,245**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 21.39% (n=35656) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.82% (n=4462) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=35013  loss=7530  rate=21.51% |   n=4589  loss=703  rate=15.32% |   n=   6  loss=  0  rate=0.00% |   n=34666  loss=970  rate=2.80% |
| risky |   n= 643  loss= 96  rate=14.93% |   n=24978  loss=1545  rate=6.19% |   n=4456  loss=215  rate=4.82% |   n=6523  loss=2331  rate=35.74% |
| **all** | **  n=35656  loss=7626  rate=21.39%** | **  n=29567  loss=2248  rate=7.60%** | **  n=4462  loss=215  rate=4.82%** | **  n=41189  loss=3301  rate=8.01%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=27461  loss=6359  rate=23.16% |   n=3559  loss=568  rate=15.96% |   n=   5  loss=  0  rate=0.00% |   n=34247  loss=1359  rate=3.97% |
| risky |   n= 556  loss=176  rate=31.65% |   n=21363  loss=1435  rate=6.72% |   n=3842  loss=204  rate=5.31% |   n=6338  loss=2859  rate=45.11% |
| **all** | **  n=28017  loss=6535  rate=23.33%** | **  n=24922  loss=2003  rate=8.04%** | **  n=3847  loss=204  rate=5.30%** | **  n=40585  loss=4218  rate=10.39%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
