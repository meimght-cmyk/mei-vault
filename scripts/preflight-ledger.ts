#!/usr/bin/env bun
//
// Continuous-probe ledger.
//
// For each ranked candidate pool, calls /api/score and appends a row to a
// JSONL file. Re-running daily produces a time-series of riskBps per pool —
// the foundation for measuring decoder HIT/MISS later (did a pool that
// stayed at riskBps=0 actually remain safe, did a pool flagged BLOCK
// actually rug, etc.).
//
// /api/score works for both kumbaya + prism; /api/preflight needs swap
// calldata so it lands in a follow-up script once we have real intents.
//
import { readFileSync, appendFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const RANKED_PATH = join(import.meta.dir, '..', 'audits', 'ranked.json');
const LEDGER_DIR = join(import.meta.dir, '..', 'ledger');
const SERVER = process.env.RISKCLAW_SERVER ?? 'http://localhost:4242';
const DRY_AMOUNT_IN = process.env.DRY_AMOUNT_IN ?? '1000000000000000000';
const SCORE_PROTOCOLS = new Set(['kumbaya', 'prism']);
const THROTTLE_MS = Number(process.env.THROTTLE_MS ?? 2100);
const MAX_RISK_FILTER = Number(process.env.MAX_RISK_FILTER ?? 5000);
const MAX_POOLS = Number(process.env.MAX_POOLS ?? 100);
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

interface Ranked {
  rankedSafestFirst: {
    protocol: string;
    chainId: number;
    pool: string;
    fee: number;
    riskBps: number;
    liquidity: string;
    cardinality: number;
    reasons: string[];
  }[];
}

if (!existsSync(LEDGER_DIR)) mkdirSync(LEDGER_DIR, { recursive: true });
const today = new Date().toISOString().slice(0, 10);
const LEDGER = join(LEDGER_DIR, `score-${today}.jsonl`);

const ranked = JSON.parse(readFileSync(RANKED_PATH, 'utf8')) as Ranked;
const candidates = ranked.rankedSafestFirst
  .filter(p => SCORE_PROTOCOLS.has(p.protocol))
  .filter(p => p.riskBps <= MAX_RISK_FILTER)
  .slice(0, MAX_POOLS);

console.log(`# score ledger run — ${new Date().toISOString()}`);
console.log(`server=${SERVER}`);
console.log(`ledger=${LEDGER}`);
console.log(`filter: maxRiskBps=${MAX_RISK_FILTER} maxPools=${MAX_POOLS}`);
console.log(`candidates=${candidates.length}`);

if (!candidates.length) {
  console.log(`no candidates in ranked.json — run scripts/rank-pools.ts first`);
  process.exit(0);
}

let drift = 0, errors = 0, healthy = 0;

for (let i = 0; i < candidates.length; i++) {
  const c = candidates[i]!;
  if (i > 0) await sleep(THROTTLE_MS);
  try {
    const t0 = Date.now();
    const res = await fetch(`${SERVER}/api/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        protocol: c.protocol,
        pool: c.pool,
        amountIn: DRY_AMOUNT_IN,
        chainId: c.chainId,
      }),
    });
    const data = await res.json() as {
      result?: { routeRiskBps: number; recommendation: string; perPool: { riskBps: number; reasons: string[]; components?: Record<string, unknown> }[] };
      error?: string;
    };
    const elapsed = Date.now() - t0;
    const liveBps = data.result?.routeRiskBps ?? -1;
    const liveReasons = data.result?.perPool?.[0]?.reasons ?? [];
    const components = data.result?.perPool?.[0]?.components ?? {};

    const rec = data.result?.recommendation;
    const decision = liveBps < 0 ? 'ERROR'
      : (rec === 'ALLOW' || rec === 'WARN' || rec === 'BLOCK') ? rec : 'PROBE';
    const row = {
      ts: new Date().toISOString(),
      protocol: c.protocol,
      chainId: c.chainId,
      pool: c.pool,
      decision,
      riskBps: liveBps,
      action_taken: null,
      outcome_7d: null,
      outcome_30d: null,
      notes: 'continuous score probe',
      _probe: {
        auditRiskBps: c.riskBps,
        liveRiskBps: liveBps,
        drift: liveBps >= 0 ? liveBps - c.riskBps : null,
        reasons: liveReasons,
        components,
        elapsedMs: elapsed,
        httpStatus: res.status,
      },
    };
    appendFileSync(LEDGER, JSON.stringify(row) + '\n');

    if (liveBps < 0) errors++;
    else if (liveBps === 0) healthy++;
    else if (liveBps !== c.riskBps) drift++;

    const tag = liveBps < 0 ? 'ERR' : (liveBps === c.riskBps ? 'same' : `Δ${liveBps - c.riskBps >= 0 ? '+' : ''}${liveBps - c.riskBps}bps`);
    console.log(`  ${c.protocol.padEnd(7)} ${c.pool.slice(0, 10)}…  audit=${String(c.riskBps).padStart(5)} live=${String(liveBps).padStart(5)}  ${tag}  (${elapsed}ms)`);
  } catch (e) {
    errors++;
    appendFileSync(LEDGER, JSON.stringify({
      ts: new Date().toISOString(),
      protocol: c.protocol, chainId: c.chainId, pool: c.pool,
      decision: 'ERROR', riskBps: -1,
      action_taken: null, outcome_7d: null, outcome_30d: null,
      notes: 'continuous score probe',
      _probe: {
        auditRiskBps: c.riskBps, liveRiskBps: -1, drift: null,
        reasons: [(e as Error).message], components: {},
        elapsedMs: -1, httpStatus: -1,
      },
    }) + '\n');
    console.log(`  ${c.protocol.padEnd(7)} ${c.pool.slice(0, 10)}…  ERROR: ${(e as Error).message}`);
  }
}

console.log(`\nhealthy=${healthy} drift=${drift} errors=${errors} of ${candidates.length}`);
console.log(`appended to ${LEDGER}`);
