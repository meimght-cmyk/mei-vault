# Phase 4 readiness

_Updated: 2026-08-22T00:49:01.874Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 105 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **61,224**
- Outcome patches resolved: **100,548**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.50% (n=16300) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.59% (n=2171) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=15914  loss=4779  rate=30.03% |   n=1696  loss=402  rate=23.70% |   n=   5  loss=  0  rate=0.00% |   n=20759  loss=437  rate=2.11% |
| risky |   n= 386  loss= 29  rate=7.51% |   n=12208  loss=1054  rate=8.63% |   n=2166  loss=143  rate=6.60% |   n=3890  loss=1216  rate=31.26% |
| **all** | **  n=16300  loss=4808  rate=29.50%** | **  n=13904  loss=1456  rate=10.47%** | **  n=2171  loss=143  rate=6.59%** | **  n=24649  loss=1653  rate=6.71%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=12997  loss=3945  rate=30.35% |   n=1194  loss=297  rate=24.87% |   n=   5  loss=  0  rate=0.00% |   n=15178  loss=355  rate=2.34% |
| risky |   n= 282  loss= 33  rate=11.70% |   n=9330  loss=931  rate=9.98% |   n=1616  loss=131  rate=8.11% |   n=2922  loss=961  rate=32.89% |
| **all** | **  n=13279  loss=3978  rate=29.96%** | **  n=10524  loss=1228  rate=11.67%** | **  n=1621  loss=131  rate=8.08%** | **  n=18100  loss=1316  rate=7.27%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
