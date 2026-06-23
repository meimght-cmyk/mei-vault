# Phase 4 readiness

_Updated: 2026-06-23T08:38:23.440Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 45 of 90)
- Earliest unlock: **2026-08-07** (44 days away)
- Probe rows collected: **26,124**
- Outcome patches resolved: **30,948**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 18.02% (n=8503) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.35% (n=805) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8380  loss=1532  rate=18.28% |   n= 503  loss= 83  rate=16.50% |   n=   5  loss=  0  rate=0.00% |   n=6086  loss= 98  rate=1.61% |
| risky |   n= 123  loss=  0  rate=0.00% |   n=4953  loss=259  rate=5.23% |   n= 800  loss= 27  rate=3.38% |   n=1074  loss=302  rate=28.12% |
| **all** | **  n=8503  loss=1532  rate=18.02%** | **  n=5456  loss=342  rate=6.27%** | **  n= 805  loss= 27  rate=3.35%** | **  n=7160  loss=400  rate=5.59%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=5442  loss=437  rate=8.03% |   n=  94  loss=  8  rate=8.51% |   n=   4  loss=  0  rate=0.00% |   n= 834  loss= 19  rate=2.28% |
| risky |   n=  38  loss=  2  rate=5.26% |   n=2170  loss= 78  rate=3.59% |   n= 280  loss=  8  rate=2.86% |   n= 162  loss= 32  rate=19.75% |
| **all** | **  n=5480  loss=439  rate=8.01%** | **  n=2264  loss= 86  rate=3.80%** | **  n= 284  loss=  8  rate=2.82%** | **  n= 996  loss= 51  rate=5.12%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
