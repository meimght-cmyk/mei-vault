# Phase 4 readiness

_Updated: 2026-08-19T22:54:23.253Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 102 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **60,024**
- Outcome patches resolved: **98,148**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.30% (n=16028) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.60% (n=2121) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15650  loss=4668  rate=29.83% |   n=1652  loss=390  rate=23.61% |   n=   5  loss=  0  rate=0.00% |   n=20267  loss=423  rate=2.09% |
| risky |   n= 378  loss= 29  rate=7.67% |   n=11949  loss=1033  rate=8.65% |   n=2116  loss=140  rate=6.62% |   n=3807  loss=1200  rate=31.52% |
| **all** | **  n=16028  loss=4697  rate=29.30%** | **  n=13601  loss=1423  rate=10.46%** | **  n=2121  loss=140  rate=6.60%** | **  n=24074  loss=1623  rate=6.74%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12718  loss=3837  rate=30.17% |   n=1162  loss=292  rate=25.13% |   n=   5  loss=  0  rate=0.00% |   n=14689  loss=344  rate=2.34% |
| risky |   n= 272  loss= 31  rate=11.40% |   n=9074  loss=912  rate=10.05% |   n=1567  loss=130  rate=8.30% |   n=2837  loss=941  rate=33.17% |
| **all** | **  n=12990  loss=3868  rate=29.78%** | **  n=10236  loss=1204  rate=11.76%** | **  n=1572  loss=130  rate=8.27%** | **  n=17526  loss=1285  rate=7.33%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
