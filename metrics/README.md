# Phase 4 readiness

_Updated: 2026-07-27T00:31:34.504Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 79 of 90)
- Earliest unlock: **2026-08-07** (10 days away)
- Probe rows collected: **45,924**
- Outcome patches resolved: **69,948**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 26.71% (n=12848) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.24% (n=1548) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12582  loss=3413  rate=27.13% |   n=1143  loss=254  rate=22.22% |   n=   5  loss=  0  rate=0.00% |   n=14444  loss=278  rate=1.92% |
| risky |   n= 266  loss= 19  rate=7.14% |   n=8945  loss=814  rate=9.10% |   n=1543  loss=112  rate=7.26% |   n=2796  loss=935  rate=33.44% |
| **all** | **  n=12848  loss=3432  rate=26.71%** | **  n=10088  loss=1068  rate=10.59%** | **  n=1548  loss=112  rate=7.24%** | **  n=17240  loss=1213  rate=7.04%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9786  loss=2479  rate=25.33% |   n= 734  loss=184  rate=25.07% |   n=   5  loss=  0  rate=0.00% |   n=8649  loss=153  rate=1.77% |
| risky |   n= 165  loss= 12  rate=7.27% |   n=6300  loss=694  rate=11.02% |   n=1053  loss=102  rate=9.69% |   n=1532  loss=401  rate=26.17% |
| **all** | **  n=9951  loss=2491  rate=25.03%** | **  n=7034  loss=878  rate=12.48%** | **  n=1058  loss=102  rate=9.64%** | **  n=10181  loss=554  rate=5.44%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
