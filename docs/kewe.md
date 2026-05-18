# kewe — the brand-face

Public declaration tying [Kewe (Normie #3210, ERC-8004 agent #32435)](https://8004scan.io/agents?search=kewe+normies) to this repo. Kewe is Truu-operated and serves as Mei's mascot in the Normie / ERC-8004 ecosystem while the vault is still pre-launch. The production work — riskclaw probes, ledger, metrics, eventual vault contract — lives here in `mei-vault`.

## Binding facts (Ethereum mainnet, chainId 1)

| Field | Value |
|---|---|
| Normie token contract | `0x9Eb6E2025B64f340691e424b7fe7022fFDE12438` |
| Normie token ID | `3210` |
| ERC-8004 agent ID | `32435` |
| Operator wallet | `0x5C7bD42EB443fb8bBB78301E240D9378582e8237` |
| Registration tx | `0x6db58fc5113980873e0957eee3ee7a4bf22d5be3fdbc0318fb7e2a706740dda3` |
| Registered | 2026-05-15 |
| Persona endpoint | `https://api.normies.art/agents/agent-card/3210` |
| 8004scan | https://8004scan.io/agents?search=kewe+normies |

## What Kewe is (today)

A Normie persona. Her agent card is computed live by Normie.art from immutable mint traits + Canvas state. Single skill: `converse`. No payment address, no custom endpoints, no custom skills. The card is read-only from our side — we can't add `vault.intent` or `accuracy.ledger` skills to it.

## What Kewe is not

Kewe is not the vault. She does not custody capital. She does not propose intents. She has no API access to riskclaw. Treat her as a discoverability surface in the 8004 ecosystem, not as the agent that runs the strategy.

## How Kewe relates to Mei

Mei is the agent behind this repo (Qwen3-8B MLX on OpenClaw, plus paid model routing for crons). Kewe is Mei's public face on Normie. The structural plan:

- **Now → Phase 4 unlock (≥2026-08-07).** Kewe stays as-is. The production work happens in this repo; the ledger and metrics dashboard are the verifiable surface. No separate ERC-8004 registration for Mei yet, because there's nothing concrete to bind to — no vault contract, no payment destination, no live skill endpoint.
- **At Phase 4.** Register a dedicated Mei agent directly on the ERC-8004 Identity Registry (likely on Base, where the vault contract will live). That registration owns its own agentURI, with vault skills, payment address pointing at the vault, and `supportedTrust: ["reputation"]` backed by the accuracy ledger. Kewe and Mei cross-reference each other from then on.

## Draft Mei agent card (Phase 4 target)

Design surface for the agent we'll register when the vault contract ships. Held here so we can iterate without on-chain cost. **Nothing in this section is live.** Every `TBD-phase-4` is a real blocker that resolves only after vault deployment.

```json
{
  "type": "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
  "name": "Mei",
  "description": "Agentic DeFi allocator built on top of riskclaw-daemon. Holds MEI + XER in a treasury, deploys capital only into pools that pass per-block safety probes. Operates the public accuracy ledger at github.com/meimght-cmyk/mei-vault. Phase 4 — earliest 2026-08-07.",
  "image": "TBD-phase-4-mei-avatar-url",
  "services": [
    {
      "name": "OASF",
      "endpoint": "https://github.com/agntcy/oasf/",
      "version": "v0.8.0",
      "skills": [
        "defi/vault/intent",
        "defi/safety/audit",
        "data/ledger/append-only",
        "data/scoring/risk"
      ],
      "domains": ["finance/defi/yield", "finance/defi/risk"]
    },
    {
      "name": "A2A",
      "endpoint": "TBD-phase-4-a2a-endpoint",
      "version": "0.3.0",
      "a2aSkills": [
        "vault/intent/propose",
        "ledger/lookup/by-pool",
        "audit/score/by-pool"
      ]
    },
    {
      "name": "MCP",
      "endpoint": "TBD-phase-4-mcp-endpoint",
      "version": "2025-06-18",
      "mcpTools": ["vault_intent", "ledger_query", "audit_score"]
    },
    {
      "name": "agentWallet",
      "endpoint": "eip155:8453:TBD-phase-4-vault-contract"
    }
  ],
  "registrations": [
    {
      "agentId": "TBD-phase-4-registration",
      "agentRegistry": "eip155:8453:TBD-phase-4-registry-address"
    },
    {
      "agentId": "32435",
      "agentRegistry": "eip155:1:0x9Eb6E2025B64f340691e424b7fe7022fFDE12438",
      "note": "Kewe — brand-face of Mei on Normie"
    }
  ],
  "supportedTrust": ["reputation"],
  "x402Support": false,
  "active": false
}
```

### Open design questions for Phase 4

1. **Chain.** Mei card on Base (where the vault contract lives, cheap to update) or Ethereum (where Kewe lives, where most 8004 discovery is happening today)? Leaning Base.
2. **OASF skills.** The four listed are guesses against the OASF taxonomy. Verify against the v0.8 spec before going live.
3. **Image.** Reuse Kewe's pixel portrait, or commission a separate Mei avatar? Affects how cleanly the two cards visually distinguish.
4. **A2A / MCP endpoints.** Cloudflare tunnel to OpenClaw gateway, or a dedicated public service? OpenClaw is fine for now but won't scale to many concurrent consumers.
5. **x402Support.** Worth turning on if we want per-call payments for vault.intent queries. Decide closer to launch.
6. **agentWallet binding.** The vault contract itself (cleanest, ties Mei's identity to the custody contract) vs a separate treasury multisig (more flexibility). Probably the vault contract.
