# Phase 4 readiness

_Updated: 2026-10-13T05:15:35.642Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 157 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **91,974**
- Outcome patches resolved: **162,048**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.11% (n=23036) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.00% (n=3418) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22536  loss=7304  rate=32.41% |   n=2879  loss=676  rate=23.48% |   n=   5  loss=  0  rate=0.00% |   n=33454  loss=846  rate=2.53% |
| risky |   n= 500  loss= 92  rate=18.40% |   n=18849  loss=1480  rate=7.85% |   n=3413  loss=205  rate=6.01% |   n=6138  loss=1957  rate=31.88% |
| **all** | **  n=23036  loss=7396  rate=32.11%** | **  n=21728  loss=2156  rate=9.92%** | **  n=3418  loss=205  rate=6.00%** | **  n=39592  loss=2803  rate=7.08%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19616  loss=6245  rate=31.84% |   n=2348  loss=558  rate=23.76% |   n=   5  loss=  0  rate=0.00% |   n=27905  loss=751  rate=2.69% |
| risky |   n= 477  loss=174  rate=36.48% |   n=15925  loss=1379  rate=8.66% |   n=2867  loss=197  rate=6.87% |   n=5131  loss=1735  rate=33.81% |
| **all** | **  n=20093  loss=6419  rate=31.95%** | **  n=18273  loss=1937  rate=10.60%** | **  n=2872  loss=197  rate=6.86%** | **  n=33036  loss=2486  rate=7.53%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
