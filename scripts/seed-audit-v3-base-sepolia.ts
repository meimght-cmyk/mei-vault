#!/usr/bin/env bun
//
// V3 Base Sepolia seed-pool audit.
//
// Seeds the 4 WETH/USDC pools discovered on Base Sepolia (one per V3 fee
// tier). Scores each via /api/score and writes ProtocolAudit JSON in the
// same shape as the mainnet audit so rank-pools.ts merges it naturally.
//
// Output: audits/uniswap-v3-base-testnet.json (rank-pools globs *-testnet.json)
//
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SERVER = process.env.RISKCLAW_SERVER ?? 'http://localhost:4242';
const AUDITS_DIR = join(import.meta.dir, '..', 'audits');
const OUT_PATH = join(AUDITS_DIR, 'uniswap-v3-base-testnet.json');

interface SeedPool {
  pool: string;
  fee: number;
  tickSpacing: number;
  label: string;
}

// WETH/USDC pools on Uniswap V3 Base Sepolia — verified on-chain 2026-05-22
// via factory.getPool(WETH, USDC, fee) for each standard fee tier.
const WETH = '0x4200000000000000000000000000000000000006';
const USDC = '0x036CbD53842c5426634e7929541eC2318f3dCF7e'; // Circle USDC on Base Sepolia

const SEEDS: SeedPool[] = [
  { pool: '0x57183717A087d2fe3Ad890873877244c3B96156c', fee: 100,   tickSpacing: 1,   label: 'WETH/USDC 0.01%' },
  { pool: '0x94bfc0574FF48E92cE43d495376C477B1d0EEeC0', fee: 500,   tickSpacing: 10,  label: 'WETH/USDC 0.05%' },
  { pool: '0x46880b404CD35c165EDdefF7421019F8dD25F4Ad', fee: 3000,  tickSpacing: 60,  label: 'WETH/USDC 0.30%' },
  { pool: '0x4664755562152EDDa3a3073850FB62835451926a', fee: 10000, tickSpacing: 200, label: 'WETH/USDC 1.00%' },
];

interface ScoreResult {
  result?: {
    routeRiskBps: number;
    recommendation: string;
    perPool: { riskBps: number; reasons: string[]; components: Record<string, unknown> }[];
  };
  error?: string;
}

async function scoreSeed(p: SeedPool): Promise<{ riskBps: number; reasons: string[]; components: Record<string, unknown> }> {
  const res = await fetch(`${SERVER}/api/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      protocol: 'uniswap-v3-base',
      pool: p.pool,
      chainId: 84532,
      amountIn: '1000000000000000000',
    }),
  });
  const data = await res.json() as ScoreResult;
  if (data.error) throw new Error(data.error);
  const pp = data.result?.perPool?.[0];
  if (!pp) throw new Error('no perPool result');
  return { riskBps: pp.riskBps, reasons: pp.reasons, components: pp.components };
}

console.log(`# V3 Base Sepolia seed audit — ${new Date().toISOString()}`);
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
      fee: p.fee,
      tickSpacing: p.tickSpacing,
      riskBps: s.riskBps,
      reasons: s.reasons,
      liquidity: 'unknown', // not exposed via /api/score; backfill detects drops via riskBps_jump
      cardinality: (s.components as any).oracleHealthBps != null ? Math.floor(((s.components as any).oracleHealthBps as number) / 1000) : 0,
      blockCreated: 0,
    });
    console.log(`  ${p.label.padEnd(20)}  riskBps=${s.riskBps}  reasons=${s.reasons.join('; ').slice(0, 60)}`);
  } catch (e) {
    perPool.push({
      pool: p.pool,
      fee: p.fee,
      tickSpacing: p.tickSpacing,
      riskBps: -1,
      reasons: [`SCORE FAILED: ${(e as Error).message}`],
      liquidity: '0',
      cardinality: 0,
      blockCreated: 0,
    });
    console.log(`  ${p.label.padEnd(20)}  ERR: ${(e as Error).message}`);
  }
}

const total = perPool.length;
const feeDist = new Map<number, number>();
for (const p of perPool) feeDist.set(p.fee, (feeDist.get(p.fee) ?? 0) + 1);

const out = {
  protocol: 'uniswap-v3-base',
  chainId: 84532,
  scannedAt: new Date().toISOString(),
  blockHeight: 0,
  setup: {
    factory: '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24',
    factoryOwner: null,
    factoryOwnerKind: 'unknown' as const,
    positionManager: '0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2',
    universalRouter: '0x492E6456D9528771018DeB9E87ef7750EF184104',
    feeTiers: [
      { fee: 100, tickSpacing: 1, enabled: true },
      { fee: 500, tickSpacing: 10, enabled: true },
      { fee: 3000, tickSpacing: 60, enabled: true },
      { fee: 10000, tickSpacing: 200, enabled: true },
    ],
  },
  pools: {
    total,
    feeDistribution: [...feeDist.entries()].sort().map(([fee, count]) => ({ fee, count })),
    averageRiskBps: total > 0 ? Math.round(totalScore / total) : 0,
    healthyCount: healthy,
    deadCount: dead,
    perPool,
  },
  tokens: { unique: 2, survey: [] },
  findings: [],
};

writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));
console.log(`\nwrote ${OUT_PATH}`);
console.log(`pools=${total} healthy=${healthy} dead=${dead} avgRisk=${out.pools.averageRiskBps}`);
