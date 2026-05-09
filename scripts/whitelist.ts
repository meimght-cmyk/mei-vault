#!/usr/bin/env bun
//
// Candidate selector / whitelist generator.
//
// Reads ranked.json, applies safety thresholds, emits a whitelist of pools
// that cleared the bar. Each entry includes the rationale ("why this pool
// is approved") so a downstream strategy layer (or human) can audit the
// decision. Strategy layer never picks a pool not on this list.
//
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const RANKED_PATH = join(import.meta.dir, '..', 'audits', 'ranked.json');
const OUT_DIR = join(import.meta.dir, '..', 'whitelist');

const MAX_RISK_BPS = Number(process.env.MAX_RISK_BPS ?? 0);
const MIN_LIQUIDITY = BigInt(process.env.MIN_LIQUIDITY ?? '1000000000000000000');
const MIN_CARDINALITY = Number(process.env.MIN_CARDINALITY ?? 10);

interface Pool {
  protocol: string;
  chainId: number;
  pool: string;
  fee: number;
  riskBps: number;
  liquidity: string;
  cardinality: number;
  reasons: string[];
}

interface Ranked {
  generatedAt: string;
  protocols: { protocol: string; total: number; healthy: number; dead: number; avgBps: number; topFindings: string[] }[];
  rankedSafestFirst: Pool[];
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const ranked = JSON.parse(readFileSync(RANKED_PATH, 'utf8')) as Ranked;

const seen = new Set<string>();
const passed: (Pool & { rationale: string })[] = [];
const rejected: { pool: Pool; reason: string }[] = [];

for (const p of ranked.rankedSafestFirst) {
  const key = `${p.chainId}:${p.pool.toLowerCase()}`;
  if (seen.has(key)) continue;
  seen.add(key);

  const reasons: string[] = [];
  if (p.riskBps > MAX_RISK_BPS) reasons.push(`riskBps=${p.riskBps} > ${MAX_RISK_BPS}`);
  if (p.cardinality < MIN_CARDINALITY) reasons.push(`cardinality=${p.cardinality} < ${MIN_CARDINALITY}`);
  let liqOk = false;
  try { liqOk = BigInt(p.liquidity) >= MIN_LIQUIDITY; } catch { liqOk = false; }
  if (!liqOk) reasons.push(`liquidity=${p.liquidity} < ${MIN_LIQUIDITY.toString()}`);

  if (reasons.length === 0) {
    passed.push({
      ...p,
      rationale: `riskBps=0, cardinality=${p.cardinality} (mature TWAP), deep liquidity`,
    });
  } else {
    rejected.push({ pool: p, reason: reasons.join('; ') });
  }
}

const today = new Date().toISOString().slice(0, 10);
const outPath = join(OUT_DIR, `whitelist-${today}.json`);
const out = {
  generatedAt: new Date().toISOString(),
  thresholds: { MAX_RISK_BPS, MIN_LIQUIDITY: MIN_LIQUIDITY.toString(), MIN_CARDINALITY },
  inputAudits: ranked.protocols,
  whitelist: passed,
  rejectedSummary: {
    total: rejected.length,
    byProtocol: rejected.reduce<Record<string, number>>((acc, r) => {
      acc[r.pool.protocol] = (acc[r.pool.protocol] ?? 0) + 1;
      return acc;
    }, {}),
  },
};
writeFileSync(outPath, JSON.stringify(out, null, 2));

console.log(`# whitelist — ${out.generatedAt}`);
console.log(`thresholds: maxRiskBps=${MAX_RISK_BPS} minLiq=${MIN_LIQUIDITY.toString()} minCard=${MIN_CARDINALITY}`);
console.log(`passed=${passed.length} rejected=${rejected.length} input=${ranked.rankedSafestFirst.length}`);
console.log();

if (passed.length === 0) {
  console.log(`no pools passed — consider relaxing thresholds`);
  console.log(`rejection reasons (top 5):`);
  for (const r of rejected.slice(0, 5)) {
    console.log(`  ${r.pool.protocol} ${r.pool.pool.slice(0, 10)}… — ${r.reason}`);
  }
} else {
  console.log(`## Approved pools`);
  console.log(`| protocol | chainId | pool | fee | riskBps | liquidity | cardinality |`);
  console.log(`|---|---|---|---|---|---|---|`);
  for (const p of passed) {
    console.log(`| ${p.protocol} | ${p.chainId} | \`${p.pool}\` | ${p.fee} | ${p.riskBps} | ${p.liquidity} | ${p.cardinality} |`);
  }
}

console.log();
console.log(`wrote ${outPath}`);
