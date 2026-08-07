# Phase 4 readiness

_Updated: 2026-08-07T11:00:31.738Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 90 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **52,674**
- Outcome patches resolved: **83,298**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 28.24% (n=14398) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.06% (n=1827) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14077  loss=4042  rate=28.71% |   n=1356  loss=313  rate=23.08% |   n=   5  loss=  0  rate=0.00% |   n=17236  loss=355  rate=2.06% |
| risky |   n= 321  loss= 24  rate=7.48% |   n=10378  loss=909  rate=8.76% |   n=1822  loss=129  rate=7.08% |   n=3279  loss=1056  rate=32.20% |
| **all** | **  n=14398  loss=4066  rate=28.24%** | **  n=11734  loss=1222  rate=10.41%** | **  n=1827  loss=129  rate=7.06%** | **  n=20515  loss=1411  rate=6.88%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11042  loss=3076  rate=27.86% |   n= 920  loss=221  rate=24.02% |   n=   5  loss=  0  rate=0.00% |   n=11607  loss=260  rate=2.24% |
| risky |   n= 208  loss= 18  rate=8.65% |   n=7494  loss=780  rate=10.41% |   n=1274  loss=113  rate=8.87% |   n=2274  loss=779  rate=34.26% |
| **all** | **  n=11250  loss=3094  rate=27.50%** | **  n=8414  loss=1001  rate=11.90%** | **  n=1279  loss=113  rate=8.84%** | **  n=13881  loss=1039  rate=7.49%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
