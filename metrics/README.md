# Phase 4 readiness

_Updated: 2026-06-26T11:28:28.962Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 48 of 90)
- Earliest unlock: **2026-08-07** (41 days away)
- Probe rows collected: **27,924**
- Outcome patches resolved: **34,698**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 19.00% (n=8933) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.62% (n=885) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8797  loss=1697  rate=19.29% |   n= 581  loss=101  rate=17.38% |   n=   5  loss=  0  rate=0.00% |   n=6891  loss=114  rate=1.65% |
| risky |   n= 136  loss=  0  rate=0.00% |   n=5355  loss=285  rate=5.32% |   n= 880  loss= 32  rate=3.64% |   n=1229  loss=358  rate=29.13% |
| **all** | **  n=8933  loss=1697  rate=19.00%** | **  n=5936  loss=386  rate=6.50%** | **  n= 885  loss= 32  rate=3.62%** | **  n=8120  loss=472  rate=5.81%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=5872  loss=604  rate=10.29% |   n= 144  loss= 17  rate=11.81% |   n=   4  loss=  0  rate=0.00% |   n=1554  loss= 31  rate=1.99% |
| risky |   n=  50  loss=  2  rate=4.00% |   n=2563  loss=111  rate=4.33% |   n= 351  loss=  8  rate=2.28% |   n= 286  loss= 64  rate=22.38% |
| **all** | **  n=5922  loss=606  rate=10.23%** | **  n=2707  loss=128  rate=4.73%** | **  n= 355  loss=  8  rate=2.25%** | **  n=1840  loss= 95  rate=5.16%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
