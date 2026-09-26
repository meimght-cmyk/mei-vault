# Phase 4 readiness

_Updated: 2026-09-26T11:48:31.549Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 140 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **82,074**
- Outcome patches resolved: **142,398**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.30% (n=20900) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.29% (n=3021) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20414  loss=6668  rate=32.66% |   n=2494  loss=607  rate=24.34% |   n=   5  loss=  0  rate=0.00% |   n=29461  loss=679  rate=2.30% |
| risky |   n= 486  loss= 83  rate=17.08% |   n=16734  loss=1366  rate=8.16% |   n=3016  loss=190  rate=6.30% |   n=5414  loss=1613  rate=29.79% |
| **all** | **  n=20900  loss=6751  rate=32.30%** | **  n=19228  loss=1973  rate=10.26%** | **  n=3021  loss=190  rate=6.29%** | **  n=34875  loss=2292  rate=6.57%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17509  loss=5631  rate=32.16% |   n=1970  loss=489  rate=24.82% |   n=   5  loss=  0  rate=0.00% |   n=23790  loss=550  rate=2.31% |
| risky |   n= 440  loss=139  rate=31.59% |   n=13773  loss=1278  rate=9.28% |   n=2467  loss=187  rate=7.58% |   n=4420  loss=1393  rate=31.52% |
| **all** | **  n=17949  loss=5770  rate=32.15%** | **  n=15743  loss=1767  rate=11.22%** | **  n=2472  loss=187  rate=7.56%** | **  n=28210  loss=1943  rate=6.89%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
