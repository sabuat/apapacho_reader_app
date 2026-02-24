# Novo repositório (do zero) - Apapacho Reader simples

Este projeto agora está simplificado para você copiar para um repositório novo sem dor de cabeça.

## 1) Criar repositório novo
1. No GitHub, crie um repo vazio.
2. Copie estes arquivos/pastas para o novo repo:
   - `app/`
   - `lib/`
   - `assets/`
   - `docs/`
   - `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `app.config.ts`, `babel.config.js`, `metro.config.js`

## 2) Instalar dependências
```bash
pnpm install
```

## 3) Variáveis de ambiente (.env)
```bash
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
# opcional (se tiver API pronta no backend)
EXPO_PUBLIC_BACKEND_API_URL=https://apapacho-admin.netlify.app/.netlify/functions
```

## 4) Supabase
No SQL Editor do Supabase, execute o SQL de `docs/SUPABASE_SETUP.md`.

## 5) Rodar no Expo Go
```bash
npx expo start --clear
```
Se não conectar no celular:
```bash
npx expo start --tunnel --clear
```

## 6) Fluxo mínimo esperado
- Tela de login abre
- `Crear cuenta` registra usuário
- `Acceder` entra no app
- Biblioteca carrega livros publicados
- No leitor, botão `Siguiente` mostra publicidade curta e avança capítulo
