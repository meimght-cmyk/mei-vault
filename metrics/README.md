# Phase 4 readiness

_Updated: 2026-09-21T06:31:27.964Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 135 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **79,074**
- Outcome patches resolved: **136,248**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.11% (n=20231) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.28% (n=2897) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19752  loss=6421  rate=32.51% |   n=2370  loss=571  rate=24.09% |   n=   5  loss=  0  rate=0.00% |   n=28147  loss=648  rate=2.30% |
| risky |   n= 479  loss= 76  rate=15.87% |   n=16060  loss=1316  rate=8.19% |   n=2892  loss=182  rate=6.29% |   n=5169  loss=1531  rate=29.62% |
| **all** | **  n=20231  loss=6497  rate=32.11%** | **  n=18430  loss=1887  rate=10.24%** | **  n=2897  loss=182  rate=6.28%** | **  n=33316  loss=2179  rate=6.54%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16839  loss=5441  rate=32.31% |   n=1854  loss=464  rate=25.03% |   n=   5  loss=  0  rate=0.00% |   n=22576  loss=529  rate=2.34% |
| risky |   n= 417  loss=117  rate=28.06% |   n=13120  loss=1230  rate=9.38% |   n=2341  loss=177  rate=7.56% |   n=4222  loss=1341  rate=31.76% |
| **all** | **  n=17256  loss=5558  rate=32.21%** | **  n=14974  loss=1694  rate=11.31%** | **  n=2346  loss=177  rate=7.54%** | **  n=26798  loss=1870  rate=6.98%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
