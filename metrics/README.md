# Phase 4 readiness

_Updated: 2026-07-10T09:24:00.110Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 62 of 90)
- Earliest unlock: **2026-08-07** (27 days away)
- Probe rows collected: **36,024**
- Outcome patches resolved: **50,448**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 23.93% (n=10571) — floor ≤ 2%
- ❌ **BLOCK precision**: 8.07% (n=1165) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10386  loss=2519  rate=24.25% |   n= 821  loss=180  rate=21.92% |   n=   5  loss=  0  rate=0.00% |   n=10462  loss=207  rate=1.98% |
| risky |   n= 185  loss= 11  rate=5.95% |   n=6873  loss=659  rate=9.59% |   n=1160  loss= 94  rate=8.10% |   n=2082  loss=744  rate=35.73% |
| **all** | **  n=10571  loss=2530  rate=23.93%** | **  n=7694  loss=839  rate=10.90%** | **  n=1165  loss= 94  rate=8.07%** | **  n=12544  loss=951  rate=7.58%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7598  loss=1563  rate=20.57% |   n= 380  loss=107  rate=28.16% |   n=   5  loss=  0  rate=0.00% |   n=4691  loss= 85  rate=1.81% |
| risky |   n= 100  loss= 12  rate=12.00% |   n=4198  loss=538  rate=12.82% |   n= 656  loss= 79  rate=12.04% |   n= 846  loss=222  rate=26.24% |
| **all** | **  n=7698  loss=1575  rate=20.46%** | **  n=4578  loss=645  rate=14.09%** | **  n= 661  loss= 79  rate=11.95%** | **  n=5537  loss=307  rate=5.54%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
