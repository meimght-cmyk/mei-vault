# Phase 4 readiness

_Updated: 2026-11-06T12:59:10.215Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 181 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **106,224**
- Outcome patches resolved: **190,698**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 24.58% (n=30741) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.26% (n=4066) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=30154  loss=7462  rate=24.75% |   n=3925  loss=692  rate=17.63% |   n=   6  loss=  0  rate=0.00% |   n=34389  loss=938  rate=2.73% |
| risky |   n= 587  loss= 94  rate=16.01% |   n=22651  loss=1511  rate=6.67% |   n=4060  loss=214  rate=5.27% |   n=6402  loss=2212  rate=34.55% |
| **all** | **  n=30741  loss=7556  rate=24.58%** | **  n=26576  loss=2203  rate=8.29%** | **  n=4066  loss=214  rate=5.26%** | **  n=40791  loss=3150  rate=7.72%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22698  loss=6294  rate=27.73% |   n=2910  loss=562  rate=19.31% |   n=   5  loss=  0  rate=0.00% |   n=33761  loss=1312  rate=3.89% |
| risky |   n= 502  loss=174  rate=34.66% |   n=19012  loss=1402  rate=7.37% |   n=3443  loss=200  rate=5.81% |   n=6193  loss=2719  rate=43.90% |
| **all** | **  n=23200  loss=6468  rate=27.88%** | **  n=21922  loss=1964  rate=8.96%** | **  n=3448  loss=200  rate=5.80%** | **  n=39954  loss=4031  rate=10.09%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
