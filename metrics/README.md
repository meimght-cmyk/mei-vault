# Phase 4 readiness

_Updated: 2026-08-17T20:50:53.951Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 100 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **58,674**
- Outcome patches resolved: **95,598**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.23% (n=15760) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.62% (n=2070) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15393  loss=4579  rate=29.75% |   n=1599  loss=374  rate=23.39% |   n=   5  loss=  0  rate=0.00% |   n=19777  loss=413  rate=2.09% |
| risky |   n= 367  loss= 27  rate=7.36% |   n=11691  loss=1015  rate=8.68% |   n=2065  loss=137  rate=6.63% |   n=3727  loss=1181  rate=31.69% |
| **all** | **  n=15760  loss=4606  rate=29.23%** | **  n=13290  loss=1389  rate=10.45%** | **  n=2070  loss=137  rate=6.62%** | **  n=23504  loss=1594  rate=6.78%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12408  loss=3666  rate=29.55% |   n=1123  loss=277  rate=24.67% |   n=   5  loss=  0  rate=0.00% |   n=14138  loss=326  rate=2.31% |
| risky |   n= 261  loss= 27  rate=10.34% |   n=8782  loss=863  rate=9.83% |   n=1511  loss=120  rate=7.94% |   n=2746  loss=920  rate=33.50% |
| **all** | **  n=12669  loss=3693  rate=29.15%** | **  n=9905  loss=1140  rate=11.51%** | **  n=1516  loss=120  rate=7.92%** | **  n=16884  loss=1246  rate=7.38%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
