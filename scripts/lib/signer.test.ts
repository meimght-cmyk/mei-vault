#!/usr/bin/env bun
//
// Signer library tests. Run: bun test scripts/lib/signer.test.ts
//
// Uses the canonical Anvil test private key (DO NOT USE FOR ANY REAL MONEY).
// All tests are pure or use the offline signPreparedExec path — no network.
//
import { describe, test, expect } from 'bun:test';
import {
  chainFor,
  encodeExecCalldata,
  evaluatePolicy,
  signPreparedExec,
  type SignRequest,
  type PreparedTx,
} from './signer.ts';

// Canonical Anvil test key #0 — public, not a secret.
const TEST_PK = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' as const;
const TEST_ADDR = '0xf39Fd6e51aad88F6F4ce6aB8827279cfFFb92266' as const;

const VAULT = '0x1111111111111111111111111111111111111111' as const;
const TARGET = '0x2222222222222222222222222222222222222222' as const;

function fixtureRequest(overrides: Partial<SignRequest> = {}): SignRequest {
  return {
    vault: VAULT,
    target: TARGET,
    value: 0n,
    data: '0xdeadbeef',
    intent_id: 'test-intent-001',
    source: 'wallet-harness',
    chainId: 84532,
    attestation: {
      pool: TARGET,
      riskBps: 0,
      decision: 'ALLOW',
      ts: new Date().toISOString(),
    },
    ...overrides,
  };
}

function fixturePrepared(overrides: Partial<PreparedTx> = {}): PreparedTx {
  return {
    to: VAULT,
    value: 0n,
    data: '0xdeadbeef',
    nonce: 0,
    gas: 500_000n,
    maxFeePerGas: 1_000_000_000n,
    maxPriorityFeePerGas: 1_000_000_000n,
    ...overrides,
  };
}

describe('chainFor', () => {
  test('returns baseSepolia for 84532', () => {
    const c = chainFor(84532, false);
    expect(c.id).toBe(84532);
  });

  test('returns base for 8453 when mainnet allowed', () => {
    const c = chainFor(8453, true);
    expect(c.id).toBe(8453);
  });

  test('refuses 8453 by default', () => {
    expect(() => chainFor(8453, false)).toThrow(/refusing to sign for Base mainnet/);
  });

  test('throws on unknown chainId', () => {
    expect(() => chainFor(1, false)).toThrow(/unsupported chainId: 1/);
  });
});

describe('encodeExecCalldata', () => {
  test('produces exec(target, value, data) calldata with correct selector', () => {
    const cd = encodeExecCalldata(TARGET, 0n, '0xdeadbeef');
    // selector = first 4 bytes of keccak256("exec(address,uint256,bytes)")
    expect(cd.startsWith('0x0565bb67')).toBe(true);
    // selector(4) + address(32) + uint256(32) + bytes offset(32) + bytes
    // length(32) + bytes data(padded to 32) = at least 5×32 + 4 bytes = 164 bytes hex
    expect(cd.length).toBeGreaterThanOrEqual(330);
  });

  test('target address is encoded in the second slot of the calldata', () => {
    const cd = encodeExecCalldata(TARGET, 0n, '0x');
    // selector(4) + address-padded-to-32 — last 20 bytes = TARGET
    const addrSlot = '0x' + cd.slice(10, 10 + 64); // first arg
    expect(addrSlot.toLowerCase().endsWith(TARGET.slice(2).toLowerCase())).toBe(true);
  });
});

