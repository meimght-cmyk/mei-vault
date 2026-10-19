# Phase 4 readiness

_Updated: 2026-10-19T12:21:29.569Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 163 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **95,724**
- Outcome patches resolved: **169,548**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 30.39% (n=24599) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.84% (n=3576) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=24082  loss=7384  rate=30.66% |   n=3094  loss=685  rate=22.14% |   n=   5  loss=  0  rate=0.00% |   n=34193  loss=918  rate=2.68% |
| risky |   n= 517  loss= 92  rate=17.79% |   n=19761  loss=1483  rate=7.50% |   n=3571  loss=209  rate=5.85% |   n=6301  loss=2112  rate=33.52% |
| **all** | **  n=24599  loss=7476  rate=30.39%** | **  n=22855  loss=2168  rate=9.49%** | **  n=3576  loss=209  rate=5.84%** | **  n=40494  loss=3030  rate=7.48%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=20414  loss=6254  rate=30.64% |   n=2494  loss=558  rate=22.37% |   n=   5  loss=  0  rate=0.00% |   n=29461  loss=901  rate=3.06% |
| risky |   n= 486  loss=174  rate=35.80% |   n=16734  loss=1379  rate=8.24% |   n=3016  loss=197  rate=6.53% |   n=5414  loss=2002  rate=36.98% |
| **all** | **  n=20900  loss=6428  rate=30.76%** | **  n=19228  loss=1937  rate=10.07%** | **  n=3021  loss=197  rate=6.52%** | **  n=34875  loss=2903  rate=8.32%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
