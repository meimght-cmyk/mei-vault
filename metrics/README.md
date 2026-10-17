# Phase 4 readiness

_Updated: 2026-10-17T09:57:05.187Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 161 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **94,374**
- Outcome patches resolved: **166,998**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.00% (n=23881) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.82% (n=3520) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=23372  loss=7311  rate=31.28% |   n=3004  loss=676  rate=22.50% |   n=   5  loss=  0  rate=0.00% |   n=34193  loss=918  rate=2.68% |
| risky |   n= 509  loss= 92  rate=18.07% |   n=19425  loss=1480  rate=7.62% |   n=3515  loss=205  rate=5.83% |   n=6301  loss=2112  rate=33.52% |
| **all** | **  n=23881  loss=7403  rate=31.00%** | **  n=22429  loss=2156  rate=9.61%** | **  n=3520  loss=205  rate=5.82%** | **  n=40494  loss=3030  rate=7.48%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20149  loss=6250  rate=31.02% |   n=2442  loss=558  rate=22.85% |   n=   5  loss=  0  rate=0.00% |   n=28878  loss=846  rate=2.93% |
| risky |   n= 481  loss=174  rate=36.17% |   n=16463  loss=1379  rate=8.38% |   n=2968  loss=197  rate=6.64% |   n=5288  loss=1880  rate=35.55% |
| **all** | **  n=20630  loss=6424  rate=31.14%** | **  n=18905  loss=1937  rate=10.25%** | **  n=2973  loss=197  rate=6.63%** | **  n=34166  loss=2726  rate=7.98%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
