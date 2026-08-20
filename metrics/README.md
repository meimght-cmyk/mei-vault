# Phase 4 readiness

_Updated: 2026-08-20T23:51:21.305Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 103 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **60,624**
- Outcome patches resolved: **99,348**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.41% (n=16162) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.57% (n=2146) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15780  loss=4724  rate=29.94% |   n=1676  loss=398  rate=23.75% |   n=   5  loss=  0  rate=0.00% |   n=20513  loss=431  rate=2.10% |
| risky |   n= 382  loss= 29  rate=7.59% |   n=12079  loss=1047  rate=8.67% |   n=2141  loss=141  rate=6.59% |   n=3848  loss=1208  rate=31.39% |
| **all** | **  n=16162  loss=4753  rate=29.41%** | **  n=13755  loss=1445  rate=10.51%** | **  n=2146  loss=141  rate=6.57%** | **  n=24361  loss=1639  rate=6.73%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12859  loss=3887  rate=30.23% |   n=1176  loss=293  rate=24.91% |   n=   5  loss=  0  rate=0.00% |   n=14934  loss=349  rate=2.34% |
| risky |   n= 277  loss= 32  rate=11.55% |   n=9201  loss=920  rate=10.00% |   n=1592  loss=131  rate=8.23% |   n=2880  loss=946  rate=32.85% |
| **all** | **  n=13136  loss=3919  rate=29.83%** | **  n=10377  loss=1213  rate=11.69%** | **  n=1597  loss=131  rate=8.20%** | **  n=17814  loss=1295  rate=7.27%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
