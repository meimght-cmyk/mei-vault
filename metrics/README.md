# Phase 4 readiness

_Updated: 2026-08-23T01:46:25.308Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 106 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **61,824**
- Outcome patches resolved: **101,748**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 29.59% (n=16439) — floor ≤ 2%
- ❌ **BLOCK precision**: 6.56% (n=2195) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=16049  loss=4835  rate=30.13% |   n=1715  loss=406  rate=23.67% |   n=   5  loss=  0  rate=0.00% |   n=21005  loss=448  rate=2.13% |
| risky |   n= 390  loss= 29  rate=7.44% |   n=12339  loss=1064  rate=8.62% |   n=2190  loss=144  rate=6.58% |   n=3931  loss=1224  rate=31.14% |
| **all** | **  n=16439  loss=4864  rate=29.59%** | **  n=14054  loss=1470  rate=10.46%** | **  n=2195  loss=144  rate=6.56%** | **  n=24936  loss=1672  rate=6.71%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=13135  loss=4003  rate=30.48% |   n=1207  loss=298  rate=24.69% |   n=   5  loss=  0  rate=0.00% |   n=15427  loss=364  rate=2.36% |
| risky |   n= 286  loss= 33  rate=11.54% |   n=9461  loss=936  rate=9.89% |   n=1641  loss=131  rate=7.98% |   n=2962  loss=967  rate=32.65% |
| **all** | **  n=13421  loss=4036  rate=30.07%** | **  n=10668  loss=1234  rate=11.57%** | **  n=1646  loss=131  rate=7.96%** | **  n=18389  loss=1331  rate=7.24%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
