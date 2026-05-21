#!/usr/bin/env bun
//
// V4 seed-pool audit (Mei-vault-side, no upstream code).
//
// Full Initialize-event audit on Base V4 is unworkable on free RPC —
// 10k+ pool inits per day, mostly bankr.bot launchpad noise. Most of
// those pools are irrelevant to the vault. Instead, curate the pools
// we actually care about and score each via the existing /api/score
// endpoint.
//
// Output: audits/uniswap-v4-base-mainnet.json in the same ProtocolAudit
// shape as V3 audits, so rank-pools.ts merges it naturally.
//
import { writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const SERVER = process.env.RISKCLAW_SERVER ?? 'http://localhost:4242';
const AUDITS_DIR = join(import.meta.dir, '..', 'audits');
const OUT_PATH = join(AUDITS_DIR, 'uniswap-v4-base-mainnet.json');

interface SeedPool {
  poolId: string;
  currency0: string;
  currency1: string;
  fee: number;
  tickSpacing: number;
  hooks: string;
  label: string;
}

// Seed set: the MEI pools we discovered via V4 PoolManager Initialize events
// on 2026-05-20, plus standard major-pair pools we want safety-oracle context
// on for future treasury legs. Add more here as the vault scope expands.
const MEI = '0x568bAC4E1C5A097d4B3B903b9A511534BD45eBa3';
const USDC = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

const SEEDS: SeedPool[] = [
  {
    poolId: '0x976e654f127a66cc5e6df1987e93c5e853277585ea459097a8be35b8221a028d',
    currency0: MEI,
    currency1: USDC,
    fee: 800000, tickSpacing: 16000, hooks: '0x0000000000000000000000000000000000000000',
    label: 'MEI/USDC fee=80% (bankr.bot launchpad)',
  },
  {
    poolId: '0xaab9f57442335bd75f29fa0d51bed88673e99f580cf0553a9b7602d2424a3229',
    currency0: MEI,
    currency1: USDC,
    fee: 880000, tickSpacing: 17600, hooks: '0x0000000000000000000000000000000000000000',
    label: 'MEI/USDC fee=88% (bankr.bot launchpad)',
  },
  {
    poolId: '0x09ef71f0c152ec57408714f3d017145adfb84f74ad7ed20cc99dddd61566ac16',
    // currency0 here is 0x515e72aF…, the paired token. currency1 is MEI.
    // The label "?/MEI" reflects we haven't yet identified the paired token.
    currency0: '0x515e72aF68A374C8f375534B59752277Ee9b4a51',
    currency1: MEI,
    fee: 10000, tickSpacing: 200, hooks: '0x0000000000000000000000000000000000000000',
    label: '0x515e72aF…/MEI fee=1% — likely the actual liquidity venue',
  },
];

interface ScoreResult {
  result?: {
    routeRiskBps: number;
    recommendation: string;
    perPool: {
      riskBps: number;
      reasons: string[];
      components: Record<string, unknown>;
    }[];
  };
  error?: string;
}

async function scoreSeed(p: SeedPool): Promise<{ riskBps: number; reasons: string[]; liquidity: string }> {
  const res = await fetch(`${SERVER}/api/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      protocol: 'uniswap-v4-base',
      pool: p.poolId,
      chainId: 8453,
      currency0: p.currency0,
      currency1: p.currency1,
      amountIn: '1000000000000000000',
    }),
  });
  const data = await res.json() as ScoreResult;
  if (data.error) throw new Error(data.error);
  const pp = data.result?.perPool?.[0];
  if (!pp) throw new Error('no perPool result');
  return {
    riskBps: pp.riskBps,
    reasons: pp.reasons,
    // Server doesn't expose raw liquidity (the V4 decoder reads it internally
    // but doesn't pass it through). For now, mark unknown — backfill's
    // liquidity-drop signal can be computed from successive probe snapshots
    // once the decoder exposes liquidity in components.
    liquidity: 'unknown',
  };
}

console.log(`# V4 seed audit — ${new Date().toISOString()}`);
console.log(`server=${SERVER}  seeds=${SEEDS.length}`);

const perPool: any[] = [];
const tokenSet = new Set<string>();
let totalScore = 0;
let healthy = 0;
let dead = 0;

for (let i = 0; i < SEEDS.length; i++) {
  const p = SEEDS[i]!;
  tokenSet.add(p.currency0);
  tokenSet.add(p.currency1);
  try {
    const s = await scoreSeed(p);
    totalScore += s.riskBps;
    if (s.riskBps === 0) healthy++;
    perPool.push({
      pool: p.poolId,
      fee: p.fee,
      tickSpacing: p.tickSpacing,
      riskBps: s.riskBps,
      reasons: s.reasons,
      liquidity: s.liquidity,
      cardinality: 0, // V4 has no native oracle cardinality
      blockCreated: 0, // unknown without an Initialize-event lookup; placeholder
      currency0: p.currency0,
      currency1: p.currency1,
      hooks: p.hooks,
    });
    console.log(`  ${p.label.slice(0, 50).padEnd(50)} riskBps=${s.riskBps} reasons=${s.reasons.join('; ').slice(0, 60)}`);
  } catch (e) {
    perPool.push({
      pool: p.poolId,
      fee: p.fee,
      tickSpacing: p.tickSpacing,
      riskBps: -1,
      reasons: [`SCORE FAILED: ${(e as Error).message}`],
      liquidity: '0',
      cardinality: 0,
      blockCreated: 0,
      currency0: p.currency0,
      currency1: p.currency1,
      hooks: p.hooks,
    });
    console.log(`  ${p.label.slice(0, 50).padEnd(50)} ERR: ${(e as Error).message}`);
  }
}

const total = perPool.length;
const feeDist = new Map<number, number>();
for (const p of perPool) feeDist.set(p.fee, (feeDist.get(p.fee) ?? 0) + 1);

const findings: any[] = [];
const highFee = perPool.filter(p => p.fee >= 50_000).length;
if (highFee > 0) {
  findings.push({
    severity: 'medium', id: 'V4-2',
    title: `${highFee} pool(s) have lpFee ≥ 5%`,
    detail: 'Unusually high static fees — typical of bankr.bot launchpad-default configs.',
  });
}

const out = {
  protocol: 'uniswap-v4-base',
  chainId: 8453,
  scannedAt: new Date().toISOString(),
  blockHeight: 0, // not captured for seed audits
  setup: {
    factory: '0x498581fF718922c3f8e6A244956aF099B2652b2b', // PoolManager
    factoryOwner: null,
    factoryOwnerKind: 'unknown' as const,
    positionManager: '0x7C5f5A4bBd8fD63184577525326123B519429bDc',
    universalRouter: '0x6fF5693b99212Da76ad316178A184AB56D299b43',
    feeTiers: [],
  },
  pools: {
    total,
    feeDistribution: [...feeDist.entries()].sort().map(([fee, count]) => ({ fee, count })),
    averageRiskBps: total > 0 ? Math.round(totalScore / total) : 0,
    healthyCount: healthy,
    deadCount: dead,
    perPool,
  },
  tokens: { unique: tokenSet.size, survey: [] },
  findings,
};

writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));
console.log(`\nwrote ${OUT_PATH}`);
console.log(`pools=${total} healthy=${healthy} avgRisk=${out.pools.averageRiskBps}`);
