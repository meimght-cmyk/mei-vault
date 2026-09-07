# Phase 4 readiness

_Updated: 2026-09-07T16:59:53.337Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 121 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **70,974**
- Outcome patches resolved: **120,198**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.05% (n=18501) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.34% (n=2572) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18040  loss=5687  rate=31.52% |   n=2061  loss=486  rate=23.58% |   n=   5  loss=  0  rate=0.00% |   n=24868  loss=561  rate=2.26% |
| risky |   n= 461  loss= 58  rate=12.58% |   n=14315  loss=1196  rate=8.35% |   n=2567  loss=163  rate=6.35% |   n=4607  loss=1402  rate=30.43% |
| **all** | **  n=18501  loss=5745  rate=31.05%** | **  n=16376  loss=1682  rate=10.27%** | **  n=2572  loss=163  rate=6.34%** | **  n=29475  loss=1963  rate=6.66%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15100  loss=4790  rate=31.72% |   n=1547  loss=390  rate=25.21% |   n=   5  loss=  0  rate=0.00% |   n=19222  loss=453  rate=2.36% |
| risky |   n= 356  loss= 58  rate=16.29% |   n=11397  loss=1084  rate=9.51% |   n=2009  loss=155  rate=7.72% |   n=3638  loss=1162  rate=31.94% |
| **all** | **  n=15456  loss=4848  rate=31.37%** | **  n=12944  loss=1474  rate=11.39%** | **  n=2014  loss=155  rate=7.70%** | **  n=22860  loss=1615  rate=7.06%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
