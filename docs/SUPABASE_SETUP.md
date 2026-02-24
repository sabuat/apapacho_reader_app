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

## 3) Usuários: qual tabela você realmente precisa
No Supabase Auth, a tabela principal de autenticação **já existe**:

- `auth.users` (gerida pelo Supabase)
- colunas importantes: `id (uuid)`, `email`, `encrypted_password`, `email_confirmed_at`, `created_at`, `updated_at`

> Você não deve criar manualmente outra tabela para senha/email se usar `supabase.auth.signUp` e `signInWithPassword`.

## 4) Tabela pública vinculada ao usuário (recomendado)
Crie uma tabela de perfil ligada ao `auth.users.id`:

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  role text default 'reader',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profile: owner can read" on public.profiles
for select using (auth.uid() = id);

create policy "Profile: owner can insert" on public.profiles
for insert with check (auth.uid() = id);

create policy "Profile: owner can update" on public.profiles
for update using (auth.uid() = id);
```

## 5) Como vincular automaticamente o registro da app ao profile
Crie trigger para gerar `public.profiles` após cadastro em `auth.users`:

```sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, split_part(new.email, '@', 1))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
```

## 6) Fluxo na app
1. Usuário cria conta com `supabase.auth.signUp({ email, password })`.
2. Supabase grava em `auth.users`.
3. Trigger cria registro em `public.profiles`.
4. App pode ler/escrever dados extras do usuário em `public.profiles` com RLS.
