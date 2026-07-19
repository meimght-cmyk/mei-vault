# Phase 4 readiness

_Updated: 2026-07-19T17:57:09.314Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 71 of 90)
- Earliest unlock: **2026-08-07** (18 days away)
- Probe rows collected: **41,574**
- Outcome patches resolved: **61,398**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 25.45% (n=11849) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.10% (n=1380) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11618  loss=2999  rate=25.81% |   n=1009  loss=216  rate=21.41% |   n=   5  loss=  0  rate=0.00% |   n=12642  loss=244  rate=1.93% |
| risky |   n= 231  loss= 17  rate=7.36% |   n=8040  loss=747  rate=9.29% |   n=1375  loss= 98  rate=7.13% |   n=2454  loss=835  rate=34.03% |
| **all** | **  n=11849  loss=3016  rate=25.45%** | **  n=9049  loss=963  rate=10.64%** | **  n=1380  loss= 98  rate=7.10%** | **  n=15096  loss=1079  rate=7.15%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8832  loss=2068  rate=23.41% |   n= 586  loss=151  rate=25.77% |   n=   5  loss=  0  rate=0.00% |   n=6951  loss=126  rate=1.81% |
| risky |   n= 137  loss= 12  rate=8.76% |   n=5387  loss=630  rate=11.69% |   n= 885  loss= 97  rate=10.96% |   n=1241  loss=332  rate=26.75% |
| **all** | **  n=8969  loss=2080  rate=23.19%** | **  n=5973  loss=781  rate=13.08%** | **  n= 890  loss= 97  rate=10.90%** | **  n=8192  loss=458  rate=5.59%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
