# Phase 4 readiness

_Updated: 2026-11-22T17:36:13.542Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 197 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **115,824**
- Outcome patches resolved: **209,746**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 21.12% (n=36100) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.78% (n=4497) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=35453  loss=7530  rate=21.24% |   n=4649  loss=703  rate=15.12% |   n=   6  loss=  0  rate=0.00% |   n=34666  loss=970  rate=2.80% |
| risky |   n= 647  loss= 96  rate=14.84% |   n=25187  loss=1547  rate=6.14% |   n=4491  loss=215  rate=4.79% |   n=6523  loss=2331  rate=35.74% |
| **all** | **  n=36100  loss=7626  rate=21.12%** | **  n=29836  loss=2250  rate=7.54%** | **  n=4497  loss=215  rate=4.78%** | **  n=41189  loss=3301  rate=8.01%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=27903  loss=6393  rate=22.91% |   n=3618  loss=573  rate=15.84% |   n=   6  loss=  0  rate=0.00% |   n=34247  loss=1359  rate=3.97% |
| risky |   n= 561  loss=177  rate=31.55% |   n=21574  loss=1454  rate=6.74% |   n=3877  loss=204  rate=5.26% |   n=6338  loss=2859  rate=45.11% |
| **all** | **  n=28464  loss=6570  rate=23.08%** | **  n=25192  loss=2027  rate=8.05%** | **  n=3883  loss=204  rate=5.25%** | **  n=40585  loss=4218  rate=10.39%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
