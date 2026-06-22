# Phase 4 readiness

_Updated: 2026-06-22T07:43:47.967Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 44 of 90)
- Earliest unlock: **2026-08-07** (45 days away)
- Probe rows collected: **25,524**
- Outcome patches resolved: **29,748**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 17.82% (n=8366) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.21% (n=779) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8247  loss=1491  rate=18.08% |   n= 480  loss= 78  rate=16.25% |   n=   5  loss=  0  rate=0.00% |   n=5842  loss= 96  rate=1.64% |
| risky |   n= 119  loss=  0  rate=0.00% |   n=4822  loss=247  rate=5.12% |   n= 774  loss= 25  rate=3.23% |   n=1035  loss=291  rate=28.12% |
| **all** | **  n=8366  loss=1491  rate=17.82%** | **  n=5302  loss=325  rate=6.13%** | **  n= 779  loss= 25  rate=3.21%** | **  n=6877  loss=387  rate=5.63%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=5296  loss=376  rate=7.10% |   n=  80  loss=  5  rate=6.25% |   n=   4  loss=  0  rate=0.00% |   n= 594  loss= 15  rate=2.53% |
| risky |   n=  34  loss=  2  rate=5.88% |   n=2037  loss= 67  rate=3.29% |   n= 256  loss=  5  rate=1.95% |   n= 123  loss= 20  rate=16.26% |
| **all** | **  n=5330  loss=378  rate=7.09%** | **  n=2117  loss= 72  rate=3.40%** | **  n= 260  loss=  5  rate=1.92%** | **  n= 717  loss= 35  rate=4.88%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
