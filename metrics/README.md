# Phase 4 readiness

_Updated: 2026-07-06T06:05:21.912Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 58 of 90)
- Earliest unlock: **2026-08-07** (31 days away)
- Probe rows collected: **33,624**
- Outcome patches resolved: **46,248**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 23.38% (n=10266) — floor ≤ 2%
- ❌ **BLOCK precision**: 8.17% (n=1114) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10092  loss=2390  rate=23.68% |   n= 781  loss=174  rate=22.28% |   n=   5  loss=  0  rate=0.00% |   n=9196  loss=152  rate=1.65% |
| risky |   n= 174  loss= 10  rate=5.75% |   n=6592  loss=638  rate=9.68% |   n=1109  loss= 91  rate=8.21% |   n=1625  loss=434  rate=26.71% |
| **all** | **  n=10266  loss=2400  rate=23.38%** | **  n=7373  loss=812  rate=11.01%** | **  n=1114  loss= 91  rate=8.17%** | **  n=10821  loss=586  rate=5.42%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7212  loss=1398  rate=19.38% |   n= 321  loss= 95  rate=29.60% |   n=   5  loss=  0  rate=0.00% |   n=3936  loss= 72  rate=1.83% |
| risky |   n=  88  loss= 12  rate=13.64% |   n=3808  loss=500  rate=13.13% |   n= 593  loss= 78  rate=13.15% |   n= 711  loss=173  rate=24.33% |
| **all** | **  n=7300  loss=1410  rate=19.32%** | **  n=4129  loss=595  rate=14.41%** | **  n= 598  loss= 78  rate=13.04%** | **  n=4647  loss=245  rate=5.27%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
