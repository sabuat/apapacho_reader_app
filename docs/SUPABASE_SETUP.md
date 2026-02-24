# Configuração do Supabase para o Apapacho Reader

## 1) Variáveis de ambiente do app Expo
Crie um arquivo `.env` na raiz do projeto:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
# Opcional: se você expuser uma API no backend Netlify
EXPO_PUBLIC_BACKEND_API_URL=https://apapacho-admin.netlify.app/.netlify/functions
```

## 2) SQL mínimo para livros e capítulos
Execute no SQL Editor do Supabase:

```sql
create table if not exists public.books (
  id bigint generated always as identity primary key,
  title text not null,
  author text not null,
  slug text unique,
  description text,
  cover_url text,
  published boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.chapters (
  id bigint generated always as identity primary key,
  book_id bigint not null references public.books(id) on delete cascade,
  chapter_number int not null,
  title text not null,
  content text not null,
  created_at timestamptz default now(),
  unique (book_id, chapter_number)
);
```

## 3) Login de usuário
O login usa `supabase.auth` (email/senha), então a tabela de autenticação base já é criada automaticamente pelo Supabase.

Se quiser perfil público do usuário, crie:

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profile: owner can read" on public.profiles
for select using (auth.uid() = id);

create policy "Profile: owner can insert" on public.profiles
for insert with check (auth.uid() = id);

create policy "Profile: owner can update" on public.profiles
for update using (auth.uid() = id);
```
