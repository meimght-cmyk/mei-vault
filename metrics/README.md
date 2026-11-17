# Phase 4 readiness

_Updated: 2026-11-17T08:12:01.716Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 192 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **112,674**
- Outcome patches resolved: **203,448**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 22.26% (n=34266) — floor ≤ 2%
- ❌ **BLOCK precision**: 4.94% (n=4350) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=33639  loss=7530  rate=22.38% |   n=4403  loss=703  rate=15.97% |   n=   6  loss=  0  rate=0.00% |   n=34626  loss=964  rate=2.78% |
| risky |   n= 627  loss= 96  rate=15.31% |   n=24323  loss=1545  rate=6.35% |   n=4344  loss=215  rate=4.95% |   n=6506  loss=2314  rate=35.57% |
| **all** | **  n=34266  loss=7626  rate=22.26%** | **  n=28726  loss=2248  rate=7.83%** | **  n=4350  loss=215  rate=4.94%** | **  n=41132  loss=3278  rate=7.97%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=26105  loss=6327  rate=24.24% |   n=3370  loss=564  rate=16.74% |   n=   5  loss=  0  rate=0.00% |   n=34194  loss=1356  rate=3.97% |
| risky |   n= 540  loss=175  rate=32.41% |   n=20727  loss=1419  rate=6.85% |   n=3732  loss=203  rate=5.44% |   n=6301  loss=2822  rate=44.79% |
| **all** | **  n=26645  loss=6502  rate=24.40%** | **  n=24097  loss=1983  rate=8.23%** | **  n=3737  loss=203  rate=5.43%** | **  n=40495  loss=4178  rate=10.32%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
