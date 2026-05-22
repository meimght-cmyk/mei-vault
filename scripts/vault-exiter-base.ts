#!/usr/bin/env bun
//
// Polling vault-exiter (Phase 3, signer-less).
//
// Watches all positions the wallet harness flagged would_sign=true and polls
// /api/score for each at cron cadence. Detects degradation transitions and
// emits an exit_event with a would-be-tx payload. No signing, no broadcast —
// Phase 4 swaps the bool for a real bounded-delegation signer.
//
// Run from launchd (60s cadence). Idempotent: state cached in
// ledger/exit-state.json, transitions only fire once.
//
// Transition rules (any one fires an exit_event with reason):
//   - decision flips from ALLOW to WARN or BLOCK
//   - decision becomes ERROR (pool unreachable / state corrupt)
//   - live riskBps - entry riskBps >= 3000 (severe degradation)
//
// Outputs:
//   ledger/exit-events.jsonl    — append-only event stream
//   ledger/exit-state.json      — per-position cache (last decision/riskBps)
//   metrics/vault-exiter.md     — public dashboard
//   metrics/vault-exiter.json   — machine-readable summary
//
import { readdirSync, readFileSync, writeFileSync, appendFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SERVER = process.env.RISKCLAW_SERVER ?? 'http://localhost:4242';
const INTENTS_DIR = join(import.meta.dir, '..', 'intents');
const LEDGER_DIR = join(import.meta.dir, '..', 'ledger');
const METRICS_DIR = join(import.meta.dir, '..', 'metrics');
const EVENTS_PATH = join(LEDGER_DIR, 'exit-events.jsonl');
const STATE_PATH = join(LEDGER_DIR, 'exit-state.json');
const EXIT_SIGN_REQUESTS_DIR = join(LEDGER_DIR, 'exit-sign-requests');
const RISK_JUMP_THRESHOLD = Number(process.env.EXITER_RISK_JUMP_BPS ?? 3000);
const THROTTLE_MS = Number(process.env.EXITER_THROTTLE_MS ?? 500);
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// Set both once the vault is deployed. When either is unset, exit
// sign-requests are skipped — exit events still fire and land in the ledger,
// only the on-chain emission step is deferred. The chainId guard prevents
// emission for positions on a different chain than the deployed vault.
const VAULT_ADDRESS = process.env.MEI_VAULT_ADDRESS as `0x${string}` | undefined;
const VAULT_CHAIN_ID = process.env.MEI_VAULT_CHAIN_ID ? Number(process.env.MEI_VAULT_CHAIN_ID) : undefined;

// Per-(protocol, chainId) → PositionManager address. Mirror of the table in
// wallet-harness.ts. Exit calls decreaseLiquidity / burn on these.
const POSITION_MANAGERS: Record<string, `0x${string}`> = {
  // Base mainnet (8453)
  'uniswap-v3-base:8453':  '0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1',
  'uniswap-v4-base:8453':  '0x7C5f5A4bBd8fD63184577525326123B519429bDc',
  // Base Sepolia (84532) — verified on-chain 2026-05-21
  'uniswap-v3-base:84532': '0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2',
  'uniswap-v4-base:84532': '0x4B2C77d209D3405F41a037Ec6c77F7F5b8e2ca80',
  // MegaETH
  'kumbaya:4326':          '0x2b781C57e6358f64864Ff8EC464a03Fdaf9974bA',
  'kumbaya:6343':          '0x367f9db1F974eA241ba046b77B87C58e2947d8dF',
  'prism:4326':            '0xcb91c75a6b29700756d4411495be696c4e9a576e',
};

function positionManagerFor(protocol: string, chainId: number): `0x${string}` | null {
  return POSITION_MANAGERS[`${protocol}:${chainId}`] ?? null;
}

if (!existsSync(LEDGER_DIR)) mkdirSync(LEDGER_DIR, { recursive: true });
if (!existsSync(METRICS_DIR)) mkdirSync(METRICS_DIR, { recursive: true });
if (!existsSync(EXIT_SIGN_REQUESTS_DIR)) mkdirSync(EXIT_SIGN_REQUESTS_DIR, { recursive: true });

interface HarnessResult {
  intent_id: string;
  intent_created_at: string;
  intent_target_pool: string;
  intent_target_protocol: string;
  would_sign: boolean;
  preflight: { decision: string; riskBps: number };
}

interface Intent {
  id: string;
  target: { protocol: string; chainId: number; pool: string; fee: number };
}

interface Position {
  intent_id: string;
  protocol: string;
  chainId: number;
  pool: string;
  fee: number;
  currency0?: string;
  currency1?: string;
  entry_decision: string;
  entry_riskBps: number;
  entry_created_at: string;
}

interface PositionState {
  intent_id: string;
  last_decision: string;
  last_riskBps: number;
  last_polled_at: string;
  status: 'OPEN' | 'EXITED';
}

// 1) Gather positions: all harness-confirmed (would_sign=true) intents that
//    haven't already exited.
const exitedIds = new Set<string>();
let stateCache: Record<string, PositionState> = {};
if (existsSync(STATE_PATH)) {
  try {
    stateCache = JSON.parse(readFileSync(STATE_PATH, 'utf8')) as Record<string, PositionState>;
    for (const [id, s] of Object.entries(stateCache)) {
      if (s.status === 'EXITED') exitedIds.add(id);
    }
  } catch { /* fresh start */ }
}

const positions: Position[] = [];
if (existsSync(INTENTS_DIR)) {
  for (const day of readdirSync(INTENTS_DIR)) {
    const dayPath = join(INTENTS_DIR, day);
    if (!statSync(dayPath).isDirectory()) continue;
    for (const f of readdirSync(dayPath)) {
      if (!f.endsWith('.harness-result.json')) continue;
      try {
        const r = JSON.parse(readFileSync(join(dayPath, f), 'utf8')) as HarnessResult;
        if (!r.would_sign) continue;
        if (exitedIds.has(r.intent_id)) continue;
        // also need intent file for protocol/chainId/currencies
        const intentFile = f.replace('.harness-result.json', '.json');
        const intentPath = join(dayPath, intentFile);
        if (!existsSync(intentPath)) continue;
        const intent = JSON.parse(readFileSync(intentPath, 'utf8')) as Intent & { target: { auditRiskBps: number; currency0?: string; currency1?: string } };
        positions.push({
          intent_id: r.intent_id,
          protocol: intent.target.protocol,
          chainId: intent.target.chainId,
          pool: intent.target.pool,
          fee: intent.target.fee,
          currency0: intent.target.currency0,
          currency1: intent.target.currency1,
          entry_decision: r.preflight.decision,
          entry_riskBps: r.preflight.riskBps,
          entry_created_at: r.intent_created_at,
        });
      } catch {}
    }
  }
}

console.log(`# vault-exiter — ${new Date().toISOString()}`);
console.log(`server=${SERVER}  open positions=${positions.length}  already exited=${exitedIds.size}`);

if (positions.length === 0) {
  console.log('no open positions to watch — dashboard refresh only');
}

// 2) Poll each position, compare to cached state, fire exit_event on transition.
interface ExitEvent {
  ts: string;
  intent_id: string;
  protocol: string;
  chainId: number;
  pool: string;
  entry_decision: string;
  entry_riskBps: number;
  current_decision: string;
  current_riskBps: number;
  drift_bps: number;
  trigger: 'allow_to_warn' | 'allow_to_block' | 'became_error' | 'risk_jump';
  reasons: string[];
  would_call: string;
  notes: string;
}

let triggered = 0;
let polled = 0;
let errors = 0;

for (let i = 0; i < positions.length; i++) {
  const p = positions[i]!;
  if (i > 0) await sleep(THROTTLE_MS);
  try {
    const reqBody: Record<string, unknown> = {
      protocol: p.protocol,
      pool: p.pool,
      amountIn: '1000000000000000000',
      chainId: p.chainId,
    };
    if (p.protocol === 'uniswap-v4-base' && p.currency0 && p.currency1) {
      reqBody.currency0 = p.currency0;
      reqBody.currency1 = p.currency1;
    }
    const res = await fetch(`${SERVER}/api/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody),
    });
    const data = await res.json() as {
      result?: { routeRiskBps: number; recommendation: string; perPool: { reasons: string[] }[] };
      error?: string;
    };
    const liveBps = data.result?.routeRiskBps ?? -1;
    const rec = data.result?.recommendation;
    const decision = liveBps < 0 ? 'ERROR' : (rec ?? 'PROBE');
    const reasons = data.result?.perPool?.[0]?.reasons ?? [];
    polled++;

    // transition detection
    let trigger: ExitEvent['trigger'] | null = null;
    const drift = liveBps - p.entry_riskBps;
    if (decision === 'ERROR' && p.entry_decision !== 'ERROR') {
      trigger = 'became_error';
    } else if (p.entry_decision === 'ALLOW' && decision === 'BLOCK') {
      trigger = 'allow_to_block';
    } else if (p.entry_decision === 'ALLOW' && decision === 'WARN') {
      trigger = 'allow_to_warn';
    } else if (drift >= RISK_JUMP_THRESHOLD) {
      trigger = 'risk_jump';
    }

    if (trigger) {
      const event: ExitEvent = {
        ts: new Date().toISOString(),
        intent_id: p.intent_id,
        protocol: p.protocol,
        chainId: p.chainId,
        pool: p.pool,
        entry_decision: p.entry_decision,
        entry_riskBps: p.entry_riskBps,
        current_decision: decision,
        current_riskBps: liveBps,
        drift_bps: drift,
        trigger,
        reasons,
        would_call: `positionManager.decreaseLiquidity(pool=${p.pool.slice(0, 16)}…, all)`,
        notes: 'signer-less guardian — Phase 4 swaps this for a real bounded-delegation withdraw',
      };
      appendFileSync(EVENTS_PATH, JSON.stringify(event) + '\n');
      stateCache[p.intent_id] = {
        intent_id: p.intent_id,
        last_decision: decision,
        last_riskBps: liveBps,
        last_polled_at: event.ts,
        status: 'EXITED',
      };

      // Emit an exit sign-request next to the event. Same chainId-guard
      // pattern as the harness. data="0x" is a placeholder — operator
      // constructs real positionManager.decreaseLiquidity calldata before
      // signing.
      if (VAULT_ADDRESS && VAULT_CHAIN_ID === p.chainId) {
        const pm = positionManagerFor(p.protocol, p.chainId);
        if (pm) {
          const signRequest = {
            vault: VAULT_ADDRESS,
            target: pm,
            value: '0',
            data: '0x',
            intent_id: p.intent_id,
            source: 'vault-exiter',
            chainId: p.chainId,
            attestation: {
              pool: p.pool,
              riskBps: liveBps,
              decision,
              ts: event.ts,
            },
            _pending_calldata_construction: {
              action: `${p.protocol} positionManager.decreaseLiquidity (full exit)`,
              pool: p.pool,
              trigger,
              note: 'Construct real positionManager.decreaseLiquidity calldata for full position exit, replace the `data` field, and remove this `_pending_calldata_construction` key before invoking signer-cli sign.',
            },
          };
          const signRequestPath = join(EXIT_SIGN_REQUESTS_DIR, `${p.intent_id}.exit-sign-request.json`);
          writeFileSync(signRequestPath, JSON.stringify(signRequest, null, 2));
        }
      }

      triggered++;
      console.log(`  ${p.intent_id}  EXIT trigger=${trigger}  entry=${p.entry_decision}/${p.entry_riskBps}  → live=${decision}/${liveBps}  drift=${drift >= 0 ? '+' : ''}${drift}`);
    } else {
      stateCache[p.intent_id] = {
        intent_id: p.intent_id,
        last_decision: decision,
        last_riskBps: liveBps,
        last_polled_at: new Date().toISOString(),
        status: 'OPEN',
      };
      console.log(`  ${p.intent_id}  hold  entry=${p.entry_decision}/${p.entry_riskBps}  → live=${decision}/${liveBps}  drift=${drift >= 0 ? '+' : ''}${drift}`);
    }
  } catch (e) {
    errors++;
    console.log(`  ${p.intent_id}  POLL_ERR: ${(e as Error).message}`);
  }
}

writeFileSync(STATE_PATH, JSON.stringify(stateCache, null, 2));

// 3) Aggregate dashboard
interface ExitEventStored extends ExitEvent {}
const allEvents: ExitEventStored[] = [];
if (existsSync(EVENTS_PATH)) {
  for (const line of readFileSync(EVENTS_PATH, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try { allEvents.push(JSON.parse(line) as ExitEventStored); } catch {}
  }
}
allEvents.sort((a, b) => b.ts.localeCompare(a.ts));

const summary = {
  computed_at: new Date().toISOString(),
  positions_open: Object.values(stateCache).filter(s => s.status === 'OPEN').length,
  positions_exited: Object.values(stateCache).filter(s => s.status === 'EXITED').length,
  total_events: allEvents.length,
  this_run: { polled, triggered, errors },
};
writeFileSync(join(METRICS_DIR, 'vault-exiter.json'), JSON.stringify(summary, null, 2));

const eventRows = allEvents.slice(0, 30).map(e =>
  `| ${e.ts.slice(0, 19).replace('T', ' ')} | \`${e.intent_id}\` | ${e.protocol} | ${e.entry_decision}/${e.entry_riskBps} → ${e.current_decision}/${e.current_riskBps} | ${e.drift_bps >= 0 ? '+' : ''}${e.drift_bps} | ${e.trigger} |`
).join('\n') || '| _no exit events yet_ | | | | | |';

const md = `# Vault-exiter

_Updated: ${summary.computed_at}_

Polling guardian for Phase 3. Watches every harness-confirmed position and polls \`/api/score\` at ~60s cadence. On a degradation transition (ALLOW→WARN/BLOCK, decision→ERROR, or +${RISK_JUMP_THRESHOLD} bps risk jump), it emits an exit event with a would-be-tx payload. **No signing, no broadcast** — Phase 4 swaps the boolean for a real bounded-delegation withdraw.

## Current state

- open positions: **${summary.positions_open}**
- positions exited: **${summary.positions_exited}**
- total exit events logged: **${summary.total_events}**

## Trigger rules

| trigger | condition |
|---|---|
| \`allow_to_warn\` | entry decision was ALLOW, current is WARN |
| \`allow_to_block\` | entry decision was ALLOW, current is BLOCK |
| \`became_error\` | current decision is ERROR (pool unreachable / state corrupt) |
| \`risk_jump\` | live riskBps − entry riskBps ≥ ${RISK_JUMP_THRESHOLD} |

## Recent exit events (last 30)

| ts | intent | protocol | entry → current | drift | trigger |
|---|---|---|---|---|---|
${eventRows}

## How to read this

- An exit event means: "if the vault were holding this position, the guardian would now route a withdraw to the signer."
- Multiple triggers can fire on the same position over time, but once a position is marked \`EXITED\` it's removed from the watch list.
- Raw events: [\`ledger/exit-events.jsonl\`](../ledger/exit-events.jsonl). State cache: [\`ledger/exit-state.json\`](../ledger/exit-state.json).

## What "signer-less" means

✓ load positions from harness-confirmed intents
✓ poll \`/api/score\` for each
✓ detect degradation transitions
✓ build the would-be-withdraw payload
✗ construct real \`decreaseLiquidity\` calldata (Phase 4: positionManager ABI + tick math)
✗ sign with a wallet (Phase 4: bounded-delegation signer)
✗ broadcast to chain (Phase 4: \`/api/preflight-raw\` + \`eth_sendRawTransaction\`)
`;

writeFileSync(join(METRICS_DIR, 'vault-exiter.md'), md);

console.log(`\npolled=${polled} triggered=${triggered} errors=${errors}`);
console.log(`open=${summary.positions_open} exited=${summary.positions_exited} total_events=${summary.total_events}`);
console.log(`wrote ${EVENTS_PATH}`);
console.log(`wrote ${STATE_PATH}`);
console.log(`wrote ${join(METRICS_DIR, 'vault-exiter.json')}`);
console.log(`wrote ${join(METRICS_DIR, 'vault-exiter.md')}`);
