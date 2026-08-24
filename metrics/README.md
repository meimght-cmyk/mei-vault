# Phase 4 readiness

_Updated: 2026-08-24T02:44:52.116Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 107 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **62,424**
- Outcome patches resolved: **102,948**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.70% (n=16573) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.57% (n=2221) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16179  loss=4894  rate=30.25% |   n=1737  loss=412  rate=23.72% |   n=   5  loss=  0  rate=0.00% |   n=21253  loss=455  rate=2.14% |
| risky |   n= 394  loss= 29  rate=7.36% |   n=12469  loss=1076  rate=8.63% |   n=2216  loss=146  rate=6.59% |   n=3971  loss=1234  rate=31.08% |
| **all** | **  n=16573  loss=4923  rate=29.70%** | **  n=14206  loss=1488  rate=10.47%** | **  n=2221  loss=146  rate=6.57%** | **  n=25224  loss=1689  rate=6.70%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13273  loss=4077  rate=30.72% |   n=1222  loss=298  rate=24.39% |   n=   5  loss=  0  rate=0.00% |   n=15674  loss=373  rate=2.38% |
| risky |   n= 290  loss= 33  rate=11.38% |   n=9594  loss=949  rate=9.89% |   n=1667  loss=133  rate=7.98% |   n=2999  loss=978  rate=32.61% |
| **all** | **  n=13563  loss=4110  rate=30.30%** | **  n=10816  loss=1247  rate=11.53%** | **  n=1672  loss=133  rate=7.95%** | **  n=18673  loss=1351  rate=7.24%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
