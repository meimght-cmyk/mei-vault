# Phase 4 readiness

_Updated: 2026-10-10T01:52:09.019Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 154 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **90,174**
- Outcome patches resolved: **158,448**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.66% (n=22636) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.13% (n=3343) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22139  loss=7301  rate=32.98% |   n=2810  loss=676  rate=24.06% |   n=   5  loss=  0  rate=0.00% |   n=32720  loss=778  rate=2.38% |
| risky |   n= 497  loss= 92  rate=18.51% |   n=18446  loss=1480  rate=8.02% |   n=3338  loss=205  rate=6.14% |   n=6019  loss=1847  rate=30.69% |
| **all** | **  n=22636  loss=7393  rate=32.66%** | **  n=21256  loss=2156  rate=10.14%** | **  n=3343  loss=205  rate=6.13%** | **  n=38739  loss=2625  rate=6.78%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19226  loss=6242  rate=32.47% |   n=2277  loss=558  rate=24.51% |   n=   5  loss=  0  rate=0.00% |   n=27166  loss=684  rate=2.52% |
| risky |   n= 475  loss=174  rate=36.63% |   n=15519  loss=1379  rate=8.89% |   n=2789  loss=197  rate=7.06% |   n=5017  loss=1631  rate=32.51% |
| **all** | **  n=19701  loss=6416  rate=32.57%** | **  n=17796  loss=1937  rate=10.88%** | **  n=2794  loss=197  rate=7.05%** | **  n=32183  loss=2315  rate=7.19%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
