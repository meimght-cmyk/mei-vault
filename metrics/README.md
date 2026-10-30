# Phase 4 readiness

_Updated: 2026-10-30T00:57:51.283Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 174 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **101,874**
- Outcome patches resolved: **181,848**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 26.69% (n=28197) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.49% (n=3862) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=27639  loss=7433  rate=26.89% |   n=3582  loss=690  rate=19.26% |   n=   6  loss=  0  rate=0.00% |   n=34247  loss=921  rate=2.69% |
| risky |   n= 558  loss= 94  rate=16.85% |   n=21448  loss=1499  rate=6.99% |   n=3856  loss=212  rate=5.50% |   n=6338  loss=2149  rate=33.91% |
| **all** | **  n=28197  loss=7527  rate=26.69%** | **  n=25030  loss=2189  rate=8.75%** | **  n=3862  loss=212  rate=5.49%** | **  n=40585  loss=3070  rate=7.56%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21739  loss=6264  rate=28.81% |   n=2737  loss=558  rate=20.39% |   n=   5  loss=  0  rate=0.00% |   n=31993  loss=1148  rate=3.59% |
| risky |   n= 495  loss=174  rate=35.15% |   n=18066  loss=1379  rate=7.63% |   n=3267  loss=197  rate=6.03% |   n=5872  loss=2428  rate=41.35% |
| **all** | **  n=22234  loss=6438  rate=28.96%** | **  n=20803  loss=1937  rate=9.31%** | **  n=3272  loss=197  rate=6.02%** | **  n=37865  loss=3576  rate=9.44%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
