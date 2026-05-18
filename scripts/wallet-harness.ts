#!/usr/bin/env bun
//
// Bounded-delegation wallet harness (signer-less).
//
// Per handoff §7.5: "on ALLOW: route to bounded-delegation signer."
//
// For each strategy intent, simulates the signing path WITHOUT signing
// anything:
//   1. Re-check pool state via /api/score at "would-sign time"
//   2. Decide sign / no-sign against intent gates + live state
//   3. Construct a would-be-tx payload (signer-ready shape)
//   4. Log everything to <intent>.harness-result.json
//
// No keys, no wallet, no broadcast. This proves the deployment codepath
// works under real conditions for ~80 days before any capital touches it.
// Phase 4 swaps the "would_sign: bool" for a real signer + tx hash.
//
// Idempotent: skips intents that already have a harness-result file.
//
// Outputs:
//   intents/YYYY-MM-DD/<id>.harness-result.json — per-intent
//   metrics/harness.md                          — aggregated public dashboard
//   metrics/harness.json                        — machine-readable summary
//
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const INTENTS_DIR = join(import.meta.dir, '..', 'intents');
const METRICS_DIR = join(import.meta.dir, '..', 'metrics');
const SERVER = process.env.RISKCLAW_SERVER ?? 'http://localhost:4242';
const DRY_AMOUNT_IN = process.env.DRY_AMOUNT_IN ?? '1000000000000000000';
const ASSUMED_SIZE_USD = Number(process.env.HARNESS_SIZE_USD ?? 1000);
const THROTTLE_MS = Number(process.env.HARNESS_THROTTLE_MS ?? 2100);
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

interface Intent {
  id: string;
  strategy: string;
  status: string;
  createdAt: string;
  target: { protocol: string; chainId: number; pool: string; fee: number; auditRiskBps: number; liquidity: string; cardinality: number };
  position: { type: string; tickRange: string; sizeUsd: number | null };
  gates: {
    riskBps_le_threshold: { threshold: number; pass: boolean };
    cardinality_ok: { threshold: number; pass: boolean };
    liquidity_ok: { threshold: string; pass: boolean };
  };
}

interface HarnessResult {
  intent_id: string;
  intent_created_at: string;
  intent_target_pool: string;
  intent_target_protocol: string;
  harness_run_at: string;
  preflight: {
    decision: 'ALLOW' | 'WARN' | 'BLOCK' | 'ERROR' | 'PROBE';
    riskBps: number;
    reasons: string[];
    components: Record<string, unknown>;
    drift_from_intent_riskBps: number;
  };
  gate_recheck: {
    riskBps_le_threshold: { live: number; threshold: number; pass: boolean };
    decision_is_allow: { live: string; pass: boolean };
    overall_pass: boolean;
  };
  would_sign: boolean;
  sign_decision_rationale: string;
  prepared_tx: {
    protocol: string;
    chain_id: number;
    target_pool: string;
    fee: number;
    proposed_action: string;
    assumed_size_usd: number;
    would_call: string;
    notes: string;
  };
}

// scan all intents/<day>/*.json
interface Pending { intentPath: string; resultPath: string; intent: Intent; day: string }
const pending: Pending[] = [];
if (existsSync(INTENTS_DIR)) {
  for (const day of readdirSync(INTENTS_DIR)) {
    const dayPath = join(INTENTS_DIR, day);
    if (!statSync(dayPath).isDirectory()) continue;
    for (const f of readdirSync(dayPath)) {
      if (!f.endsWith('.json') || f.endsWith('.harness-result.json')) continue;
      const intentPath = join(dayPath, f);
      const resultPath = intentPath.replace(/\.json$/, '.harness-result.json');
      if (existsSync(resultPath)) continue;
      try {
        const intent = JSON.parse(readFileSync(intentPath, 'utf8')) as Intent;
        pending.push({ intentPath, resultPath, intent, day });
      } catch {}
    }
  }
}

console.log(`# wallet harness — ${new Date().toISOString()}`);
console.log(`pending intents: ${pending.length}`);

