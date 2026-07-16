# Phase 4 readiness

_Updated: 2026-07-16T15:03:55.043Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 68 of 90)
- Earliest unlock: **2026-08-07** (21 days away)
- Probe rows collected: **39,774**
- Outcome patches resolved: **57,648**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 24.88% (n=11426) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.42% (n=1308) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=11212  loss=2830  rate=25.24% |   n= 944  loss=201  rate=21.29% |   n=   5  loss=  0  rate=0.00% |   n=11913  loss=231  rate=1.94% |
| risky |   n= 214  loss= 13  rate=6.07% |   n=7655  loss=718  rate=9.38% |   n=1303  loss= 97  rate=7.44% |   n=2328  loss=804  rate=34.54% |
| **all** | **  n=11426  loss=2843  rate=24.88%** | **  n=8599  loss=919  rate=10.69%** | **  n=1308  loss= 97  rate=7.42%** | **  n=14241  loss=1035  rate=7.27%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=8413  loss=1895  rate=22.52% |   n= 510  loss=134  rate=26.27% |   n=   5  loss=  0  rate=0.00% |   n=6146  loss=112  rate=1.82% |
| risky |   n= 124  loss= 12  rate=9.68% |   n=4985  loss=603  rate=12.10% |   n= 806  loss= 89  rate=11.04% |   n=1085  loss=275  rate=25.35% |
| **all** | **  n=8537  loss=1907  rate=22.34%** | **  n=5495  loss=737  rate=13.41%** | **  n= 811  loss= 89  rate=10.97%** | **  n=7231  loss=387  rate=5.35%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
