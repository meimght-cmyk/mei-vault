# Phase 4 readiness

_Updated: 2026-11-09T16:42:21.247Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 184 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **108,174**
- Outcome patches resolved: **194,448**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 23.88% (n=31635) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.17% (n=4141) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=31038  loss=7462  rate=24.04% |   n=4047  loss=692  rate=17.10% |   n=   6  loss=  0  rate=0.00% |   n=34583  loss=960  rate=2.78% |
| risky |   n= 597  loss= 94  rate=15.75% |   n=23090  loss=1511  rate=6.54% |   n=4135  loss=214  rate=5.18% |   n=6478  loss=2286  rate=35.29% |
| **all** | **  n=31635  loss=7556  rate=23.88%** | **  n=27137  loss=2203  rate=8.12%** | **  n=4141  loss=214  rate=5.17%** | **  n=41061  loss=3246  rate=7.91%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=23461  loss=6312  rate=26.90% |   n=3015  loss=563  rate=18.67% |   n=   5  loss=  0  rate=0.00% |   n=34193  loss=1356  rate=3.97% |
| risky |   n= 510  loss=175  rate=34.31% |   n=19467  loss=1419  rate=7.29% |   n=3522  loss=203  rate=5.76% |   n=6301  loss=2822  rate=44.79% |
| **all** | **  n=23971  loss=6487  rate=27.06%** | **  n=22482  loss=1982  rate=8.82%** | **  n=3527  loss=203  rate=5.76%** | **  n=40494  loss=4178  rate=10.32%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
