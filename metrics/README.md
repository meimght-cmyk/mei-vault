# Phase 4 readiness

_Updated: 2026-08-01T05:11:56.152Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 84 of 90)
- Earliest unlock: **2026-08-07** (5 days away)
- Probe rows collected: **48,924**
- Outcome patches resolved: **75,948**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 27.54% (n=13563) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.30% (n=1672) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13273  loss=3715  rate=27.99% |   n=1222  loss=273  rate=22.34% |   n=   5  loss=  0  rate=0.00% |   n=15674  loss=313  rate=2.00% |
| risky |   n= 290  loss= 20  rate=6.90% |   n=9594  loss=870  rate=9.07% |   n=1667  loss=122  rate=7.32% |   n=2999  loss=979  rate=32.64% |
| **all** | **  n=13563  loss=3735  rate=27.54%** | **  n=10816  loss=1143  rate=10.57%** | **  n=1672  loss=122  rate=7.30%** | **  n=18673  loss=1292  rate=6.92%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10386  loss=2756  rate=26.54% |   n= 821  loss=200  rate=24.36% |   n=   5  loss=  0  rate=0.00% |   n=9962  loss=195  rate=1.96% |
| risky |   n= 185  loss= 14  rate=7.57% |   n=6873  loss=729  rate=10.61% |   n=1160  loss=108  rate=9.31% |   n=1832  loss=541  rate=29.53% |
| **all** | **  n=10571  loss=2770  rate=26.20%** | **  n=7694  loss=929  rate=12.07%** | **  n=1165  loss=108  rate=9.27%** | **  n=11794  loss=736  rate=6.24%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
