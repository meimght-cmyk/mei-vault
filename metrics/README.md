# Phase 4 readiness

_Updated: 2026-07-09T08:28:22.409Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 61 of 90)
- Earliest unlock: **2026-08-07** (28 days away)
- Probe rows collected: **35,424**
- Outcome patches resolved: **49,248**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 23.93% (n=10571) — floor ≤ 2%
- ❌ **BLOCK precision**: 8.07% (n=1165) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10386  loss=2519  rate=24.25% |   n= 821  loss=180  rate=21.92% |   n=   5  loss=  0  rate=0.00% |   n=10062  loss=186  rate=1.85% |
| risky |   n= 185  loss= 11  rate=5.95% |   n=6873  loss=659  rate=9.59% |   n=1160  loss= 94  rate=8.10% |   n=1882  loss=588  rate=31.24% |
| **all** | **  n=10571  loss=2530  rate=23.93%** | **  n=7694  loss=839  rate=10.90%** | **  n=1165  loss= 94  rate=8.07%** | **  n=11944  loss=774  rate=6.48%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7461  loss=1505  rate=20.17% |   n= 359  loss=103  rate=28.69% |   n=   5  loss=  0  rate=0.00% |   n=4449  loss= 81  rate=1.82% |
| risky |   n=  96  loss= 12  rate=12.50% |   n=4064  loss=525  rate=12.92% |   n= 632  loss= 78  rate=12.34% |   n= 808  loss=213  rate=26.36% |
| **all** | **  n=7557  loss=1517  rate=20.07%** | **  n=4423  loss=628  rate=14.20%** | **  n= 637  loss= 78  rate=12.24%** | **  n=5257  loss=294  rate=5.59%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
