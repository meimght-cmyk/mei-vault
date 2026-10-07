# Phase 4 readiness

_Updated: 2026-10-07T23:30:39.696Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 151 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **88,824**
- Outcome patches resolved: **155,898**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.99% (n=22368) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.13% (n=3294) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21872  loss=7288  rate=33.32% |   n=2762  loss=674  rate=24.40% |   n=   5  loss=  0  rate=0.00% |   n=32235  loss=741  rate=2.30% |
| risky |   n= 496  loss= 92  rate=18.55% |   n=18178  loss=1467  rate=8.07% |   n=3289  loss=202  rate=6.14% |   n=5937  loss=1772  rate=29.85% |
| **all** | **  n=22368  loss=7380  rate=32.99%** | **  n=20940  loss=2141  rate=10.22%** | **  n=3294  loss=202  rate=6.13%** | **  n=38172  loss=2513  rate=6.58%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18958  loss=6242  rate=32.93% |   n=2233  loss=558  rate=24.99% |   n=   5  loss=  0  rate=0.00% |   n=26578  loss=628  rate=2.36% |
| risky |   n= 475  loss=174  rate=36.63% |   n=15233  loss=1379  rate=9.05% |   n=2738  loss=197  rate=7.20% |   n=4904  loss=1527  rate=31.14% |
| **all** | **  n=19433  loss=6416  rate=33.02%** | **  n=17466  loss=1937  rate=11.09%** | **  n=2743  loss=197  rate=7.18%** | **  n=31482  loss=2155  rate=6.85%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
