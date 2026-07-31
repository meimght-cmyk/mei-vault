# Phase 4 readiness

_Updated: 2026-07-31T04:21:46.889Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 83 of 90)
- Earliest unlock: **2026-08-07** (6 days away)
- Probe rows collected: **48,324**
- Outcome patches resolved: **74,898**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 27.48% (n=13421) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.29% (n=1646) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13135  loss=3668  rate=27.93% |   n=1207  loss=271  rate=22.45% |   n=   5  loss=  0  rate=0.00% |   n=15427  loss=309  rate=2.00% |
| risky |   n= 286  loss= 20  rate=6.99% |   n=9461  loss=858  rate=9.07% |   n=1641  loss=120  rate=7.31% |   n=2962  loss=970  rate=32.75% |
| **all** | **  n=13421  loss=3688  rate=27.48%** | **  n=10668  loss=1129  rate=10.58%** | **  n=1646  loss=120  rate=7.29%** | **  n=18389  loss=1279  rate=6.96%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10351  loss=2737  rate=26.44% |   n= 816  loss=199  rate=24.39% |   n=   5  loss=  0  rate=0.00% |   n=9702  loss=182  rate=1.88% |
| risky |   n= 184  loss= 14  rate=7.61% |   n=6841  loss=729  rate=10.66% |   n=1154  loss=108  rate=9.36% |   n=1721  loss=461  rate=26.79% |
| **all** | **  n=10535  loss=2751  rate=26.11%** | **  n=7657  loss=928  rate=12.12%** | **  n=1159  loss=108  rate=9.32%** | **  n=11423  loss=643  rate=5.63%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
