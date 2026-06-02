# Phase 4 readiness

_Updated: 2026-06-02T04:15:28.764Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 24 of 90)
- Earliest unlock: **2026-08-07** (65 days away)
- Probe rows collected: **14,274**
- Outcome patches resolved: **10,074**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 6.97% (n=5738) — floor ≤ 2%
- ❌ **BLOCK precision**: 1.54% (n=325) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=5693  loss=400  rate=7.03% |   n= 122  loss=  4  rate=3.28% |   n=   4  loss=  0  rate=0.00% |   n=1255  loss= 24  rate=1.91% |
| risky |   n=  45  loss=  0  rate=0.00% |   n=2401  loss= 64  rate=2.67% |   n= 321  loss=  5  rate=1.56% |   n= 233  loss= 54  rate=23.18% |
| **all** | **  n=5738  loss=400  rate=6.97%** | **  n=2523  loss= 68  rate=2.70%** | **  n= 325  loss=  5  rate=1.54%** | **  n=1488  loss= 78  rate=5.24%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=0 |   n=0 |   n=0 |   n=0 |
| risky |   n=0 |   n=0 |   n=0 |   n=0 |
| **all** | **  n=0** | **  n=0** | **  n=0** | **  n=0** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
