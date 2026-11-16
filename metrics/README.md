# Phase 4 readiness

_Updated: 2026-11-16T00:14:52.675Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 191 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **111,774**
- Outcome patches resolved: **201,948**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 22.42% (n=33860) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.98% (n=4316) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=33238  loss=7495  rate=22.55% |   n=4347  loss=698  rate=16.06% |   n=   6  loss=  0  rate=0.00% |   n=34583  loss=960  rate=2.78% |
| risky |   n= 622  loss= 95  rate=15.27% |   n=24140  loss=1526  rate=6.32% |   n=4310  loss=215  rate=4.99% |   n=6478  loss=2286  rate=35.29% |
| **all** | **  n=33860  loss=7590  rate=22.42%** | **  n=28487  loss=2224  rate=7.81%** | **  n=4316  loss=215  rate=4.98%** | **  n=41061  loss=3246  rate=7.91%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=25665  loss=6317  rate=24.61% |   n=3310  loss=563  rate=17.01% |   n=   5  loss=  0  rate=0.00% |   n=34194  loss=1356  rate=3.97% |
| risky |   n= 535  loss=175  rate=32.71% |   n=20517  loss=1419  rate=6.92% |   n=3697  loss=203  rate=5.49% |   n=6301  loss=2822  rate=44.79% |
| **all** | **  n=26200  loss=6492  rate=24.78%** | **  n=23827  loss=1982  rate=8.32%** | **  n=3702  loss=203  rate=5.48%** | **  n=40495  loss=4178  rate=10.32%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
