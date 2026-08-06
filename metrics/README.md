# Phase 4 readiness

_Updated: 2026-08-06T10:03:25.509Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 89 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **51,924**
- Outcome patches resolved: **82,098**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 28.22% (n=14262) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.11% (n=1801) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13947  loss=4002  rate=28.69% |   n=1329  loss=306  rate=23.02% |   n=   5  loss=  0  rate=0.00% |   n=16993  loss=352  rate=2.07% |
| risky |   n= 315  loss= 23  rate=7.30% |   n=10249  loss=905  rate=8.83% |   n=1796  loss=128  rate=7.13% |   n=3240  loss=1049  rate=32.38% |
| **all** | **  n=14262  loss=4025  rate=28.22%** | **  n=11578  loss=1211  rate=10.46%** | **  n=1801  loss=128  rate=7.11%** | **  n=20233  loss=1401  rate=6.92%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10903  loss=3010  rate=27.61% |   n= 900  loss=217  rate=24.11% |   n=   5  loss=  0  rate=0.00% |   n=11366  loss=252  rate=2.22% |
| risky |   n= 203  loss= 17  rate=8.37% |   n=7365  loss=765  rate=10.39% |   n=1250  loss=109  rate=8.72% |   n=2232  loss=770  rate=34.50% |
| **all** | **  n=11106  loss=3027  rate=27.26%** | **  n=8265  loss=982  rate=11.88%** | **  n=1255  loss=109  rate=8.69%** | **  n=13598  loss=1022  rate=7.52%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
