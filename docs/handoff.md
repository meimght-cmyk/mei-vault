# MEI × riskclaw-daemon — handoff

Self-contained brief for MEI. Read top-to-bottom; everything you need to start Phase 1 is here.

Date: 2026-05-08
Owner: Truu
Context: MEI is the trading agent + treasury vault project. Riskclaw-daemon is Truu's separate public-good DeFi safety framework. This doc defines how MEI integrates with riskclaw, what to ship first, and the gates that keep us from deploying a vault on hypothetical evidence.

---

## 0. Architectural rule — load-bearing

**Riskclaw-daemon and the MEI vault are separate projects. They do not share a repo, a roadmap, or a marketing narrative.**

- **Riskclaw** = public-good DeFi safety daemon. Neutral. Anyone-can-adopt. Lives at `github.com/Truunik/riskclaw-daemon` (MIT).
- **MEI** = trading agent + accumulation vault. MEI's mission, MEI's repo (TBD). Consumes riskclaw over HTTP, never imports the package.

Why this matters:
1. Riskclaw's value comes from being a neutral safety layer. The moment it becomes "MEI's vault infrastructure" it loses adoptability.
2. Riskclaw's roadmap is set by what makes DeFi safer in general, not by what MEI's vault needs next quarter. Letting vault needs drive riskclaw scope = scope creep + lost neutrality.

What this means in practice:
- No vault code in the riskclaw repo. No vault README mention. No MEI/XER asset-specific logic.
- No "MEI's safety layer" framing in riskclaw marketing.
- If MEI needs a riskclaw feature: only ship it on the daemon if it generalizes to all users. Otherwise it lives in MEI's repo.
- Marketing: do not bundle the two narratives in the same thread, post, or pitch. Different audiences (riskclaw = builders/protocols; MEI = treasury/holders).

---

## 1. The thesis (why we're building this way)

A vault is only as safe as its exit logic **and** its evidence base.

Riskclaw provides decoder-level per-pool safety scoring (depeg detection, oracle cardinality, liquidity depth, TVL drift, scam-bytecode hashing, mintable/pausable selector scan, etc.) and per-tx preflight (ALLOW / WARN / BLOCK). Today the kernel runs against real EVM but most of the decoder package is scaffolded — it needs a real consumer to surface false positives, false negatives, and decoder gaps.

**MEI as the consumer = MEI is the live test agent.** Every preflight call MEI logs becomes ground truth for measuring decoder accuracy. The HIT/MISS ledger that comes out of Phase 1 is the dataset that justifies (or kills) the vault contract decision in Phase 4.

We do not custody capital on hypothetical decoder quality. We custody capital on measured outcomes.

---

## 2. Phased plan

### Phase 1 — read-only safety oracle  (LIVE NOW, no blockers)

What ships:
- MEI calls riskclaw over HTTP before every DeFi entry on MegaETH:
  - `POST /api/preflight-raw` — hard gate, returns ALLOW / WARN / BLOCK on a proposed tx
  - `GET /api/score` — per-pool risk score
  - `GET /api/audit` — full protocol-level scorecard (run before any new protocol gets allocated capital)
- Local **HIT/MISS ledger** logs every decision:
  ```
  {
    timestamp,
    pool,
    protocol,
    decision: ALLOW | WARN | BLOCK,
    risk_bps,
    action_taken: entered | skipped,
    outcome_7d: { nav_pct_change, incident_flagged, notes },
    outcome_30d: { nav_pct_change, incident_flagged, notes },
    notes
  }
  ```
- Baseline JSONs saved from `claw audit kumbaya` and `claw audit prism` on:
  - Mainnet: chainId 4326, `https://mainnet.megaeth.com/rpc`
  - Testnet (Carrot): chainId 6343, `https://carrot.megaeth.com/rpc`
- First strategy: passive LP into the highest-scoring Kumbaya / Prism pool, gated on a score threshold (start: enter only if `riskBps ≤ 2000`, tune from there).

How to integrate:
- HTTP only. Do not import the riskclaw package. Stand up the riskclaw web server locally and call it.
- Treat `/api/preflight-raw` as a hard gate — if it returns BLOCK, the signer call does not happen. WARN routes to a human-in-the-loop review path before signing.
- Log everything. Even ALLOWs that you skip for unrelated reasons. The full distribution matters.

Exit criteria to consider Phase 2:
- ≥30 calendar days of ledger data
- ≥30 distinct decisions logged
- ≥1 maintainer reply on Q3 (multi-chain stance) and Q4 (PR appetite) — see §5
- Decoder false-negative review documented (every ALLOW-then-drained event written up with what riskclaw missed)

