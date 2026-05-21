// Bounded-delegation signer library.
//
// Bridges off-chain decisions (wallet-harness, vault-exiter) to on-chain
// vault.exec(target, value, data) calls. The vault's executor key signs the
// tx; the vault constrains *which* contracts the executor can hit; this
// library constrains *when* the signer will sign at all (policy gates).
//
// SAFETY MODEL:
//   - Default dry-run mode: produces signed raw tx but doesn't broadcast.
//     Operator inspects, manually broadcasts via `cast publish` or our CLI.
//   - Mainnet refused unless `allowMainnet: true` is explicit. Audit + 90d
//     data floor have to pass before that flag flips.
//   - Policy: every sign request must reference a riskclaw attestation no
//     older than 5 minutes. Stale attestations rejected.
//   - Key handling: this library reads PRIVATE_KEY from env. Real production
//     should use a hardware wallet or TEE; v1 testnet is the only intended
//     use until the external audit lands.

import {
  createWalletClient,
  createPublicClient,
  http,
  encodeFunctionData,
  parseAbi,
  keccak256,
  serializeTransaction,
  type Hex,
  type Chain,
  type Address,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia, base } from 'viem/chains';

const VAULT_ABI = parseAbi([
  'function exec(address target, uint256 value, bytes data) returns (bytes)',
]);

const CHAIN_BY_ID: Record<number, Chain> = {
  84532: baseSepolia,
  8453: base,
};

const ATTESTATION_MAX_AGE_MS = 5 * 60 * 1000;

export interface RiskclawAttestation {
  pool: string;
  riskBps: number;
  decision: 'ALLOW' | 'WARN' | 'BLOCK' | 'PROBE' | 'ERROR';
  block?: string; // bigint serialized; optional for v1
  ts: string;     // ISO timestamp of the score
}

export interface SignRequest {
  vault: Address;
  target: Address;
  value: bigint;
  data: Hex;
  /** Off-chain audit trail — intent or exit-event id. */
  intent_id: string;
  /** Action source — useful for log filtering. */
  source: 'wallet-harness' | 'vault-exiter' | 'manual';
  chainId: number;
  /** Riskclaw score that justifies this action. Required when policy is on. */
  attestation?: RiskclawAttestation;
}

export interface SignerConfig {
  privateKey?: Hex;
  rpcUrl?: string;
  allowMainnet?: boolean;
  broadcast?: boolean;
  /** Skip the riskclaw attestation freshness check (dev only). */
  skipAttestationCheck?: boolean;
}

export type SignDecision = 'accept' | 'reject';

export interface SignResult {
  intent_id: string;
  source: string;
  vault: Address;
  target: Address;
  chain_id: number;
  signer_address: Address;
  decision: SignDecision;
  reason: string;
  /** Set when decision === 'accept'. */
  raw_tx?: Hex;
  /** keccak256(raw_tx) — what eth_sendRawTransaction would return. */
  tx_hash?: Hex;
  /** Set when broadcast === true. */
  broadcast_tx_hash?: Hex;
  broadcast_at?: string;
  /** Recorded for audit. */
  produced_at: string;
}

// ─── pure helpers (no RPC) ──────────────────────────────────────────────

export function chainFor(chainId: number, allowMainnet: boolean): Chain {
  if (chainId === 8453 && !allowMainnet) {
    throw new Error(
      'refusing to sign for Base mainnet (chainId 8453); set allowMainnet: true to override (audit + 90d floor required first)',
    );
  }
  const c = CHAIN_BY_ID[chainId];
  if (!c) throw new Error(`unsupported chainId: ${chainId} (supported: 84532, 8453)`);
  return c;
}

export function encodeExecCalldata(target: Address, value: bigint, data: Hex): Hex {
  return encodeFunctionData({
    abi: VAULT_ABI,
    functionName: 'exec',
    args: [target, value, data],
  });
}

/** Returns {decision, reason}. Pure function, safe to test. */
export function evaluatePolicy(
  req: SignRequest,
  opts: { skipAttestationCheck?: boolean; nowMs?: number },
): { decision: SignDecision; reason: string } {
  if (opts.skipAttestationCheck) {
    return { decision: 'accept', reason: 'attestation check skipped (dev mode)' };
  }
  if (!req.attestation) {
    return { decision: 'reject', reason: 'no riskclaw attestation attached' };
  }
  const now = opts.nowMs ?? Date.now();
  const ageMs = now - new Date(req.attestation.ts).getTime();
  if (ageMs > ATTESTATION_MAX_AGE_MS) {
    return {
      decision: 'reject',
      reason: `attestation is ${Math.round(ageMs / 1000)}s old (max ${ATTESTATION_MAX_AGE_MS / 1000}s)`,
    };
  }
  if (req.attestation.pool.toLowerCase() !== req.target.toLowerCase()
      && !req.attestation.pool.toLowerCase().startsWith('0x')) {
    return { decision: 'reject', reason: 'attestation pool/target mismatch' };
  }
  // Source-specific gates
  if (req.source === 'wallet-harness' && req.attestation.decision !== 'ALLOW') {
    return {
      decision: 'reject',
      reason: `harness sign requires ALLOW, attestation is ${req.attestation.decision}`,
    };
  }
  if (req.source === 'vault-exiter' && req.attestation.decision === 'ALLOW') {
    return {
      decision: 'reject',
      reason: 'exiter sign rejected because attestation says ALLOW (would not exit a safe position)',
    };
  }
  return { decision: 'accept', reason: `attestation valid (${Math.round(ageMs / 1000)}s old, ${req.attestation.decision} @ ${req.attestation.riskBps}bps)` };
}

