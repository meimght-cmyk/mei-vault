# Phase 4 readiness

_Updated: 2026-07-05T05:09:33.548Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 57 of 90)
- Earliest unlock: **2026-08-07** (32 days away)
- Probe rows collected: **33,024**
- Outcome patches resolved: **45,048**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 23.10% (n=10126) — floor ≤ 2%
- ❌ **BLOCK precision**: 8.18% (n=1088) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9956  loss=2330  rate=23.40% |   n= 762  loss=170  rate=22.31% |   n=   5  loss=  0  rate=0.00% |   n=8951  loss=146  rate=1.63% |
| risky |   n= 170  loss=  9  rate=5.29% |   n=6462  loss=633  rate=9.80% |   n=1083  loss= 89  rate=8.22% |   n=1585  loss=429  rate=27.07% |
| **all** | **  n=10126  loss=2339  rate=23.10%** | **  n=7224  loss=803  rate=11.12%** | **  n=1088  loss= 89  rate=8.18%** | **  n=10536  loss=575  rate=5.46%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7073  loss=1339  rate=18.93% |   n= 300  loss= 92  rate=30.67% |   n=   5  loss=  0  rate=0.00% |   n=3696  loss= 69  rate=1.87% |
| risky |   n=  84  loss= 12  rate=14.29% |   n=3674  loss=484  rate=13.17% |   n= 567  loss= 76  rate=13.40% |   n= 675  loss=166  rate=24.59% |
| **all** | **  n=7157  loss=1351  rate=18.88%** | **  n=3974  loss=576  rate=14.49%** | **  n= 572  loss= 76  rate=13.29%** | **  n=4371  loss=235  rate=5.38%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
