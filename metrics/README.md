# Phase 4 readiness

_Updated: 2026-09-13T23:12:33.912Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 127 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **74,724**
- Outcome patches resolved: **127,548**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.50% (n=19297) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.22% (n=2719) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18824  loss=6009  rate=31.92% |   n=2211  loss=532  rate=24.06% |   n=   5  loss=  0  rate=0.00% |   n=26334  loss=595  rate=2.26% |
| risky |   n= 473  loss= 70  rate=14.80% |   n=15101  loss=1240  rate=8.21% |   n=2714  loss=169  rate=6.23% |   n=4862  loss=1454  rate=29.91% |
| **all** | **  n=19297  loss=6079  rate=31.50%** | **  n=17312  loss=1772  rate=10.24%** | **  n=2719  loss=169  rate=6.22%** | **  n=31196  loss=2049  rate=6.57%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15914  loss=5065  rate=31.83% |   n=1696  loss=427  rate=25.18% |   n=   5  loss=  0  rate=0.00% |   n=20759  loss=485  rate=2.34% |
| risky |   n= 386  loss= 87  rate=22.54% |   n=12208  loss=1157  rate=9.48% |   n=2166  loss=165  rate=7.62% |   n=3890  loss=1219  rate=31.34% |
| **all** | **  n=16300  loss=5152  rate=31.61%** | **  n=13904  loss=1584  rate=11.39%** | **  n=2171  loss=165  rate=7.60%** | **  n=24649  loss=1704  rate=6.91%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