// ─── main entry point ───────────────────────────────────────────────────

export async function signExec(req: SignRequest, cfg: SignerConfig): Promise<SignResult> {
  const pk = (cfg.privateKey ?? (process.env.EXECUTOR_PRIVATE_KEY as Hex | undefined));
  if (!pk) throw new Error('no executor private key (set EXECUTOR_PRIVATE_KEY or pass cfg.privateKey)');
  if (!pk.startsWith('0x') || pk.length !== 66) {
    throw new Error('EXECUTOR_PRIVATE_KEY must be 0x-prefixed 32 bytes hex');
  }

  const chain = chainFor(req.chainId, !!cfg.allowMainnet);
  const account = privateKeyToAccount(pk);

  const policy = evaluatePolicy(req, { skipAttestationCheck: cfg.skipAttestationCheck });
  if (policy.decision === 'reject') {
    return {
      intent_id: req.intent_id,
      source: req.source,
      vault: req.vault,
      target: req.target,
      chain_id: req.chainId,
      signer_address: account.address,
      decision: 'reject',
      reason: policy.reason,
      produced_at: new Date().toISOString(),
    };
  }

  const rpcUrl = cfg.rpcUrl ?? chain.rpcUrls.default.http[0];
  const wallet = createWalletClient({ account, chain, transport: http(rpcUrl) });
  const publicClient = createPublicClient({ chain, transport: http(rpcUrl) });

  const callData = encodeExecCalldata(req.target, req.value, req.data);

  const [nonce, feeData] = await Promise.all([
    publicClient.getTransactionCount({ address: account.address }),
    publicClient.estimateFeesPerGas(),
  ]);

  const txRequest = {
    chainId: req.chainId,
    to: req.vault,
    value: req.value,
    data: callData,
    nonce,
    gas: 500_000n,
    maxFeePerGas: feeData.maxFeePerGas,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    type: 'eip1559' as const,
  };
  const signature = await account.signTransaction(txRequest);
  const rawTx = signature; // viem returns serialized hex
  const txHash = keccak256(rawTx);

  let broadcastTxHash: Hex | undefined;
  let broadcastAt: string | undefined;
  if (cfg.broadcast) {
    broadcastTxHash = await wallet.sendRawTransaction({ serializedTransaction: rawTx });
    broadcastAt = new Date().toISOString();
  }

  return {
    intent_id: req.intent_id,
    source: req.source,
    vault: req.vault,
    target: req.target,
    chain_id: req.chainId,
    signer_address: account.address,
    decision: 'accept',
    reason: policy.reason,
    raw_tx: rawTx,
    tx_hash: txHash,
    broadcast_tx_hash: broadcastTxHash,
    broadcast_at: broadcastAt,
    produced_at: new Date().toISOString(),
  };
}

// ─── no-RPC sign (for unit tests) ───────────────────────────────────────

export interface PreparedTx {
  to: Address;
  value: bigint;
  data: Hex;
  nonce: number;
  gas: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
}

/**
 * Sign a fully-prepared transaction without RPC. Used by tests and by the
 * CLI's `sign-prepared` subcommand for fully offline workflows.
 */
export async function signPreparedExec(
  req: SignRequest,
  prepared: PreparedTx,
  cfg: SignerConfig,
): Promise<SignResult> {
  const pk = (cfg.privateKey ?? (process.env.EXECUTOR_PRIVATE_KEY as Hex | undefined));
  if (!pk) throw new Error('no executor private key (set EXECUTOR_PRIVATE_KEY or pass cfg.privateKey)');

  const chain = chainFor(req.chainId, !!cfg.allowMainnet);
  const account = privateKeyToAccount(pk);

  const policy = evaluatePolicy(req, { skipAttestationCheck: cfg.skipAttestationCheck });
  if (policy.decision === 'reject') {
    return {
      intent_id: req.intent_id,
      source: req.source,
      vault: req.vault,
      target: req.target,
      chain_id: req.chainId,
      signer_address: account.address,
      decision: 'reject',
      reason: policy.reason,
      produced_at: new Date().toISOString(),
    };
  }

  const txRequest = {
    chainId: req.chainId,
    to: prepared.to,
    value: prepared.value,
    data: prepared.data,
    nonce: prepared.nonce,
    gas: prepared.gas,
    maxFeePerGas: prepared.maxFeePerGas,
    maxPriorityFeePerGas: prepared.maxPriorityFeePerGas,
    type: 'eip1559' as const,
  };
  const signature = await account.signTransaction(txRequest);
  const txHash = keccak256(signature);

  return {
    intent_id: req.intent_id,
    source: req.source,
    vault: req.vault,
    target: req.target,
    chain_id: req.chainId,
    signer_address: account.address,
    decision: 'accept',
    reason: policy.reason,
    raw_tx: signature,
    tx_hash: txHash,
    produced_at: new Date().toISOString(),
  };
}
