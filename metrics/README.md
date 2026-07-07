# Phase 4 readiness

_Updated: 2026-07-07T06:42:04.744Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 59 of 90)
- Earliest unlock: **2026-08-07** (30 days away)
- Probe rows collected: **34,224**
- Outcome patches resolved: **46,998**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 23.61% (n=10407) — floor ≤ 2%
- ❌ **BLOCK precision**: 8.00% (n=1137) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10228  loss=2447  rate=23.92% |   n= 800  loss=177  rate=22.13% |   n=   5  loss=  0  rate=0.00% |   n=9441  loss=161  rate=1.71% |
| risky |   n= 179  loss= 10  rate=5.59% |   n=6722  loss=645  rate=9.60% |   n=1132  loss= 91  rate=8.04% |   n=1667  loss=443  rate=26.57% |
| **all** | **  n=10407  loss=2457  rate=23.61%** | **  n=7522  loss=822  rate=10.93%** | **  n=1137  loss= 91  rate=8.00%** | **  n=11108  loss=604  rate=5.44%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7246  loss=1412  rate=19.49% |   n= 327  loss= 96  rate=29.36% |   n=   5  loss=  0  rate=0.00% |   n=3996  loss= 74  rate=1.85% |
| risky |   n=  89  loss= 12  rate=13.48% |   n=3841  loss=503  rate=13.10% |   n= 599  loss= 78  rate=13.02% |   n= 721  loss=176  rate=24.41% |
| **all** | **  n=7335  loss=1424  rate=19.41%** | **  n=4168  loss=599  rate=14.37%** | **  n= 604  loss= 78  rate=12.91%** | **  n=4717  loss=250  rate=5.30%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
