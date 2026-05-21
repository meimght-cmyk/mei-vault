#!/opt/homebrew/bin/bash
#
# Polling vault-exiter. Run from launchd at ~5min cadence.
#
# Boots the upstream riskclaw web server if not running, then runs the
# vault-exiter from the mei-vault repo. Idempotent. Auto-publishes any
# new exit events + dashboard updates.
#
set -euo pipefail

RISKCLAW_DAEMON_DIR="${RISKCLAW_DAEMON_DIR:-${HOME}/Desktop/Trading/riskclaw-daemon}"
MEI_VAULT_DIR="${MEI_VAULT_DIR:-${HOME}/Desktop/mei-vault}"
LOG_DIR="${MEI_VAULT_DIR}/ledger/logs"
mkdir -p "${LOG_DIR}"
LOG="${LOG_DIR}/vault-exiter-$(date -u +%Y-%m-%d).log"
# Public mainnet.base.org rate-limits hard; use publicnode for Base reads.
export BASE_RPC_URL="${BASE_RPC_URL:-https://base.publicnode.com}"

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
echo "[$(date -u +%FT%TZ)] running vault-exiter" >> "${LOG}"
/opt/homebrew/bin/bun run scripts/vault-exiter-base.ts >> "${LOG}" 2>&1 \
  || echo "[$(date -u +%FT%TZ)] vault-exiter non-zero exit, proceeding to publish" >> "${LOG}"

# auto-publish: commit + push any new exit events / state / dashboard updates
if [[ -n "$(git status --porcelain ledger metrics 2>/dev/null)" ]]; then
  git add ledger/exit-events.jsonl ledger/exit-state.json metrics/vault-exiter.json metrics/vault-exiter.md >> "${LOG}" 2>&1 || true
  if git commit -m "data: vault-exiter $(date -u +%Y-%m-%dT%H:%MZ)" >> "${LOG}" 2>&1; then
    git push >> "${LOG}" 2>&1 \
      && echo "[$(date -u +%FT%TZ)] published" >> "${LOG}" \
      || echo "[$(date -u +%FT%TZ)] push failed (will retry next cycle)" >> "${LOG}"
  else
    echo "[$(date -u +%FT%TZ)] commit failed or nothing to commit" >> "${LOG}"
  fi
else
  echo "[$(date -u +%FT%TZ)] no state changes, skipping commit" >> "${LOG}"
fi

echo "[$(date -u +%FT%TZ)] done" >> "${LOG}"