if (pending.length === 0) {
  console.log('no intents need harnessing');
  // still update aggregate dashboard
}

let signYes = 0, signNo = 0, errors = 0;

for (let i = 0; i < pending.length; i++) {
  const { intent, resultPath } = pending[i]!;
  if (i > 0) await sleep(THROTTLE_MS);
  try {
    const res = await fetch(`${SERVER}/api/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        protocol: intent.target.protocol,
        pool: intent.target.pool,
        amountIn: DRY_AMOUNT_IN,
        chainId: intent.target.chainId,
      }),
    });
    const data = await res.json() as {
      result?: { routeRiskBps: number; recommendation: string; perPool: { riskBps: number; reasons: string[]; components?: Record<string, unknown> }[] };
    };
    const liveBps = data.result?.routeRiskBps ?? -1;
    const rec = data.result?.recommendation;
    const decision = liveBps < 0 ? 'ERROR'
      : (rec === 'ALLOW' || rec === 'WARN' || rec === 'BLOCK') ? rec : 'PROBE';
    const reasons = data.result?.perPool?.[0]?.reasons ?? [];
    const components = data.result?.perPool?.[0]?.components ?? {};

    const riskThreshold = intent.gates.riskBps_le_threshold.threshold;
    const riskPass = liveBps >= 0 && liveBps <= riskThreshold;
    const decisionPass = decision === 'ALLOW';
    const overallPass = riskPass && decisionPass;

    const rationaleParts: string[] = [];
    if (!decisionPass) rationaleParts.push(`live decision=${decision} (need ALLOW)`);
    if (!riskPass) rationaleParts.push(`live riskBps=${liveBps} exceeds intent threshold ${riskThreshold}`);
    const rationale = overallPass
      ? `live state passes all intent gates — would route to bounded-delegation signer`
      : `do not sign: ${rationaleParts.join('; ')}`;

    const result: HarnessResult = {
      intent_id: intent.id,
      intent_created_at: intent.createdAt,
      intent_target_pool: intent.target.pool,
      intent_target_protocol: intent.target.protocol,
      harness_run_at: new Date().toISOString(),
      preflight: {
        decision,
        riskBps: liveBps,
        reasons,
        components,
        drift_from_intent_riskBps: liveBps - intent.target.auditRiskBps,
      },
      gate_recheck: {
        riskBps_le_threshold: { live: liveBps, threshold: riskThreshold, pass: riskPass },
        decision_is_allow: { live: decision, pass: decisionPass },
        overall_pass: overallPass,
      },
      would_sign: overallPass,
      sign_decision_rationale: rationale,
      prepared_tx: {
        protocol: intent.target.protocol,
        chain_id: intent.target.chainId,
        target_pool: intent.target.pool,
        fee: intent.target.fee,
        proposed_action: 'passive-LP mint (wide range)',
        assumed_size_usd: ASSUMED_SIZE_USD,
        would_call: `positionManager.mint(pool=${intent.target.pool}, fee=${intent.target.fee}, tickLower=MIN, tickUpper=MAX, size=$${ASSUMED_SIZE_USD})`,
        notes: 'signer-less harness — no calldata constructed, no broadcast. Phase 4 replaces this with real positionManager ABI + signer.',
      },
    };
    writeFileSync(resultPath, JSON.stringify(result, null, 2));

    if (overallPass) signYes++; else signNo++;
    console.log(`  ${intent.id}  live=${decision}/${liveBps}bps  ${overallPass ? '✓ would-sign' : '✗ would-skip'}`);
  } catch (e) {
    errors++;
    console.log(`  ${intent.id}  ERROR: ${(e as Error).message}`);
  }
}

// aggregate dashboard over ALL harness results
interface AllResult { intent_id: string; harness_run_at: string; intent_created_at: string; intent_target_pool: string; intent_target_protocol: string; would_sign: boolean; preflight: { decision: string; riskBps: number; drift_from_intent_riskBps: number } }
const allResults: AllResult[] = [];
if (existsSync(INTENTS_DIR)) {
  for (const day of readdirSync(INTENTS_DIR)) {
    const dayPath = join(INTENTS_DIR, day);
    if (!statSync(dayPath).isDirectory()) continue;
    for (const f of readdirSync(dayPath)) {
      if (!f.endsWith('.harness-result.json')) continue;
      try { allResults.push(JSON.parse(readFileSync(join(dayPath, f), 'utf8'))); } catch {}
    }
  }
}
allResults.sort((a, b) => a.harness_run_at.localeCompare(b.harness_run_at));

const totalSign = allResults.filter(r => r.would_sign).length;
const totalSkip = allResults.length - totalSign;

const summary = {
  computed_at: new Date().toISOString(),
  total_harnessed: allResults.length,
  would_sign: totalSign,
  would_skip: totalSkip,
  sign_rate: allResults.length ? totalSign / allResults.length : null,
  this_run: { pending: pending.length, sign_yes: signYes, sign_no: signNo, errors },
};
writeFileSync(join(METRICS_DIR, 'harness.json'), JSON.stringify(summary, null, 2));

const rows = allResults.slice(-30).reverse().map(r =>
  `| \`${r.intent_id}\` | ${r.intent_target_protocol} | \`${r.intent_target_pool.slice(0, 10)}…\` | ${r.preflight.decision} | ${r.preflight.riskBps} | ${r.preflight.drift_from_intent_riskBps >= 0 ? '+' : ''}${r.preflight.drift_from_intent_riskBps} | ${r.would_sign ? '✓ sign' : '✗ skip'} |`
).join('\n') || '| _no harness results yet_ | | | | | | |';

const md = `# Wallet harness

_Updated: ${summary.computed_at}_

Bounded-delegation signer simulation. For every strategy intent, the harness re-checks pool state at "would-sign time," decides sign/no-sign against intent gates, and logs the would-be transaction payload. **No keys, no wallet, no broadcast.** Phase 4 swaps the boolean for a real signer.

## Summary

- harnessed intents: **${summary.total_harnessed}**
- would-sign: **${totalSign}** · would-skip: **${totalSkip}**
- sign rate: **${summary.sign_rate === null ? 'n/a' : (summary.sign_rate * 100).toFixed(1) + '%'}**

## Recent (last 30)

| intent | protocol | pool | live decision | live riskBps | Δ from intent | harness verdict |
|---|---|---|---|---|---|---|
${rows}

## How to read this

- **live decision / riskBps** = what \`/api/score\` returns RIGHT NOW for the intent's target pool (not at intent creation time).
- **Δ from intent** = how far the pool's risk has drifted since the intent was generated. Positive = pool got riskier.
- **harness verdict**:
  - **sign**: live decision is ALLOW AND live riskBps ≤ intent's gate threshold. In production this would route to the bounded-delegation signer.
  - **skip**: at least one gate failed. Logged with rationale; signer never invoked.

## What "signer-less" means here

The harness exercises every step of the deployment codepath EXCEPT the actual signing:

✓ load intent from disk
✓ re-check pool state via riskclaw \`/api/score\`
✓ decide against intent gates + live state
✓ build the would-be-tx payload in signer-ready shape
✗ construct real calldata (Phase 4: positionManager ABI + tick math)
✗ sign with a wallet (Phase 4: bounded-delegation signer)
✗ broadcast to chain (Phase 4: \`/api/preflight-raw\` → \`realtime_sendRawTransaction\`)

Per-intent harness results live in [\`intents/YYYY-MM-DD/<id>.harness-result.json\`](../intents/).
`;

writeFileSync(join(METRICS_DIR, 'harness.md'), md);

console.log(`\nthis run: sign=${signYes} skip=${signNo} errors=${errors}`);
console.log(`total harnessed: ${allResults.length} (sign=${totalSign} skip=${totalSkip})`);
console.log(`wrote ${join(METRICS_DIR, 'harness.json')}`);
console.log(`wrote ${join(METRICS_DIR, 'harness.md')}`);
