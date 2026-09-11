# Phase 4 readiness

_Updated: 2026-09-11T21:11:21.413Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 125 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **73,524**
- Outcome patches resolved: **125,148**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.52% (n=19035) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.25% (n=2671) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18564  loss=5931  rate=31.95% |   n=2157  loss=519  rate=24.06% |   n=   5  loss=  0  rate=0.00% |   n=25848  loss=589  rate=2.28% |
| risky |   n= 471  loss= 68  rate=14.44% |   n=14836  loss=1228  rate=8.28% |   n=2666  loss=167  rate=6.26% |   n=4777  loss=1438  rate=30.10% |
| **all** | **  n=19035  loss=5999  rate=31.52%** | **  n=16993  loss=1747  rate=10.28%** | **  n=2671  loss=167  rate=6.25%** | **  n=30625  loss=2027  rate=6.62%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15650  loss=4961  rate=31.70% |   n=1652  loss=416  rate=25.18% |   n=   5  loss=  0  rate=0.00% |   n=20267  loss=474  rate=2.34% |
| risky |   n= 378  loss= 79  rate=20.90% |   n=11949  loss=1138  rate=9.52% |   n=2116  loss=163  rate=7.70% |   n=3807  loss=1198  rate=31.47% |
| **all** | **  n=16028  loss=5040  rate=31.44%** | **  n=13601  loss=1554  rate=11.43%** | **  n=2121  loss=163  rate=7.69%** | **  n=24074  loss=1672  rate=6.95%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
