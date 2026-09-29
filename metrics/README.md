# Phase 4 readiness

_Updated: 2026-09-29T14:54:44.011Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 143 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **84,024**
- Outcome patches resolved: **145,998**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.58% (n=21286) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.31% (n=3089) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20795  loss=6847  rate=32.93% |   n=2566  loss=628  rate=24.47% |   n=   5  loss=  0  rate=0.00% |   n=30208  loss=697  rate=2.31% |
| risky |   n= 491  loss= 87  rate=17.72% |   n=17110  loss=1398  rate=8.17% |   n=3084  loss=195  rate=6.32% |   n=5565  loss=1660  rate=29.83% |
| **all** | **  n=21286  loss=6934  rate=32.58%** | **  n=19676  loss=2026  rate=10.30%** | **  n=3089  loss=195  rate=6.31%** | **  n=35773  loss=2357  rate=6.59%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17877  loss=5791  rate=32.39% |   n=2031  loss=501  rate=24.67% |   n=   5  loss=  0  rate=0.00% |   n=24561  loss=576  rate=2.35% |
| risky |   n= 455  loss=154  rate=33.85% |   n=14149  loss=1304  rate=9.22% |   n=2536  loss=189  rate=7.45% |   n=4560  loss=1442  rate=31.62% |
| **all** | **  n=18332  loss=5945  rate=32.43%** | **  n=16180  loss=1805  rate=11.16%** | **  n=2541  loss=189  rate=7.44%** | **  n=29121  loss=2018  rate=6.93%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
