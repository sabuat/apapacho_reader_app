# Migração simples (1 comando + 1 arquivo .zip)

Você pediu do jeito simples: **um .zip pronto**.

## Onde rodar o comando?
Na raiz deste projeto (onde está o `package.json`).

## Comando único
```bash
bash scripts/create_migration_package.sh
```

## Resultado
O comando gera:
- `apapacho-reader-migration.zip` ✅ (arquivo para levar ao repo novo)
- `migration-package/` (conteúdo descompactado)

> Se no seu ambiente não existir `zip`, ele gera `apapacho-reader-migration.tar.gz`.

## O que fazer depois
1. Crie um repositório novo no GitHub.
2. Extraia o ZIP dentro do repositório novo.
3. Rode:
   ```bash
   pnpm install
   ```
4. Crie `.env`:
   ```bash
   EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
   ```
5. No Supabase, rode o SQL de `docs/SUPABASE_SETUP.md`.
6. Inicie o app:
   ```bash
   npx expo start --clear
   ```
