# Phase 4 readiness

_Updated: 2026-11-04T10:30:02.805Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 179 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **105,024**
- Outcome patches resolved: **188,224**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 25.18% (n=30012) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.34% (n=4005) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=29434  loss=7462  rate=25.35% |   n=3828  loss=692  rate=18.08% |   n=   6  loss=  0  rate=0.00% |   n=34382  loss=937  rate=2.73% |
| risky |   n= 578  loss= 94  rate=16.26% |   n=22277  loss=1511  rate=6.78% |   n=3999  loss=214  rate=5.35% |   n=6396  loss=2206  rate=34.49% |
| **all** | **  n=30012  loss=7556  rate=25.18%** | **  n=26105  loss=2203  rate=8.44%** | **  n=4005  loss=214  rate=5.34%** | **  n=40778  loss=3143  rate=7.71%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22435  loss=6291  rate=28.04% |   n=2862  loss=562  rate=19.64% |   n=   5  loss=  0  rate=0.00% |   n=33272  loss=1267  rate=3.81% |
| risky |   n= 500  loss=174  rate=34.80% |   n=18748  loss=1402  rate=7.48% |   n=3394  loss=200  rate=5.89% |   n=6108  loss=2640  rate=43.22% |
| **all** | **  n=22935  loss=6465  rate=28.19%** | **  n=21610  loss=1964  rate=9.09%** | **  n=3399  loss=200  rate=5.88%** | **  n=39380  loss=3907  rate=9.92%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
