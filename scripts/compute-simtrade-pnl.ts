#!/usr/bin/env bun
//
// Sim-trade P&L scoreboard.
//
// Simulates what passive LP positions would have earned/lost if real capital
// had followed our signals. Two views:
//
//   real:         every file in intents/YYYY-MM-DD/*.json as a $1 entry
//                 at intent creation time
//   hypothetical: every probe row with decision=ALLOW as a $1 entry at
//                 probe time — a counterfactual "if we'd been more
//                 aggressive" portfolio
//
// Conservative P&L model (no fee assumption — we never claim ungrounded gains):
//   - LOSS patch landed for the entry          → pnl = -5000 bps (-50%)
//   - No LOSS, but pool errors at horizon      → pnl = -2000 bps (-20%)
//   - Otherwise                                → pnl = -Δ tvlDriftBps
//
// Per-entry P&L → equal-weight portfolio P&L, win rate, drawdown distribution.
//
// Outputs:
//   metrics/simtrade-pnl.json — machine-readable snapshot
//   metrics/simtrade.md       — public dashboard
//
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const LEDGER_DIR = join(import.meta.dir, '..', 'ledger');
const INTENTS_DIR = join(import.meta.dir, '..', 'intents');
const METRICS_DIR = join(import.meta.dir, '..', 'metrics');
const PATCH_PATH = join(LEDGER_DIR, 'outcome-patches.jsonl');
const HORIZON_DAYS = 7;
const DAY_MS = 86_400_000;
const LOSS_BPS = -5000;
const ERROR_BPS = -2000;

interface ProbeRow {
  ts: string;
  pool: string;
  protocol: string;
  chainId: number;
  cohort?: 'safe' | 'risky';
  decision: string;
  riskBps: number;
  _probe?: { components?: { tvlDriftBps?: number | null } };
}
interface Patch {
  ts_original: string;
  pool: string;
  horizon: '7d' | '30d';
  outcome_loss: boolean;
}

