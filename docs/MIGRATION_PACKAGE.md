# Pacote de Migração (repo novo)

Use este fluxo para levar o app para um repositório novo de forma simples.

## 1) Gerar o pacote automaticamente

```bash
bash scripts/create_migration_package.sh
```

Isso gera:
- pasta: `migration-package/`
- arquivo compactado: `apapacho-reader-migration.tar.gz`

## 2) Criar repo novo e copiar arquivos

No seu computador:

```bash
mkdir apapacho-reader-novo
cd apapacho-reader-novo
# copie o conteúdo de migration-package aqui
```

## 3) Instalar e configurar

```bash
pnpm install
```

Crie `.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
EXPO_PUBLIC_BACKEND_API_URL=https://apapacho-admin.netlify.app/.netlify/functions
```

## 4) Configurar Supabase

- Execute o SQL em `docs/SUPABASE_SETUP.md`.
- Isso cria `books`, `chapters`, `profiles`, policies e trigger de vínculo.

## 5) Rodar no Expo Go

```bash
npx expo start --clear
```

Se não conectar no celular:

```bash
npx expo start --tunnel --clear
```

## 6) Publicar no GitHub

```bash
git init
git add .
git commit -m "Initial minimal Apapacho Reader"
git branch -M main
git remote add origin <URL_DO_REPO_NOVO>
git push -u origin main
```
