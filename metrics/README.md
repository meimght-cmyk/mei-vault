# Phase 4 readiness

_Updated: 2026-05-31T03:22:39.530Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 22 of 90)
- Earliest unlock: **2026-08-07** (67 days away)
- Probe rows collected: **13,074**
- Outcome patches resolved: **8,874**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 5.38% (n=5443) — floor ≤ 2%
- ❌ **BLOCK precision**: 1.81% (n=277) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=5406  loss=293  rate=5.42% |   n=  90  loss=  3  rate=3.33% |   n=   4  loss=  0  rate=0.00% |   n= 774  loss= 17  rate=2.20% |
| risky |   n=  37  loss=  0  rate=0.00% |   n=2137  loss= 43  rate=2.01% |   n= 273  loss=  5  rate=1.83% |   n= 153  loss= 33  rate=21.57% |
| **all** | **  n=5443  loss=293  rate=5.38%** | **  n=2227  loss= 46  rate=2.07%** | **  n= 277  loss=  5  rate=1.81%** | **  n= 927  loss= 50  rate=5.39%** |

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
