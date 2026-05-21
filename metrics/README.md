# Phase 4 readiness

_Updated: 2026-05-21T22:06:45.120Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 12 of 90)
- Earliest unlock: **2026-08-07** (77 days away)
- Probe rows collected: **7,674**
- Outcome patches resolved: **3,423**

## Phase 4 floors (7-day horizon)

- ✅ **ALLOW false-negative rate**: 1.30% (n=2693) — floor ≤ 2%
- ❌ **BLOCK precision**: 0.00% (n=74) _(n=74 < 100 required)_ — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=2693  loss= 35  rate=1.30% |   n=  30  loss=  1  rate=3.33% |   n=   4  loss=  0  rate=0.00% |   n=  12  loss= 10  rate=83.33% |
| risky |   n=0 |   n= 613  loss=  4  rate=0.65% |   n=  70  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=2693  loss= 35  rate=1.30%** | **  n= 643  loss=  5  rate=0.78%** | **  n=  74  loss=  0  rate=0.00%** | **  n=  13  loss= 11  rate=84.62%** |

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
