# Phase 4 readiness

_Updated: 2026-09-15T00:13:18.714Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 129 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **75,324**
- Outcome patches resolved: **128,748**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.60% (n=19433) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.16% (n=2743) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18958  loss=6068  rate=32.01% |   n=2233  loss=537  rate=24.05% |   n=   5  loss=  0  rate=0.00% |   n=26578  loss=599  rate=2.25% |
| risky |   n= 475  loss= 72  rate=15.16% |   n=15233  loss=1248  rate=8.19% |   n=2738  loss=169  rate=6.17% |   n=4904  loss=1466  rate=29.89% |
| **all** | **  n=19433  loss=6140  rate=31.60%** | **  n=17466  loss=1785  rate=10.22%** | **  n=2743  loss=169  rate=6.16%** | **  n=31482  loss=2065  rate=6.56%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16049  loss=5120  rate=31.90% |   n=1715  loss=429  rate=25.01% |   n=   5  loss=  0  rate=0.00% |   n=21005  loss=493  rate=2.35% |
| risky |   n= 390  loss= 91  rate=23.33% |   n=12339  loss=1166  rate=9.45% |   n=2190  loss=166  rate=7.58% |   n=3931  loss=1228  rate=31.24% |
| **all** | **  n=16439  loss=5211  rate=31.70%** | **  n=14054  loss=1595  rate=11.35%** | **  n=2195  loss=166  rate=7.56%** | **  n=24936  loss=1721  rate=6.90%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
