# Phase 4 readiness

_Updated: 2026-09-08T18:00:10.586Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 122 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **71,649**
- Outcome patches resolved: **121,398**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.18% (n=18635) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.31% (n=2597) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18169  loss=5748  rate=31.64% |   n=2088  loss=497  rate=23.80% |   n=   5  loss=  0  rate=0.00% |   n=25112  loss=566  rate=2.25% |
| risky |   n= 466  loss= 63  rate=13.52% |   n=14442  loss=1205  rate=8.34% |   n=2592  loss=164  rate=6.33% |   n=4650  loss=1412  rate=30.37% |
| **all** | **  n=18635  loss=5811  rate=31.18%** | **  n=16530  loss=1702  rate=10.30%** | **  n=2597  loss=164  rate=6.31%** | **  n=29762  loss=1978  rate=6.65%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15231  loss=4818  rate=31.63% |   n=1570  loss=395  rate=25.16% |   n=   5  loss=  0  rate=0.00% |   n=19468  loss=456  rate=2.34% |
| risky |   n= 360  loss= 62  rate=17.22% |   n=11528  loss=1093  rate=9.48% |   n=2034  loss=156  rate=7.67% |   n=3678  loss=1166  rate=31.70% |
| **all** | **  n=15591  loss=4880  rate=31.30%** | **  n=13098  loss=1488  rate=11.36%** | **  n=2039  loss=156  rate=7.65%** | **  n=23146  loss=1622  rate=7.01%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
