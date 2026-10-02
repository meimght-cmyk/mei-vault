# Phase 4 readiness

_Updated: 2026-10-02T18:11:14.165Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 146 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **85,824**
- Outcome patches resolved: **149,748**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.81% (n=21684) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.20% (n=3162) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21190  loss=7025  rate=33.15% |   n=2642  loss=650  rate=24.60% |   n=   5  loss=  0  rate=0.00% |   n=30937  loss=714  rate=2.31% |
| risky |   n= 494  loss= 90  rate=18.22% |   n=17508  loss=1423  rate=8.13% |   n=3157  loss=196  rate=6.21% |   n=5691  loss=1691  rate=29.71% |
| **all** | **  n=21684  loss=7115  rate=32.81%** | **  n=20150  loss=2073  rate=10.29%** | **  n=3162  loss=196  rate=6.20%** | **  n=36628  loss=2405  rate=6.57%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18302  loss=5974  rate=32.64% |   n=2109  loss=522  rate=24.75% |   n=   5  loss=  0  rate=0.00% |   n=25358  loss=598  rate=2.36% |
| risky |   n= 470  loss=169  rate=35.96% |   n=14572  loss=1336  rate=9.17% |   n=2616  loss=193  rate=7.38% |   n=4692  loss=1479  rate=31.52% |
| **all** | **  n=18772  loss=6143  rate=32.72%** | **  n=16681  loss=1858  rate=11.14%** | **  n=2621  loss=193  rate=7.36%** | **  n=30050  loss=2077  rate=6.91%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
