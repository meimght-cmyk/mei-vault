# Phase 4 readiness

_Updated: 2026-06-21T06:50:03.109Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 43 of 90)
- Earliest unlock: **2026-08-07** (46 days away)
- Probe rows collected: **24,924**
- Outcome patches resolved: **28,548**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 17.49% (n=8226) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.31% (n=755) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8111  loss=1439  rate=17.74% |   n= 459  loss= 75  rate=16.34% |   n=   5  loss=  0  rate=0.00% |   n=5599  loss= 91  rate=1.63% |
| risky |   n= 115  loss=  0  rate=0.00% |   n=4691  loss=239  rate=5.09% |   n= 750  loss= 25  rate=3.33% |   n= 994  loss=283  rate=28.47% |
| **all** | **  n=8226  loss=1439  rate=17.49%** | **  n=5150  loss=314  rate=6.10%** | **  n= 755  loss= 25  rate=3.31%** | **  n=6593  loss=374  rate=5.67%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=5145  loss=316  rate=6.14% |   n=  65  loss=  3  rate=4.62% |   n=   4  loss=  0  rate=0.00% |   n= 360  loss= 15  rate=4.17% |
| risky |   n=  30  loss=  2  rate=6.67% |   n=1901  loss= 58  rate=3.05% |   n= 234  loss=  5  rate=2.14% |   n=  85  loss= 14  rate=16.47% |
| **all** | **  n=5175  loss=318  rate=6.14%** | **  n=1966  loss= 61  rate=3.10%** | **  n= 238  loss=  5  rate=2.10%** | **  n= 445  loss= 29  rate=6.52%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
