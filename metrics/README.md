# Phase 4 readiness

_Updated: 2026-07-28T01:27:10.790Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 80 of 90)
- Earliest unlock: **2026-08-07** (9 days away)
- Probe rows collected: **46,524**
- Outcome patches resolved: **71,148**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 26.90% (n=12990) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.44% (n=1572) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12718  loss=3475  rate=27.32% |   n=1162  loss=260  rate=22.38% |   n=   5  loss=  0  rate=0.00% |   n=14689  loss=284  rate=1.93% |
| risky |   n= 272  loss= 19  rate=6.99% |   n=9074  loss=835  rate=9.20% |   n=1567  loss=117  rate=7.47% |   n=2837  loss=943  rate=33.24% |
| **all** | **  n=12990  loss=3494  rate=26.90%** | **  n=10236  loss=1095  rate=10.70%** | **  n=1572  loss=117  rate=7.44%** | **  n=17526  loss=1227  rate=7.00%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=9923  loss=2535  rate=25.55% |   n= 756  loss=189  rate=25.00% |   n=   5  loss=  0  rate=0.00% |   n=8890  loss=156  rate=1.75% |
| risky |   n= 169  loss= 12  rate=7.10% |   n=6430  loss=699  rate=10.87% |   n=1077  loss=104  rate=9.66% |   n=1574  loss=411  rate=26.11% |
| **all** | **  n=10092  loss=2547  rate=25.24%** | **  n=7186  loss=888  rate=12.36%** | **  n=1082  loss=104  rate=9.61%** | **  n=10464  loss=567  rate=5.42%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
