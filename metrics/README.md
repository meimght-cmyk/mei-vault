# Phase 4 readiness

_Updated: 2026-06-29T14:17:33.513Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 51 of 90)
- Earliest unlock: **2026-08-07** (38 days away)
- Probe rows collected: **29,724**
- Outcome patches resolved: **38,448**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 19.76% (n=9348) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.66% (n=955) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9200  loss=1847  rate=20.08% |   n= 649  loss=113  rate=17.41% |   n=   5  loss=  0  rate=0.00% |   n=7620  loss=131  rate=1.72% |
| risky |   n= 148  loss=  0  rate=0.00% |   n=5742  loss=313  rate=5.45% |   n= 950  loss= 35  rate=3.68% |   n=1360  loss=398  rate=29.26% |
| **all** | **  n=9348  loss=1847  rate=19.76%** | **  n=6391  loss=426  rate=6.67%** | **  n= 955  loss= 35  rate=3.66%** | **  n=8980  loss=529  rate=5.89%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=6297  loss=819  rate=13.01% |   n= 196  loss= 31  rate=15.82% |   n=   4  loss=  0  rate=0.00% |   n=2377  loss= 51  rate=2.15% |
| risky |   n=  62  loss=  2  rate=3.23% |   n=2954  loss=144  rate=4.87% |   n= 426  loss= 14  rate=3.29% |   n= 458  loss=133  rate=29.04% |
| **all** | **  n=6359  loss=821  rate=12.91%** | **  n=3150  loss=175  rate=5.56%** | **  n= 430  loss= 14  rate=3.26%** | **  n=2835  loss=184  rate=6.49%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
