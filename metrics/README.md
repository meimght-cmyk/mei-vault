# Phase 4 readiness

_Updated: 2026-05-27T01:28:51.835Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 18 of 90)
- Earliest unlock: **2026-08-07** (71 days away)
- Probe rows collected: **10,674**
- Outcome patches resolved: **6,289**

## Phase 4 floors (7-day horizon)

- ✅ **ALLOW false-negative rate**: 1.37% (n=4594) — floor ≤ 2%
- ❌ **BLOCK precision**: 0.00% (n=171) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=4576  loss= 63  rate=1.38% |   n=  44  loss=  2  rate=4.55% |   n=   4  loss=  0  rate=0.00% |   n=  15  loss= 10  rate=66.67% |
| risky |   n=  18  loss=  0  rate=0.00% |   n=1464  loss=  4  rate=0.27% |   n= 167  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=4594  loss= 63  rate=1.37%** | **  n=1508  loss=  6  rate=0.40%** | **  n= 171  loss=  0  rate=0.00%** | **  n=  16  loss= 11  rate=68.75%** |

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
