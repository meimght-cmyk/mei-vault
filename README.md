# mei-vault

Mei's agentic DeFi build log. The end goal is a vault that accumulates MEI + XER tokens into a treasury, deploying capital only into pools that pass a `riskclaw-daemon` audit and only holding positions while every per-pool signal stays green.

The vault doesn't exist yet. The data does. **Every test, every result, public.** Holders can watch, fork, or join the run.

## Status

- **Phase 1 — read-only safety oracle:** live since 2026-05-08. 6-hourly probe of 100 safest + 50 riskiest pools on MegaETH (kumbaya + prism). Strategy module produces dry-run intents.
- **Phase 2 — Base decoders:** **live end-to-end since 2026-05-20.** `uniswap-v3-base` shipped, wired into the daily probe (306 Base pools alongside 783 MegaETH pools). First cross-chain catch: a Base pool the May-18 audit marked healthy was correctly flagged WARN on 2026-05-20 after its liquidity drained. See [docs/upstream-base-changes.md](docs/upstream-base-changes.md).
- **Phase 2.5 — UniV4 Base decoder:** **live in probe pipeline 2026-05-21.** MEI's 3 V4 pools probed each cycle (1 healthy at riskBps=0, 2 launchpad-default high-fee pools at riskBps=1000). Server accepts 32-byte poolIds for V4; decoder reads state via StateView (`getSlot0` + `getLiquidity`); catastrophic liquidity drops are caught by the existing backfill rules via the decoder's `inactiveLiquidity → +5000 bps` translation. Seed-pool approach over full Initialize-event audit (V4 universe is too noisy on Base).
- **Phase 3 — polling vault-exiter port:** queued.
- **Phase 4 — vault contract:** hard-floored on ≥90 days of ledger data + ALLOW false-negative ≤2%, BLOCK precision ≥70%, plus an external audit. **Earliest unlock: 2026-08-07.**

📊 **Live dashboards:**
- [Phase 4 readiness](metrics/README.md) — ALLOW false-neg / BLOCK precision vs floors
- [Sim-trade P&L](metrics/simtrade.md) — what real capital would have done following the signals
- [Wallet harness](metrics/harness.md) — would-sign / would-skip verdicts per intent, signer-less

## Layout

```
mei-vault/
├── docs/
│   ├── integration.md   — design doc (vault thesis, phased plan, upstream questions)
│   ├── handoff.md       — Truu→Mei structural charter (KPIs, blockers, phase gates)
│   └── kewe.md          — Kewe ERC-8004 binding + Phase 4 Mei agent card draft
├── scripts/             — Mei-side TS: rank-pools, whitelist, preflight-ledger,
│                          strategy-passive-lp, backfill-outcomes, migrate-ledger-schema
├── ops/                 — launchd plists + bash runners
├── ledger/              — score-*.jsonl probe rows + outcome-patches.jsonl
├── whitelist/           — daily approved-pools snapshots (strict riskBps=0)
├── intents/             — dry-run strategy proposals (one file per intent)
└── audits/              — ranked.json + day-zero protocol baselines
```

## How to read the ledger

Each row in `ledger/score-YYYY-MM-DD.jsonl` is a probe of one pool at one moment:

```json
{
  "ts": "...",
  "protocol": "kumbaya",
  "pool": "0x...",
  "decision": "ALLOW" | "WARN" | "BLOCK" | "PROBE" | "ERROR",
  "riskBps": 0,
  "action_taken": null,
  "outcome_7d": null,
  "outcome_30d": null,
  "_probe": { "auditRiskBps": ..., "liveRiskBps": ..., "components": {...} }
}
```

`outcome_7d` and `outcome_30d` are filled in by `scripts/backfill-outcomes.ts` — for each row older than 7d/30d, it re-scores the pool and decides whether the pool experienced a loss event (riskBps jump to ≥5000 from ≤2000, became unreachable, depeg >10%, +50% additional TVL drift). Patches land in `ledger/outcome-patches.jsonl`, joined to original rows by `(pool, ts_original, horizon)`.

The Phase 4 capital-deploy gates (false-negative rate, BLOCK precision) get computed from this joined view — see `docs/handoff.md` §4.

## Cold-pickup

```bash
# verify upstream daemon is running
curl -s http://localhost:4242/api/integrations

# refresh state
cd ~/Desktop/mei-vault
bun run scripts/rank-pools.ts > audits/ranked.md
bun run scripts/whitelist.ts
bun run scripts/strategy-passive-lp.ts

# manually trigger a ledger probe
bash ops/run-ledger.sh
```

## Dependencies

The upstream `riskclaw-daemon` (https://github.com/Truunik/riskclaw-daemon) provides the `/api/score`, `/api/audit`, `/api/preflight-raw` endpoints this repo consumes. By default, scripts assume it's running locally on `:4242` and that the source clone lives at `~/Desktop/Trading/riskclaw-daemon`. Override with `RISKCLAW_DAEMON_DIR` and `RISKCLAW_SERVER` env vars.

## License

MIT. Same as upstream.
