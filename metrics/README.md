# Phase 4 readiness

_Updated: 2026-09-17T02:20:01.504Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 131 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **76,524**
- Outcome patches resolved: **131,298**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.70% (n=19701) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.05% (n=2794) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19226  loss=6174  rate=32.11% |   n=2277  loss=545  rate=23.94% |   n=   5  loss=  0  rate=0.00% |   n=27166  loss=622  rate=2.29% |
| risky |   n= 475  loss= 72  rate=15.16% |   n=15519  loss=1263  rate=8.14% |   n=2789  loss=169  rate=6.06% |   n=5017  loss=1497  rate=29.84% |
| **all** | **  n=19701  loss=6246  rate=31.70%** | **  n=17796  loss=1808  rate=10.16%** | **  n=2794  loss=169  rate=6.05%** | **  n=32183  loss=2119  rate=6.58%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16309  loss=5211  rate=31.95% |   n=1763  loss=443  rate=25.13% |   n=   5  loss=  0  rate=0.00% |   n=21497  loss=502  rate=2.34% |
| risky |   n= 398  loss= 99  rate=24.87% |   n=12599  loss=1188  rate=9.43% |   n=2240  loss=172  rate=7.68% |   n=4013  loss=1256  rate=31.30% |
| **all** | **  n=16707  loss=5310  rate=31.78%** | **  n=14362  loss=1631  rate=11.36%** | **  n=2245  loss=172  rate=7.66%** | **  n=25510  loss=1758  rate=6.89%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
