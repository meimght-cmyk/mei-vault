#!/usr/bin/env bun
//
// Bounded-delegation signer CLI.
//
// Operator workflow:
//   1. Harness/exiter emits a sign-request JSON (manually or via integration).
//   2. Operator inspects the request.
//   3. Operator invokes `sign` → produces signed raw tx (dry-run by default).
//   4. Operator inspects the raw tx (decode via cast / etherscan).
//   5. Operator invokes `broadcast` → publishes it to chain.
//
// Default chain: Base Sepolia (84532). Mainnet (8453) requires ALLOW_MAINNET=1.
//
// Subcommands:
//   sign <request.json>           — sign a single sign-request, write result to stdout
//   sign-prepared <request.json> <prepared.json>  — offline sign (no RPC)
//   broadcast <raw-tx-hex>        — broadcast a previously signed raw tx
//   queue-process [queue-file]    — process all pending sign-requests in queue
//   sample-request                — emit a template sign-request JSON
//
import { readFileSync, appendFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createPublicClient, createWalletClient, http, type Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import {
  signExec,
  signPreparedExec,
  chainFor,
  type SignRequest,
  type SignerConfig,
  type PreparedTx,
} from './lib/signer.ts';

const LEDGER_DIR = join(import.meta.dir, '..', 'ledger');
const SIGNED_PATH = join(LEDGER_DIR, 'signed-txs.jsonl');

const ALLOW_MAINNET = process.env.ALLOW_MAINNET === '1';
const BROADCAST = process.env.BROADCAST === '1';

function die(msg: string): never {
  console.error(msg);
  process.exit(1);
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function makeCfg(): SignerConfig {
  return {
    allowMainnet: ALLOW_MAINNET,
    broadcast: BROADCAST,
    skipAttestationCheck: process.env.SKIP_ATTESTATION_CHECK === '1',
  };
}

async function cmdSign(reqPath: string): Promise<void> {
  const req = readJson<SignRequest>(reqPath);
  // Re-hydrate bigints (JSON loses them).
  req.value = BigInt(req.value as unknown as string);
  const result = await signExec(req, makeCfg());
  appendFileSync(SIGNED_PATH, JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v) + '\n');
  console.log(JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2));
}

async function cmdSignPrepared(reqPath: string, preparedPath: string): Promise<void> {
  const req = readJson<SignRequest>(reqPath);
  req.value = BigInt(req.value as unknown as string);
  const preparedRaw = readJson<Record<string, unknown>>(preparedPath);
  const prepared: PreparedTx = {
    to: preparedRaw.to as `0x${string}`,
    value: BigInt(preparedRaw.value as string),
    data: preparedRaw.data as `0x${string}`,
    nonce: Number(preparedRaw.nonce),
    gas: BigInt(preparedRaw.gas as string),
    maxFeePerGas: BigInt(preparedRaw.maxFeePerGas as string),
    maxPriorityFeePerGas: BigInt(preparedRaw.maxPriorityFeePerGas as string),
  };
  const result = await signPreparedExec(req, prepared, makeCfg());
  appendFileSync(SIGNED_PATH, JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v) + '\n');
  console.log(JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2));
}

async function cmdBroadcast(rawTx: string): Promise<void> {
  if (!rawTx.startsWith('0x')) die('rawTx must be 0x-prefixed');
  const chainIdArg = process.env.CHAIN_ID;
  if (!chainIdArg) die('set CHAIN_ID env var (84532 for base sepolia, 8453 for mainnet w/ ALLOW_MAINNET=1)');
  const chainId = Number(chainIdArg);
  const chain = chainFor(chainId, ALLOW_MAINNET);
  const rpcUrl = process.env.RPC_URL ?? chain.rpcUrls.default.http[0];
  const pk = process.env.EXECUTOR_PRIVATE_KEY as Hex | undefined;
  if (!pk) die('EXECUTOR_PRIVATE_KEY required for broadcast (signs nothing — just needed for client init)');
  const account = privateKeyToAccount(pk);
  const wallet = createWalletClient({ account, chain, transport: http(rpcUrl) });
  const publicClient = createPublicClient({ chain, transport: http(rpcUrl) });

  const txHash = await wallet.sendRawTransaction({ serializedTransaction: rawTx as Hex });
  console.log('broadcast:', txHash);
  console.log('  chain:', chain.name, '(chainId', chainId, ')');
  console.log('  explorer:', chain.blockExplorers?.default.url + '/tx/' + txHash);
  console.log('  waiting for receipt...');
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  console.log('  status:', receipt.status, 'block:', receipt.blockNumber, 'gasUsed:', receipt.gasUsed.toString());

  appendFileSync(SIGNED_PATH, JSON.stringify({
    event: 'broadcast',
    raw_tx: rawTx,
    tx_hash: txHash,
    chain_id: chainId,
    block_number: receipt.blockNumber.toString(),
    gas_used: receipt.gasUsed.toString(),
    status: receipt.status,
    broadcast_at: new Date().toISOString(),
  }) + '\n');
}

function cmdSampleRequest(): void {
  const sample: SignRequest = {
    vault: '0x0000000000000000000000000000000000000000',
    target: '0x0000000000000000000000000000000000000001',
    value: 0n,
    data: '0xdeadbeef',
    intent_id: 'passive-lp-kumbaya-2026-05-21-001',
    source: 'wallet-harness',
    chainId: 84532, // base sepolia
    attestation: {
      pool: '0x0000000000000000000000000000000000000001',
      riskBps: 0,
      decision: 'ALLOW',
      ts: new Date().toISOString(),
    },
  };
  console.log(JSON.stringify(sample, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2));
}

async function main(): Promise<void> {
  const [, , cmd, ...args] = process.argv;
  switch (cmd) {
    case 'sign':
      if (!args[0]) die('usage: signer-cli sign <request.json>');
      return cmdSign(args[0]);
    case 'sign-prepared':
      if (!args[0] || !args[1]) die('usage: signer-cli sign-prepared <request.json> <prepared.json>');
      return cmdSignPrepared(args[0], args[1]);
    case 'broadcast':
      if (!args[0]) die('usage: signer-cli broadcast <raw-tx-hex>   (CHAIN_ID env required)');
      return cmdBroadcast(args[0]);
    case 'sample-request':
      return cmdSampleRequest();
    default: {
      console.log('mei-vault signer CLI');
      console.log('');
      console.log('  signer-cli sign <request.json>                  sign (dry-run by default, BROADCAST=1 to send)');
      console.log('  signer-cli sign-prepared <req.json> <tx.json>   sign without RPC (fully offline)');
      console.log('  signer-cli broadcast <raw-tx-hex>               broadcast a previously signed raw tx');
      console.log('  signer-cli sample-request                       emit a template request JSON');
      console.log('');
      console.log('env:');
      console.log('  EXECUTOR_PRIVATE_KEY  0x-prefixed 32-byte hex (testnet only until audit)');
      console.log('  ALLOW_MAINNET=1       allow chainId 8453 (Base mainnet) — requires audit + 90d floor');
      console.log('  BROADCAST=1           actually send the signed tx (default: dry-run, raw_tx in result only)');
      console.log('  SKIP_ATTESTATION_CHECK=1  bypass riskclaw freshness check (dev only)');
      console.log('  RPC_URL               override RPC for the target chain (defaults to chain default)');
      console.log('  CHAIN_ID              required for `broadcast` subcommand');
      console.log('');
      console.log('signed results appended to ledger/signed-txs.jsonl');
    }
  }
}

main().catch(err => {
  console.error(err.message ?? String(err));
  process.exit(1);
});
