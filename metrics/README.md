# Phase 4 readiness

_Updated: 2026-08-16T19:52:37.164Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 99 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **58,074**
- Outcome patches resolved: **94,398**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.12% (n=15625) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.65% (n=2045) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15263  loss=4524  rate=29.64% |   n=1578  loss=369  rate=23.38% |   n=   5  loss=  0  rate=0.00% |   n=19528  loss=403  rate=2.06% |
| risky |   n= 362  loss= 26  rate=7.18% |   n=11559  loss=1005  rate=8.69% |   n=2040  loss=136  rate=6.67% |   n=3689  loss=1172  rate=31.77% |
| **all** | **  n=15625  loss=4550  rate=29.12%** | **  n=13137  loss=1374  rate=10.46%** | **  n=2045  loss=136  rate=6.65%** | **  n=23217  loss=1575  rate=6.78%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12284  loss=3618  rate=29.45% |   n=1109  loss=275  rate=24.80% |   n=   5  loss=  0  rate=0.00% |   n=13876  loss=320  rate=2.31% |
| risky |   n= 257  loss= 27  rate=10.51% |   n=8655  loss=853  rate=9.86% |   n=1488  loss=120  rate=8.06% |   n=2700  loss=910  rate=33.70% |
| **all** | **  n=12541  loss=3645  rate=29.06%** | **  n=9764  loss=1128  rate=11.55%** | **  n=1493  loss=120  rate=8.04%** | **  n=16576  loss=1230  rate=7.42%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
