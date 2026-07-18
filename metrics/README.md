# Phase 4 readiness

_Updated: 2026-07-18T17:01:50.088Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 70 of 90)
- Earliest unlock: **2026-08-07** (19 days away)
- Probe rows collected: **40,974**
- Outcome patches resolved: **60,198**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 25.28% (n=11704) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.23% (n=1356) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11478  loss=2943  rate=25.64% |   n= 989  loss=213  rate=21.54% |   n=   5  loss=  0  rate=0.00% |   n=12402  loss=241  rate=1.94% |
| risky |   n= 226  loss= 16  rate=7.08% |   n=7911  loss=737  rate=9.32% |   n=1351  loss= 98  rate=7.25% |   n=2412  loss=825  rate=34.20% |
| **all** | **  n=11704  loss=2959  rate=25.28%** | **  n=8900  loss=950  rate=10.67%** | **  n=1356  loss= 98  rate=7.23%** | **  n=14814  loss=1066  rate=7.20%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8700  loss=2009  rate=23.09% |   n= 565  loss=146  rate=25.84% |   n=   5  loss=  0  rate=0.00% |   n=6704  loss=123  rate=1.83% |
| risky |   n= 133  loss= 12  rate=9.02% |   n=5263  loss=620  rate=11.78% |   n= 864  loss= 95  rate=11.00% |   n=1190  loss=308  rate=25.88% |
| **all** | **  n=8833  loss=2021  rate=22.88%** | **  n=5828  loss=766  rate=13.14%** | **  n= 869  loss= 95  rate=10.93%** | **  n=7894  loss=431  rate=5.46%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
