# Phase 4 readiness

_Updated: 2026-09-03T12:52:39.135Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 117 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **68,574**
- Outcome patches resolved: **115,248**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 30.59% (n=17949) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.43% (n=2472) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17509  loss=5452  rate=31.14% |   n=1970  loss=464  rate=23.55% |   n=   5  loss=  0  rate=0.00% |   n=23790  loss=531  rate=2.23% |
| risky |   n= 440  loss= 38  rate=8.64% |   n=13773  loss=1158  rate=8.41% |   n=2467  loss=159  rate=6.45% |   n=4420  loss=1349  rate=30.52% |
| **all** | **  n=17949  loss=5490  rate=30.59%** | **  n=15743  loss=1622  rate=10.30%** | **  n=2472  loss=159  rate=6.43%** | **  n=28210  loss=1880  rate=6.66%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14604  loss=4603  rate=31.52% |   n=1449  loss=357  rate=24.64% |   n=   5  loss=  0  rate=0.00% |   n=18216  loss=435  rate=2.39% |
| risky |   n= 338  loss= 41  rate=12.13% |   n=10898  loss=1055  rate=9.68% |   n=1920  loss=151  rate=7.86% |   n=3444  loss=1097  rate=31.85% |
| **all** | **  n=14942  loss=4644  rate=31.08%** | **  n=12347  loss=1412  rate=11.44%** | **  n=1925  loss=151  rate=7.84%** | **  n=21660  loss=1532  rate=7.07%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
