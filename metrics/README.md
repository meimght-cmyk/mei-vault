# Phase 4 readiness

_Updated: 2026-08-30T08:46:18.875Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 113 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **66,174**
- Outcome patches resolved: **110,298**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 30.12% (n=17392) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.37% (n=2370) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16971  loss=5206  rate=30.68% |   n=1876  loss=442  rate=23.56% |   n=   5  loss=  0  rate=0.00% |   n=22822  loss=503  rate=2.20% |
| risky |   n= 421  loss= 32  rate=7.60% |   n=13251  loss=1124  rate=8.48% |   n=2365  loss=151  rate=6.38% |   n=4263  loss=1322  rate=31.01% |
| **all** | **  n=17392  loss=5238  rate=30.12%** | **  n=15127  loss=1566  rate=10.35%** | **  n=2370  loss=151  rate=6.37%** | **  n=27085  loss=1825  rate=6.74%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14046  loss=4388  rate=31.24% |   n=1348  loss=333  rate=24.70% |   n=   5  loss=  0  rate=0.00% |   n=17175  loss=412  rate=2.40% |
| risky |   n= 320  loss= 36  rate=11.25% |   n=10344  loss=1013  rate=9.79% |   n=1815  loss=144  rate=7.93% |   n=3271  loss=1055  rate=32.25% |
| **all** | **  n=14366  loss=4424  rate=30.79%** | **  n=11692  loss=1346  rate=11.51%** | **  n=1820  loss=144  rate=7.91%** | **  n=20446  loss=1467  rate=7.17%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
