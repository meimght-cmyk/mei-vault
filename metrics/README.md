# Phase 4 readiness

_Updated: 2026-08-29T07:46:37.539Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 112 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **65,513**
- Outcome patches resolved: **109,098**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 30.09% (n=17256) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.39% (n=2346) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16839  loss=5160  rate=30.64% |   n=1854  loss=440  rate=23.73% |   n=   5  loss=  0  rate=0.00% |   n=22576  loss=496  rate=2.20% |
| risky |   n= 417  loss= 32  rate=7.67% |   n=13120  loss=1115  rate=8.50% |   n=2341  loss=150  rate=6.41% |   n=4222  loss=1314  rate=31.12% |
| **all** | **  n=17256  loss=5192  rate=30.09%** | **  n=14974  loss=1555  rate=10.38%** | **  n=2346  loss=150  rate=6.39%** | **  n=26798  loss=1810  rate=6.75%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13914  loss=4316  rate=31.02% |   n=1322  loss=326  rate=24.66% |   n=   5  loss=  0  rate=0.00% |   n=16933  loss=406  rate=2.40% |
| risky |   n= 313  loss= 34  rate=10.86% |   n=10217  loss=990  rate=9.69% |   n=1790  loss=139  rate=7.77% |   n=3230  loss=1046  rate=32.38% |
| **all** | **  n=14227  loss=4350  rate=30.58%** | **  n=11539  loss=1316  rate=11.40%** | **  n=1795  loss=139  rate=7.74%** | **  n=20163  loss=1452  rate=7.20%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
