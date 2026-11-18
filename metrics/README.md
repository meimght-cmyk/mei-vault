# Phase 4 readiness

_Updated: 2026-11-18T09:24:27.593Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 193 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **113,274**
- Outcome patches resolved: **204,648**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 22.05% (n=34588) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.91% (n=4378) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=33957  loss=7530  rate=22.18% |   n=4445  loss=703  rate=15.82% |   n=   6  loss=  0  rate=0.00% |   n=34666  loss=970  rate=2.80% |
| risky |   n= 631  loss= 96  rate=15.21% |   n=24474  loss=1545  rate=6.31% |   n=4372  loss=215  rate=4.92% |   n=6523  loss=2331  rate=35.74% |
| **all** | **  n=34588  loss=7626  rate=22.05%** | **  n=28919  loss=2248  rate=7.77%** | **  n=4378  loss=215  rate=4.91%** | **  n=41189  loss=3301  rate=8.01%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=26418  loss=6327  rate=23.95% |   n=3415  loss=564  rate=16.52% |   n=   5  loss=  0  rate=0.00% |   n=34236  loss=1359  rate=3.97% |
| risky |   n= 544  loss=175  rate=32.17% |   n=20877  loss=1419  rate=6.80% |   n=3759  loss=203  rate=5.40% |   n=6320  loss=2841  rate=44.95% |
| **all** | **  n=26962  loss=6502  rate=24.12%** | **  n=24292  loss=1983  rate=8.16%** | **  n=3764  loss=203  rate=5.39%** | **  n=40556  loss=4200  rate=10.36%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
