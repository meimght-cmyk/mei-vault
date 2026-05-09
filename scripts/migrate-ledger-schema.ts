#!/usr/bin/env bun
//
// One-shot migration: rewrite all ledger JSONL rows in the new schema
// expected by the handoff doc (§2 Phase 1):
//
//   { ts, pool, protocol, chainId, decision, riskBps, action_taken,
//     outcome_7d, outcome_30d, notes, _probe }
//
// `decision` derives from the live recommendation (ALLOW / WARN / BLOCK)
// or "PROBE" for continuous score-only probes (no entry decision made).
// outcome_* fields stay null until populated by a follow-up backfill
// script that reads on-chain reality at +7d / +30d.
//
import { readdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const LEDGER_DIR = join(import.meta.dir, '..', 'ledger');
const files = readdirSync(LEDGER_DIR).filter(f => f.startsWith('score-') && f.endsWith('.jsonl'));

interface OldRow {
  ts: string;
  protocol: string;
  chainId: number;
  pool: string;
  auditRiskBps?: number;
  liveRiskBps?: number;
  drift?: number | null;
  recommendation?: string;
  reasons?: string[];
  components?: Record<string, unknown>;
  elapsedMs?: number;
  httpStatus?: number;
}

interface NewRow {
  ts: string;
  protocol: string;
  chainId: number;
  pool: string;
  decision: 'ALLOW' | 'WARN' | 'BLOCK' | 'PROBE' | 'ERROR';
  riskBps: number;
  action_taken: 'entered' | 'skipped' | 'proposed' | null;
  outcome_7d: { nav_pct_change: number | null; incident_flagged: boolean | null; notes: string } | null;
  outcome_30d: { nav_pct_change: number | null; incident_flagged: boolean | null; notes: string } | null;
  notes: string;
  _probe: {
    auditRiskBps: number;
    liveRiskBps: number;
    drift: number | null;
    reasons: string[];
    components: Record<string, unknown>;
    elapsedMs: number;
    httpStatus: number;
  };
}

let migrated = 0;
let preserved = 0;

for (const f of files) {
  const path = join(LEDGER_DIR, f);
  const raw = readFileSync(path, 'utf8');
  if (!raw.trim()) continue;
  const out: string[] = [];
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue;
    let row: OldRow & NewRow;
    try { row = JSON.parse(line) as OldRow & NewRow; } catch { out.push(line); continue; }
    if (typeof row.decision === 'string' && 'action_taken' in row) {
      out.push(line);
      preserved++;
      continue;
    }
    const old = row as OldRow;
    const live = old.liveRiskBps ?? -1;
    const decision: NewRow['decision'] =
      live < 0 ? 'ERROR' :
      (old.recommendation === 'ALLOW' || old.recommendation === 'WARN' || old.recommendation === 'BLOCK')
        ? old.recommendation : 'PROBE';
    const rebuilt: NewRow = {
      ts: old.ts,
      protocol: old.protocol,
      chainId: old.chainId,
      pool: old.pool,
      decision,
      riskBps: live,
      action_taken: null,
      outcome_7d: null,
      outcome_30d: null,
      notes: 'migrated from score-only schema',
      _probe: {
        auditRiskBps: old.auditRiskBps ?? -1,
        liveRiskBps: live,
        drift: old.drift ?? null,
        reasons: old.reasons ?? [],
        components: old.components ?? {},
        elapsedMs: old.elapsedMs ?? -1,
        httpStatus: old.httpStatus ?? -1,
      },
    };
    out.push(JSON.stringify(rebuilt));
    migrated++;
  }
  const backup = path + '.bak';
  renameSync(path, backup);
  writeFileSync(path, out.join('\n') + '\n');
  console.log(`  ${f}: migrated=${out.length} (backup: ${f}.bak)`);
}

console.log(`\nmigrated=${migrated} preserved=${preserved}`);
