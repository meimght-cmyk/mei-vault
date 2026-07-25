# Phase 4 readiness

_Updated: 2026-07-25T23:36:47.077Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 77 of 90)
- Earliest unlock: **2026-08-07** (12 days away)
- Probe rows collected: **45,174**
- Outcome patches resolved: **68,748**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 26.48% (n=12706) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.03% (n=1523) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12444  loss=3346  rate=26.89% |   n=1126  loss=248  rate=22.02% |   n=   5  loss=  0  rate=0.00% |   n=14199  loss=275  rate=1.94% |
| risky |   n= 262  loss= 19  rate=7.25% |   n=8816  loss=790  rate=8.96% |   n=1518  loss=107  rate=7.05% |   n=2754  loss=921  rate=33.44% |
| **all** | **  n=12706  loss=3365  rate=26.48%** | **  n=9942  loss=1038  rate=10.44%** | **  n=1523  loss=107  rate=7.03%** | **  n=16953  loss=1196  rate=7.05%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9646  loss=2411  rate=24.99% |   n= 713  loss=180  rate=25.25% |   n=   5  loss=  0  rate=0.00% |   n=8410  loss=148  rate=1.76% |
| risky |   n= 161  loss= 12  rate=7.45% |   n=6169  loss=684  rate=11.09% |   n=1027  loss=100  rate=9.74% |   n=1493  loss=391  rate=26.19% |
| **all** | **  n=9807  loss=2423  rate=24.71%** | **  n=6882  loss=864  rate=12.55%** | **  n=1032  loss=100  rate=9.69%** | **  n=9903  loss=539  rate=5.44%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
