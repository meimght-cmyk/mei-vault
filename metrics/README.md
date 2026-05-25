# Phase 4 readiness

_Updated: 2026-05-25T00:08:23.294Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 16 of 90)
- Earliest unlock: **2026-08-07** (73 days away)
- Probe rows collected: **9,474**
- Outcome patches resolved: **5,089**

## Phase 4 floors (7-day horizon)

- ✅ **ALLOW false-negative rate**: 1.45% (n=3796) — floor ≤ 2%
- ❌ **BLOCK precision**: 0.00% (n=129) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=3786  loss= 55  rate=1.45% |   n=  36  loss=  2  rate=5.56% |   n=   4  loss=  0  rate=0.00% |   n=  13  loss= 10  rate=76.92% |
| risky |   n=  10  loss=  0  rate=0.00% |   n=1114  loss=  4  rate=0.36% |   n= 125  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=3796  loss= 55  rate=1.45%** | **  n=1150  loss=  6  rate=0.52%** | **  n= 129  loss=  0  rate=0.00%** | **  n=  14  loss= 11  rate=78.57%** |

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
