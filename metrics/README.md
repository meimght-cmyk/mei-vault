# Phase 4 readiness

_Updated: 2026-10-24T18:16:14.490Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 168 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **98,724**
- Outcome patches resolved: **175,698**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 28.25% (n=26467) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.61% (n=3723) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=25929  loss=7384  rate=28.48% |   n=3346  loss=685  rate=20.47% |   n=   5  loss=  0  rate=0.00% |   n=34194  loss=918  rate=2.68% |
| risky |   n= 538  loss= 92  rate=17.10% |   n=20643  loss=1483  rate=7.18% |   n=3718  loss=209  rate=5.62% |   n=6301  loss=2112  rate=33.52% |
| **all** | **  n=26467  loss=7476  rate=28.25%** | **  n=23989  loss=2168  rate=9.04%** | **  n=3723  loss=209  rate=5.61%** | **  n=40495  loss=3030  rate=7.48%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21056  loss=6256  rate=29.71% |   n=2620  loss=558  rate=21.30% |   n=   5  loss=  0  rate=0.00% |   n=30693  loss=1018  rate=3.32% |
| risky |   n= 494  loss=174  rate=35.22% |   n=17376  loss=1379  rate=7.94% |   n=3133  loss=197  rate=6.29% |   n=5647  loss=2223  rate=39.37% |
| **all** | **  n=21550  loss=6430  rate=29.84%** | **  n=19996  loss=1937  rate=9.69%** | **  n=3138  loss=197  rate=6.28%** | **  n=36340  loss=3241  rate=8.92%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
