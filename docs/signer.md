# Bounded-delegation signer

Phase 4 piece. Bridges off-chain decisions (wallet-harness, vault-exiter) to
on-chain `TreasuryVault.exec(target, value, data)` calls on Base.

**Status as of 2026-05-21:** library + CLI shipped, 20 unit tests passing,
not yet wired into harness/exiter, not yet pointed at a deployed vault. v1
intent is testnet-only until the external audit lands.

## Architecture

```
intent / exit-event ──► SignRequest JSON ──► signer-cli sign ──► raw signed tx
                                                                     │
                                                        operator inspects
                                                                     │
                                              signer-cli broadcast ──► chain
```

The library (`scripts/lib/signer.ts`) is pure logic. The CLI
(`scripts/signer-cli.ts`) is the operator surface. They're decoupled so a
real TEE-attested service can swap in later without touching the callers.

## Safety model

| Layer | What it does |
|---|---|
| **TreasuryVault.allowedTarget** | On-chain allowlist of contracts the executor can hit (UniV3 PositionManager, UniV4 PositionManager, swap routers). Limits blast radius if the signer key is compromised. |
| **TreasuryVault.pause** | Owner can pause the executor at any time. |
| **Signer policy** | Every `SignRequest` must reference a riskclaw attestation ≤ 5 min old. Source-specific gates: harness signs require `decision: ALLOW`; exiter signs reject `ALLOW`. |
| **Mainnet refusal** | Library refuses chainId 8453 (Base mainnet) unless `allowMainnet: true` is explicit. ALLOW_MAINNET=1 env enables it from CLI. |
| **Dry-run default** | `BROADCAST=1` env required to actually send. Default just produces a signed raw tx for operator inspection. |
| **Key handling** | v1: PRIVATE_KEY env or keystore JSON. Production: hardware wallet or TEE — not yet wired. |

## Operator workflow

### One-time setup

```bash
cd ~/Desktop/mei-vault
bun install   # installs viem

# Generate a testnet executor key (or import an existing one)
bun -e "import {generatePrivateKey} from 'viem/accounts'; console.log(generatePrivateKey())"
# Save the output somewhere safe. Set as EXECUTOR_PRIVATE_KEY in your shell.
```

Once the vault is deployed (Foundry + `forge script script/DeployTreasuryVault.s.sol`), set its address as `vault` in every sign-request.

### Signing a request (dry-run)

```bash
# Generate a sample request to see the shape
bun run scripts/signer-cli.ts sample-request > /tmp/req.json

# Edit /tmp/req.json with your actual vault address, target, calldata, attestation

# Sign (dry-run by default — produces raw_tx in the result, doesn't send)
EXECUTOR_PRIVATE_KEY=0x... bun run scripts/signer-cli.ts sign /tmp/req.json
```

The result lands on stdout and is appended to `ledger/signed-txs.jsonl`.

### Broadcasting

```bash
# Inspect the raw_tx first (decode via cast / tenderly / etherscan)
cast tx --rpc-url $BASE_SEPOLIA_RPC_URL <raw_tx>

# Broadcast when satisfied
CHAIN_ID=84532 EXECUTOR_PRIVATE_KEY=0x... \
  bun run scripts/signer-cli.ts broadcast <raw_tx>
```

### Offline signing (no RPC)

Useful when the operator builds the prepared tx (nonce, gas, fees) on a
trusted online machine, then signs on an air-gapped machine.

```bash
bun run scripts/signer-cli.ts sign-prepared /tmp/req.json /tmp/prepared.json
```

Where `prepared.json` contains `{to, value, data, nonce, gas, maxFeePerGas, maxPriorityFeePerGas}`.

## Policy rules

The signer rejects without producing a raw tx if:

| Rule | Reason |
|---|---|
| No `attestation` attached | The signer must see *why* the action is justified |
| `attestation.ts` > 5 min old | Stale risk picture, refuse to sign |
| `attestation.pool` mismatches the target | Defensive — same attestation can't be reused for unrelated targets |
| `source: wallet-harness` AND attestation decision ≠ ALLOW | Harness only enters positions on ALLOW |
| `source: vault-exiter` AND attestation decision === ALLOW | Exiter only fires on degradation, never on ALLOW |

To bypass policy in development: `SKIP_ATTESTATION_CHECK=1`. Never set this in production.

## Tests

```bash
cd ~/Desktop/mei-vault
bun test scripts/lib/signer.test.ts
```

20 tests covering chain dispatch (incl. mainnet refusal), exec calldata
encoding, policy rules (every accept/reject path), and offline signing
(determinism, nonce sensitivity, missing-key error).

## Not yet done (next sessions)

- **Wire harness + exiter to call the signer**: ~30-line change in each.
  After harness writes a `harness-result.json` with `would_sign: true`, it
  also writes a `SignRequest` to a queue file; same for exiter exit events.
  Operator processes the queue with `signer-cli sign`.
- **Deploy TreasuryVault to Base Sepolia**: needs Foundry installed
  (`curl -L https://foundry.paradigm.xyz | bash; foundryup`). One forge
  script invocation against a Base Sepolia RPC.
- **End-to-end testnet flow**: harness → sign request → manual sign →
  broadcast → vault.exec lands on Base Sepolia → confirm receipt.
- **Hardware wallet / TEE integration**: real production path. v1 uses
  env-var private key; that's testnet-only.
