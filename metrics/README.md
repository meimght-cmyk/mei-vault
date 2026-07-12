# Phase 4 readiness

_Updated: 2026-07-12T11:15:35.609Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 64 of 90)
- Earliest unlock: **2026-08-07** (25 days away)
- Probe rows collected: **37,224**
- Outcome patches resolved: **52,848**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 24.30% (n=10855) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.84% (n=1212) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10661  loss=2626  rate=24.63% |   n= 861  loss=187  rate=21.72% |   n=   5  loss=  0  rate=0.00% |   n=10947  loss=216  rate=1.97% |
| risky |   n= 194  loss= 12  rate=6.19% |   n=7135  loss=685  rate=9.60% |   n=1207  loss= 95  rate=7.87% |   n=2164  loss=771  rate=35.63% |
| **all** | **  n=10855  loss=2638  rate=24.30%** | **  n=7996  loss=872  rate=10.91%** | **  n=1212  loss= 95  rate=7.84%** | **  n=13111  loss=987  rate=7.53%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7874  loss=1679  rate=21.32% |   n= 420  loss=115  rate=27.38% |   n=   5  loss=  0  rate=0.00% |   n=5175  loss= 93  rate=1.80% |
| risky |   n= 108  loss= 12  rate=11.11% |   n=4462  loss=558  rate=12.51% |   n= 707  loss= 82  rate=11.60% |   n= 923  loss=236  rate=25.57% |
| **all** | **  n=7982  loss=1691  rate=21.19%** | **  n=4882  loss=673  rate=13.79%** | **  n= 712  loss= 82  rate=11.52%** | **  n=6098  loss=329  rate=5.40%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
