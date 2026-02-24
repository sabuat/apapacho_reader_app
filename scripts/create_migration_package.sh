#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT_DIR/migration-package"
ZIP_FILE="$ROOT_DIR/apapacho-reader-migration.zip"
TAR_FILE="$ROOT_DIR/apapacho-reader-migration.tar.gz"

rm -rf "$OUT_DIR" "$ZIP_FILE" "$TAR_FILE"
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
copy_item "scripts"

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
Apapacho Reader - Migration ZIP

1) Copie tudo desta pasta para o repo novo
2) Rode: pnpm install
3) Crie .env com:
   EXPO_PUBLIC_SUPABASE_URL=...
   EXPO_PUBLIC_SUPABASE_ANON_KEY=...
4) Rode SQL em docs/SUPABASE_SETUP.md
5) Rode: npx expo start --clear
TXT

if command -v zip >/dev/null 2>&1; then
  (
    cd "$ROOT_DIR"
    zip -rq "$(basename "$ZIP_FILE")" "$(basename "$OUT_DIR")"
  )
  echo "✅ ZIP: $ZIP_FILE"
else
  tar -czf "$TAR_FILE" -C "$ROOT_DIR" "$(basename "$OUT_DIR")"
  echo "⚠️ zip não encontrado; gerado TAR.GZ: $TAR_FILE"
fi

echo "✅ Pasta: $OUT_DIR"
