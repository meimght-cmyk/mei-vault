# Phase 4 readiness

_Updated: 2026-11-05T11:46:38.340Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 180 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **105,624**
- Outcome patches resolved: **189,498**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 24.86% (n=30391) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.30% (n=4040) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=29808  loss=7462  rate=25.03% |   n=3878  loss=692  rate=17.84% |   n=   6  loss=  0  rate=0.00% |   n=34382  loss=937  rate=2.73% |
| risky |   n= 583  loss= 94  rate=16.12% |   n=22487  loss=1511  rate=6.72% |   n=4034  loss=214  rate=5.30% |   n=6396  loss=2206  rate=34.49% |
| **all** | **  n=30391  loss=7556  rate=24.86%** | **  n=26365  loss=2203  rate=8.36%** | **  n=4040  loss=214  rate=5.30%** | **  n=40778  loss=3143  rate=7.71%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22568  loss=6293  rate=27.88% |   n=2886  loss=562  rate=19.47% |   n=   5  loss=  0  rate=0.00% |   n=33515  loss=1289  rate=3.85% |
| risky |   n= 501  loss=174  rate=34.73% |   n=18882  loss=1402  rate=7.43% |   n=3419  loss=200  rate=5.85% |   n=6148  loss=2677  rate=43.54% |
| **all** | **  n=23069  loss=6467  rate=28.03%** | **  n=21768  loss=1964  rate=9.02%** | **  n=3424  loss=200  rate=5.84%** | **  n=39663  loss=3966  rate=10.00%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
