# Phase 4 readiness

_Updated: 2026-08-12T15:54:31.325Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 95 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **55,674**
- Outcome patches resolved: **89,448**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 28.64% (n=15075) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.88% (n=1949) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14733  loss=4294  rate=29.15% |   n=1476  loss=346  rate=23.44% |   n=   5  loss=  0  rate=0.00% |   n=18460  loss=383  rate=2.07% |
| risky |   n= 342  loss= 24  rate=7.02% |   n=11032  loss=979  rate=8.87% |   n=1944  loss=134  rate=6.89% |   n=3482  loss=1107  rate=31.79% |
| **all** | **  n=15075  loss=4318  rate=28.64%** | **  n=12508  loss=1325  rate=10.59%** | **  n=1949  loss=134  rate=6.88%** | **  n=21942  loss=1490  rate=6.79%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11753  loss=3374  rate=28.71% |   n=1033  loss=248  rate=24.01% |   n=   5  loss=  0  rate=0.00% |   n=12883  loss=290  rate=2.25% |
| risky |   n= 236  loss= 23  rate=9.75% |   n=8170  loss=821  rate=10.05% |   n=1400  loss=115  rate=8.21% |   n=2494  loss=828  rate=33.20% |
| **all** | **  n=11989  loss=3397  rate=28.33%** | **  n=9203  loss=1069  rate=11.62%** | **  n=1405  loss=115  rate=8.19%** | **  n=15377  loss=1118  rate=7.27%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
