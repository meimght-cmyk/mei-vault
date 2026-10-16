# Phase 4 readiness

_Updated: 2026-10-16T08:48:24.209Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 160 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **93,774**
- Outcome patches resolved: **165,798**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.41% (n=23562) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.87% (n=3493) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=23056  loss=7308  rate=31.70% |   n=2966  loss=676  rate=22.79% |   n=   5  loss=  0  rate=0.00% |   n=34147  loss=911  rate=2.67% |
| risky |   n= 506  loss= 92  rate=18.18% |   n=19276  loss=1480  rate=7.68% |   n=3488  loss=205  rate=5.88% |   n=6280  loss=2092  rate=33.31% |
| **all** | **  n=23562  loss=7400  rate=31.41%** | **  n=22242  loss=2156  rate=9.69%** | **  n=3493  loss=205  rate=5.87%** | **  n=40427  loss=3003  rate=7.43%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20018  loss=6249  rate=31.22% |   n=2416  loss=558  rate=23.10% |   n=   5  loss=  0  rate=0.00% |   n=28635  loss=824  rate=2.88% |
| risky |   n= 480  loss=174  rate=36.25% |   n=16330  loss=1379  rate=8.44% |   n=2942  loss=197  rate=6.70% |   n=5248  loss=1843  rate=35.12% |
| **all** | **  n=20498  loss=6423  rate=31.33%** | **  n=18746  loss=1937  rate=10.33%** | **  n=2947  loss=197  rate=6.68%** | **  n=33883  loss=2667  rate=7.87%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
