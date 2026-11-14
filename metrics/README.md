# Phase 4 readiness

_Updated: 2026-11-14T22:53:30.379Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 189 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **111,174**
- Outcome patches resolved: **200,573**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 22.69% (n=33455) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.02% (n=4281) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=32838  loss=7495  rate=22.82% |   n=4293  loss=698  rate=16.26% |   n=   6  loss=  0  rate=0.00% |   n=34583  loss=960  rate=2.78% |
| risky |   n= 617  loss= 95  rate=15.40% |   n=23930  loss=1526  rate=6.38% |   n=4275  loss=215  rate=5.03% |   n=6478  loss=2286  rate=35.29% |
| **all** | **  n=33455  loss=7590  rate=22.69%** | **  n=28223  loss=2224  rate=7.88%** | **  n=4281  loss=215  rate=5.02%** | **  n=41061  loss=3246  rate=7.91%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=25294  loss=6317  rate=24.97% |   n=3260  loss=563  rate=17.27% |   n=   5  loss=  0  rate=0.00% |   n=34194  loss=1356  rate=3.97% |
| risky |   n= 530  loss=175  rate=33.02% |   n=20307  loss=1419  rate=6.99% |   n=3662  loss=203  rate=5.54% |   n=6301  loss=2822  rate=44.79% |
| **all** | **  n=25824  loss=6492  rate=25.14%** | **  n=23567  loss=1982  rate=8.41%** | **  n=3667  loss=203  rate=5.54%** | **  n=40495  loss=4178  rate=10.32%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
