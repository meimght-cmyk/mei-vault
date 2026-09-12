# Phase 4 readiness

_Updated: 2026-09-12T22:11:19.784Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 126 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **74,124**
- Outcome patches resolved: **126,348**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.54% (n=19164) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.27% (n=2695) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18692  loss=5976  rate=31.97% |   n=2185  loss=528  rate=24.16% |   n=   5  loss=  0  rate=0.00% |   n=26092  loss=590  rate=2.26% |
| risky |   n= 472  loss= 69  rate=14.62% |   n=14969  loss=1233  rate=8.24% |   n=2690  loss=169  rate=6.28% |   n=4819  loss=1445  rate=29.99% |
| **all** | **  n=19164  loss=6045  rate=31.54%** | **  n=17154  loss=1761  rate=10.27%** | **  n=2695  loss=169  rate=6.27%** | **  n=30911  loss=2035  rate=6.58%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15780  loss=5020  rate=31.81% |   n=1676  loss=423  rate=25.24% |   n=   5  loss=  0  rate=0.00% |   n=20513  loss=477  rate=2.33% |
| risky |   n= 382  loss= 83  rate=21.73% |   n=12079  loss=1150  rate=9.52% |   n=2141  loss=164  rate=7.66% |   n=3848  loss=1213  rate=31.52% |
| **all** | **  n=16162  loss=5103  rate=31.57%** | **  n=13755  loss=1573  rate=11.44%** | **  n=2146  loss=164  rate=7.64%** | **  n=24361  loss=1690  rate=6.94%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
