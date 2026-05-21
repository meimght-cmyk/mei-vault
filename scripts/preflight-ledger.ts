#!/usr/bin/env bun
//
// Continuous-probe ledger.
//
// Two passes per run:
//   - safe cohort: top-N safest pools (riskBps ascending) — measures ALLOW
//     false-negative rate (did pools we said were safe actually stay safe?)
//   - risky cohort: top-M riskiest pools (riskBps ≥ MIN_RISKY_BPS) —
//     measures BLOCK precision (did pools we flagged actually rug?)
//
// Each row tagged with `cohort: 'safe' | 'risky'` so downstream metrics
// can compute precision/recall per cohort. Both passes append to the same
// score-YYYY-MM-DD.jsonl.
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
const SCORE_PROTOCOLS = new Set(['kumbaya', 'prism', 'uniswap-v3-base', 'uniswap-v4-base']);
const THROTTLE_MS = Number(process.env.THROTTLE_MS ?? 2100);
const MAX_RISK_FILTER = Number(process.env.MAX_RISK_FILTER ?? 5000);
const MAX_POOLS = Number(process.env.MAX_POOLS ?? 100);
const MAX_POOLS_RISKY = Number(process.env.MAX_POOLS_RISKY ?? 50);
const MIN_RISKY_BPS = Number(process.env.MIN_RISKY_BPS ?? 3000);
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
    // V4-only — present on uniswap-v4-base entries. Passed through to /api/score
    // so the decoder can run token-side checks.
    currency0?: string;
    currency1?: string;
    hooks?: string;
  }[];
}

if (!existsSync(LEDGER_DIR)) mkdirSync(LEDGER_DIR, { recursive: true });
const today = new Date().toISOString().slice(0, 10);
const LEDGER = join(LEDGER_DIR, `score-${today}.jsonl`);

const ranked = JSON.parse(readFileSync(RANKED_PATH, 'utf8')) as Ranked;
const all = ranked.rankedSafestFirst.filter(p => SCORE_PROTOCOLS.has(p.protocol));

const safeCohort = all
  .filter(p => p.riskBps <= MAX_RISK_FILTER)
  .slice(0, MAX_POOLS);

const riskyCohort = all
  .filter(p => p.riskBps >= MIN_RISKY_BPS)
  .sort((a, b) => b.riskBps - a.riskBps)
  .slice(0, MAX_POOLS_RISKY);

console.log(`# score ledger run — ${new Date().toISOString()}`);
console.log(`server=${SERVER}`);
console.log(`ledger=${LEDGER}`);
console.log(`safe:  maxRiskBps=${MAX_RISK_FILTER} maxPools=${MAX_POOLS}  → ${safeCohort.length} candidates`);
console.log(`risky: minRiskBps=${MIN_RISKY_BPS} maxPools=${MAX_POOLS_RISKY} → ${riskyCohort.length} candidates`);

if (!safeCohort.length && !riskyCohort.length) {
  console.log(`no candidates in ranked.json — run scripts/rank-pools.ts first`);
  process.exit(0);
}

let totalDrift = 0, totalErrors = 0, totalHealthy = 0;

async function probe(cohort: 'safe' | 'risky', candidates: typeof all): Promise<void> {
  if (!candidates.length) return;
  console.log(`\n## ${cohort} cohort (${candidates.length})`);
  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i]!;
    if (i > 0 || cohort === 'risky') await sleep(THROTTLE_MS);
    try {
      const t0 = Date.now();
      const reqBody: Record<string, unknown> = {
        protocol: c.protocol,
        pool: c.pool,
        amountIn: DRY_AMOUNT_IN,
        chainId: c.chainId,
      };
      if (c.protocol === 'uniswap-v4-base' && c.currency0 && c.currency1) {
        reqBody.currency0 = c.currency0;
        reqBody.currency1 = c.currency1;
      }
      const res = await fetch(`${SERVER}/api/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
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
        cohort,
        decision,
        riskBps: liveBps,
        action_taken: null,
        outcome_7d: null,
        outcome_30d: null,
        notes: `continuous score probe (${cohort})`,
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

      if (liveBps < 0) totalErrors++;
      else if (liveBps === 0) totalHealthy++;
      else if (liveBps !== c.riskBps) totalDrift++;

      const tag = liveBps < 0 ? 'ERR' : (liveBps === c.riskBps ? 'same' : `Δ${liveBps - c.riskBps >= 0 ? '+' : ''}${liveBps - c.riskBps}bps`);
      console.log(`  ${c.protocol.padEnd(7)} ${c.pool.slice(0, 10)}…  audit=${String(c.riskBps).padStart(5)} live=${String(liveBps).padStart(5)}  ${tag}  (${elapsed}ms)`);
    } catch (e) {
      totalErrors++;
      appendFileSync(LEDGER, JSON.stringify({
        ts: new Date().toISOString(),
        protocol: c.protocol, chainId: c.chainId, pool: c.pool,
        cohort,
        decision: 'ERROR', riskBps: -1,
        action_taken: null, outcome_7d: null, outcome_30d: null,
        notes: `continuous score probe (${cohort})`,
        _probe: {
          auditRiskBps: c.riskBps, liveRiskBps: -1, drift: null,
          reasons: [(e as Error).message], components: {},
          elapsedMs: -1, httpStatus: -1,
        },
      }) + '\n');
      console.log(`  ${c.protocol.padEnd(7)} ${c.pool.slice(0, 10)}…  ERROR: ${(e as Error).message}`);
    }
  }
}

await probe('safe', safeCohort);
await probe('risky', riskyCohort);

const total = safeCohort.length + riskyCohort.length;
console.log(`\nhealthy=${totalHealthy} drift=${totalDrift} errors=${totalErrors} of ${total}`);
console.log(`appended to ${LEDGER}`);
