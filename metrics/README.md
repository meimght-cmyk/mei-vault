# Phase 4 readiness

_Updated: 2026-07-30T03:19:24.280Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 82 of 90)
- Earliest unlock: **2026-08-07** (7 days away)
- Probe rows collected: **47,724**
- Outcome patches resolved: **73,548**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 27.36% (n=13279) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.28% (n=1621) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12997  loss=3613  rate=27.80% |   n=1194  loss=267  rate=22.36% |   n=   5  loss=  0  rate=0.00% |   n=15178  loss=300  rate=1.98% |
| risky |   n= 282  loss= 20  rate=7.09% |   n=9330  loss=849  rate=9.10% |   n=1616  loss=118  rate=7.30% |   n=2922  loss=960  rate=32.85% |
| **all** | **  n=13279  loss=3633  rate=27.36%** | **  n=10524  loss=1116  rate=10.60%** | **  n=1621  loss=118  rate=7.28%** | **  n=18100  loss=1260  rate=6.96%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10194  loss=2665  rate=26.14% |   n= 795  loss=197  rate=24.78% |   n=   5  loss=  0  rate=0.00% |   n=9380  loss=173  rate=1.84% |
| risky |   n= 178  loss= 13  rate=7.30% |   n=6689  loss=719  rate=10.75% |   n=1126  loss=107  rate=9.50% |   n=1657  loss=431  rate=26.01% |
| **all** | **  n=10372  loss=2678  rate=25.82%** | **  n=7484  loss=916  rate=12.24%** | **  n=1131  loss=107  rate=9.46%** | **  n=11037  loss=604  rate=5.47%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
