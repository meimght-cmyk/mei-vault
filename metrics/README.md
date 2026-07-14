# Phase 4 readiness

_Updated: 2026-07-14T13:10:31.290Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 66 of 90)
- Earliest unlock: **2026-08-07** (23 days away)
- Probe rows collected: **38,574**
- Outcome patches resolved: **55,248**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 24.57% (n=11143) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.54% (n=1260) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10939  loss=2725  rate=24.91% |   n= 904  loss=196  rate=21.68% |   n=   5  loss=  0  rate=0.00% |   n=11426  loss=225  rate=1.97% |
| risky |   n= 204  loss= 13  rate=6.37% |   n=7398  loss=706  rate=9.54% |   n=1255  loss= 95  rate=7.57% |   n=2243  loss=788  rate=35.13% |
| **all** | **  n=11143  loss=2738  rate=24.57%** | **  n=8302  loss=902  rate=10.86%** | **  n=1260  loss= 95  rate=7.54%** | **  n=13669  loss=1013  rate=7.41%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8145  loss=1773  rate=21.77% |   n= 465  loss=123  rate=26.45% |   n=   5  loss=  0  rate=0.00% |   n=5659  loss=103  rate=1.82% |
| risky |   n= 116  loss= 12  rate=10.34% |   n=4724  loss=577  rate=12.21% |   n= 756  loss= 84  rate=11.11% |   n=1004  loss=258  rate=25.70% |
| **all** | **  n=8261  loss=1785  rate=21.61%** | **  n=5189  loss=700  rate=13.49%** | **  n= 761  loss= 84  rate=11.04%** | **  n=6663  loss=361  rate=5.42%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
