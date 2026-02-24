# Expo Go: passo a passo (iniciante)

Este guia é para você abrir o app no celular com Expo Go sem se perder.

## 1) Preparar o projeto
No terminal, na pasta do projeto:

```bash
pnpm install
```

## 2) Configurar variáveis de ambiente
Crie o arquivo `.env` na raiz com:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
EXPO_PUBLIC_BACKEND_API_URL=https://apapacho-admin.netlify.app/.netlify/functions
```

> Sem `SUPABASE_URL` e `SUPABASE_ANON_KEY`, o login não funciona.

## 3) Configurar Supabase (uma vez)
No SQL Editor do Supabase, execute o SQL de `docs/SUPABASE_SETUP.md`:
- tabelas `books` e `chapters`
- tabela `profiles` + políticas RLS
- trigger `handle_new_user` para vincular `auth.users` -> `public.profiles`

## 4) Rodar o app para Expo Go
```bash
npx expo start --clear
```

Depois:
- abra o app **Expo Go** no celular
- escaneie o QR code do terminal

Se não conectar, use:
```bash
npx expo start --tunnel --clear
```

## 5) Testar login
1. Abra a tela de login.
2. Clique em **Crear cuenta** para registrar um usuário novo.
3. Se confirmação de email estiver ativa no Supabase, confirme no email.
4. Volte e clique em **Acceder**.
5. O app deve entrar na aba principal `/(tabs)`.

## 6) Checklist rápido se der erro
- `pnpm check` sem erros
- `pnpm lint` sem erros (warnings antigos de admin podem existir)
- `.env` preenchido
- Supabase Auth habilitado com Email/Password
- projeto e celular na mesma rede (ou usar `--tunnel`)
- limpar cache: `npx expo start --clear`

## 7) Sobre a tabela de usuários
- credenciais ficam em `auth.users` (Supabase Auth)
- dados extras do usuário ficam em `public.profiles`
- o vínculo é `public.profiles.id = auth.users.id`
