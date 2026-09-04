# Phase 4 readiness

_Updated: 2026-09-04T13:52:32.355Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 118 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **69,174**
- Outcome patches resolved: **116,448**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 30.74% (n=18087) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.37% (n=2497) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17642  loss=5517  rate=31.27% |   n=1993  loss=468  rate=23.48% |   n=   5  loss=  0  rate=0.00% |   n=24034  loss=533  rate=2.22% |
| risky |   n= 445  loss= 43  rate=9.66% |   n=13904  loss=1166  rate=8.39% |   n=2492  loss=159  rate=6.38% |   n=4459  loss=1357  rate=30.43% |
| **all** | **  n=18087  loss=5560  rate=30.74%** | **  n=15897  loss=1634  rate=10.28%** | **  n=2497  loss=159  rate=6.37%** | **  n=28493  loss=1890  rate=6.63%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14733  loss=4642  rate=31.51% |   n=1476  loss=366  rate=24.80% |   n=   5  loss=  0  rate=0.00% |   n=18460  loss=440  rate=2.38% |
| risky |   n= 342  loss= 45  rate=13.16% |   n=11032  loss=1061  rate=9.62% |   n=1944  loss=152  rate=7.82% |   n=3482  loss=1102  rate=31.65% |
| **all** | **  n=15075  loss=4687  rate=31.09%** | **  n=12508  loss=1427  rate=11.41%** | **  n=1949  loss=152  rate=7.80%** | **  n=21942  loss=1542  rate=7.03%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
