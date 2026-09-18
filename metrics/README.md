# Phase 4 readiness

_Updated: 2026-09-18T03:20:56.215Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 132 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **77,124**
- Outcome patches resolved: **132,498**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.70% (n=19829) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.03% (n=2820) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19354  loss=6213  rate=32.10% |   n=2301  loss=551  rate=23.95% |   n=   5  loss=  0  rate=0.00% |   n=27414  loss=625  rate=2.28% |
| risky |   n= 475  loss= 72  rate=15.16% |   n=15652  loss=1269  rate=8.11% |   n=2815  loss=170  rate=6.04% |   n=5058  loss=1506  rate=29.77% |
| **all** | **  n=19829  loss=6285  rate=31.70%** | **  n=17953  loss=1820  rate=10.14%** | **  n=2820  loss=170  rate=6.03%** | **  n=32472  loss=2131  rate=6.56%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16425  loss=5248  rate=31.95% |   n=1782  loss=447  rate=25.08% |   n=   5  loss=  0  rate=0.00% |   n=21762  loss=510  rate=2.34% |
| risky |   n= 401  loss=102  rate=25.44% |   n=12711  loss=1196  rate=9.41% |   n=2261  loss=172  rate=7.61% |   n=4077  loss=1289  rate=31.62% |
| **all** | **  n=16826  loss=5350  rate=31.80%** | **  n=14493  loss=1643  rate=11.34%** | **  n=2266  loss=172  rate=7.59%** | **  n=25839  loss=1799  rate=6.96%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
