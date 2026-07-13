# Phase 4 readiness

_Updated: 2026-07-13T12:11:59.653Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 65 of 90)
- Earliest unlock: **2026-08-07** (24 days away)
- Probe rows collected: **37,824**
- Outcome patches resolved: **54,048**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 24.43% (n=10998) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.68% (n=1237) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10799  loss=2674  rate=24.76% |   n= 884  loss=192  rate=21.72% |   n=   5  loss=  0  rate=0.00% |   n=11186  loss=217  rate=1.94% |
| risky |   n= 199  loss= 13  rate=6.53% |   n=7266  loss=692  rate=9.52% |   n=1232  loss= 95  rate=7.71% |   n=2203  loss=779  rate=35.36% |
| **all** | **  n=10998  loss=2687  rate=24.43%** | **  n=8150  loss=884  rate=10.85%** | **  n=1237  loss= 95  rate=7.68%** | **  n=13389  loss=996  rate=7.44%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8011  loss=1720  rate=21.47% |   n= 442  loss=119  rate=26.92% |   n=   5  loss=  0  rate=0.00% |   n=5416  loss=101  rate=1.86% |
| risky |   n= 112  loss= 12  rate=10.71% |   n=4593  loss=568  rate=12.37% |   n= 731  loss= 82  rate=11.22% |   n= 964  loss=250  rate=25.93% |
| **all** | **  n=8123  loss=1732  rate=21.32%** | **  n=5035  loss=687  rate=13.64%** | **  n= 736  loss= 82  rate=11.14%** | **  n=6380  loss=351  rate=5.50%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
