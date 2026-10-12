# Phase 4 readiness

_Updated: 2026-10-12T04:07:02.916Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 156 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **91,374**
- Outcome patches resolved: **160,848**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.28% (n=22902) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.04% (n=3392) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22402  loss=7301  rate=32.59% |   n=2856  loss=676  rate=23.67% |   n=   5  loss=  0  rate=0.00% |   n=33211  loss=824  rate=2.48% |
| risky |   n= 500  loss= 92  rate=18.40% |   n=18713  loss=1480  rate=7.91% |   n=3387  loss=205  rate=6.05% |   n=6100  loss=1923  rate=31.52% |
| **all** | **  n=22902  loss=7393  rate=32.28%** | **  n=21569  loss=2156  rate=10.00%** | **  n=3392  loss=205  rate=6.04%** | **  n=39311  loss=2747  rate=6.99%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19483  loss=6243  rate=32.04% |   n=2324  loss=558  rate=24.01% |   n=   5  loss=  0  rate=0.00% |   n=27662  loss=729  rate=2.64% |
| risky |   n= 477  loss=174  rate=36.48% |   n=15787  loss=1379  rate=8.74% |   n=2840  loss=197  rate=6.94% |   n=5096  loss=1704  rate=33.44% |
| **all** | **  n=19960  loss=6417  rate=32.15%** | **  n=18111  loss=1937  rate=10.70%** | **  n=2845  loss=197  rate=6.92%** | **  n=32758  loss=2433  rate=7.43%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
