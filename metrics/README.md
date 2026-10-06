# Phase 4 readiness

_Updated: 2026-10-06T22:28:06.711Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 150 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **88,224**
- Outcome patches resolved: **154,698**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.95% (n=22234) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.17% (n=3272) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=21739  loss=7234  rate=33.28% |   n=2737  loss=669  rate=24.44% |   n=   5  loss=  0  rate=0.00% |   n=31993  loss=735  rate=2.30% |
| risky |   n= 495  loss= 91  rate=18.38% |   n=18066  loss=1462  rate=8.09% |   n=3267  loss=202  rate=6.18% |   n=5872  loss=1744  rate=29.70% |
| **all** | **  n=22234  loss=7325  rate=32.95%** | **  n=20803  loss=2131  rate=10.24%** | **  n=3272  loss=202  rate=6.17%** | **  n=37865  loss=2479  rate=6.55%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=18824  loss=6176  rate=32.81% |   n=2211  loss=553  rate=25.01% |   n=   5  loss=  0  rate=0.00% |   n=26334  loss=621  rate=2.36% |
| risky |   n= 473  loss=172  rate=36.36% |   n=15101  loss=1371  rate=9.08% |   n=2714  loss=196  rate=7.22% |   n=4862  loss=1512  rate=31.10% |
| **all** | **  n=19297  loss=6348  rate=32.90%** | **  n=17312  loss=1924  rate=11.11%** | **  n=2719  loss=196  rate=7.21%** | **  n=31196  loss=2133  rate=6.84%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
