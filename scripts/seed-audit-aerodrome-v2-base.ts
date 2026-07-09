#!/usr/bin/env bun
//
// Aerodrome v2 (volatile AMM) Base mainnet seed-pool audit.
//
// Aerodrome v2 pools are UniswapV2-style (getReserves, token0/token1, stable
// flag) — riskclaw decodes them under protocol `aerodrome-v2-base`. This seeds
// the canonical blue-chip volatile pools, scores each via /api/score, and
// writes a ProtocolAudit JSON in the same shape as the Uniswap audits so
// rank-pools.ts (globs *-mainnet.json) merges it naturally.
//
// Pool addresses are resolved DETERMINISTICALLY from the PoolFactory via
// getPool(tokenA, tokenB, stable) — not copied from research notes (which
// have carried hallucinated addresses). Verified on-chain 2026-07-09.
//
// Output: audits/aerodrome-v2-base-mainnet.json  (rank-pools merges it)
//
// Env:
//   RISKCLAW_SERVER   riskclaw daemon base URL (default http://localhost:4242)
//
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SERVER = process.env.RISKCLAW_SERVER ?? 'http://localhost:4242';
const AUDITS_DIR = join(import.meta.dir, '..', 'audits');
const OUT_PATH = join(AUDITS_DIR, 'aerodrome-v2-base-mainnet.json');

const CHAIN_ID = 8453; // Base mainnet
const AMOUNT_IN = '1000000000000000000'; // 1e18, matches the v3 seed audit

// Aerodrome v2 (Base) core contracts — verified on-chain 2026-07-09.
//   factory codesize > 0, router codesize = 23581.
const FACTORY = '0x420DD381b31aEf6683db6B902084cB0FFECe40Da';
const ROUTER = '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43';

interface SeedPool {
  pool: string;
  stable: boolean;
  label: string;
}

// Blue-chip volatile pools resolved via factory.getPool(a, b, false).
// WETH/USDC scored ALLOW live during scoping; the rest resolved from the
// same factory getter. riskclaw flags dead/low-liquidity pools via riskBps.
const SEEDS: SeedPool[] = [
  { pool: '0xcDAC0d6c6C59727a65F871236188350531885C43', stable: false, label: 'WETH/USDC vol' },
  { pool: '0x6cDcb1C4A4D1C3C6d054b27AC5B77e89eAFb971d', stable: false, label: 'USDC/AERO vol' },
  { pool: '0x7f670f78B17dEC44d5Ef68a48740b6f8849cc2e6', stable: false, label: 'WETH/AERO vol' },
  { pool: '0x2578365B3dfA7FfE60108e181EFb79FeDdec2319', stable: false, label: 'WETH/cbBTC vol' },
  { pool: '0x9c38b55f9A9Aba91BbCEDEb12bf4428f47A6a0B8', stable: false, label: 'USDC/cbBTC vol' },
];

interface ScoreResult {
  result?: {
    routeRiskBps: number;
    recommendation: string;
    perPool: { riskBps: number; reasons: string[]; components: Record<string, unknown> }[];
  };
  error?: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// riskclaw's Base RPC (Alchemy) intermittently returns "RPC Request failed"
// under rate limits — retry transient failures with backoff. Deterministic
// errors (unsupported protocol, bad pool) fail fast.
async function scoreSeed(
  p: SeedPool,
): Promise<{ riskBps: number; reasons: string[]; components: Record<string, unknown> }> {
  const RETRIES = 7;
  let lastErr = 'unknown';
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    let data: ScoreResult;
    try {
      const res = await fetch(`${SERVER}/api/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          protocol: 'aerodrome-v2-base',
          pool: p.pool,
          chainId: CHAIN_ID,
          amountIn: AMOUNT_IN,
        }),
      });
      data = (await res.json()) as ScoreResult;
    } catch (e) {
      lastErr = `fetch failed: ${(e as Error).message}`;
      await sleep(500 * attempt);
      continue;
    }
    const pp = data.result?.perPool?.[0];
    if (pp) return { riskBps: pp.riskBps, reasons: pp.reasons, components: pp.components };
    lastErr = data.error ?? 'no perPool result';
    // Only retry transient RPC failures; fail fast on deterministic errors.
    if (!/RPC Request failed|timeout|ETIMEDOUT|ECONNRESET/i.test(lastErr)) break;
    await sleep(800 * attempt);
  }
  throw new Error(lastErr);
}

console.log(`# Aerodrome v2 Base mainnet seed audit — ${new Date().toISOString()}`);
console.log(`server=${SERVER}  seeds=${SEEDS.length}`);

const perPool: any[] = [];
let totalScore = 0;
let healthy = 0;
let dead = 0;

for (const p of SEEDS) {
  try {
    const s = await scoreSeed(p);
    totalScore += s.riskBps;
    if (s.riskBps === 0) healthy++;
    if ((s.components as any).inactiveLiquidity === true) dead++;
    perPool.push({
      pool: p.pool,
      fee: 0, // Aerodrome v2 has no UniV3-style fee tiers (stable/volatile)
      tickSpacing: 0,
      stable: p.stable,
      riskBps: s.riskBps,
      reasons: s.reasons,
      liquidity: 'unknown', // not exposed via /api/score; backfill detects drops via riskBps_jump
      cardinality: 0,
      blockCreated: 0,
    });
    console.log(`  ${p.label.padEnd(16)}  riskBps=${s.riskBps}  reasons=${s.reasons.join('; ').slice(0, 60)}`);
  } catch (e) {
    perPool.push({
      pool: p.pool,
      fee: 0,
      tickSpacing: 0,
      stable: p.stable,
      riskBps: -1,
      reasons: [`SCORE FAILED: ${(e as Error).message}`],
      liquidity: '0',
      cardinality: 0,
      blockCreated: 0,
    });
    console.log(`  ${p.label.padEnd(16)}  ERR: ${(e as Error).message}`);
  }
  await sleep(400); // gentle pacing to avoid riskclaw RPC rate limits
}

const scored = perPool.filter((p) => p.riskBps >= 0);
const total = perPool.length;

const out = {
  protocol: 'aerodrome-v2-base',
  chainId: CHAIN_ID,
  scannedAt: new Date().toISOString(),
  blockHeight: 0,
  setup: {
    factory: FACTORY,
    factoryOwner: null,
    factoryOwnerKind: 'unknown' as const,
    router: ROUTER,
    poolKind: 'uniswap-v2-style (stable/volatile)',
  },
  pools: {
    total,
    feeDistribution: [{ fee: 0, count: total }],
    averageRiskBps: scored.length > 0 ? Math.round(totalScore / scored.length) : 0,
    healthyCount: healthy,
    deadCount: dead,
    perPool,
  },
  tokens: { unique: 0, survey: [] },
  findings: [] as { severity: string; id: string; title: string; detail: string }[],
};

writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));
console.log(`\nwrote ${OUT_PATH}`);
console.log(`pools=${total} scored=${scored.length} healthy=${healthy} dead=${dead} avgRisk=${out.pools.averageRiskBps}`);
