# Phase 4 readiness

_Updated: 2026-06-15T00:59:20.958Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 37 of 90)
- Earliest unlock: **2026-08-07** (52 days away)
- Probe rows collected: **21,174**
- Outcome patches resolved: **21,163**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 14.38% (n=7380) — floor ≤ 2%
- ❌ **BLOCK precision**: 2.95% (n=610) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=7289  loss=1061  rate=14.56% |   n= 335  loss= 53  rate=15.82% |   n=   5  loss=  0  rate=0.00% |   n=4145  loss= 64  rate=1.54% |
| risky |   n=  91  loss=  0  rate=0.00% |   n=3896  loss=178  rate=4.57% |   n= 605  loss= 18  rate=2.98% |   n= 758  loss=229  rate=30.21% |
| **all** | **  n=7380  loss=1061  rate=14.38%** | **  n=4231  loss=231  rate=5.46%** | **  n= 610  loss= 18  rate=2.95%** | **  n=4903  loss=293  rate=5.98%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=3092  loss= 93  rate=3.01% |   n=  31  loss=  2  rate=6.45% |   n=   4  loss=  0  rate=0.00% |   n=  12  loss= 10  rate=83.33% |
| risky |   n=   3  loss=  0  rate=0.00% |   n= 806  loss=  1  rate=0.12% |   n=  90  loss=  0  rate=0.00% |   n=   1  loss=  1  rate=100.00% |
| **all** | **  n=3095  loss= 93  rate=3.00%** | **  n= 837  loss=  3  rate=0.36%** | **  n=  94  loss=  0  rate=0.00%** | **  n=  13  loss= 11  rate=84.62%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
