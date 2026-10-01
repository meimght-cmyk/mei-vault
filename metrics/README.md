# Phase 4 readiness

_Updated: 2026-10-01T17:07:25.570Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 145 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **85,224**
- Outcome patches resolved: **148,548**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.71% (n=21550) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.21% (n=3138) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21056  loss=6960  rate=33.05% |   n=2620  loss=643  rate=24.54% |   n=   5  loss=  0  rate=0.00% |   n=30693  loss=707  rate=2.30% |
| risky |   n= 494  loss= 90  rate=18.22% |   n=17376  loss=1414  rate=8.14% |   n=3133  loss=195  rate=6.22% |   n=5647  loss=1680  rate=29.75% |
| **all** | **  n=21550  loss=7050  rate=32.71%** | **  n=19996  loss=2057  rate=10.29%** | **  n=3138  loss=195  rate=6.21%** | **  n=36340  loss=2387  rate=6.57%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18169  loss=5921  rate=32.59% |   n=2088  loss=521  rate=24.95% |   n=   5  loss=  0  rate=0.00% |   n=25112  loss=591  rate=2.35% |
| risky |   n= 466  loss=165  rate=35.41% |   n=14442  loss=1327  rate=9.19% |   n=2592  loss=192  rate=7.41% |   n=4650  loss=1466  rate=31.53% |
| **all** | **  n=18635  loss=6086  rate=32.66%** | **  n=16530  loss=1848  rate=11.18%** | **  n=2597  loss=192  rate=7.39%** | **  n=29762  loss=2057  rate=6.91%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
