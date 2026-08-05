# Phase 4 readiness

_Updated: 2026-08-05T09:05:31.507Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 88 of 90)
- Earliest unlock: **2026-08-07** (1 days away)
- Probe rows collected: **51,324**
- Outcome patches resolved: **80,898**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 28.02% (n=14127) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.15% (n=1777) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13817  loss=3936  rate=28.49% |   n=1303  loss=297  rate=22.79% |   n=   5  loss=  0  rate=0.00% |   n=16749  loss=346  rate=2.07% |
| risky |   n= 310  loss= 22  rate=7.10% |   n=10120  loss=895  rate=8.84% |   n=1772  loss=127  rate=7.17% |   n=3198  loss=1036  rate=32.40% |
| **all** | **  n=14127  loss=3958  rate=28.02%** | **  n=11423  loss=1192  rate=10.44%** | **  n=1777  loss=127  rate=7.15%** | **  n=19947  loss=1382  rate=6.93%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10764  loss=2940  rate=27.31% |   n= 880  loss=213  rate=24.20% |   n=   5  loss=  0  rate=0.00% |   n=11125  loss=243  rate=2.18% |
| risky |   n= 197  loss= 15  rate=7.61% |   n=7234  loss=755  rate=10.44% |   n=1226  loss=109  rate=8.89% |   n=2193  loss=759  rate=34.61% |
| **all** | **  n=10961  loss=2955  rate=26.96%** | **  n=8114  loss=968  rate=11.93%** | **  n=1231  loss=109  rate=8.85%** | **  n=13318  loss=1002  rate=7.52%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