---

### Phase 2 — Base decoders

What ships: Aerodrome + Uniswap v3 Base decoders. Then Moonwell only if MEI adds lending strategies.

Decision required before starting:
- Maintainer answer to Q3 + Q4. If upstream-friendly: PRs to `packages/claw-protocols/`. If not: fork lives in MEI's repo, never the daemon's.

Blockers:
- Phase 1 exit criteria met
- Polling-based observer pattern proven on Base (no realtime miniBlocks available off MegaETH — this is a known architecture shift)
- Decoder accuracy on MegaETH at acceptable baseline (see KPIs §4) — no point porting decoders that aren't trustworthy

Architecture note: same Observer/Analyst/Guardian shape as riskclaw, but polling at ~2s heartbeat instead of `eth_subscribe miniBlocks`. The decoder logic is portable; the sub-second exit story is not.

Exit criteria to consider Phase 3:
- ≥3 Base protocols decoded and tested against live pools
- ≥30 days of Base decoder calls with no critical false-negative on monitored pools

---

### Phase 3 — vault-exiter polling port

What ships: Same Observer/Analyst/Guardian shape as riskclaw's `mega-vault-exiter`, polling instead of realtime, **in MEI's codebase, not the riskclaw repo.**

Blockers:
- Phase 2 exit criteria met
- Bounded-delegation signer pattern available on Base (Safe module, EOA with kill-switch, or chosen alternative)

Exit criteria to consider Phase 4:
- ≥30 days of polling guardian running against live Base positions with no missed exit
- Documented response time: signal-to-exit p95

---

### Phase 4 — MEI accumulation vault contract

**HARD FLOOR. Do not deploy until every item below is met. No exceptions for market timing, no exceptions for narrative timing, no exceptions period.**

