# Phase 4 readiness

_Updated: 2026-08-27T05:47:04.295Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 110 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **64,224**
- Outcome patches resolved: **106,698**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.92% (n=16982) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.36% (n=2294) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16575  loss=5051  rate=30.47% |   n=1811  loss=431  rate=23.80% |   n=   5  loss=  0  rate=0.00% |   n=22083  loss=479  rate=2.17% |
| risky |   n= 407  loss= 30  rate=7.37% |   n=12861  loss=1097  rate=8.53% |   n=2289  loss=146  rate=6.38% |   n=4143  loss=1296  rate=31.28% |
| **all** | **  n=16982  loss=5081  rate=29.92%** | **  n=14672  loss=1528  rate=10.41%** | **  n=2294  loss=146  rate=6.36%** | **  n=26226  loss=1775  rate=6.77%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13651  loss=4232  rate=31.00% |   n=1272  loss=314  rate=24.69% |   n=   5  loss=  0  rate=0.00% |   n=16446  loss=393  rate=2.39% |
| risky |   n= 303  loss= 33  rate=10.89% |   n=9960  loss=978  rate=9.82% |   n=1740  loss=138  rate=7.93% |   n=3147  loss=1028  rate=32.67% |
| **all** | **  n=13954  loss=4265  rate=30.56%** | **  n=11232  loss=1292  rate=11.50%** | **  n=1745  loss=138  rate=7.91%** | **  n=19593  loss=1421  rate=7.25%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
