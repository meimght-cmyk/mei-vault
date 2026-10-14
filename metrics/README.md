# Phase 4 readiness

_Updated: 2026-10-14T06:24:34.362Z_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **2026-05-09** (day 158 of 90)
- Earliest unlock: **2026-08-07** (0 days away)
- Probe rows collected: **92,574**
- Outcome patches resolved: **163,248**

## Phase 4 floors (7-day horizon)

- ❌ **ALLOW false-negative rate**: 31.93% (n=23166) — floor ≤ 2%
- ❌ **BLOCK precision**: 5.96% (n=3441) — floor ≥ 70%

**Overall: ❌ floors not yet met**

## Breakdown

### 7-day horizon
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=22664  loss=7304  rate=32.23% |   n=2905  loss=676  rate=23.27% |   n=   5  loss=  0  rate=0.00% |   n=33700  loss=868  rate=2.58% |
| risky |   n= 502  loss= 92  rate=18.33% |   n=18978  loss=1480  rate=7.80% |   n=3436  loss=205  rate=5.97% |   n=6184  loss=2001  rate=32.36% |
| **all** | **  n=23166  loss=7396  rate=31.93%** | **  n=21883  loss=2156  rate=9.85%** | **  n=3441  loss=205  rate=5.96%** | **  n=39884  loss=2869  rate=7.19%** |

### 30-day horizon (window opens 2026-06-08)
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  |   n=19752  loss=6246  rate=31.62% |   n=2370  loss=558  rate=23.54% |   n=   5  loss=  0  rate=0.00% |   n=28147  loss=776  rate=2.76% |
| risky |   n= 479  loss=174  rate=36.33% |   n=16060  loss=1379  rate=8.59% |   n=2892  loss=197  rate=6.81% |   n=5169  loss=1771  rate=34.26% |
| **all** | **  n=20231  loss=6420  rate=31.73%** | **  n=18430  loss=1937  rate=10.51%** | **  n=2897  loss=197  rate=6.80%** | **  n=33316  loss=2547  rate=7.64%** |


## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [`ledger/`](../ledger/). Patches in [`ledger/outcome-patches.jsonl`](../ledger/outcome-patches.jsonl). Schema in [`docs/integration.md`](../docs/integration.md).
