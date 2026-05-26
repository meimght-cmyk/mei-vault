# Phase 4 readiness

_Updated: 2026-05-26T00:51:52.360Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 17 of 90)
- Earliest unlock: **2026-08-07** (72 days away)
- Probe rows collected: **10,074**
- Outcome patches resolved: **5,689**

## Phase 4 floors (7-day horizon)

- ✅ **ALLOW false-negative rate**: 1.41% (n=4196) — floor ≤ 2%
- ❌ **BLOCK precision**: 0.00% (n=151) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=4182  loss= 59  rate=1.41% |   n=  40  loss=  2  rate=5.00% |   n=   4  loss=  0  rate=0.00% |   n=  13  loss= 10  rate=76.92% |
| risky |   n=  14  loss=  0  rate=0.00% |   n=1288  loss=  4  rate=0.31% |   n= 147  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=4196  loss= 59  rate=1.41%** | **  n=1328  loss=  6  rate=0.45%** | **  n= 151  loss=  0  rate=0.00%** | **  n=  14  loss= 11  rate=78.57%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=0 |   n=0 |   n=0 |   n=0 |
| risky |   n=0 |   n=0 |   n=0 |   n=0 |
| **all** | **  n=0** | **  n=0** | **  n=0** | **  n=0** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
