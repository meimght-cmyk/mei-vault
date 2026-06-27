# Phase 4 readiness

_Updated: 2026-06-27T12:28:17.933Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 49 of 90)
- Earliest unlock: **2026-08-07** (40 days away)
- Probe rows collected: **28,524**
- Outcome patches resolved: **36,048**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 19.22% (n=9073) — floor ≤ 2%
- ❌ **BLOCK precision**: 3.63% (n=909) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8933  loss=1744  rate=19.52% |   n= 604  loss=106  rate=17.55% |   n=   5  loss=  0  rate=0.00% |   n=7132  loss=118  rate=1.65% |
| risky |   n= 140  loss=  0  rate=0.00% |   n=5484  loss=294  rate=5.36% |   n= 904  loss= 33  rate=3.65% |   n=1272  loss=371  rate=29.17% |
| **all** | **  n=9073  loss=1744  rate=19.22%** | **  n=6088  loss=400  rate=6.57%** | **  n= 909  loss= 33  rate=3.63%** | **  n=8404  loss=489  rate=5.82%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=6047  loss=695  rate=11.49% |   n= 164  loss= 21  rate=12.80% |   n=   4  loss=  0  rate=0.00% |   n=1859  loss= 37  rate=1.99% |
| risky |   n=  55  loss=  2  rate=3.64% |   n=2727  loss=125  rate=4.58% |   n= 382  loss= 10  rate=2.62% |   n= 336  loss= 76  rate=22.62% |
| **all** | **  n=6102  loss=697  rate=11.42%** | **  n=2891  loss=146  rate=5.05%** | **  n= 386  loss= 10  rate=2.59%** | **  n=2195  loss=113  rate=5.15%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
