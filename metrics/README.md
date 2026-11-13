# Phase 4 readiness

_Updated: 2026-11-13T21:34:31.984Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 188 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **110,574**
- Outcome patches resolved: **199,248**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 22.96% (n=33059) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.06% (n=4253) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=32446  loss=7495  rate=23.10% |   n=4239  loss=697  rate=16.44% |   n=   6  loss=  0  rate=0.00% |   n=34583  loss=960  rate=2.78% |
| risky |   n= 613  loss= 95  rate=15.50% |   n=23762  loss=1526  rate=6.42% |   n=4247  loss=215  rate=5.06% |   n=6478  loss=2286  rate=35.29% |
| **all** | **  n=33059  loss=7590  rate=22.96%** | **  n=28001  loss=2223  rate=7.94%** | **  n=4253  loss=215  rate=5.06%** | **  n=41061  loss=3246  rate=7.91%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=24874  loss=6317  rate=25.40% |   n=3202  loss=563  rate=17.58% |   n=   5  loss=  0  rate=0.00% |   n=34193  loss=1356  rate=3.97% |
| risky |   n= 526  loss=175  rate=33.27% |   n=20139  loss=1419  rate=7.05% |   n=3634  loss=203  rate=5.59% |   n=6301  loss=2822  rate=44.79% |
| **all** | **  n=25400  loss=6492  rate=25.56%** | **  n=23341  loss=1982  rate=8.49%** | **  n=3639  loss=203  rate=5.58%** | **  n=40494  loss=4178  rate=10.32%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
