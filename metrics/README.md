# Phase 4 readiness

_Updated: 2026-06-18T03:55:21.807Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 40 of 90)
- Earliest unlock: **2026-08-07** (49 days away)
- Probe rows collected: **23,124**
- Outcome patches resolved: **24,763**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 15.95% (n=7805) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.24% (n=680) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7702  loss=1245  rate=16.16% |   n= 393  loss= 64  rate=16.28% |   n=   5  loss=  0  rate=0.00% |   n=4874  loss= 78  rate=1.60% |
| risky |   n= 103  loss=  0  rate=0.00% |   n=4298  loss=211  rate=4.91% |   n= 675  loss= 22  rate=3.26% |   n= 874  loss=257  rate=29.41% |
| **all** | **  n=7805  loss=1245  rate=15.95%** | **  n=4691  loss=275  rate=5.86%** | **  n= 680  loss= 22  rate=3.24%** | **  n=5748  loss=335  rate=5.83%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=4280  loss=138  rate=3.22% |   n=  41  loss=  2  rate=4.88% |   n=   4  loss=  0  rate=0.00% |   n=  14  loss= 10  rate=71.43% |
| risky |   n=  15  loss=  1  rate=6.67% |   n=1332  loss= 23  rate=1.73% |   n= 152  loss=  1  rate=0.66% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=4295  loss=139  rate=3.24%** | **  n=1373  loss= 25  rate=1.82%** | **  n= 156  loss=  1  rate=0.64%** | **  n=  15  loss= 11  rate=73.33%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
