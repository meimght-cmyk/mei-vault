# Phase 4 readiness

_Updated: 2026-11-19T10:37:07.712Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 194 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **113,874**
- Outcome patches resolved: **205,848**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 21.82% (n=34944) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.88% (n=4406) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=34309  loss=7530  rate=21.95% |   n=4493  loss=703  rate=15.65% |   n=   6  loss=  0  rate=0.00% |   n=34666  loss=970  rate=2.80% |
| risky |   n= 635  loss= 96  rate=15.12% |   n=24642  loss=1545  rate=6.27% |   n=4400  loss=215  rate=4.89% |   n=6523  loss=2331  rate=35.74% |
| **all** | **  n=34944  loss=7626  rate=21.82%** | **  n=29135  loss=2248  rate=7.72%** | **  n=4406  loss=215  rate=4.88%** | **  n=41189  loss=3301  rate=8.01%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=26760  loss=6327  rate=23.64% |   n=3463  loss=564  rate=16.29% |   n=   5  loss=  0  rate=0.00% |   n=34246  loss=1359  rate=3.97% |
| risky |   n= 548  loss=175  rate=31.93% |   n=21028  loss=1419  rate=6.75% |   n=3786  loss=203  rate=5.36% |   n=6338  loss=2859  rate=45.11% |
| **all** | **  n=27308  loss=6502  rate=23.81%** | **  n=24491  loss=1983  rate=8.10%** | **  n=3791  loss=203  rate=5.35%** | **  n=40584  loss=4218  rate=10.39%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
