# Phase 4 readiness

_Updated: 2026-11-28T15:23:15.213Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 203 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **118,824**
- Outcome patches resolved: **216,798**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 19.98% (n=38166) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.61% (n=4662) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=37496  loss=7530  rate=20.08% |   n=4926  loss=703  rate=14.27% |   n=   6  loss=  0  rate=0.00% |   n=34746  loss=981  rate=2.82% |
| risky |   n= 670  loss= 96  rate=14.33% |   n=26143  loss=1547  rate=5.92% |   n=4656  loss=215  rate=4.62% |   n=6581  loss=2387  rate=36.27% |
| **all** | **  n=38166  loss=7626  rate=19.98%** | **  n=31069  loss=2250  rate=7.24%** | **  n=4662  loss=215  rate=4.61%** | **  n=41327  loss=3368  rate=8.15%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=29808  loss=6427  rate=21.56% |   n=3878  loss=576  rate=14.85% |   n=   6  loss=  0  rate=0.00% |   n=34382  loss=1375  rate=4.00% |
| risky |   n= 583  loss=178  rate=30.53% |   n=22487  loss=1471  rate=6.54% |   n=4034  loss=207  rate=5.13% |   n=6396  loss=2916  rate=45.59% |
| **all** | **  n=30391  loss=6605  rate=21.73%** | **  n=26365  loss=2047  rate=7.76%** | **  n=4040  loss=207  rate=5.12%** | **  n=40778  loss=4291  rate=10.52%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
