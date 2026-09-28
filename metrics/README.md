# Phase 4 readiness

_Updated: 2026-09-28T13:52:31.760Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 142 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **83,274**
- Outcome patches resolved: **144,798**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.43% (n=21155) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.26% (n=3065) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20665  loss=6775  rate=32.78% |   n=2542  loss=619  rate=24.35% |   n=   5  loss=  0  rate=0.00% |   n=29962  loss=693  rate=2.31% |
| risky |   n= 490  loss= 86  rate=17.55% |   n=16978  loss=1377  rate=8.11% |   n=3060  loss=192  rate=6.27% |   n=5522  loss=1650  rate=29.88% |
| **all** | **  n=21155  loss=6861  rate=32.43%** | **  n=19520  loss=1996  rate=10.23%** | **  n=3065  loss=192  rate=6.26%** | **  n=35484  loss=2343  rate=6.60%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17760  loss=5736  rate=32.30% |   n=2015  loss=499  rate=24.76% |   n=   5  loss=  0  rate=0.00% |   n=24294  loss=566  rate=2.33% |
| risky |   n= 451  loss=150  rate=33.26% |   n=14032  loss=1297  rate=9.24% |   n=2513  loss=188  rate=7.48% |   n=4504  loss=1418  rate=31.48% |
| **all** | **  n=18211  loss=5886  rate=32.32%** | **  n=16047  loss=1796  rate=11.19%** | **  n=2518  loss=188  rate=7.47%** | **  n=28798  loss=1984  rate=6.89%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
