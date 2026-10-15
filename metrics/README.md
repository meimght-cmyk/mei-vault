# Phase 4 readiness

_Updated: 2026-10-15T07:39:15.486Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 159 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **93,174**
- Outcome patches resolved: **164,598**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.71% (n=23330) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.90% (n=3472) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22826  loss=7305  rate=32.00% |   n=2935  loss=676  rate=23.03% |   n=   5  loss=  0  rate=0.00% |   n=34008  loss=897  rate=2.64% |
| risky |   n= 504  loss= 92  rate=18.25% |   n=19144  loss=1480  rate=7.73% |   n=3467  loss=205  rate=5.91% |   n=6235  loss=2049  rate=32.86% |
| **all** | **  n=23330  loss=7397  rate=31.71%** | **  n=22079  loss=2156  rate=9.76%** | **  n=3472  loss=205  rate=5.90%** | **  n=40243  loss=2946  rate=7.32%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19886  loss=6247  rate=31.41% |   n=2393  loss=558  rate=23.32% |   n=   5  loss=  0  rate=0.00% |   n=28390  loss=801  rate=2.82% |
| risky |   n= 480  loss=174  rate=36.25% |   n=16194  loss=1379  rate=8.52% |   n=2916  loss=197  rate=6.76% |   n=5210  loss=1809  rate=34.72% |
| **all** | **  n=20366  loss=6421  rate=31.53%** | **  n=18587  loss=1937  rate=10.42%** | **  n=2921  loss=197  rate=6.74%** | **  n=33600  loss=2610  rate=7.77%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