Blockers:
1. ≥90 days of Phase 1+2 HIT/MISS ledger data
2. ALLOW false-negative rate ≤2% on rolling 90-day window (definition in §4)
3. BLOCK precision ≥70% on rolling 90-day window
4. External audit of vault contract (not internal review)
5. Bounded-delegation pattern shipped + tested in Phase 3
6. Asset-level Xerberus dendrogram scorecards published for MEI and XER (covers what riskclaw doesn't: holding risk, supply mechanics, regulatory)
7. Documented incident response: who pulls the kill-switch, in how long, with what authority

Why these specific gates: items 1–3 = decoders are trustworthy. Item 4 = vault contract itself isn't the failure mode. Item 5 = exit logic actually works. Item 6 = riskclaw scores pools/tx, not asset-holding theses — those need a separate layer. Item 7 = when something goes wrong (it will), there's a named human and a named timeline.

---

## 3. Blockers — flat list (for tracking)

| # | Blocker | Gates which phase |
|---|---|---|
| B1 | Phase 1 ledger ≥30 days, ≥30 decisions | Phase 2 start |
| B2 | Maintainer answer on multi-chain stance | Phase 2 start |
| B3 | Maintainer answer on PR appetite | Phase 2 start (decides upstream vs fork) |
| B4 | Phase 1 false-negative review documented | Phase 2 start |
| B5 | ≥3 Base protocols decoded + tested live | Phase 3 start |
| B6 | ≥30d Base decoder calls, no critical FN | Phase 3 start |
| B7 | Bounded-delegation signer pattern on Base | Phase 3 start |
| B8 | ≥30d polling guardian running, no missed exit | Phase 4 consideration |
| B9 | ≥90d HIT/MISS ledger | Phase 4 deploy |
| B10 | ALLOW false-negative ≤2% rolling 90d | Phase 4 deploy |
| B11 | BLOCK precision ≥70% rolling 90d | Phase 4 deploy |
| B12 | External vault contract audit | Phase 4 deploy |
| B13 | Xerberus dendrogram scorecards on MEI + XER | Phase 4 deploy |
| B14 | Documented incident response (named human, named timeline) | Phase 4 deploy |

---

## 4. KPIs — measured continuously, gated at phase boundaries

### Decoder accuracy (the ones that decide vault deployment)

| KPI | Definition | Phase 4 gate |
|---|---|---|
| **ALLOW false-negative rate** | (ALLOW calls where MEI entered AND position lost >5% NAV from a risk channel riskclaw was supposed to catch) / (total ALLOW calls where MEI entered), rolling 90d | ≤2% |
| **BLOCK precision** | (BLOCK calls on pools that subsequently had a verified incident or material drift within 30d) / (total BLOCK calls), rolling 90d | ≥70% |
| **WARN signal-to-noise** | qualitative review every 30d — track whether WARN bucket is collapsing into noise | reviewed, not numerically gated |

Definitions matter: a "risk channel riskclaw was supposed to catch" = depeg, oracle manipulation, liquidity exit, scam-token characteristics, TVL drift exceeding configured bands, mintable/pausable misuse. NAV losses from market beta, IL on healthy pools, or risk channels riskclaw doesn't claim to cover do not count against false-negative rate.

### Volume

| KPI | Phase 1 → 2 | Phase 4 gate |
|---|---|---|
| Decisions logged | ≥30 | ≥500 cumulative |
| Distinct pools scored | ≥10 | ≥50 cumulative |
| Distinct protocols audited | ≥2 | ≥5 cumulative |

### Operational

| KPI | Target |
|---|---|
| `/api/score` p95 latency | <500ms (MegaETH), <2s (Base polling) |
| Daemon uptime (rolling 30d) | ≥99% |
| Decoder coverage on intended entries | ≥95% (MEI rarely wants to enter a pool with no decoder) |

---

## 5. Open questions for the riskclaw maintainer

These are async — Phase 1 is unblocked, but Q3 and Q4 must be answered before Phase 2 starts.

1. **`mega-vault-exiter` target** — which vault protocol(s) is the bounded-delegation pattern wired against today? Live MegaETH vaults, or scaffolded for protocols that haven't shipped yet?
2. **Tulpea (RWA lending) timeline** — listed as "next." Any rough ETA, or gated on protocol launch?
3. **Multi-chain stance** — is MegaETH the long-term target, or is there appetite for the decoder package becoming chain-agnostic? Affects whether non-MegaETH decoders belong upstream or in a fork. **(Phase 2 blocker)**
4. **PR appetite** — would you take upstream PRs for Base-chain protocol decoders following the existing `kumbaya/`/`prism/` shape, or prefer those live downstream? **(Phase 2 blocker)**
5. **`SkillContext` extensions** — anything you've considered adding to the context object that hasn't shipped yet? (Asking before bolting anything on that might collide.)

---

## 6. What is explicitly OUT of scope for riskclaw

Restating because this matters:
- Any vault contract, vault product page, vault README mention
- Any MEI/XER token-specific logic (riskclaw evaluates pools/protocols, not asset-holding theses)
- Any MEI strategy code — strategies live in MEI's repo and call riskclaw over HTTP only
- Any marketing collateral that frames riskclaw as "MEI's safety layer." Riskclaw is anyone's safety layer

If vault-related work needs riskclaw to grow, that's a feature request to the public daemon, not a private extension.

---

## 7. This week — concrete first steps

1. Clone `github.com/Truunik/riskclaw-daemon`. Install. Verify `bun` + workspace builds.
2. Run `claw audit kumbaya` and `claw audit prism` on mainnet (4326) and testnet (6343). Save the four baseline JSONs to MEI's repo as the "day-zero" decoder snapshot.
3. Stand up the daemon's web server locally. MEI calls `/api/score`, `/api/audit`, `/api/preflight-raw` over HTTP — do **not** import the package.
4. Implement the HIT/MISS ledger schema (§2 Phase 1). SQLite or flat JSONL is fine; don't over-engineer.
5. Wire `/api/preflight-raw` as a hard gate before any signer call. Pick one strategy: passive LP into highest-scoring Kumbaya pool, threshold `riskBps ≤ 2000`.
6. Send the five maintainer questions (§5) to Truu. Phase 2 unblocks once Q3 and Q4 are answered.
7. After 7 days, write up the first ledger summary: distribution of ALLOW/WARN/BLOCK calls, any decoder gaps observed, anything that looked like a false positive or false negative.

---

## 8. Reference

- Riskclaw repo: `github.com/Truunik/riskclaw-daemon` (MIT)
- Riskclaw local: `~/projects/riskclaw-daemon`
- MegaETH mainnet RPC: `https://mainnet.megaeth.com/rpc` (chainId 4326)
- MegaETH testnet (Carrot) RPC: `https://carrot.megaeth.com/rpc` (chainId 6343)
- Riskclaw skills shipped today: `0g-uniswap-hook`, `mega-vault-exiter`, `mega-preflight`, `mega-aggregator`
- Live verified end-to-end on both MegaETH networks against Kumbaya pools; Prism UniversalRouter calldata decode still pending (shared gap with Kumbaya UniversalRouter)

---

*All decoder/audit logic is MIT — attribute and link riskclaw-daemon wherever MEI's stack ships publicly. None of the above asks anything of the riskclaw repo to change; the integration is downstream consumption only.*
