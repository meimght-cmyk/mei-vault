# Phase 4 readiness

_Updated: 2026-08-25T03:43:44.497Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 108 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **63,024**
- Outcome patches resolved: **104,148**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.78% (n=16707) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.50% (n=2245) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16309  loss=4946  rate=30.33% |   n=1763  loss=418  rate=23.71% |   n=   5  loss=  0  rate=0.00% |   n=21497  loss=461  rate=2.14% |
| risky |   n= 398  loss= 29  rate=7.29% |   n=12599  loss=1083  rate=8.60% |   n=2240  loss=146  rate=6.52% |   n=4013  loss=1242  rate=30.95% |
| **all** | **  n=16707  loss=4975  rate=29.78%** | **  n=14362  loss=1501  rate=10.45%** | **  n=2245  loss=146  rate=6.50%** | **  n=25510  loss=1703  rate=6.68%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13409  loss=4132  rate=30.82% |   n=1241  loss=302  rate=24.34% |   n=   5  loss=  0  rate=0.00% |   n=15919  loss=376  rate=2.36% |
| risky |   n= 294  loss= 33  rate=11.22% |   n=9726  loss=962  rate=9.89% |   n=1693  loss=135  rate=7.97% |   n=3037  loss=986  rate=32.47% |
| **all** | **  n=13703  loss=4165  rate=30.39%** | **  n=10967  loss=1264  rate=11.53%** | **  n=1698  loss=135  rate=7.95%** | **  n=18956  loss=1362  rate=7.19%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
