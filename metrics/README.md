# Phase 4 readiness

_Updated: 2026-09-02T11:52:07.463Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 116 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **67,974**
- Outcome patches resolved: **114,048**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 30.42% (n=17809) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.42% (n=2446) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17374  loss=5385  rate=30.99% |   n=1950  loss=460  rate=23.59% |   n=   5  loss=  0  rate=0.00% |   n=23545  loss=521  rate=2.21% |
| risky |   n= 435  loss= 33  rate=7.59% |   n=13643  loss=1152  rate=8.44% |   n=2441  loss=157  rate=6.43% |   n=4381  loss=1344  rate=30.68% |
| **all** | **  n=17809  loss=5418  rate=30.42%** | **  n=15593  loss=1612  rate=10.34%** | **  n=2446  loss=157  rate=6.42%** | **  n=27926  loss=1865  rate=6.68%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14472  loss=4549  rate=31.43% |   n=1424  loss=350  rate=24.58% |   n=   5  loss=  0  rate=0.00% |   n=17973  loss=431  rate=2.40% |
| risky |   n= 334  loss= 37  rate=11.08% |   n=10767  loss=1044  rate=9.70% |   n=1896  loss=151  rate=7.96% |   n=3403  loss=1088  rate=31.97% |
| **all** | **  n=14806  loss=4586  rate=30.97%** | **  n=12191  loss=1394  rate=11.43%** | **  n=1901  loss=151  rate=7.94%** | **  n=21376  loss=1519  rate=7.11%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
