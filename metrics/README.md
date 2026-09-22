# Phase 4 readiness

_Updated: 2026-09-22T07:33:16.555Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 136 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **79,674**
- Outcome patches resolved: **137,448**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.15% (n=20366) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.26% (n=2921) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19886  loss=6470  rate=32.54% |   n=2393  loss=579  rate=24.20% |   n=   5  loss=  0  rate=0.00% |   n=28390  loss=652  rate=2.30% |
| risky |   n= 480  loss= 77  rate=16.04% |   n=16194  loss=1325  rate=8.18% |   n=2916  loss=183  rate=6.28% |   n=5210  loss=1538  rate=29.52% |
| **all** | **  n=20366  loss=6547  rate=32.15%** | **  n=18587  loss=1904  rate=10.24%** | **  n=2921  loss=183  rate=6.26%** | **  n=33600  loss=2190  rate=6.52%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16971  loss=5471  rate=32.24% |   n=1876  loss=469  rate=25.00% |   n=   5  loss=  0  rate=0.00% |   n=22822  loss=529  rate=2.32% |
| risky |   n= 421  loss=121  rate=28.74% |   n=13251  loss=1240  rate=9.36% |   n=2365  loss=178  rate=7.53% |   n=4263  loss=1350  rate=31.67% |
| **all** | **  n=17392  loss=5592  rate=32.15%** | **  n=15127  loss=1709  rate=11.30%** | **  n=2370  loss=178  rate=7.51%** | **  n=27085  loss=1879  rate=6.94%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
