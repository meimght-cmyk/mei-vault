# Phase 4 readiness

_Updated: 2026-10-05T21:26:00.172Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 149 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **87,624**
- Outcome patches resolved: **153,498**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.92% (n=22114) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.19% (n=3247) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21619  loss=7189  rate=33.25% |   n=2718  loss=666  rate=24.50% |   n=   5  loss=  0  rate=0.00% |   n=31732  loss=728  rate=2.29% |
| risky |   n= 495  loss= 91  rate=18.38% |   n=17949  loss=1455  rate=8.11% |   n=3242  loss=201  rate=6.20% |   n=5814  loss=1718  rate=29.55% |
| **all** | **  n=22114  loss=7280  rate=32.92%** | **  n=20667  loss=2121  rate=10.26%** | **  n=3247  loss=201  rate=6.19%** | **  n=37546  loss=2446  rate=6.51%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18692  loss=6121  rate=32.75% |   n=2185  loss=546  rate=24.99% |   n=   5  loss=  0  rate=0.00% |   n=26092  loss=617  rate=2.36% |
| risky |   n= 472  loss=171  rate=36.23% |   n=14969  loss=1360  rate=9.09% |   n=2690  loss=196  rate=7.29% |   n=4819  loss=1501  rate=31.15% |
| **all** | **  n=19164  loss=6292  rate=32.83%** | **  n=17154  loss=1906  rate=11.11%** | **  n=2695  loss=196  rate=7.27%** | **  n=30911  loss=2118  rate=6.85%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
