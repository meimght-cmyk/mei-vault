# Phase 4 readiness

_Updated: 2026-06-17T02:56:54.772Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 39 of 90)
- Earliest unlock: **2026-08-07** (50 days away)
- Probe rows collected: **22,374**
- Outcome patches resolved: **23,563**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 15.24% (n=7663) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.21% (n=655) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7564  loss=1168  rate=15.44% |   n= 375  loss= 60  rate=16.00% |   n=   5  loss=  0  rate=0.00% |   n=4630  loss= 71  rate=1.53% |
| risky |   n=  99  loss=  0  rate=0.00% |   n=4165  loss=201  rate=4.83% |   n= 650  loss= 21  rate=3.23% |   n= 836  loss=249  rate=29.78% |
| **all** | **  n=7663  loss=1168  rate=15.24%** | **  n=4540  loss=261  rate=5.75%** | **  n= 655  loss= 21  rate=3.21%** | **  n=5466  loss=320  rate=5.85%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=3885  loss=112  rate=2.88% |   n=  37  loss=  2  rate=5.41% |   n=   4  loss=  0  rate=0.00% |   n=  13  loss= 10  rate=76.92% |
| risky |   n=  11  loss=  0  rate=0.00% |   n=1158  loss=  1  rate=0.09% |   n= 130  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=3896  loss=112  rate=2.87%** | **  n=1195  loss=  3  rate=0.25%** | **  n= 134  loss=  0  rate=0.00%** | **  n=  14  loss= 11  rate=78.57%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
