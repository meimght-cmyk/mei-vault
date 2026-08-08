# Phase 4 readiness

_Updated: 2026-08-08T12:00:59.715Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 91 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **53,274**
- Outcome patches resolved: **84,584**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 28.36% (n=14533) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.08% (n=1850) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=14208  loss=4097  rate=28.84% |   n=1380  loss=322  rate=23.33% |   n=   5  loss=  0  rate=0.00% |   n=17481  loss=357  rate=2.04% |
| risky |   n= 325  loss= 24  rate=7.38% |   n=10508  loss=936  rate=8.91% |   n=1845  loss=131  rate=7.10% |   n=3322  loss=1066  rate=32.09% |
| **all** | **  n=14533  loss=4121  rate=28.36%** | **  n=11888  loss=1258  rate=10.58%** | **  n=1850  loss=131  rate=7.08%** | **  n=20803  loss=1423  rate=6.84%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11209  loss=3138  rate=28.00% |   n= 944  loss=226  rate=23.94% |   n=   5  loss=  0  rate=0.00% |   n=11902  loss=269  rate=2.26% |
| risky |   n= 213  loss= 19  rate=8.92% |   n=7622  loss=786  rate=10.31% |   n=1297  loss=113  rate=8.71% |   n=2318  loss=788  rate=33.99% |
| **all** | **  n=11422  loss=3157  rate=27.64%** | **  n=8566  loss=1012  rate=11.81%** | **  n=1302  loss=113  rate=8.68%** | **  n=14220  loss=1057  rate=7.43%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
