# Phase 4 readiness

_Updated: 2026-08-09T13:01:04.113Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 92 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **53,874**
- Outcome patches resolved: **85,848**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 28.28% (n=14668) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.04% (n=1875) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14338  loss=4124  rate=28.76% |   n=1406  loss=327  rate=23.26% |   n=   5  loss=  0  rate=0.00% |   n=17725  loss=360  rate=2.03% |
| risky |   n= 330  loss= 24  rate=7.27% |   n=10636  loss=942  rate=8.86% |   n=1870  loss=132  rate=7.06% |   n=3364  loss=1072  rate=31.87% |
| **all** | **  n=14668  loss=4148  rate=28.28%** | **  n=12042  loss=1269  rate=10.54%** | **  n=1875  loss=132  rate=7.04%** | **  n=21089  loss=1432  rate=6.79%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11346  loss=3191  rate=28.12% |   n= 967  loss=231  rate=23.89% |   n=   5  loss=  0  rate=0.00% |   n=12156  loss=275  rate=2.26% |
| risky |   n= 220  loss= 20  rate=9.09% |   n=7783  loss=794  rate=10.20% |   n=1327  loss=113  rate=8.52% |   n=2370  loss=798  rate=33.67% |
| **all** | **  n=11566  loss=3211  rate=27.76%** | **  n=8750  loss=1025  rate=11.71%** | **  n=1332  loss=113  rate=8.48%** | **  n=14526  loss=1073  rate=7.39%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
