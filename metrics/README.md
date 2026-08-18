# Phase 4 readiness

_Updated: 2026-08-18T21:49:27.969Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 101 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **59,424**
- Outcome patches resolved: **96,798**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.20% (n=15894) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.59% (n=2095) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15521  loss=4613  rate=29.72% |   n=1625  loss=380  rate=23.38% |   n=   5  loss=  0  rate=0.00% |   n=20023  loss=416  rate=2.08% |
| risky |   n= 373  loss= 28  rate=7.51% |   n=11818  loss=1022  rate=8.65% |   n=2090  loss=138  rate=6.60% |   n=3769  loss=1189  rate=31.55% |
| **all** | **  n=15894  loss=4641  rate=29.20%** | **  n=13443  loss=1402  rate=10.43%** | **  n=2095  loss=138  rate=6.59%** | **  n=23792  loss=1605  rate=6.75%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12547  loss=3748  rate=29.87% |   n=1139  loss=283  rate=24.85% |   n=   5  loss=  0  rate=0.00% |   n=14383  loss=337  rate=2.34% |
| risky |   n= 265  loss= 28  rate=10.57% |   n=8913  loss=884  rate=9.92% |   n=1537  loss=123  rate=8.00% |   n=2785  loss=928  rate=33.32% |
| **all** | **  n=12812  loss=3776  rate=29.47%** | **  n=10052  loss=1167  rate=11.61%** | **  n=1542  loss=123  rate=7.98%** | **  n=17168  loss=1265  rate=7.37%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
