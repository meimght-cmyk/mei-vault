# Phase 4 readiness

_Updated: 2026-09-09T19:00:44.597Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 123 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **72,324**
- Outcome patches resolved: **122,598**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.32% (n=18772) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.30% (n=2621) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18302  loss=5813  rate=31.76% |   n=2109  loss=504  rate=23.90% |   n=   5  loss=  0  rate=0.00% |   n=25358  loss=574  rate=2.26% |
| risky |   n= 470  loss= 67  rate=14.26% |   n=14572  loss=1214  rate=8.33% |   n=2616  loss=165  rate=6.31% |   n=4692  loss=1422  rate=30.31% |
| **all** | **  n=18772  loss=5880  rate=31.32%** | **  n=16681  loss=1718  rate=10.30%** | **  n=2621  loss=165  rate=6.30%** | **  n=30050  loss=1996  rate=6.64%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15360  loss=4864  rate=31.67% |   n=1594  loss=403  rate=25.28% |   n=   5  loss=  0  rate=0.00% |   n=19715  loss=462  rate=2.34% |
| risky |   n= 365  loss= 66  rate=18.08% |   n=11659  loss=1120  rate=9.61% |   n=2059  loss=160  rate=7.77% |   n=3717  loss=1174  rate=31.58% |
| **all** | **  n=15725  loss=4930  rate=31.35%** | **  n=13253  loss=1523  rate=11.49%** | **  n=2064  loss=160  rate=7.75%** | **  n=23432  loss=1636  rate=6.98%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
