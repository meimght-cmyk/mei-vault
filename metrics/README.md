# Phase 4 readiness

_Updated: 2026-09-20T05:22:53.751Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 134 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **78,474**
- Outcome patches resolved: **134,898**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 32.00% (n=20093) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.23% (n=2872) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19616  loss=6356  rate=32.40% |   n=2348  loss=567  rate=24.15% |   n=   5  loss=  0  rate=0.00% |   n=27905  loss=641  rate=2.30% |
| risky |   n= 477  loss= 74  rate=15.51% |   n=15925  loss=1307  rate=8.21% |   n=2867  loss=179  rate=6.24% |   n=5131  loss=1521  rate=29.64% |
| **all** | **  n=20093  loss=6430  rate=32.00%** | **  n=18273  loss=1874  rate=10.26%** | **  n=2872  loss=179  rate=6.23%** | **  n=33036  loss=2162  rate=6.54%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16672  loss=5360  rate=32.15% |   n=1826  loss=458  rate=25.08% |   n=   5  loss=  0  rate=0.00% |   n=22271  loss=521  rate=2.34% |
| risky |   n= 410  loss=110  rate=26.83% |   n=12959  loss=1215  rate=9.38% |   n=2310  loss=175  rate=7.58% |   n=4171  loss=1326  rate=31.79% |
| **all** | **  n=17082  loss=5470  rate=32.02%** | **  n=14785  loss=1673  rate=11.32%** | **  n=2315  loss=175  rate=7.56%** | **  n=26442  loss=1847  rate=6.99%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
