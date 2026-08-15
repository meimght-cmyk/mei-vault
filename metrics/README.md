# Phase 4 readiness

_Updated: 2026-08-15T18:54:11.742Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 98 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **57,474**
- Outcome patches resolved: **93,198**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.10% (n=15489) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.73% (n=2021) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15132  loss=4482  rate=29.62% |   n=1554  loss=368  rate=23.68% |   n=   5  loss=  0  rate=0.00% |   n=19283  loss=400  rate=2.07% |
| risky |   n= 357  loss= 25  rate=7.00% |   n=11431  loss=999  rate=8.74% |   n=2016  loss=136  rate=6.75% |   n=3646  loss=1164  rate=31.93% |
| **all** | **  n=15489  loss=4507  rate=29.10%** | **  n=12985  loss=1367  rate=10.53%** | **  n=2021  loss=136  rate=6.73%** | **  n=22929  loss=1564  rate=6.82%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12136  loss=3541  rate=29.18% |   n=1092  loss=269  rate=24.63% |   n=   5  loss=  0  rate=0.00% |   n=13641  loss=314  rate=2.30% |
| risky |   n= 252  loss= 26  rate=10.32% |   n=8525  loss=844  rate=9.90% |   n=1467  loss=118  rate=8.04% |   n=2656  loss=893  rate=33.62% |
| **all** | **  n=12388  loss=3567  rate=28.79%** | **  n=9617  loss=1113  rate=11.57%** | **  n=1472  loss=118  rate=8.02%** | **  n=16297  loss=1207  rate=7.41%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
