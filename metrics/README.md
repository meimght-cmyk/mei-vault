# Phase 4 readiness

_Updated: 2026-08-28T06:46:15.767Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 111 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **64,824**
- Outcome patches resolved: **107,898**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 30.04% (n=17116) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.38% (n=2321) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16704  loss=5111  rate=30.60% |   n=1833  loss=437  rate=23.84% |   n=   5  loss=  0  rate=0.00% |   n=22332  loss=489  rate=2.19% |
| risky |   n= 412  loss= 31  rate=7.52% |   n=12991  loss=1106  rate=8.51% |   n=2316  loss=148  rate=6.39% |   n=4181  loss=1304  rate=31.19% |
| **all** | **  n=17116  loss=5142  rate=30.04%** | **  n=14824  loss=1543  rate=10.41%** | **  n=2321  loss=148  rate=6.38%** | **  n=26513  loss=1793  rate=6.76%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13785  loss=4281  rate=31.06% |   n=1295  loss=321  rate=24.79% |   n=   5  loss=  0  rate=0.00% |   n=16689  loss=399  rate=2.39% |
| risky |   n= 308  loss= 33  rate=10.71% |   n=10088  loss=982  rate=9.73% |   n=1766  loss=139  rate=7.87% |   n=3188  loss=1035  rate=32.47% |
| **all** | **  n=14093  loss=4314  rate=30.61%** | **  n=11383  loss=1303  rate=11.45%** | **  n=1771  loss=139  rate=7.85%** | **  n=19877  loss=1434  rate=7.21%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
