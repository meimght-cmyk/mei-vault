# Phase 4 readiness

_Updated: 2026-08-03T07:05:06.958Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 86 of 90)
- Earliest unlock: **2026-08-07** (3 days away)
- Probe rows collected: **50,124**
- Outcome patches resolved: **78,348**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 27.67% (n=13833) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.20% (n=1722) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13534  loss=3807  rate=28.13% |   n=1256  loss=280  rate=22.29% |   n=   5  loss=  0  rate=0.00% |   n=16179  loss=330  rate=2.04% |
| risky |   n= 299  loss= 21  rate=7.02% |   n=9844  loss=879  rate=8.93% |   n=1717  loss=124  rate=7.22% |   n=3090  loss=999  rate=32.33% |
| **all** | **  n=13833  loss=3828  rate=27.67%** | **  n=11100  loss=1159  rate=10.44%** | **  n=1722  loss=124  rate=7.20%** | **  n=19269  loss=1329  rate=6.90%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10491  loss=2808  rate=26.77% |   n= 835  loss=202  rate=24.19% |   n=   5  loss=  0  rate=0.00% |   n=10643  loss=231  rate=2.17% |
| risky |   n= 189  loss= 15  rate=7.94% |   n=6971  loss=737  rate=10.57% |   n=1178  loss=108  rate=9.17% |   n=2112  loss=745  rate=35.27% |
| **all** | **  n=10680  loss=2823  rate=26.43%** | **  n=7806  loss=939  rate=12.03%** | **  n=1183  loss=108  rate=9.13%** | **  n=12755  loss=976  rate=7.65%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
