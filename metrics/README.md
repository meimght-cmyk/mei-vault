# Phase 4 readiness

_Updated: 2026-08-31T09:51:52.526Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 114 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **66,774**
- Outcome patches resolved: **111,648**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 30.25% (n=17533) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.39% (n=2395) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17108  loss=5271  rate=30.81% |   n=1899  loss=447  rate=23.54% |   n=   5  loss=  0  rate=0.00% |   n=23062  loss=509  rate=2.21% |
| risky |   n= 425  loss= 32  rate=7.53% |   n=13383  loss=1135  rate=8.48% |   n=2390  loss=153  rate=6.40% |   n=4302  loss=1329  rate=30.89% |
| **all** | **  n=17533  loss=5303  rate=30.25%** | **  n=15282  loss=1582  rate=10.35%** | **  n=2395  loss=153  rate=6.39%** | **  n=27364  loss=1838  rate=6.72%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14208  loss=4452  rate=31.33% |   n=1380  loss=340  rate=24.64% |   n=   5  loss=  0  rate=0.00% |   n=17481  loss=419  rate=2.40% |
| risky |   n= 325  loss= 36  rate=11.08% |   n=10508  loss=1026  rate=9.76% |   n=1845  loss=145  rate=7.86% |   n=3322  loss=1067  rate=32.12% |
| **all** | **  n=14533  loss=4488  rate=30.88%** | **  n=11888  loss=1366  rate=11.49%** | **  n=1850  loss=145  rate=7.84%** | **  n=20803  loss=1486  rate=7.14%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
