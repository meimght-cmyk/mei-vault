# Phase 4 readiness

_Updated: 2026-07-17T16:00:47.223Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 69 of 90)
- Earliest unlock: **2026-08-07** (20 days away)
- Probe rows collected: **40,374**
- Outcome patches resolved: **58,848**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 25.08% (n=11566) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.28% (n=1332) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11346  loss=2886  rate=25.44% |   n= 967  loss=207  rate=21.41% |   n=   5  loss=  0  rate=0.00% |   n=12156  loss=237  rate=1.95% |
| risky |   n= 220  loss= 15  rate=6.82% |   n=7783  loss=728  rate=9.35% |   n=1327  loss= 97  rate=7.31% |   n=2370  loss=816  rate=34.43% |
| **all** | **  n=11566  loss=2901  rate=25.08%** | **  n=8750  loss=935  rate=10.69%** | **  n=1332  loss= 97  rate=7.28%** | **  n=14526  loss=1053  rate=7.25%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8546  loss=1949  rate=22.81% |   n= 534  loss=140  rate=26.22% |   n=   5  loss=  0  rate=0.00% |   n=6389  loss=117  rate=1.83% |
| risky |   n= 128  loss= 12  rate=9.38% |   n=5116  loss=613  rate=11.98% |   n= 832  loss= 92  rate=11.06% |   n=1124  loss=283  rate=25.18% |
| **all** | **  n=8674  loss=1961  rate=22.61%** | **  n=5650  loss=753  rate=13.33%** | **  n= 837  loss= 92  rate=10.99%** | **  n=7513  loss=400  rate=5.32%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
