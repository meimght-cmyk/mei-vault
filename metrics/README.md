# Phase 4 readiness

_Updated: 2026-11-16T07:00:09.647Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 191 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **112,074**
- Outcome patches resolved: **202,248**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 22.46% (n=33949) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.97% (n=4323) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=33326  loss=7530  rate=22.59% |   n=4359  loss=703  rate=16.13% |   n=   6  loss=  0  rate=0.00% |   n=34583  loss=960  rate=2.78% |
| risky |   n= 623  loss= 96  rate=15.41% |   n=24182  loss=1545  rate=6.39% |   n=4317  loss=215  rate=4.98% |   n=6478  loss=2286  rate=35.29% |
| **all** | **  n=33949  loss=7626  rate=22.46%** | **  n=28541  loss=2248  rate=7.88%** | **  n=4323  loss=215  rate=4.97%** | **  n=41061  loss=3246  rate=7.91%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=25753  loss=6317  rate=24.53% |   n=3322  loss=563  rate=16.95% |   n=   5  loss=  0  rate=0.00% |   n=34194  loss=1356  rate=3.97% |
| risky |   n= 536  loss=175  rate=32.65% |   n=20559  loss=1419  rate=6.90% |   n=3704  loss=203  rate=5.48% |   n=6301  loss=2822  rate=44.79% |
| **all** | **  n=26289  loss=6492  rate=24.69%** | **  n=23881  loss=1982  rate=8.30%** | **  n=3709  loss=203  rate=5.47%** | **  n=40495  loss=4178  rate=10.32%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