describe('evaluatePolicy', () => {
  test('accepts fresh ALLOW attestation for harness', () => {
    const p = evaluatePolicy(fixtureRequest(), {});
    expect(p.decision).toBe('accept');
    expect(p.reason).toMatch(/attestation valid/);
  });

  test('rejects when no attestation', () => {
    const p = evaluatePolicy(fixtureRequest({ attestation: undefined }), {});
    expect(p.decision).toBe('reject');
    expect(p.reason).toBe('no riskclaw attestation attached');
  });

  test('rejects stale attestation (>5min)', () => {
    const stale = fixtureRequest({
      attestation: {
        pool: TARGET, riskBps: 0, decision: 'ALLOW',
        ts: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
      },
    });
    const p = evaluatePolicy(stale, {});
    expect(p.decision).toBe('reject');
    expect(p.reason).toMatch(/attestation is \d+s old/);
  });

  test('rejects harness sign when attestation is not ALLOW', () => {
    const req = fixtureRequest({
      attestation: {
        pool: TARGET, riskBps: 5500, decision: 'WARN',
        ts: new Date().toISOString(),
      },
    });
    const p = evaluatePolicy(req, {});
    expect(p.decision).toBe('reject');
    expect(p.reason).toMatch(/harness sign requires ALLOW/);
  });

  test('rejects exiter sign when attestation is ALLOW', () => {
    const req = fixtureRequest({
      source: 'vault-exiter',
      attestation: {
        pool: TARGET, riskBps: 0, decision: 'ALLOW',
        ts: new Date().toISOString(),
      },
    });
    const p = evaluatePolicy(req, {});
    expect(p.decision).toBe('reject');
    expect(p.reason).toMatch(/exiter sign rejected/);
  });

  test('accepts exiter sign when attestation is WARN/BLOCK', () => {
    const req = fixtureRequest({
      source: 'vault-exiter',
      attestation: {
        pool: TARGET, riskBps: 8500, decision: 'BLOCK',
        ts: new Date().toISOString(),
      },
    });
    const p = evaluatePolicy(req, {});
    expect(p.decision).toBe('accept');
  });

  test('skip flag bypasses all attestation logic', () => {
    const req = fixtureRequest({ attestation: undefined });
    const p = evaluatePolicy(req, { skipAttestationCheck: true });
    expect(p.decision).toBe('accept');
    expect(p.reason).toMatch(/skipped/);
  });
});

describe('signPreparedExec (offline)', () => {
  test('produces signed raw tx for valid request', async () => {
    const req = fixtureRequest();
    const result = await signPreparedExec(req, fixturePrepared(), { privateKey: TEST_PK });
    expect(result.decision).toBe('accept');
    expect(result.signer_address.toLowerCase()).toBe(TEST_ADDR.toLowerCase());
    expect(result.raw_tx).toBeDefined();
    expect(result.raw_tx?.startsWith('0x02')).toBe(true); // EIP-1559 envelope type 2
    expect(result.tx_hash).toBeDefined();
    expect(result.tx_hash?.startsWith('0x')).toBe(true);
    expect(result.tx_hash?.length).toBe(66); // 32 bytes hex
  });

  test('rejects request via policy without signing', async () => {
    const req = fixtureRequest({ attestation: undefined });
    const result = await signPreparedExec(req, fixturePrepared(), { privateKey: TEST_PK });
    expect(result.decision).toBe('reject');
    expect(result.raw_tx).toBeUndefined();
    expect(result.tx_hash).toBeUndefined();
  });

  test('refuses to sign for Base mainnet without explicit flag', async () => {
    const req = fixtureRequest({ chainId: 8453 });
    await expect(signPreparedExec(req, fixturePrepared(), { privateKey: TEST_PK }))
      .rejects.toThrow(/refusing to sign for Base mainnet/);
  });

  test('signs for Base mainnet when allowMainnet is true', async () => {
    const req = fixtureRequest({ chainId: 8453 });
    const result = await signPreparedExec(req, fixturePrepared(), {
      privateKey: TEST_PK,
      allowMainnet: true,
    });
    expect(result.decision).toBe('accept');
    expect(result.chain_id).toBe(8453);
  });

  test('signature is deterministic for same input', async () => {
    const req = fixtureRequest();
    const r1 = await signPreparedExec(req, fixturePrepared(), { privateKey: TEST_PK });
    const r2 = await signPreparedExec(req, fixturePrepared(), { privateKey: TEST_PK });
    expect(r1.raw_tx).toBe(r2.raw_tx);
    expect(r1.tx_hash).toBe(r2.tx_hash);
  });

  test('different nonce produces different signature', async () => {
    const req = fixtureRequest();
    const r1 = await signPreparedExec(req, fixturePrepared({ nonce: 0 }), { privateKey: TEST_PK });
    const r2 = await signPreparedExec(req, fixturePrepared({ nonce: 1 }), { privateKey: TEST_PK });
    expect(r1.raw_tx).not.toBe(r2.raw_tx);
    expect(r1.tx_hash).not.toBe(r2.tx_hash);
  });

  test('throws on missing private key', async () => {
    const oldPk = process.env.EXECUTOR_PRIVATE_KEY;
    delete process.env.EXECUTOR_PRIVATE_KEY;
    const req = fixtureRequest();
    await expect(signPreparedExec(req, fixturePrepared(), {}))
      .rejects.toThrow(/no executor private key/);
    if (oldPk) process.env.EXECUTOR_PRIVATE_KEY = oldPk;
  });
});
