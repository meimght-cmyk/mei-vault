# Phase 4 readiness

_Updated: 2026-10-20T13:32:14.449Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 164 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **96,324**
- Outcome patches resolved: **170,748**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.96% (n=24955) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.80% (n=3604) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=24434  loss=7384  rate=30.22% |   n=3142  loss=685  rate=21.80% |   n=   5  loss=  0  rate=0.00% |   n=34193  loss=918  rate=2.68% |
| risky |   n= 521  loss= 92  rate=17.66% |   n=19929  loss=1483  rate=7.44% |   n=3599  loss=209  rate=5.81% |   n=6301  loss=2112  rate=33.52% |
| **all** | **  n=24955  loss=7476  rate=29.96%** | **  n=23071  loss=2168  rate=9.40%** | **  n=3604  loss=209  rate=5.80%** | **  n=40494  loss=3030  rate=7.48%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20536  loss=6256  rate=30.46% |   n=2516  loss=558  rate=22.18% |   n=   5  loss=  0  rate=0.00% |   n=29717  loss=927  rate=3.12% |
| risky |   n= 488  loss=174  rate=35.66% |   n=16848  loss=1379  rate=8.18% |   n=3036  loss=197  rate=6.49% |   n=5478  loss=2064  rate=37.68% |
| **all** | **  n=21024  loss=6430  rate=30.58%** | **  n=19364  loss=1937  rate=10.00%** | **  n=3041  loss=197  rate=6.48%** | **  n=35195  loss=2991  rate=8.50%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
