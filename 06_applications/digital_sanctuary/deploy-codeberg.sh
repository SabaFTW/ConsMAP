#!/usr/bin/env bash
# Deploy the built site to Codeberg Pages → https://lyraactive.codeberg.page/ReBiS/
#
# ONE-TIME AUTH (pick one):
#   A) SSH  — add ~/.ssh/id_ed25519.pub to Codeberg → Settings → SSH/GPG Keys,
#             then leave CODEBERG_REMOTE as the default git@ URL below.
#   B) Token — Codeberg → Settings → Applications → Generate Token (scope: write:repository),
#             then run:  CODEBERG_REMOTE="https://<USER>:<TOKEN>@codeberg.org/LyraActive/ReBiS.git" ./deploy-codeberg.sh
#
# After auth is set up, syncing is just:  ./deploy-codeberg.sh
set -euo pipefail
APP="$(cd "$(dirname "$0")" && pwd)"
DEPLOY="$APP/.codeberg-deploy"
REMOTE="${CODEBERG_REMOTE:-git@codeberg.org:LyraActive/ReBiS.git}"

echo "▸ building (base /ReBiS/) …"
cd "$APP"
VITE_BASE=/ReBiS/ ./node_modules/.bin/vite build

echo "▸ trimming dist for a lean deploy …"
rm -rf dist/grandbus_codex
python3 "$APP/scripts/trim_dist.py" dist || true

echo "▸ preparing Codeberg pages clone …"
if [ ! -d "$DEPLOY/.git" ]; then
  git clone --branch pages --single-branch "$REMOTE" "$DEPLOY"
fi
cd "$DEPLOY"
git remote set-url origin "$REMOTE"
git fetch origin pages
git reset --hard origin/pages
find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -r "$APP/dist/." .
git add -A
git commit -m "deploy: ConsMAP Stories ($(date +%F))" || { echo "nothing new to deploy"; exit 0; }
git push origin pages
echo "✓ deployed → https://lyraactive.codeberg.page/ReBiS/  (allow ~1 min for Codeberg to rebuild)"
