#!/usr/bin/env bun
//
// Strategy: passive LP into highest-scoring Kumbaya pool.
//
// Per handoff §7.5: "Pick one strategy: passive LP into highest-scoring
// Kumbaya pool, threshold riskBps ≤ 2000."
//
// This module produces a *dry-run intent* — a structured JSON describing
// what the strategy would propose. It does NOT sign, broadcast, or move
// capital. The intent is appended to the decisions ledger and saved as a
// standalone JSON for human review.
//
// Phase 1 contract: dry-run only. Phase 3+ wires this into a real signer
// that calls /api/preflight-raw with concrete calldata before broadcast.
//
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const RANKED_PATH = join(import.meta.dir, '..', 'audits', 'ranked.json');
const INTENTS_DIR = join(import.meta.dir, '..', 'intents');
const LEDGER_DIR = join(import.meta.dir, '..', 'ledger');

const STRATEGY_NAME = 'passive-lp-kumbaya';
const TARGET_PROTOCOL = 'kumbaya';
const MAX_RISK_BPS = Number(process.env.STRATEGY_MAX_RISK_BPS ?? 2000);
const MIN_LIQUIDITY = BigInt(process.env.STRATEGY_MIN_LIQ ?? '1000000000000000000');
const MIN_CARDINALITY = Number(process.env.STRATEGY_MIN_CARD ?? 10);
const TARGET_CHAIN = Number(process.env.STRATEGY_CHAIN_ID ?? 4326);
const TOP_N = Number(process.env.STRATEGY_TOP_N ?? 3);

interface Pool {
  protocol: string; chainId: number; pool: string; fee: number;
  riskBps: number; liquidity: string; cardinality: number; reasons: string[];
}
interface Ranked { rankedSafestFirst: Pool[] }

if (!existsSync(INTENTS_DIR)) mkdirSync(INTENTS_DIR, { recursive: true });
if (!existsSync(LEDGER_DIR)) mkdirSync(LEDGER_DIR, { recursive: true });

const ranked = JSON.parse(readFileSync(RANKED_PATH, 'utf8')) as Ranked;
const eligible = ranked.rankedSafestFirst
  .filter(p => p.protocol === TARGET_PROTOCOL)
  .filter(p => p.chainId === TARGET_CHAIN)
  .filter(p => p.riskBps <= MAX_RISK_BPS)
  .filter(p => p.cardinality >= MIN_CARDINALITY)
  .filter(p => { try { return BigInt(p.liquidity) >= MIN_LIQUIDITY; } catch { return false; } });

console.log(`# strategy ${STRATEGY_NAME}`);
console.log(`gates: protocol=${TARGET_PROTOCOL} chainId=${TARGET_CHAIN} maxRiskBps=${MAX_RISK_BPS} minLiq=${MIN_LIQUIDITY.toString()} minCard=${MIN_CARDINALITY}`);
console.log(`eligible pools: ${eligible.length}`);

if (!eligible.length) {
  const today = new Date().toISOString().slice(0, 10);
  appendFileSync(join(LEDGER_DIR, `decisions-${today}.jsonl`), JSON.stringify({
    ts: new Date().toISOString(),
    strategy: STRATEGY_NAME,
    decision: 'NO_CANDIDATE',
    riskBps: -1,
    action_taken: 'skipped',
    outcome_7d: null, outcome_30d: null,
    notes: `no pools matched gates (maxRiskBps=${MAX_RISK_BPS}, minCard=${MIN_CARDINALITY}, minLiq=${MIN_LIQUIDITY.toString()})`,
  }) + '\n');
  console.log('no candidate found — logged as skipped');
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
const intentDir = join(INTENTS_DIR, today);
if (!existsSync(intentDir)) mkdirSync(intentDir, { recursive: true });

// idempotency: if today already has any intent for this strategy, skip.
// (filter out .harness-result.json sidecars so the count is honest)
const existingForToday = readdirSync(intentDir)
  .filter(f => f.startsWith(STRATEGY_NAME) && f.endsWith('.json') && !f.endsWith('.harness-result.json'));
if (existingForToday.length > 0) {
  console.log(`today already has ${existingForToday.length} intent(s) for ${STRATEGY_NAME}, skipping`);
  process.exit(0);
}

const targets = eligible.slice(0, TOP_N);
console.log(`picking top-${TOP_N}: ${targets.length} target(s) from ${eligible.length} eligible`);

const ledgerPath = join(LEDGER_DIR, `decisions-${today}.jsonl`);
const writtenPaths: string[] = [];

for (let i = 0; i < targets.length; i++) {
  const target = targets[i]!;
  const intentId = `${STRATEGY_NAME}-${today}-${String(i + 1).padStart(3, '0')}`;
  const intent = {
    id: intentId,
    strategy: STRATEGY_NAME,
    status: 'dry-run',
    createdAt: new Date().toISOString(),
    rank: i + 1,
    target: {
      protocol: target.protocol,
      chainId: target.chainId,
      pool: target.pool,
      fee: target.fee,
      auditRiskBps: target.riskBps,
      liquidity: target.liquidity,
      cardinality: target.cardinality,
    },
    position: {
      type: 'passive-lp',
      tickRange: 'wide',
      sizeUsd: null,
      notes: 'sizing deferred to capital allocator (Phase 3+)',
    },
    gates: {
      protocol_match: target.protocol === TARGET_PROTOCOL,
      chain_match: target.chainId === TARGET_CHAIN,
      riskBps_le_threshold: { value: target.riskBps, threshold: MAX_RISK_BPS, pass: target.riskBps <= MAX_RISK_BPS },
      cardinality_ok: { value: target.cardinality, threshold: MIN_CARDINALITY, pass: target.cardinality >= MIN_CARDINALITY },
      liquidity_ok: { value: target.liquidity, threshold: MIN_LIQUIDITY.toString(), pass: BigInt(target.liquidity) >= MIN_LIQUIDITY },
    },
    rationale: `rank-${i + 1} ${TARGET_PROTOCOL} pool on chain ${TARGET_CHAIN}: riskBps=${target.riskBps}, liquidity=${target.liquidity}, cardinality=${target.cardinality}. Selected from ${eligible.length} eligible candidate(s) under handoff §7.5 strategy, top-${TOP_N} diversification.`,
    next_steps: [
      'wallet harness: re-check pool state at would-sign time',
      'on harness ALLOW: route to bounded-delegation signer (Phase 4+)',
      'on harness WARN/BLOCK: do not sign, log full reasons',
    ],
  };

  const intentPath = join(intentDir, `${intentId}.json`);
  writeFileSync(intentPath, JSON.stringify(intent, null, 2));
  writtenPaths.push(intentPath);

  appendFileSync(ledgerPath, JSON.stringify({
    ts: intent.createdAt,
    strategy: STRATEGY_NAME,
    intentId,
    rank: i + 1,
    protocol: target.protocol,
    chainId: target.chainId,
    pool: target.pool,
    decision: 'ALLOW',
    riskBps: target.riskBps,
    action_taken: 'proposed',
    outcome_7d: null,
    outcome_30d: null,
    notes: `dry-run intent (rank ${i + 1}/${TOP_N}) — see ${intentPath}`,
  }) + '\n');

  console.log(`  rank ${i + 1}: ${target.pool}  fee=${target.fee} riskBps=${target.riskBps}`);
}

console.log(`\nwrote ${writtenPaths.length} intent(s) to ${intentDir}`);
console.log(`decisions ledger:  ${ledgerPath}`);
