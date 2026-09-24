# Phase 4 readiness

_Updated: 2026-09-24T09:39:04.993Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 138 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **80,874**
- Outcome patches resolved: **139,848**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.25% (n=20630) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.32% (n=2973) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20149  loss=6576  rate=32.64% |   n=2442  loss=591  rate=24.20% |   n=   5  loss=  0  rate=0.00% |   n=28878  loss=661  rate=2.29% |
| risky |   n= 481  loss= 78  rate=16.22% |   n=16463  loss=1347  rate=8.18% |   n=2968  loss=188  rate=6.33% |   n=5288  loss=1558  rate=29.46% |
| **all** | **  n=20630  loss=6654  rate=32.25%** | **  n=18905  loss=1938  rate=10.25%** | **  n=2973  loss=188  rate=6.32%** | **  n=34166  loss=2219  rate=6.49%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17244  loss=5555  rate=32.21% |   n=1923  loss=479  rate=24.91% |   n=   5  loss=  0  rate=0.00% |   n=23302  loss=537  rate=2.30% |
| risky |   n= 430  loss=130  rate=30.23% |   n=13515  loss=1262  rate=9.34% |   n=2415  loss=181  rate=7.49% |   n=4340  loss=1373  rate=31.64% |
| **all** | **  n=17674  loss=5685  rate=32.17%** | **  n=15438  loss=1741  rate=11.28%** | **  n=2420  loss=181  rate=7.48%** | **  n=27642  loss=1910  rate=6.91%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
