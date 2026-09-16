# Phase 4 readiness

_Updated: 2026-09-16T01:19:41.252Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 130 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **75,924**
- Outcome patches resolved: **130,098**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.62% (n=19574) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.09% (n=2773) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19099  loss=6117  rate=32.03% |   n=2258  loss=542  rate=24.00% |   n=   5  loss=  0  rate=0.00% |   n=26912  loss=610  rate=2.27% |
| risky |   n= 475  loss= 72  rate=15.16% |   n=15400  loss=1255  rate=8.15% |   n=2768  loss=169  rate=6.11% |   n=4957  loss=1474  rate=29.74% |
| **all** | **  n=19574  loss=6189  rate=31.62%** | **  n=17658  loss=1797  rate=10.18%** | **  n=2773  loss=169  rate=6.09%** | **  n=31869  loss=2084  rate=6.54%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16179  loss=5173  rate=31.97% |   n=1737  loss=434  rate=24.99% |   n=   5  loss=  0  rate=0.00% |   n=21253  loss=500  rate=2.35% |
| risky |   n= 394  loss= 95  rate=24.11% |   n=12469  loss=1177  rate=9.44% |   n=2216  loss=169  rate=7.63% |   n=3971  loss=1241  rate=31.25% |
| **all** | **  n=16573  loss=5268  rate=31.79%** | **  n=14206  loss=1611  rate=11.34%** | **  n=2221  loss=169  rate=7.61%** | **  n=25224  loss=1741  rate=6.90%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
