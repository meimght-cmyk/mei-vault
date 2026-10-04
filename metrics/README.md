# Phase 4 readiness

_Updated: 2026-10-04T20:17:38.255Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 148 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **87,024**
- Outcome patches resolved: **152,148**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.92% (n=21947) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.22% (n=3216) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21452  loss=7133  rate=33.25% |   n=2688  loss=660  rate=24.55% |   n=   5  loss=  0  rate=0.00% |   n=31429  loss=725  rate=2.31% |
| risky |   n= 495  loss= 91  rate=18.38% |   n=17781  loss=1444  rate=8.12% |   n=3211  loss=200  rate=6.23% |   n=5763  loss=1708  rate=29.64% |
| **all** | **  n=21947  loss=7224  rate=32.92%** | **  n=20469  loss=2104  rate=10.28%** | **  n=3216  loss=200  rate=6.22%** | **  n=37192  loss=2433  rate=6.54%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18564  loss=6072  rate=32.71% |   n=2157  loss=537  rate=24.90% |   n=   5  loss=  0  rate=0.00% |   n=25848  loss=611  rate=2.36% |
| risky |   n= 471  loss=170  rate=36.09% |   n=14836  loss=1352  rate=9.11% |   n=2666  loss=196  rate=7.35% |   n=4777  loss=1495  rate=31.30% |
| **all** | **  n=19035  loss=6242  rate=32.79%** | **  n=16993  loss=1889  rate=11.12%** | **  n=2671  loss=196  rate=7.34%** | **  n=30625  loss=2106  rate=6.88%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
