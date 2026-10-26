# Phase 4 readiness

_Updated: 2026-10-26T20:42:38.753Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 170 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **100,074**
- Outcome patches resolved: **178,248**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 27.56% (n=27130) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.53% (n=3777) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=26584  loss=7384  rate=27.78% |   n=3439  loss=685  rate=19.92% |   n=   5  loss=  0  rate=0.00% |   n=34246  loss=921  rate=2.69% |
| risky |   n= 546  loss= 92  rate=16.85% |   n=20944  loss=1483  rate=7.08% |   n=3772  loss=209  rate=5.54% |   n=6338  loss=2149  rate=33.91% |
| **all** | **  n=27130  loss=7476  rate=27.56%** | **  n=24383  loss=2168  rate=8.89%** | **  n=3777  loss=209  rate=5.53%** | **  n=40584  loss=3070  rate=7.56%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21353  loss=6258  rate=29.31% |   n=2670  loss=558  rate=20.90% |   n=   5  loss=  0  rate=0.00% |   n=31246  loss=1075  rate=3.44% |
| risky |   n= 495  loss=174  rate=35.15% |   n=17678  loss=1379  rate=7.80% |   n=3191  loss=197  rate=6.17% |   n=5736  loss=2304  rate=40.17% |
| **all** | **  n=21848  loss=6432  rate=29.44%** | **  n=20348  loss=1937  rate=9.52%** | **  n=3196  loss=197  rate=6.16%** | **  n=36982  loss=3379  rate=9.14%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
