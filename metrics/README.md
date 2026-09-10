# Phase 4 readiness

_Updated: 2026-09-10T20:08:13.879Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 124 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **72,924**
- Outcome patches resolved: **123,948**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.38% (n=18899) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.24% (n=2646) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18429  loss=5864  rate=31.82% |   n=2135  loss=513  rate=24.03% |   n=   5  loss=  0  rate=0.00% |   n=25605  loss=580  rate=2.27% |
| risky |   n= 470  loss= 67  rate=14.26% |   n=14703  loss=1220  rate=8.30% |   n=2641  loss=165  rate=6.25% |   n=4736  loss=1429  rate=30.17% |
| **all** | **  n=18899  loss=5931  rate=31.38%** | **  n=16838  loss=1733  rate=10.29%** | **  n=2646  loss=165  rate=6.24%** | **  n=30341  loss=2009  rate=6.62%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15521  loss=4912  rate=31.65% |   n=1625  loss=409  rate=25.17% |   n=   5  loss=  0  rate=0.00% |   n=20023  loss=467  rate=2.33% |
| risky |   n= 373  loss= 74  rate=19.84% |   n=11818  loss=1129  rate=9.55% |   n=2090  loss=161  rate=7.70% |   n=3769  loss=1189  rate=31.55% |
| **all** | **  n=15894  loss=4986  rate=31.37%** | **  n=13443  loss=1538  rate=11.44%** | **  n=2095  loss=161  rate=7.68%** | **  n=23792  loss=1656  rate=6.96%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
