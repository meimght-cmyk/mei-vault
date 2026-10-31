# Phase 4 readiness

_Updated: 2026-10-31T05:26:12.654Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 175 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **102,624**
- Outcome patches resolved: **183,048**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 26.46% (n=28553) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.50% (n=3890) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=27991  loss=7462  rate=26.66% |   n=3630  loss=692  rate=19.06% |   n=   6  loss=  0  rate=0.00% |   n=34247  loss=921  rate=2.69% |
| risky |   n= 562  loss= 94  rate=16.73% |   n=21616  loss=1511  rate=6.99% |   n=3884  loss=214  rate=5.51% |   n=6338  loss=2149  rate=33.91% |
| **all** | **  n=28553  loss=7556  rate=26.46%** | **  n=25246  loss=2203  rate=8.73%** | **  n=3890  loss=214  rate=5.50%** | **  n=40585  loss=3070  rate=7.56%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21872  loss=6276  rate=28.69% |   n=2762  loss=561  rate=20.31% |   n=   5  loss=  0  rate=0.00% |   n=32235  loss=1170  rate=3.63% |
| risky |   n= 496  loss=174  rate=35.08% |   n=18178  loss=1392  rate=7.66% |   n=3289  loss=197  rate=5.99% |   n=5937  loss=2483  rate=41.82% |
| **all** | **  n=22368  loss=6450  rate=28.84%** | **  n=20940  loss=1953  rate=9.33%** | **  n=3294  loss=197  rate=5.98%** | **  n=38172  loss=3653  rate=9.57%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
