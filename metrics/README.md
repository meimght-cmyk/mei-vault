# Phase 4 readiness

_Updated: 2026-08-26T04:48:07.567Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 109 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **63,624**
- Outcome patches resolved: **105,498**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.82% (n=16859) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.43% (n=2272) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16457  loss=4999  rate=30.38% |   n=1788  loss=423  rate=23.66% |   n=   5  loss=  0  rate=0.00% |   n=21824  loss=473  rate=2.17% |
| risky |   n= 402  loss= 29  rate=7.21% |   n=12743  loss=1093  rate=8.58% |   n=2267  loss=146  rate=6.44% |   n=4088  loss=1275  rate=31.19% |
| **all** | **  n=16859  loss=5028  rate=29.82%** | **  n=14531  loss=1516  rate=10.43%** | **  n=2272  loss=146  rate=6.43%** | **  n=25912  loss=1748  rate=6.75%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13534  loss=4178  rate=30.87% |   n=1256  loss=308  rate=24.52% |   n=   5  loss=  0  rate=0.00% |   n=16179  loss=385  rate=2.38% |
| risky |   n= 299  loss= 33  rate=11.04% |   n=9844  loss=967  rate=9.82% |   n=1717  loss=137  rate=7.98% |   n=3090  loss=1003  rate=32.46% |
| **all** | **  n=13833  loss=4211  rate=30.44%** | **  n=11100  loss=1275  rate=11.49%** | **  n=1722  loss=137  rate=7.96%** | **  n=19269  loss=1388  rate=7.20%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