// load probes, sorted per-pool by ts ascending
const probesByPool = new Map<string, ProbeRow[]>();
let rowCount = 0;
for (const f of readdirSync(LEDGER_DIR)) {
  if (!/^score-\d{4}-\d{2}-\d{2}\.jsonl$/.test(f)) continue;
  for (const line of readFileSync(join(LEDGER_DIR, f), 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try {
      const r = JSON.parse(line) as ProbeRow;
      if (!probesByPool.has(r.pool)) probesByPool.set(r.pool, []);
      probesByPool.get(r.pool)!.push(r);
      rowCount++;
    } catch {}
  }
}
for (const arr of probesByPool.values()) {
  arr.sort((a, b) => a.ts.localeCompare(b.ts));
}

// load patches, indexed by (pool, ts_original, horizon)
const lossPatch = new Set<string>();
if (existsSync(PATCH_PATH)) {
  for (const line of readFileSync(PATCH_PATH, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try {
      const p = JSON.parse(line) as Patch;
      if (p.outcome_loss) lossPatch.add(`${p.pool}|${p.ts_original}|${p.horizon}`);
    } catch {}
  }
}

interface SimEntry {
  source: 'intent' | 'probe';
  intent_id?: string;
  pool: string;
  protocol: string;
  cohort: 'safe' | 'risky';
  entry_ts: string;
  entry_decision: string;
  entry_riskBps: number;
  entry_tvlDriftBps: number | null;
  age_days: number;
  resolved: boolean;
  outcome_ts: string;
  outcome_decision: string;
  outcome_riskBps: number;
  outcome_tvlDriftBps: number | null;
  loss_flagged: boolean;
  pnl_bps: number;
  pnl_label: string;
}

const now = Date.now();

function simulateEntry(
  source: 'intent' | 'probe',
  pool: string,
  protocol: string,
  cohort: 'safe' | 'risky',
  entryRow: ProbeRow,
  intent_id?: string,
): SimEntry {
  const entryTime = new Date(entryRow.ts).getTime();
  const ageMs = now - entryTime;
  const ageDays = ageMs / DAY_MS;
  const horizonTime = entryTime + HORIZON_DAYS * DAY_MS;
  const resolved = now >= horizonTime;

  // outcome row: first probe at or after horizonTime, else latest
  const series = probesByPool.get(pool) ?? [];
  let outcomeRow: ProbeRow = entryRow;
  if (resolved) {
    const candidate = series.find(r => new Date(r.ts).getTime() >= horizonTime);
    if (candidate) outcomeRow = candidate;
    else outcomeRow = series[series.length - 1] ?? entryRow;
  } else if (series.length) {
    outcomeRow = series[series.length - 1]!;
  }

  const entryTvl = entryRow._probe?.components?.tvlDriftBps ?? null;
  const outcomeTvl = outcomeRow._probe?.components?.tvlDriftBps ?? null;

  let pnl_bps = 0;
  let pnl_label = 'flat';
  const lossKey = `${pool}|${entryRow.ts}|7d`;
  const lossFlagged = lossPatch.has(lossKey);

  if (lossFlagged) {
    pnl_bps = LOSS_BPS;
    pnl_label = 'LOSS (patch)';
  } else if (resolved && outcomeRow.decision === 'ERROR' && entryRow.decision !== 'ERROR') {
    pnl_bps = ERROR_BPS;
    pnl_label = 'unexitable (errored)';
  } else if (entryTvl !== null && outcomeTvl !== null) {
    pnl_bps = -(outcomeTvl - entryTvl);
    pnl_label = pnl_bps >= 0 ? 'stable/up' : 'TVL drift down';
  }

  return {
    source,
    intent_id,
    pool,
    protocol,
    cohort,
    entry_ts: entryRow.ts,
    entry_decision: entryRow.decision,
    entry_riskBps: entryRow.riskBps,
    entry_tvlDriftBps: entryTvl,
    age_days: Math.round(ageDays * 10) / 10,
    resolved,
    outcome_ts: outcomeRow.ts,
    outcome_decision: outcomeRow.decision,
    outcome_riskBps: outcomeRow.riskBps,
    outcome_tvlDriftBps: outcomeTvl,
    loss_flagged: lossFlagged,
    pnl_bps,
    pnl_label,
  };
}

// REAL: walk intents/
const realEntries: SimEntry[] = [];
if (existsSync(INTENTS_DIR)) {
  for (const day of readdirSync(INTENTS_DIR)) {
    const dayPath = join(INTENTS_DIR, day);
    if (!statSync(dayPath).isDirectory()) continue;
    for (const f of readdirSync(dayPath)) {
      if (!f.endsWith('.json')) continue;
      try {
        const intent = JSON.parse(readFileSync(join(dayPath, f), 'utf8'));
        const pool = intent.target?.pool;
        const protocol = intent.target?.protocol;
        const createdAt = intent.createdAt;
        if (!pool || !protocol || !createdAt) continue;
        const series = probesByPool.get(pool) ?? [];
        if (!series.length) continue;
        // find probe row at or closest after createdAt
        const entryTime = new Date(createdAt).getTime();
        let entryRow = series.find(r => new Date(r.ts).getTime() >= entryTime);
        if (!entryRow) entryRow = series[0]!;
        realEntries.push(simulateEntry('intent', pool, protocol, entryRow.cohort ?? 'safe', entryRow, intent.id));
      } catch {}
    }
  }
}

// HYPOTHETICAL: every ALLOW probe row → one entry
const hypoEntries: SimEntry[] = [];
for (const [pool, series] of probesByPool.entries()) {
  for (const row of series) {
    if (row.decision !== 'ALLOW') continue;
    hypoEntries.push(simulateEntry('probe', pool, row.protocol, row.cohort ?? 'safe', row));
  }
}

function summarize(entries: SimEntry[]) {
  if (!entries.length) {
    return {
      count: 0, resolved_count: 0,
      loss_flagged_count: 0,
      win_count: 0, win_rate: null,
      avg_pnl_bps: null, avg_pnl_pct: null,
      median_pnl_bps: null,
      worst_pnl_bps: null, best_pnl_bps: null,
      total_pnl_bps: null,
    };
  }
  const resolved = entries.filter(e => e.resolved);
  const lossFlagged = entries.filter(e => e.loss_flagged).length;
  const wins = entries.filter(e => e.pnl_bps >= 0).length;
  const pnls = entries.map(e => e.pnl_bps).sort((a, b) => a - b);
  const sum = pnls.reduce((a, b) => a + b, 0);
  const median = pnls.length % 2
    ? pnls[(pnls.length - 1) / 2]
    : (pnls[pnls.length / 2 - 1]! + pnls[pnls.length / 2]!) / 2;
  return {
    count: entries.length,
    resolved_count: resolved.length,
    loss_flagged_count: lossFlagged,
    win_count: wins,
    win_rate: wins / entries.length,
    avg_pnl_bps: sum / entries.length,
    avg_pnl_pct: (sum / entries.length / 100).toFixed(2) + '%',
    median_pnl_bps: median,
    worst_pnl_bps: pnls[0],
    best_pnl_bps: pnls[pnls.length - 1],
    total_pnl_bps: sum,
  };
}

const safeHypo = hypoEntries.filter(e => e.cohort === 'safe');
const riskyHypo = hypoEntries.filter(e => e.cohort === 'risky');

const snapshot = {
  computed_at: new Date().toISOString(),
  model: {
    horizon_days: HORIZON_DAYS,
    loss_pnl_bps: LOSS_BPS,
    error_pnl_bps: ERROR_BPS,
    fee_assumption: 'none (conservative — no ungrounded gains)',
    drift_model: 'pnl_bps = -(tvlDriftBps_TN - tvlDriftBps_T)',
  },
  totals: { probe_rows: rowCount, real_intents: realEntries.length, hypothetical_entries: hypoEntries.length },
  real_intents: realEntries,
  hypothetical_summary: {
    all: summarize(hypoEntries),
    safe_cohort: summarize(safeHypo),
    risky_cohort: summarize(riskyHypo),
  },
  real_summary: summarize(realEntries),
};

writeFileSync(join(METRICS_DIR, 'simtrade-pnl.json'), JSON.stringify(snapshot, null, 2));

const bpsToPct = (bps: number | null): string => bps === null ? 'n/a' : ((bps as number) / 100).toFixed(2) + '%';
const fmtSummary = (s: ReturnType<typeof summarize>): string => {
  if (!s.count) return '_no entries_';
  return `- count: **${s.count}** (${s.resolved_count} resolved at 7d, ${s.loss_flagged_count} loss-flagged)
- avg P&L per entry: **${bpsToPct(s.avg_pnl_bps as number)}**
- median P&L per entry: **${bpsToPct(s.median_pnl_bps as number)}**
- win rate (P&L ≥ 0): **${((s.win_rate as number) * 100).toFixed(1)}%** (${s.win_count} wins)
- worst entry: ${bpsToPct(s.worst_pnl_bps as number)} · best entry: ${bpsToPct(s.best_pnl_bps as number)}
- equal-weight portfolio: starting $1 per entry → **${bpsToPct(s.avg_pnl_bps as number)} return**`;
};

const realLines = realEntries.map(e =>
  `| \`${e.intent_id}\` | ${e.protocol} | \`${e.pool.slice(0, 10)}…\` | ${e.entry_decision} | ${e.age_days}d | ${bpsToPct(e.pnl_bps)} | ${e.pnl_label} |`
).join('\n') || '| _no intents yet_ | | | | | | |';

const md = `# Sim-trade P&L

_Updated: ${snapshot.computed_at}_

Conservative simulation of "what would real capital have done if it had followed our signals." No fees assumed — we don't claim ungrounded gains.

## Model

| Condition | Assumed P&L |
|---|---|
| LOSS patch landed for entry | **-50%** (-${Math.abs(LOSS_BPS)} bps) |
| No LOSS but pool errors at horizon | **-20%** (-${Math.abs(ERROR_BPS)} bps) |
| Otherwise | **−Δ tvlDriftBps** (LP value tracks TVL drift) |

Horizon: ${HORIZON_DAYS} days.

## Real intents (the strategy as actually deployed)

These are the strategy intents the system actually produced. Equal-weight $1 per entry.

| intent | protocol | pool | entry decision | age | P&L | label |
|---|---|---|---|---|---|---|
${realLines}

${fmtSummary(snapshot.real_summary)}

## Hypothetical: every ALLOW probe as an entry

Counterfactual portfolio — if we'd been more aggressive and entered every ALLOW signal at every probe cycle.

### All entries
${fmtSummary(snapshot.hypothetical_summary.all)}

### Safe cohort only
${fmtSummary(snapshot.hypothetical_summary.safe_cohort)}

### Risky cohort only
${fmtSummary(snapshot.hypothetical_summary.risky_cohort)}

## How to read this

- **Real intents** is the honest answer: "if we'd actually deployed every strategy intent the system produced, what's the realized P&L?" Currently a tiny sample.
- **Hypothetical** is the exploratory answer: what if we'd entered every ALLOW signal? Bigger sample, but more aggressive than our actual strategy gates would allow.
- A passive LP's value moves roughly with pool TVL — that's the drift model. Catastrophic loss = LOSS patch flagged → -50% assumption.
- We don't simulate fees. Real LPs earn ~0.3-1% per week from trading fees in liquid pools, so realized P&L would be higher than shown. Conservative bias is intentional.

Raw data: [\`metrics/simtrade-pnl.json\`](simtrade-pnl.json). Source: [\`scripts/compute-simtrade-pnl.ts\`](../scripts/compute-simtrade-pnl.ts).
`;

writeFileSync(join(METRICS_DIR, 'simtrade.md'), md);

console.log(`# sim-trade P&L`);
console.log(`probes=${rowCount} real_intents=${realEntries.length} hypothetical=${hypoEntries.length}`);
console.log();
if (realEntries.length) {
  console.log(`real:        avg ${bpsToPct(snapshot.real_summary.avg_pnl_bps as number)} · win rate ${((snapshot.real_summary.win_rate as number) * 100).toFixed(1)}%`);
}
console.log(`hypo (all):  avg ${bpsToPct(snapshot.hypothetical_summary.all.avg_pnl_bps as number)} · win rate ${((snapshot.hypothetical_summary.all.win_rate as number) * 100).toFixed(1)}% · n=${snapshot.hypothetical_summary.all.count}`);
console.log(`hypo (safe): avg ${bpsToPct(snapshot.hypothetical_summary.safe_cohort.avg_pnl_bps as number)} · win rate ${((snapshot.hypothetical_summary.safe_cohort.win_rate as number) * 100).toFixed(1)}% · n=${snapshot.hypothetical_summary.safe_cohort.count}`);
console.log(`hypo (risky):avg ${bpsToPct(snapshot.hypothetical_summary.risky_cohort.avg_pnl_bps as number)} · win rate ${((snapshot.hypothetical_summary.risky_cohort.win_rate as number) * 100).toFixed(1)}% · n=${snapshot.hypothetical_summary.risky_cohort.count}`);
console.log();
console.log(`wrote ${join(METRICS_DIR, 'simtrade-pnl.json')}`);
console.log(`wrote ${join(METRICS_DIR, 'simtrade.md')}`);
