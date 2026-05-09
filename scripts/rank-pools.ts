#!/usr/bin/env bun
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

interface PoolEntry {
  pool: string;
  fee: number;
  tickSpacing: number;
  riskBps: number;
  reasons: string[];
  liquidity: string;
  cardinality: number;
  blockCreated: number;
}

interface Audit {
  protocol: string;
  chainId: number;
  scannedAt: string;
  blockHeight: number;
  pools: { total: number; averageRiskBps: number; healthyCount: number; deadCount: number; perPool: PoolEntry[] };
  findings: { severity: string; id: string; title: string; detail: string }[];
}

const AUDITS_DIR = join(import.meta.dir, '..', 'audits');
const files = readdirSync(AUDITS_DIR).filter(f => f.endsWith('-mainnet.json') || f.endsWith('-testnet.json'));

interface Ranked extends PoolEntry { protocol: string; chainId: number }
const all: Ranked[] = [];
const summaries: { protocol: string; total: number; healthy: number; dead: number; avgBps: number; topFindings: string[] }[] = [];

for (const f of files) {
  const path = join(AUDITS_DIR, f);
  const raw = readFileSync(path, 'utf8').trim();
  if (!raw) { console.warn(`skip empty: ${f}`); continue; }
  let audit: Audit;
  try { audit = JSON.parse(raw); } catch (e) { console.warn(`skip unparseable ${f}: ${(e as Error).message}`); continue; }
  for (const p of audit.pools.perPool) {
    if (p.riskBps < 0) continue;
    all.push({ ...p, protocol: audit.protocol, chainId: audit.chainId });
  }
  summaries.push({
    protocol: audit.protocol,
    total: audit.pools.total,
    healthy: audit.pools.healthyCount,
    dead: audit.pools.deadCount,
    avgBps: audit.pools.averageRiskBps,
    topFindings: audit.findings.filter(x => x.severity === 'high' || x.severity === 'medium').map(x => `[${x.severity}] ${x.id} ${x.title}`),
  });
}

all.sort((a, b) => a.riskBps - b.riskBps);

const out = {
  generatedAt: new Date().toISOString(),
  protocols: summaries,
  rankedSafestFirst: all,
};

const outPath = join(AUDITS_DIR, 'ranked.json');
writeFileSync(outPath, JSON.stringify(out, null, 2));

console.log(`# Pool ranking — ${out.generatedAt}\n`);
for (const s of summaries) {
  console.log(`## ${s.protocol}`);
  console.log(`pools=${s.total} healthy=${s.healthy} dead=${s.dead} avgRiskBps=${s.avgBps}`);
  if (s.topFindings.length) {
    console.log(`findings:`);
    for (const f of s.topFindings) console.log(`  - ${f}`);
  }
  console.log();
}

console.log(`## Top 10 safest pools (ascending riskBps)`);
console.log(`| protocol | pool | fee | riskBps | liquidity | cardinality | reasons |`);
console.log(`|---|---|---|---|---|---|---|`);
for (const p of all.slice(0, 10)) {
  const reasons = p.reasons.length ? p.reasons.join('; ') : '—';
  console.log(`| ${p.protocol} | ${p.pool.slice(0, 10)}… | ${p.fee} | ${p.riskBps} | ${p.liquidity} | ${p.cardinality} | ${reasons} |`);
}

console.log(`\nWrote ${outPath} (${all.length} pools)`);
