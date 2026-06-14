# Phase 4 readiness

_Updated: 2026-06-14T00:13:10.133Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 36 of 90)
- Earliest unlock: **2026-08-07** (53 days away)
- Probe rows collected: **20,574**
- Outcome patches resolved: **20,263**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 14.38% (n=7335) — floor ≤ 2%
- ❌ **BLOCK precision**: 2.98% (n=604) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7246  loss=1055  rate=14.56% |   n= 327  loss= 52  rate=15.90% |   n=   5  loss=  0  rate=0.00% |   n=3996  loss= 61  rate=1.53% |
| risky |   n=  89  loss=  0  rate=0.00% |   n=3841  loss=173  rate=4.50% |   n= 599  loss= 18  rate=3.01% |   n= 721  loss=208  rate=28.85% |
| **all** | **  n=7335  loss=1055  rate=14.38%** | **  n=4168  loss=225  rate=5.40%** | **  n= 604  loss= 18  rate=2.98%** | **  n=4717  loss=269  rate=5.70%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=2693  loss= 81  rate=3.01% |   n=  30  loss=  1  rate=3.33% |   n=   4  loss=  0  rate=0.00% |   n=  12  loss= 10  rate=83.33% |
| risky |   n=0 |   n= 629  loss=  0  rate=0.00% |   n=  70  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=2693  loss= 81  rate=3.01%** | **  n= 659  loss=  1  rate=0.15%** | **  n=  74  loss=  0  rate=0.00%** | **  n=  13  loss= 11  rate=84.62%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
