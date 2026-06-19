# Phase 4 readiness

_Updated: 2026-06-19T04:52:28.678Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 41 of 90)
- Earliest unlock: **2026-08-07** (48 days away)
- Probe rows collected: **23,724**
- Outcome patches resolved: **25,963**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 16.59% (n=7946) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.26% (n=706) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7839  loss=1318  rate=16.81% |   n= 415  loss= 70  rate=16.87% |   n=   5  loss=  0  rate=0.00% |   n=5115  loss= 81  rate=1.58% |
| risky |   n= 107  loss=  0  rate=0.00% |   n=4430  loss=222  rate=5.01% |   n= 701  loss= 23  rate=3.28% |   n= 912  loss=263  rate=28.84% |
| **all** | **  n=7946  loss=1318  rate=16.59%** | **  n=4845  loss=292  rate=6.03%** | **  n= 706  loss= 23  rate=3.26%** | **  n=6027  loss=344  rate=5.71%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=4675  loss=186  rate=3.98% |   n=  45  loss=  2  rate=4.44% |   n=   4  loss=  0  rate=0.00% |   n=  15  loss= 10  rate=66.67% |
| risky |   n=  19  loss=  2  rate=10.53% |   n=1508  loss= 44  rate=2.92% |   n= 172  loss=  3  rate=1.74% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=4694  loss=188  rate=4.01%** | **  n=1553  loss= 46  rate=2.96%** | **  n= 176  loss=  3  rate=1.70%** | **  n=  16  loss= 11  rate=68.75%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
