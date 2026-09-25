# Phase 4 readiness

_Updated: 2026-09-25T10:40:33.967Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 139 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **81,474**
- Outcome patches resolved: **141,048**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.32% (n=20764) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.28% (n=2996) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20280  loss=6629  rate=32.69% |   n=2468  loss=597  rate=24.19% |   n=   5  loss=  0  rate=0.00% |   n=29121  loss=668  rate=2.29% |
| risky |   n= 484  loss= 81  rate=16.74% |   n=16593  loss=1355  rate=8.17% |   n=2991  loss=188  rate=6.29% |   n=5332  loss=1569  rate=29.43% |
| **all** | **  n=20764  loss=6710  rate=32.32%** | **  n=19061  loss=1952  rate=10.24%** | **  n=2996  loss=188  rate=6.28%** | **  n=34453  loss=2237  rate=6.49%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17374  loss=5599  rate=32.23% |   n=1950  loss=487  rate=24.97% |   n=   5  loss=  0  rate=0.00% |   n=23545  loss=543  rate=2.31% |
| risky |   n= 435  loss=134  rate=30.80% |   n=13643  loss=1268  rate=9.29% |   n=2441  loss=185  rate=7.58% |   n=4381  loss=1382  rate=31.55% |
| **all** | **  n=17809  loss=5733  rate=32.19%** | **  n=15593  loss=1755  rate=11.26%** | **  n=2446  loss=185  rate=7.56%** | **  n=27926  loss=1925  rate=6.89%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
