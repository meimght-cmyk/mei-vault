# Phase 4 readiness

_Updated: 2026-06-25T10:27:15.740Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 47 of 90)
- Earliest unlock: **2026-08-07** (42 days away)
- Probe rows collected: **27,324**
- Outcome patches resolved: **33,348**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 18.69% (n=8768) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.63% (n=855) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8637  loss=1639  rate=18.98% |   n= 551  loss= 94  rate=17.06% |   n=   5  loss=  0  rate=0.00% |   n=6581  loss=106  rate=1.61% |
| risky |   n= 131  loss=  0  rate=0.00% |   n=5197  loss=278  rate=5.35% |   n= 850  loss= 31  rate=3.65% |   n=1172  loss=341  rate=29.10% |
| **all** | **  n=8768  loss=1639  rate=18.69%** | **  n=5748  loss=372  rate=6.47%** | **  n= 855  loss= 31  rate=3.63%** | **  n=7753  loss=447  rate=5.77%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=5729  loss=544  rate=9.50% |   n= 127  loss= 15  rate=11.81% |   n=   4  loss=  0  rate=0.00% |   n=1314  loss= 26  rate=1.98% |
| risky |   n=  46  loss=  2  rate=4.35% |   n=2434  loss=102  rate=4.19% |   n= 327  loss=  8  rate=2.45% |   n= 243  loss= 53  rate=21.81% |
| **all** | **  n=5775  loss=546  rate=9.45%** | **  n=2561  loss=117  rate=4.57%** | **  n= 331  loss=  8  rate=2.42%** | **  n=1557  loss= 79  rate=5.07%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
