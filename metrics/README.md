# Phase 4 readiness

_Updated: 2026-09-27T12:50:34.505Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 141 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **82,674**
- Outcome patches resolved: **143,598**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.37% (n=21024) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.31% (n=3041) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20536  loss=6721  rate=32.73% |   n=2516  loss=613  rate=24.36% |   n=   5  loss=  0  rate=0.00% |   n=29717  loss=691  rate=2.33% |
| risky |   n= 488  loss= 85  rate=17.42% |   n=16848  loss=1372  rate=8.14% |   n=3036  loss=192  rate=6.32% |   n=5478  loss=1641  rate=29.96% |
| **all** | **  n=21024  loss=6806  rate=32.37%** | **  n=19364  loss=1985  rate=10.25%** | **  n=3041  loss=192  rate=6.31%** | **  n=35195  loss=2332  rate=6.63%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17642  loss=5692  rate=32.26% |   n=1993  loss=494  rate=24.79% |   n=   5  loss=  0  rate=0.00% |   n=24034  loss=558  rate=2.32% |
| risky |   n= 445  loss=144  rate=32.36% |   n=13904  loss=1289  rate=9.27% |   n=2492  loss=188  rate=7.54% |   n=4459  loss=1403  rate=31.46% |
| **all** | **  n=18087  loss=5836  rate=32.27%** | **  n=15897  loss=1783  rate=11.22%** | **  n=2497  loss=188  rate=7.53%** | **  n=28493  loss=1961  rate=6.88%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
