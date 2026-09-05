# Phase 4 readiness

_Updated: 2026-09-05T14:56:28.830Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 119 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **69,774**
- Outcome patches resolved: **117,732**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 30.86% (n=18239) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.31% (n=2518) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17788  loss=5580  rate=31.37% |   n=2020  loss=475  rate=23.51% |   n=   5  loss=  0  rate=0.00% |   n=24345  loss=541  rate=2.22% |
| risky |   n= 451  loss= 48  rate=10.64% |   n=14032  loss=1173  rate=8.36% |   n=2513  loss=159  rate=6.33% |   n=4504  loss=1369  rate=30.40% |
| **all** | **  n=18239  loss=5628  rate=30.86%** | **  n=16052  loss=1648  rate=10.27%** | **  n=2518  loss=159  rate=6.31%** | **  n=28849  loss=1910  rate=6.62%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14863  loss=4685  rate=31.52% |   n=1504  loss=375  rate=24.93% |   n=   5  loss=  0  rate=0.00% |   n=18702  loss=442  rate=2.36% |
| risky |   n= 346  loss= 49  rate=14.16% |   n=11161  loss=1067  rate=9.56% |   n=1969  loss=154  rate=7.82% |   n=3524  loss=1108  rate=31.44% |
| **all** | **  n=15209  loss=4734  rate=31.13%** | **  n=12665  loss=1442  rate=11.39%** | **  n=1974  loss=154  rate=7.80%** | **  n=22226  loss=1550  rate=6.97%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
