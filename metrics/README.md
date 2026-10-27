# Phase 4 readiness

_Updated: 2026-10-27T21:52:11.305Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 171 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **100,674**
- Outcome patches resolved: **179,448**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 27.35% (n=27486) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.57% (n=3805) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=26936  loss=7425  rate=27.57% |   n=3487  loss=688  rate=19.73% |   n=   5  loss=  0  rate=0.00% |   n=34246  loss=921  rate=2.69% |
| risky |   n= 550  loss= 93  rate=16.91% |   n=21112  loss=1496  rate=7.09% |   n=3800  loss=212  rate=5.58% |   n=6338  loss=2149  rate=33.91% |
| **all** | **  n=27486  loss=7518  rate=27.35%** | **  n=24599  loss=2184  rate=8.88%** | **  n=3805  loss=212  rate=5.57%** | **  n=40584  loss=3070  rate=7.56%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21487  loss=6260  rate=29.13% |   n=2692  loss=558  rate=20.73% |   n=   5  loss=  0  rate=0.00% |   n=31490  loss=1100  rate=3.49% |
| risky |   n= 495  loss=174  rate=35.15% |   n=17815  loss=1379  rate=7.74% |   n=3217  loss=197  rate=6.12% |   n=5773  loss=2337  rate=40.48% |
| **all** | **  n=21982  loss=6434  rate=29.27%** | **  n=20507  loss=1937  rate=9.45%** | **  n=3222  loss=197  rate=6.11%** | **  n=37263  loss=3437  rate=9.22%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
