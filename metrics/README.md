# Phase 4 readiness

_Updated: 2026-07-03T03:07:05.120Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 55 of 90)
- Earliest unlock: **2026-08-07** (34 days away)
- Probe rows collected: **31,824**
- Outcome patches resolved: **42,348**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 22.59% (n=9807) — floor ≤ 2%
- ❌ **BLOCK precision**: 8.53% (n=1032) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9646  loss=2206  rate=22.87% |   n= 713  loss=161  rate=22.58% |   n=   5  loss=  0  rate=0.00% |   n=8410  loss=135  rate=1.61% |
| risky |   n= 161  loss=  9  rate=5.59% |   n=6169  loss=618  rate=10.02% |   n=1027  loss= 88  rate=8.57% |   n=1493  loss=407  rate=27.26% |
| **all** | **  n=9807  loss=2215  rate=22.59%** | **  n=6882  loss=779  rate=11.32%** | **  n=1032  loss= 88  rate=8.53%** | **  n=9903  loss=542  rate=5.47%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=6759  loss=1205  rate=17.83% |   n= 255  loss= 79  rate=30.98% |   n=   5  loss=  0  rate=0.00% |   n=3155  loss= 52  rate=1.65% |
| risky |   n=  75  loss= 12  rate=16.00% |   n=3378  loss=460  rate=13.62% |   n= 510  loss= 75  rate=14.71% |   n= 587  loss=142  rate=24.19% |
| **all** | **  n=6834  loss=1217  rate=17.81%** | **  n=3633  loss=539  rate=14.84%** | **  n= 515  loss= 75  rate=14.56%** | **  n=3742  loss=194  rate=5.18%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
