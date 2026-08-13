# Phase 4 readiness

_Updated: 2026-08-13T16:51:50.213Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 96 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **56,274**
- Outcome patches resolved: **90,648**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 28.81% (n=15209) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.84% (n=1974) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14863  loss=4358  rate=29.32% |   n=1504  loss=355  rate=23.60% |   n=   5  loss=  0  rate=0.00% |   n=18702  loss=386  rate=2.06% |
| risky |   n= 346  loss= 24  rate=6.94% |   n=11161  loss=985  rate=8.83% |   n=1969  loss=135  rate=6.86% |   n=3524  loss=1117  rate=31.70% |
| **all** | **  n=15209  loss=4382  rate=28.81%** | **  n=12665  loss=1340  rate=10.58%** | **  n=1974  loss=135  rate=6.84%** | **  n=22226  loss=1503  rate=6.76%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11873  loss=3432  rate=28.91% |   n=1053  loss=254  rate=24.12% |   n=   5  loss=  0  rate=0.00% |   n=13143  loss=297  rate=2.26% |
| risky |   n= 241  loss= 23  rate=9.54% |   n=8279  loss=827  rate=9.99% |   n=1419  loss=116  rate=8.17% |   n=2561  loss=862  rate=33.66% |
| **all** | **  n=12114  loss=3455  rate=28.52%** | **  n=9332  loss=1081  rate=11.58%** | **  n=1424  loss=116  rate=8.15%** | **  n=15704  loss=1159  rate=7.38%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
