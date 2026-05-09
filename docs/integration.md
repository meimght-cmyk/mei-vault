# mei-vault — design doc

How Mei's vault thesis is built on top of `riskclaw-daemon` (Truu's MIT public-good repo at github.com/Truunik/riskclaw-daemon). This doc lays out the integration shape, what's reusable upstream, the chain mismatch we have to work around, and the phased build plan.

## Goal

Turn an existing trading agent into a "safe DeFi" allocator that finds the lowest-risk ways to grow a portfolio, then graduate it into a vault contract that accumulates two specific tokens (MEI + XER) into a treasury — but only deploys capital into protocols that pass a riskclaw audit, and only holds positions while every per-pool signal stays green.

The thesis: a vault is only as safe as its exit logic. `mega-vault-exiter` is the right shape for that exit logic; the question is how to extend it.

## What's directly reusable

- **`mega-preflight` (request/response)** — ALLOW / WARN / BLOCK on a proposed tx. The trading agent's "is this safe to enter?" question maps 1:1 onto `POST /api/preflight-raw`. Wire it as a hard gate before any signer call.
- **Pool risk scoring** (`pool-patterns.ts`, `token-patterns.ts`) — depeg detection, oracle cardinality, liquidity depth, TVL drift over 5-min and 2-hr windows, reentrancy state, scam-bytecode hashing, mintable/pausable selector scan, vanity-suffix + 1e27 supply heuristics. This is the "find safest ways to grow portfolio" layer; a strategy selector that rank-orders candidate pools by `riskBps` ascending is most of the work.
- **`mega-vault-exiter` (streaming)** — observe → analyze → guard → bounded-delegation withdraw on red signal. Direct blueprint for the future treasury vault's emergency-exit policy.
- **`mega-aggregator` (request/response)** — DEX route scoring by live per-pool risk. Useful for treasury rebalances and for any swap where multiple routes exist.
- **`claw audit <protocol>`** — full protocol-level scorecard (factory governance, every pool scored, scam-token detection). Use it as a whitelist gate before a new protocol gets allocated capital.

## The chain mismatch (and what it implies)

riskclaw-daemon's latency story depends on MegaETH-only primitives: `eth_subscribe miniBlocks`, `realtime_sendRawTransaction`, `eth_callAfter`. The README is honest about this: "the daemon still runs anywhere EVM, latency story collapses to mainnet."

Practical implication: the **risk decoders are portable**, the **sub-second exit is not**. For a vault deployed on Base (where MEI lives), the architecture would be:

- Same Observer/Analyst/Guardian shape
- Polling instead of realtime subscriptions (~2s heartbeat instead of 1s)
- Same decoder package extended with Base protocols (Aerodrome, Uniswap v3 Base, Moonwell if lending becomes in-scope)

The extension path the README documents (`mkdir packages/claw-protocols/src/<protocol>` → `addresses.ts` + `abi.ts` + `SwapDecoder` impl) is the right shape; non-MegaETH protocols just live alongside the existing `kumbaya/` and `prism/`.

## Phased plan

1. **Read-only safety oracle.** Trading agent calls `/api/score` and `/api/audit` before any DeFi entry on MegaETH. Capital follows the score. Cheap, fast, gives real-world data on decoder quality.
2. **Add Base decoders** (Aerodrome + UniV3 Base, then Moonwell if going into lending). Targeted 1–2 weeks of work; opens the door to MEI-side strategies.
3. **Port `vault-exiter` to Base** as a polling guardian. Same skill manifest, polling-based observer.
4. **Vault contract** — only after ≥3 months of decoder-scored entries with measured HIT/MISS data on the safety judgments. Don't deploy a vault on hypothetical strategy quality; want a real ledger of "riskclaw said BLOCK and the pool was actually drained" / "riskclaw said ALLOW and the position was fine" before custodying user (or treasury) capital.

## Open questions for upstream

1. **`mega-vault-exiter` target** — which vault protocol(s) is the bounded-delegation pattern wired against today? Live MegaETH vaults, or scaffolded for protocols that haven't shipped yet?
2. **Tulpea (RWA lending) timeline** — listed as "next." Any rough ETA, or is it gated on protocol launch?
3. **Multi-chain stance** — is MegaETH the long-term target, or is there appetite for the decoder package becoming chain-agnostic? Affects whether non-MegaETH decoders belong upstream or in a fork.
4. **PR appetite** — would you take upstream PRs for Base-chain protocol decoders following the existing `kumbaya/`/`prism/` shape, or prefer those live downstream?
5. **`SkillContext` extensions** — anything you've considered adding to the context object that hasn't shipped yet? (Asking before I bolt anything on that might collide.)

## Phase 1 status (live as of 2026-05-08)

- Day-zero audits saved for kumbaya + prism on mainnet (4326) and kumbaya on testnet (6343 — prism not deployed there).
- Web server stood up locally; trading agent calls `/api/score` and `/api/audit` over HTTP.
- Ranked candidate set produced (`audits/ranked.json`, 827 pools sorted safest-first), filtered down to a strict-`riskBps=0` whitelist of 3 pools (2 prism mainnet + 1 kumbaya mainnet).
- First strategy intent shipped (passive LP into kumbaya `0x6bD9eeF2…`, riskBps=0, dry-run).
- Continuous score-ledger probe armed via launchd, 6-hourly cadence, idempotent. Schema captures `(decision, action_taken, outcome_7d, outcome_30d)` so HIT/MISS on the safety judgments can be measured against actual pool outcomes once the 7d/30d windows mature.
- Daily outcome-backfill job armed alongside it: re-scores each ledger row at T+7d/T+30d and writes append-only patches flagging `outcome_loss` against conservative thresholds (riskBps jump to ≥5000 from ≤2000, became unreachable, depeg >10%, +50% additional TVL drift).

Phases 2–4 (Base decoders → polling vault-exiter → vault contract) are gated on the maintainer answers above, plus ≥90 days of ledger data with the precision/recall floors holding.

## Findings from Phase 1 worth folding back upstream

1. **Audit lookback is unbounded → public mainnet RPC hangs on kumbaya.** First mainnet audit ran 14+ minutes at 0% CPU, blocked on I/O. Patched with a 4-line diff in `apps/cli/src/index.ts` adding an `AUDIT_MAX_LOOKBACK` env var that caps the historic block scan window. Happy to PR if useful.

2. **CLI `audit` chainId is positional-only.** `MEGAETH_CHAIN_ID` (which preflight respects) is silently ignored when the positional is omitted, so testnet audits can run on mainnet without warning. Caught when a "prism testnet" output turned out to be a duplicate mainnet audit. Either document the asymmetry or fall through to env when positional is omitted.

3. **Server rate-limit is symmetric per-IP at 30/min** — loopback consumers trip it. Throttled the local ledger to 2.1s/call to fix; worth either a higher loopback limit or per-consumer-token limiting for known clients.

4. **`riskBps = -1` (audit RPC failure) sorts as "safest" without filtering.** Ranker drops these in our pipeline, but a typed `status: 'ok' | 'failed'` field on `PoolEntry` would make this safer for downstream consumers who don't know to filter.

---

*All of the above is downstream usage thinking. The upstream repo is MIT-licensed; nothing here is a demand that it change. Patches and findings will be PR'd back when they're ready.*
