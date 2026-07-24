# Phase 4 readiness

_Updated: 2026-07-24T22:41:26.670Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 76 of 90)
- Earliest unlock: **2026-08-07** (13 days away)
- Probe rows collected: **44,574**
- Outcome patches resolved: **67,548**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 26.27% (n=12560) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.08% (n=1498) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12302  loss=3280  rate=26.66% |   n=1113  loss=247  rate=22.19% |   n=   5  loss=  0  rate=0.00% |   n=13954  loss=269  rate=1.93% |
| risky |   n= 258  loss= 19  rate=7.36% |   n=8684  loss=782  rate=9.01% |   n=1493  loss=106  rate=7.10% |   n=2715  loss=918  rate=33.81% |
| **all** | **  n=12560  loss=3299  rate=26.27%** | **  n=9797  loss=1029  rate=10.50%** | **  n=1498  loss=106  rate=7.08%** | **  n=16669  loss=1187  rate=7.12%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9510  loss=2354  rate=24.75% |   n= 691  loss=173  rate=25.04% |   n=   5  loss=  0  rate=0.00% |   n=8168  loss=145  rate=1.78% |
| risky |   n= 157  loss= 12  rate=7.64% |   n=6038  loss=680  rate=11.26% |   n=1004  loss= 98  rate=9.76% |   n=1451  loss=380  rate=26.19% |
| **all** | **  n=9667  loss=2366  rate=24.48%** | **  n=6729  loss=853  rate=12.68%** | **  n=1009  loss= 98  rate=9.71%** | **  n=9619  loss=525  rate=5.46%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
