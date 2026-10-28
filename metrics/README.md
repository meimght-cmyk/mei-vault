# Phase 4 readiness

_Updated: 2026-10-28T23:01:06.842Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 172 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **101,274**
- Outcome patches resolved: **180,648**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 27.00% (n=27841) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.53% (n=3833) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=27287  loss=7425  rate=27.21% |   n=3535  loss=688  rate=19.46% |   n=   5  loss=  0  rate=0.00% |   n=34247  loss=921  rate=2.69% |
| risky |   n= 554  loss= 93  rate=16.79% |   n=21280  loss=1496  rate=7.03% |   n=3828  loss=212  rate=5.54% |   n=6338  loss=2149  rate=33.91% |
| **all** | **  n=27841  loss=7518  rate=27.00%** | **  n=24815  loss=2184  rate=8.80%** | **  n=3833  loss=212  rate=5.53%** | **  n=40585  loss=3070  rate=7.56%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21619  loss=6261  rate=28.96% |   n=2718  loss=558  rate=20.53% |   n=   5  loss=  0  rate=0.00% |   n=31732  loss=1121  rate=3.53% |
| risky |   n= 495  loss=174  rate=35.15% |   n=17949  loss=1379  rate=7.68% |   n=3242  loss=197  rate=6.08% |   n=5814  loss=2374  rate=40.83% |
| **all** | **  n=22114  loss=6435  rate=29.10%** | **  n=20667  loss=1937  rate=9.37%** | **  n=3247  loss=197  rate=6.07%** | **  n=37546  loss=3495  rate=9.31%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
