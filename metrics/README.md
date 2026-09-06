# Phase 4 readiness

_Updated: 2026-09-06T15:59:04.571Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 120 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **70,374**
- Outcome patches resolved: **118,998**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 30.99% (n=18367) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.36% (n=2546) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17910  loss=5638  rate=31.48% |   n=2037  loss=478  rate=23.47% |   n=   5  loss=  0  rate=0.00% |   n=24622  loss=555  rate=2.25% |
| risky |   n= 457  loss= 54  rate=11.82% |   n=14181  loss=1183  rate=8.34% |   n=2541  loss=162  rate=6.38% |   n=4571  loss=1394  rate=30.50% |
| **all** | **  n=18367  loss=5692  rate=30.99%** | **  n=16218  loss=1661  rate=10.24%** | **  n=2546  loss=162  rate=6.36%** | **  n=29193  loss=1949  rate=6.68%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14982  loss=4729  rate=31.56% |   n=1522  loss=380  rate=24.97% |   n=   5  loss=  0  rate=0.00% |   n=18965  loss=447  rate=2.36% |
| risky |   n= 352  loss= 54  rate=15.34% |   n=11281  loss=1076  rate=9.54% |   n=1988  loss=155  rate=7.80% |   n=3579  loss=1135  rate=31.71% |
| **all** | **  n=15334  loss=4783  rate=31.19%** | **  n=12803  loss=1456  rate=11.37%** | **  n=1993  loss=155  rate=7.78%** | **  n=22544  loss=1582  rate=7.02%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
