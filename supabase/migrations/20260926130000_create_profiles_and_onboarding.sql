-- Profiles + onboarding responses, with RLS and an auto-provisioning trigger.
--
-- gen_random_uuid() is built into Postgres 13+, but this extension is
-- included for compatibility with older/self-hosted Postgres versions.
create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  username text not null unique,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Public profile data for each authenticated user, 1:1 with auth.users.';

create table if not exists public.onboarding_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  goal text not null,
  -- The live OnboardingPage flow also collects a focus area and a target
  -- timeframe. These two columns are additions on top of the originally
  -- specified schema so that none of the flow's actual answers are dropped.
  domain text,
  duration text,
  motivation text,
  experience_level text,
  -- Populated from the flow's daily time-commitment step (e.g. "45 mins /
  -- day"). No dedicated "commitment" column was specified, and the flow does
  -- not currently ask for a weekly figure, so that value is stored here.
  weekly_time text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.onboarding_responses is 'One row per user with their onboarding answers.';

-- ---------------------------------------------------------------------------
-- Keep updated_at current on every UPDATE
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists set_onboarding_responses_updated_at on public.onboarding_responses;
create trigger set_onboarding_responses_updated_at
  before update on public.onboarding_responses
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auto-create a profile row whenever a new auth user is created.
--
-- Reads `full_name` / `handle` from the user metadata that SignupPage
-- already sends via `supabase.auth.signUp({ options: { data: { ... } } })`.
-- Falls back to the email's local part, and de-duplicates the username on
-- conflict, so signup can never fail because of this trigger.
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  meta jsonb := new.raw_user_meta_data;
  resolved_name text := coalesce(nullif(meta ->> 'full_name', ''), split_part(new.email, '@', 1), 'Explorer');
  resolved_username text := coalesce(nullif(meta ->> 'handle', ''), split_part(new.email, '@', 1), new.id::text);
begin
  begin
    insert into public.profiles (id, name, username)
    values (new.id, resolved_name, resolved_username);
  exception
    when unique_violation then
      begin
        insert into public.profiles (id, name, username)
        values (new.id, resolved_name, resolved_username || '_' || substr(new.id::text, 1, 8));
      exception
        when unique_violation then
          insert into public.profiles (id, name, username)
          values (new.id, resolved_name, new.id::text);
      end;
  end;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security — every user may only read/write their own rows.
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.onboarding_responses enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users can view own onboarding responses" on public.onboarding_responses;
create policy "Users can view own onboarding responses"
  on public.onboarding_responses for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own onboarding responses" on public.onboarding_responses;
create policy "Users can insert own onboarding responses"
  on public.onboarding_responses for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own onboarding responses" on public.onboarding_responses;
create policy "Users can update own onboarding responses"
  on public.onboarding_responses for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Table privileges. RLS above is the real access gate; these grants make the
-- intent explicit and are needed on non-Supabase-hosted Postgres instances
-- that don't pre-configure default privileges for `authenticated`.
-- ---------------------------------------------------------------------------

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.onboarding_responses to authenticated;
