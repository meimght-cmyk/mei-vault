#!/usr/bin/env bun
//
// Outcome backfill — for probe rows older than 7d/30d, re-score the pool
// and decide outcome_loss against conservative v1 thresholds.
//
// Storage: append-only outcome-patches.jsonl. Original score-*.jsonl rows
// stay immutable; patches join on (pool, ts_original, horizon) at read time.
//
// Idempotent: skips (pool, ts_original, horizon) tuples already patched.
//
// Conservative v1 loss signals (any one → outcome_loss=true):
//   - liveRiskBps_TN >= 5000  AND  riskBps_T <= 2000     (severe degradation)
//   - decision_TN == 'ERROR'  AND  decision_T != 'ERROR' (became unreachable)
//   - depegBps_TN > 1000      AND  depegBps_T <= 1000    (>10% off peg)
//   - tvlDriftBps_TN - tvlDriftBps_T >= 5000             (+50% additional drift)
//
import { readdirSync, readFileSync, appendFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const LEDGER_DIR = join(import.meta.dir, '..', 'ledger');
const PATCH_PATH = join(LEDGER_DIR, 'outcome-patches.jsonl');
const SERVER = process.env.RISKCLAW_SERVER ?? 'http://localhost:4242';
const DRY_AMOUNT_IN = process.env.DRY_AMOUNT_IN ?? '1000000000000000000';
const THROTTLE_MS = Number(process.env.THROTTLE_MS ?? 2100);
const DAY_MS = 86_400_000;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

interface ProbeRow {
  ts: string;
  protocol: string;
  chainId: number;
  pool: string;
  decision: string;
  riskBps: number;
  _probe?: {
    components?: {
      dePegDeviationBps?: number | null;
      tvlDriftBps?: number | null;
    };
  };
}

interface Patch {
  ts_original: string;
  pool: string;
  chainId: number;
  protocol: string;
  horizon: '7d' | '30d';
  computed_at: string;
  outcome_loss: boolean;
  reasons: string[];
  state_T: { riskBps: number; decision: string; depegBps: number | null; tvlDriftBps: number | null };
  state_TN: { riskBps: number; decision: string; depegBps: number | null; tvlDriftBps: number | null };
}

const seen = new Set<string>();
if (existsSync(PATCH_PATH)) {
  for (const line of readFileSync(PATCH_PATH, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try {
      const p = JSON.parse(line) as Patch;
      seen.add(`${p.pool}|${p.ts_original}|${p.horizon}`);
    } catch {}
  }
}

const rows: ProbeRow[] = [];
for (const f of readdirSync(LEDGER_DIR)) {
  if (!/^score-\d{4}-\d{2}-\d{2}\.jsonl$/.test(f)) continue;
  for (const line of readFileSync(join(LEDGER_DIR, f), 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try { rows.push(JSON.parse(line) as ProbeRow); } catch {}
  }
}

const now = Date.now();
const horizons = [['7d', 7 * DAY_MS], ['30d', 30 * DAY_MS]] as const;
const due: { row: ProbeRow; horizon: '7d' | '30d' }[] = [];
for (const row of rows) {
  const age = now - new Date(row.ts).getTime();
  for (const [horizon, threshold] of horizons) {
    if (age < threshold) continue;
    if (seen.has(`${row.pool}|${row.ts}|${horizon}`)) continue;
    due.push({ row, horizon });
  }
}

console.log(`# outcome backfill — ${new Date().toISOString()}`);
console.log(`scanned=${rows.length} rows  due=${due.length}`);

if (due.length === 0) {
  console.log('nothing to backfill');
  process.exit(0);
}

let losses = 0, safe = 0, errors = 0;

for (let i = 0; i < due.length; i++) {
  const { row, horizon } = due[i]!;
  if (i > 0) await sleep(THROTTLE_MS);
  try {
    const res = await fetch(`${SERVER}/api/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        protocol: row.protocol,
        pool: row.pool,
        amountIn: DRY_AMOUNT_IN,
        chainId: row.chainId,
      }),
    });
    const data = await res.json() as {
      result?: { routeRiskBps: number; recommendation: string; perPool: { components?: Record<string, unknown> }[] };
    };
    const liveBps_TN = data.result?.routeRiskBps ?? -1;
    const rec_TN = data.result?.recommendation;
    const decision_TN = liveBps_TN < 0 ? 'ERROR' : (rec_TN ?? 'PROBE');
    const components_TN = (data.result?.perPool?.[0]?.components ?? {}) as Record<string, number | null>;
    const depeg_TN = components_TN.dePegDeviationBps ?? null;
    const tvl_TN = components_TN.tvlDriftBps ?? null;

    const components_T = (row._probe?.components ?? {}) as Record<string, number | null>;
    const depeg_T = components_T.dePegDeviationBps ?? null;
    const tvl_T = components_T.tvlDriftBps ?? null;

    const reasons: string[] = [];
    if (liveBps_TN >= 5000 && row.riskBps <= 2000) reasons.push('riskBps_jump_to_5000+');
    if (decision_TN === 'ERROR' && row.decision !== 'ERROR') reasons.push('became_unreachable');
    if ((depeg_TN ?? 0) > 1000 && (depeg_T ?? 0) <= 1000) reasons.push('depeg_>10pct');
    if (tvl_TN !== null && tvl_T !== null && tvl_TN - tvl_T >= 5000) reasons.push('tvl_drift_+50pct');

    const patch: Patch = {
      ts_original: row.ts,
      pool: row.pool,
      chainId: row.chainId,
      protocol: row.protocol,
      horizon,
      computed_at: new Date().toISOString(),
      outcome_loss: reasons.length > 0,
      reasons,
      state_T: { riskBps: row.riskBps, decision: row.decision, depegBps: depeg_T, tvlDriftBps: tvl_T },
      state_TN: { riskBps: liveBps_TN, decision: decision_TN, depegBps: depeg_TN, tvlDriftBps: tvl_TN },
    };
    appendFileSync(PATCH_PATH, JSON.stringify(patch) + '\n');

    if (patch.outcome_loss) losses++; else safe++;
    console.log(`  ${row.protocol.padEnd(7)} ${row.pool.slice(0, 10)}…  ${horizon}  ${patch.outcome_loss ? 'LOSS' : 'safe'}  ${reasons.join(',')}`);
  } catch (e) {
    errors++;
    console.log(`  ${row.protocol.padEnd(7)} ${row.pool.slice(0, 10)}…  ${horizon}  ERROR: ${(e as Error).message}`);
  }
}

console.log(`\nlosses=${losses} safe=${safe} errors=${errors} of ${due.length}`);
console.log(`patches appended to ${PATCH_PATH}`);
