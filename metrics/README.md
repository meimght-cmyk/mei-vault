# Phase 4 readiness

_Updated: 2026-09-23T08:34:59.248Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 137 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **80,274**
- Outcome patches resolved: **138,648**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.19% (n=20498) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.31% (n=2947) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20018  loss=6521  rate=32.58% |   n=2416  loss=584  rate=24.17% |   n=   5  loss=  0  rate=0.00% |   n=28635  loss=657  rate=2.29% |
| risky |   n= 480  loss= 77  rate=16.04% |   n=16330  loss=1338  rate=8.19% |   n=2942  loss=186  rate=6.32% |   n=5248  loss=1548  rate=29.50% |
| **all** | **  n=20498  loss=6598  rate=32.19%** | **  n=18746  loss=1922  rate=10.25%** | **  n=2947  loss=186  rate=6.31%** | **  n=33883  loss=2205  rate=6.51%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=17108  loss=5525  rate=32.29% |   n=1899  loss=474  rate=24.96% |   n=   5  loss=  0  rate=0.00% |   n=23062  loss=534  rate=2.32% |
| risky |   n= 425  loss=125  rate=29.41% |   n=13383  loss=1250  rate=9.34% |   n=2390  loss=179  rate=7.49% |   n=4302  loss=1362  rate=31.66% |
| **all** | **  n=17533  loss=5650  rate=32.22%** | **  n=15282  loss=1724  rate=11.28%** | **  n=2395  loss=179  rate=7.47%** | **  n=27364  loss=1896  rate=6.93%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
