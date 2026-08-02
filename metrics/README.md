# Phase 4 readiness

_Updated: 2026-08-02T06:08:46.852Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 85 of 90)
- Earliest unlock: **2026-08-07** (4 days away)
- Probe rows collected: **49,524**
- Outcome patches resolved: **77,148**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 27.51% (n=13703) — floor ≤ 2%
- ❌ **BLOCK precision**: 7.24% (n=1698) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13409  loss=3750  rate=27.97% |   n=1241  loss=276  rate=22.24% |   n=   5  loss=  0  rate=0.00% |   n=15919  loss=317  rate=1.99% |
| risky |   n= 294  loss= 20  rate=6.80% |   n=9726  loss=874  rate=8.99% |   n=1693  loss=123  rate=7.27% |   n=3037  loss=983  rate=32.37% |
| **all** | **  n=13703  loss=3770  rate=27.51%** | **  n=10967  loss=1150  rate=10.49%** | **  n=1698  loss=123  rate=7.24%** | **  n=18956  loss=1300  rate=6.86%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=10386  loss=2756  rate=26.54% |   n= 821  loss=200  rate=24.36% |   n=   5  loss=  0  rate=0.00% |   n=10362  loss=223  rate=2.15% |
| risky |   n= 185  loss= 14  rate=7.57% |   n=6873  loss=729  rate=10.61% |   n=1160  loss=108  rate=9.31% |   n=2032  loss=697  rate=34.30% |
| **all** | **  n=10571  loss=2770  rate=26.20%** | **  n=7694  loss=929  rate=12.07%** | **  n=1165  loss=108  rate=9.27%** | **  n=12394  loss=920  rate=7.42%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
