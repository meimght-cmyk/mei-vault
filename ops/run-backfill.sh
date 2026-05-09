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

# auto-publish: commit + push any new outcome patches
if [[ -n "$(git status --porcelain ledger 2>/dev/null)" ]]; then
  git add ledger >> "${LOG}" 2>&1
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
