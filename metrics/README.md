# Phase 4 readiness

_Updated: 2026-11-20T11:50:02.433Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 195 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **114,474**
- Outcome patches resolved: **207,048**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 21.60% (n=35300) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.85% (n=4434) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=34661  loss=7530  rate=21.72% |   n=4541  loss=703  rate=15.48% |   n=   6  loss=  0  rate=0.00% |   n=34666  loss=970  rate=2.80% |
| risky |   n= 639  loss= 96  rate=15.02% |   n=24810  loss=1545  rate=6.23% |   n=4428  loss=215  rate=4.86% |   n=6523  loss=2331  rate=35.74% |
| **all** | **  n=35300  loss=7626  rate=21.60%** | **  n=29351  loss=2248  rate=7.66%** | **  n=4434  loss=215  rate=4.85%** | **  n=41189  loss=3301  rate=8.01%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=27111  loss=6327  rate=23.34% |   n=3511  loss=564  rate=16.06% |   n=   5  loss=  0  rate=0.00% |   n=34247  loss=1359  rate=3.97% |
| risky |   n= 552  loss=175  rate=31.70% |   n=21196  loss=1419  rate=6.69% |   n=3814  loss=203  rate=5.32% |   n=6338  loss=2859  rate=45.11% |
| **all** | **  n=27663  loss=6502  rate=23.50%** | **  n=24707  loss=1983  rate=8.03%** | **  n=3819  loss=203  rate=5.32%** | **  n=40585  loss=4218  rate=10.39%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
