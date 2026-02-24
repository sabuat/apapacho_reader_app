#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT_DIR/migration-package"
ARCHIVE="$ROOT_DIR/apapacho-reader-migration.tar.gz"

rm -rf "$OUT_DIR" "$ARCHIVE"
mkdir -p "$OUT_DIR"

copy_item() {
  local src="$1"
  local dst="$OUT_DIR/$1"
  mkdir -p "$(dirname "$dst")"
  cp -R "$ROOT_DIR/$src" "$dst"
}

# Core app folders
copy_item "app"
copy_item "assets"
copy_item "lib"
copy_item "components"
copy_item "hooks"
copy_item "constants"
copy_item "docs"
copy_item "react-native-css-interop"

# Core config files
for file in \
  package.json \
  pnpm-lock.yaml \
  tsconfig.json \
  app.config.ts \
  babel.config.js \
  metro.config.js \
  tailwind.config.js \
  global.css \
  theme.config.js \
  eslint.config.js
  do
    if [[ -f "$ROOT_DIR/$file" ]]; then
      copy_item "$file"
    fi
  done

cat > "$OUT_DIR/README-MIGRATION.txt" <<'TXT'
Apapacho Reader - Migration Package

1) In your new repo root, copy all files from this folder.
2) Run: pnpm install
3) Create .env with:
   EXPO_PUBLIC_SUPABASE_URL=...
   EXPO_PUBLIC_SUPABASE_ANON_KEY=...
   EXPO_PUBLIC_BACKEND_API_URL=... (optional)
4) Run SQL from docs/SUPABASE_SETUP.md
5) Start app: npx expo start --clear
TXT

# Create compressed archive too
tar -czf "$ARCHIVE" -C "$ROOT_DIR" "$(basename "$OUT_DIR")"

echo "✅ Migration folder: $OUT_DIR"
echo "✅ Archive: $ARCHIVE"
