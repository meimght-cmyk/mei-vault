# Phase 4 readiness

_Updated: 2026-09-01T10:51:47.007Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 115 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **67,374**
- Outcome patches resolved: **112,848**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 30.33% (n=17674) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.40% (n=2420) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17244  loss=5328  rate=30.90% |   n=1923  loss=452  rate=23.50% |   n=   5  loss=  0  rate=0.00% |   n=23302  loss=517  rate=2.22% |
| risky |   n= 430  loss= 32  rate=7.44% |   n=13515  loss=1145  rate=8.47% |   n=2415  loss=155  rate=6.42% |   n=4340  loss=1336  rate=30.78% |
| **all** | **  n=17674  loss=5360  rate=30.33%** | **  n=15438  loss=1597  rate=10.34%** | **  n=2420  loss=155  rate=6.40%** | **  n=27642  loss=1853  rate=6.70%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14338  loss=4499  rate=31.38% |   n=1406  loss=347  rate=24.68% |   n=   5  loss=  0  rate=0.00% |   n=17725  loss=423  rate=2.39% |
| risky |   n= 330  loss= 37  rate=11.21% |   n=10636  loss=1034  rate=9.72% |   n=1870  loss=147  rate=7.86% |   n=3364  loss=1078  rate=32.05% |
| **all** | **  n=14668  loss=4536  rate=30.92%** | **  n=12042  loss=1381  rate=11.47%** | **  n=1875  loss=147  rate=7.84%** | **  n=21089  loss=1501  rate=7.12%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
