#!/opt/homebrew/bin/bash
#
# Daily outcome backfill. Run from launchd.
#
# Boots the upstream riskclaw web server if not running, then runs
# backfill-outcomes from the mei-vault repo. Idempotent.
#
set -euo pipefail

RISKCLAW_DAEMON_DIR="${RISKCLAW_DAEMON_DIR:-${HOME}/Desktop/Trading/riskclaw-daemon}"
MEI_VAULT_DIR="${MEI_VAULT_DIR:-${HOME}/Desktop/mei-vault}"
# Public mainnet.base.org rate-limits hard; use publicnode for Base reads.
export BASE_RPC_URL="${BASE_RPC_URL:-https://base.publicnode.com}"
LOG_DIR="${MEI_VAULT_DIR}/ledger/logs"
mkdir -p "${LOG_DIR}"
LOG="${LOG_DIR}/backfill-$(date -u +%Y-%m-%d).log"

if ! curl -fsS -m 3 -o /dev/null "http://localhost:4242/api/integrations" 2>/dev/null; then
  echo "[$(date -u +%FT%TZ)] server down, booting from ${RISKCLAW_DAEMON_DIR}..." >> "${LOG}"
  cd "${RISKCLAW_DAEMON_DIR}"
  nohup /opt/homebrew/bin/bun run apps/web/src/server.ts > /tmp/riskclaw-server.log 2>&1 &
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    if curl -fsS -m 2 -o /dev/null "http://localhost:4242/api/integrations" 2>/dev/null; then break; fi
    sleep 1
  done
fi

cd "${MEI_VAULT_DIR}"
echo "[$(date -u +%FT%TZ)] running outcome backfill" >> "${LOG}"
/opt/homebrew/bin/bun run scripts/backfill-outcomes.ts >> "${LOG}" 2>&1 \
  || echo "[$(date -u +%FT%TZ)] backfill non-zero exit, proceeding to publish whatever data did land" >> "${LOG}"

echo "[$(date -u +%FT%TZ)] generating strategy intents (idempotent, top-N)" >> "${LOG}"
/opt/homebrew/bin/bun run scripts/strategy-passive-lp.ts >> "${LOG}" 2>&1 \
  || echo "[$(date -u +%FT%TZ)] strategy non-zero exit, proceeding" >> "${LOG}"

echo "[$(date -u +%FT%TZ)] running wallet harness" >> "${LOG}"
/opt/homebrew/bin/bun run scripts/wallet-harness.ts >> "${LOG}" 2>&1 \
  || echo "[$(date -u +%FT%TZ)] harness non-zero exit, proceeding" >> "${LOG}"

echo "[$(date -u +%FT%TZ)] computing metrics" >> "${LOG}"
/opt/homebrew/bin/bun run scripts/compute-metrics.ts >> "${LOG}" 2>&1 \
  || echo "[$(date -u +%FT%TZ)] metrics non-zero exit, proceeding" >> "${LOG}"

echo "[$(date -u +%FT%TZ)] computing sim-trade P&L" >> "${LOG}"
/opt/homebrew/bin/bun run scripts/compute-simtrade-pnl.ts >> "${LOG}" 2>&1 \
  || echo "[$(date -u +%FT%TZ)] simtrade non-zero exit, proceeding" >> "${LOG}"

# auto-publish: commit + push outcome patches, intents/harness results, and metrics
if [[ -n "$(git status --porcelain ledger intents metrics 2>/dev/null)" ]]; then
  git add ledger intents metrics >> "${LOG}" 2>&1
  if git commit -m "data: backfill $(date -u +%Y-%m-%dT%H:%MZ)" >> "${LOG}" 2>&1; then
    git push >> "${LOG}" 2>&1 \
      && echo "[$(date -u +%FT%TZ)] published" >> "${LOG}" \
      || echo "[$(date -u +%FT%TZ)] push failed (will retry next cycle)" >> "${LOG}"
  else
    echo "[$(date -u +%FT%TZ)] commit failed (skipping push)" >> "${LOG}"
  fi
else
  echo "[$(date -u +%FT%TZ)] no data changes, skipping commit" >> "${LOG}"
fi

echo "[$(date -u +%FT%TZ)] done" >> "${LOG}"
