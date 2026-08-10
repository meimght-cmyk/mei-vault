# Phase 4 readiness

_Updated: 2026-08-10T13:58:27.760Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 93 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **54,474**
- Outcome patches resolved: **87,048**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 28.44% (n=14806) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.05% (n=1901) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14472  loss=4187  rate=28.93% |   n=1424  loss=331  rate=23.24% |   n=   5  loss=  0  rate=0.00% |   n=17973  loss=369  rate=2.05% |
| risky |   n= 334  loss= 24  rate=7.19% |   n=10767  loss=953  rate=8.85% |   n=1896  loss=134  rate=7.07% |   n=3403  loss=1084  rate=31.85% |
| **all** | **  n=14806  loss=4211  rate=28.44%** | **  n=12191  loss=1284  rate=10.53%** | **  n=1901  loss=134  rate=7.05%** | **  n=21376  loss=1453  rate=6.80%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11478  loss=3247  rate=28.29% |   n= 989  loss=238  rate=24.06% |   n=   5  loss=  0  rate=0.00% |   n=12402  loss=278  rate=2.24% |
| risky |   n= 226  loss= 22  rate=9.73% |   n=7911  loss=801  rate=10.13% |   n=1351  loss=114  rate=8.44% |   n=2412  loss=808  rate=33.50% |
| **all** | **  n=11704  loss=3269  rate=27.93%** | **  n=8900  loss=1039  rate=11.67%** | **  n=1356  loss=114  rate=8.41%** | **  n=14814  loss=1086  rate=7.33%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
