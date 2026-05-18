#!/usr/bin/env bun
//
// Phase 4 readiness scoreboard.
//
// Joins probe rows (score-*.jsonl) with backfill patches
// (outcome-patches.jsonl) to compute:
//
//   ALLOW false-negative rate = ALLOW probes that turned LOSS / all ALLOW probes
//   BLOCK precision           = BLOCK probes that turned LOSS / all BLOCK probes
//   WARN loss rate            = WARN probes that turned LOSS / all WARN probes
//
// Per cohort (safe / risky) and per horizon (7d / 30d). Phase 4 floors:
//   - ALLOW false-neg ≤ 0.02  (signals we trusted don't actually rug)
//   - BLOCK precision ≥ 0.70  (signals we flagged actually do rug)
//   - both with ≥ 100 samples per cohort for stable estimates
//
// Outputs:
//   metrics/phase4-readiness.json   — machine-readable snapshot
//   metrics/README.md               — human-readable dashboard
//   metrics/timeseries.jsonl        — append one row per run
//
import { readdirSync, readFileSync, writeFileSync, appendFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const LEDGER_DIR = join(import.meta.dir, '..', 'ledger');
const METRICS_DIR = join(import.meta.dir, '..', 'metrics');
const PATCH_PATH = join(LEDGER_DIR, 'outcome-patches.jsonl');
const PHASE4_START = '2026-05-09'; // 90-day clock start
const EARLIEST_UNLOCK = '2026-08-07';

const FLOORS = {
  allow_false_neg_max: 0.02,
  block_precision_min: 0.70,
  min_samples_per_cohort: 100,
};

if (!existsSync(METRICS_DIR)) mkdirSync(METRICS_DIR, { recursive: true });

interface ProbeRow {
  ts: string;
  pool: string;
  protocol: string;
  cohort?: 'safe' | 'risky';
  decision: string;
  riskBps: number;
}
interface Patch {
  ts_original: string;
  pool: string;
  horizon: '7d' | '30d';
  outcome_loss: boolean;
  state_T: { decision: string; riskBps: number };
}

const rowIndex = new Map<string, ProbeRow>();
let rowCount = 0;
for (const f of readdirSync(LEDGER_DIR)) {
  if (!/^score-\d{4}-\d{2}-\d{2}\.jsonl$/.test(f)) continue;
  for (const line of readFileSync(join(LEDGER_DIR, f), 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try {
      const r = JSON.parse(line) as ProbeRow;
      rowIndex.set(`${r.pool}|${r.ts}`, r);
      rowCount++;
    } catch {}
  }
}

const patches: Patch[] = [];
if (existsSync(PATCH_PATH)) {
  for (const line of readFileSync(PATCH_PATH, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try { patches.push(JSON.parse(line) as Patch); } catch {}
  }
}

type Bucket = { samples: number; loss: number; rate: number | null };
const empty = (): Bucket => ({ samples: 0, loss: 0, rate: null });

interface CohortMetrics {
  ALLOW: Bucket;
  WARN: Bucket;
  BLOCK: Bucket;
  ERROR: Bucket;
}
const emptyCohort = (): CohortMetrics => ({
  ALLOW: empty(), WARN: empty(), BLOCK: empty(), ERROR: empty(),
});

interface HorizonMetrics {
  safe: CohortMetrics;
  risky: CohortMetrics;
  all: CohortMetrics;
}
const horizonMetrics: Record<'7d' | '30d', HorizonMetrics> = {
  '7d':  { safe: emptyCohort(), risky: emptyCohort(), all: emptyCohort() },
  '30d': { safe: emptyCohort(), risky: emptyCohort(), all: emptyCohort() },
};

for (const p of patches) {
  const row = rowIndex.get(`${p.pool}|${p.ts_original}`);
  const cohort = (row?.cohort ?? 'safe') as 'safe' | 'risky';
  const decision = p.state_T.decision as keyof CohortMetrics;
  const hMetrics = horizonMetrics[p.horizon];
  for (const lens of [cohort, 'all'] as const) {
    const b = hMetrics[lens][decision];
    if (!b) continue;
    b.samples++;
    if (p.outcome_loss) b.loss++;
    b.rate = b.samples > 0 ? b.loss / b.samples : null;
  }
}

const horizon7d = horizonMetrics['7d'];
const horizon30d = horizonMetrics['30d'];

const allowFalseNeg = horizon7d.all.ALLOW.rate;
const blockPrecision = horizon7d.all.BLOCK.rate;
const allowSamplesOK = horizon7d.all.ALLOW.samples >= FLOORS.min_samples_per_cohort;
const blockSamplesOK = horizon7d.all.BLOCK.samples >= FLOORS.min_samples_per_cohort;
const allowFloorPass = allowFalseNeg !== null && allowFalseNeg <= FLOORS.allow_false_neg_max;
const blockFloorPass = blockPrecision !== null && blockPrecision >= FLOORS.block_precision_min;

const phase4Ready = allowFloorPass && blockFloorPass && allowSamplesOK && blockSamplesOK;

const daysSinceStart = Math.floor((Date.now() - new Date(PHASE4_START + 'T00:00:00Z').getTime()) / 86_400_000);
const daysUntilUnlock = Math.max(0, Math.floor((new Date(EARLIEST_UNLOCK + 'T00:00:00Z').getTime() - Date.now()) / 86_400_000));

const snapshot = {
  computed_at: new Date().toISOString(),
  phase4_start: PHASE4_START,
  earliest_unlock: EARLIEST_UNLOCK,
  days_since_start: daysSinceStart,
  days_until_earliest_unlock: daysUntilUnlock,
  floors: FLOORS,
  totals: {
    probe_rows: rowCount,
    outcome_patches: patches.length,
  },
  horizons: horizonMetrics,
  phase4_gates: {
    allow_false_neg: {
      value: allowFalseNeg,
      samples: horizon7d.all.ALLOW.samples,
      samples_ok: allowSamplesOK,
      floor_pass: allowFloorPass,
    },
    block_precision: {
      value: blockPrecision,
      samples: horizon7d.all.BLOCK.samples,
      samples_ok: blockSamplesOK,
      floor_pass: blockFloorPass,
    },
  },
  phase4_ready: phase4Ready,
};

writeFileSync(join(METRICS_DIR, 'phase4-readiness.json'), JSON.stringify(snapshot, null, 2));

const fmt = (b: Bucket): string => {
  if (b.samples === 0) return `  n=0`;
  const pct = (b.rate! * 100).toFixed(2);
  return `  n=${b.samples.toString().padStart(4)}  loss=${b.loss.toString().padStart(3)}  rate=${pct}%`;
};

const block = (h: HorizonMetrics, label: string): string => {
  return `### ${label}
| cohort | ALLOW | WARN | BLOCK | ERROR |
|---|---|---|---|---|
| safe  | ${fmt(h.safe.ALLOW)} | ${fmt(h.safe.WARN)} | ${fmt(h.safe.BLOCK)} | ${fmt(h.safe.ERROR)} |
| risky | ${fmt(h.risky.ALLOW)} | ${fmt(h.risky.WARN)} | ${fmt(h.risky.BLOCK)} | ${fmt(h.risky.ERROR)} |
| **all** | **${fmt(h.all.ALLOW)}** | **${fmt(h.all.WARN)}** | **${fmt(h.all.BLOCK)}** | **${fmt(h.all.ERROR)}** |
`;
};

const status = (label: string, val: number | null, samples: number, ok: boolean, samplesOk: boolean): string => {
  if (val === null || samples === 0) return `- **${label}**: insufficient data (n=${samples}, need ${FLOORS.min_samples_per_cohort})`;
  const valStr = (val * 100).toFixed(2) + '%';
  const flag = ok && samplesOk ? '✅' : '❌';
  const sampleNote = samplesOk ? '' : ` _(n=${samples} < ${FLOORS.min_samples_per_cohort} required)_`;
  return `- ${flag} **${label}**: ${valStr} (n=${samples})${sampleNote}`;
};

const md = `# Phase 4 readiness

_Updated: ${snapshot.computed_at}_

Phase 4 (vault contract deploy) unlocks only after ≥90 days of probe data **with** the safety floors holding. This dashboard is the public scorecard.

## Where we are

- 90-day clock started: **${PHASE4_START}** (day ${daysSinceStart} of 90)
- Earliest unlock: **${EARLIEST_UNLOCK}** (${daysUntilUnlock} days away)
- Probe rows collected: **${rowCount.toLocaleString()}**
- Outcome patches resolved: **${patches.length.toLocaleString()}**

## Phase 4 floors (7-day horizon)

${status('ALLOW false-negative rate', allowFalseNeg, horizon7d.all.ALLOW.samples, allowFloorPass, allowSamplesOK)} — floor ≤ ${(FLOORS.allow_false_neg_max * 100).toFixed(0)}%
${status('BLOCK precision', blockPrecision, horizon7d.all.BLOCK.samples, blockFloorPass, blockSamplesOK)} — floor ≥ ${(FLOORS.block_precision_min * 100).toFixed(0)}%

**Overall: ${phase4Ready ? '✅ floors met' : '❌ floors not yet met'}**

## Breakdown

${block(horizon7d, '7-day horizon')}
${block(horizon30d, '30-day horizon (window opens 2026-06-08)')}

## How to read this

- **ALLOW** = system said the pool was safe at probe time. **A LOSS row here means we missed a danger signal** (false negative).
- **BLOCK** = system flagged the pool as dangerous. **A LOSS row here means we correctly predicted a failure** (true positive).
- **WARN** = middle ground. Tracked separately.
- **safe cohort** = top-100 lowest-risk pools per probe cycle (4×/day).
- **risky cohort** = top-50 highest-risk pools (riskBps ≥ 3000) per cycle. Provides ground truth for BLOCK precision — without this cohort the precision metric is unmeasurable.

Raw data lives in [\`ledger/\`](../ledger/). Patches in [\`ledger/outcome-patches.jsonl\`](../ledger/outcome-patches.jsonl). Schema in [\`docs/integration.md\`](../docs/integration.md).
`;

writeFileSync(join(METRICS_DIR, 'README.md'), md);

const tsRow = {
  ts: snapshot.computed_at,
  days_since_start: daysSinceStart,
  probe_rows: rowCount,
  patches: patches.length,
  allow_false_neg_7d: allowFalseNeg,
  allow_samples_7d: horizon7d.all.ALLOW.samples,
  block_precision_7d: blockPrecision,
  block_samples_7d: horizon7d.all.BLOCK.samples,
  phase4_ready: phase4Ready,
};
appendFileSync(join(METRICS_DIR, 'timeseries.jsonl'), JSON.stringify(tsRow) + '\n');

console.log(`# phase 4 readiness — day ${daysSinceStart} of 90`);
console.log(`probes=${rowCount} patches=${patches.length}`);
console.log();
console.log(`7d ALLOW: ${horizon7d.all.ALLOW.samples} samples, false-neg=${allowFalseNeg !== null ? (allowFalseNeg * 100).toFixed(2) + '%' : 'n/a'} ${allowFloorPass && allowSamplesOK ? 'PASS' : 'FAIL'}`);
console.log(`7d BLOCK: ${horizon7d.all.BLOCK.samples} samples, precision=${blockPrecision !== null ? (blockPrecision * 100).toFixed(2) + '%' : 'n/a'} ${blockFloorPass && blockSamplesOK ? 'PASS' : 'FAIL'}`);
console.log();
console.log(`phase4_ready: ${phase4Ready}`);
console.log(`wrote ${join(METRICS_DIR, 'phase4-readiness.json')}`);
console.log(`wrote ${join(METRICS_DIR, 'README.md')}`);
