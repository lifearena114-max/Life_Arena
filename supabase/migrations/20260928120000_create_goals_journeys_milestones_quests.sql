-- Core product loop foundation: Goal -> Journey -> Milestones -> Quests.
--
-- Depends on public.set_updated_at() from
-- 20260926130000_create_profiles_and_onboarding.sql (reused, not redefined).
--
-- Ownership integrity: every child table carries user_id, and its foreign keys
-- to the parent are COMPOSITE (parent_id, user_id). RLS alone only checks the
-- row being written, not the row it points to, so plain single-column FKs
-- would let a user attach rows to another user's parent. The composite FKs
-- make that impossible at the database level.

-- ---------------------------------------------------------------------------
-- goals
-- ---------------------------------------------------------------------------

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (length(btrim(title)) > 0),
  description text,
  -- Focus area id as used by onboarding (e.g. 'coding', 'fitness'). Free text
  -- on purpose so adding a focus area in the UI needs no migration.
  category text,
  target_date date,
  status text not null default 'active'
    check (status in ('active', 'completed', 'paused', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Target for child composite foreign keys.
  constraint goals_id_user_id_key unique (id, user_id)
);

comment on table public.goals is 'A goal a user is working toward. Owned by exactly one user.';

create index if not exists goals_user_id_idx on public.goals (user_id);

-- ---------------------------------------------------------------------------
-- journeys
-- ---------------------------------------------------------------------------

create table if not exists public.journeys (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (length(btrim(title)) > 0),
  description text,
  status text not null default 'active'
    check (status in ('active', 'completed', 'paused', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint journeys_goal_owner_fkey
    foreign key (goal_id, user_id) references public.goals (id, user_id) on delete cascade,
  constraint journeys_id_user_id_key unique (id, user_id)
);

comment on table public.journeys is 'A plan of milestones and quests toward a goal.';

create index if not exists journeys_user_id_idx on public.journeys (user_id);
create index if not exists journeys_goal_id_idx on public.journeys (goal_id);

-- ---------------------------------------------------------------------------
-- journey_milestones
-- ---------------------------------------------------------------------------

create table if not exists public.journey_milestones (
  id uuid primary key default gen_random_uuid(),
  journey_id uuid not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (length(btrim(title)) > 0),
  description text,
  position integer not null check (position >= 0),
  -- Same vocabulary the roadmap UI already uses for its phases.
  status text not null default 'upcoming'
    check (status in ('locked', 'upcoming', 'active', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint journey_milestones_journey_owner_fkey
    foreign key (journey_id, user_id) references public.journeys (id, user_id) on delete cascade,
  -- Deterministic ordering: one milestone per position per journey. Deferred
  -- so several rows can be re-ordered within a single statement/transaction.
  constraint journey_milestones_journey_position_key
    unique (journey_id, position) deferrable initially deferred,
  -- Target for the quests composite foreign key (milestone must belong to the
  -- same journey as the quest).
  constraint journey_milestones_id_journey_id_key unique (id, journey_id)
);

comment on table public.journey_milestones is 'Ordered stages of a journey; ordered by position.';

create index if not exists journey_milestones_user_id_idx on public.journey_milestones (user_id);
-- journey_id lookups are served by the (journey_id, position) unique index.

-- ---------------------------------------------------------------------------
-- quests
-- ---------------------------------------------------------------------------

create table if not exists public.quests (
  id uuid primary key default gen_random_uuid(),
  journey_id uuid not null,
  milestone_id uuid not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (length(btrim(title)) > 0),
  description text,
  xp integer not null default 0 check (xp >= 0),
  due_date date,
  status text not null default 'pending'
    check (status in ('pending', 'completed', 'skipped')),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint quests_journey_owner_fkey
    foreign key (journey_id, user_id) references public.journeys (id, user_id) on delete cascade,
  constraint quests_milestone_journey_fkey
    foreign key (milestone_id, journey_id) references public.journey_milestones (id, journey_id) on delete cascade,
  -- completed_at is set if and only if the quest is completed.
  constraint quests_completed_at_matches_status
    check ((status = 'completed') = (completed_at is not null))
);

comment on table public.quests is 'A concrete task inside a milestone that awards XP when completed.';

create index if not exists quests_user_id_idx on public.quests (user_id);
create index if not exists quests_journey_id_idx on public.quests (journey_id);
create index if not exists quests_milestone_id_idx on public.quests (milestone_id);
create index if not exists quests_due_date_idx on public.quests (due_date) where due_date is not null;

-- ---------------------------------------------------------------------------
-- updated_at (reuses public.set_updated_at())
-- ---------------------------------------------------------------------------

drop trigger if exists set_goals_updated_at on public.goals;
create trigger set_goals_updated_at
  before update on public.goals
  for each row execute function public.set_updated_at();

drop trigger if exists set_journeys_updated_at on public.journeys;
create trigger set_journeys_updated_at
  before update on public.journeys
  for each row execute function public.set_updated_at();

drop trigger if exists set_journey_milestones_updated_at on public.journey_milestones;
create trigger set_journey_milestones_updated_at
  before update on public.journey_milestones
  for each row execute function public.set_updated_at();

drop trigger if exists set_quests_updated_at on public.quests;
create trigger set_quests_updated_at
  before update on public.quests
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — users can only access their own rows.
-- (select auth.uid()) lets Postgres evaluate the call once per statement
-- instead of once per row.
-- ---------------------------------------------------------------------------

alter table public.goals enable row level security;
alter table public.journeys enable row level security;
alter table public.journey_milestones enable row level security;
alter table public.quests enable row level security;

-- goals
drop policy if exists "Users can view own goals" on public.goals;
create policy "Users can view own goals"
  on public.goals for select
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own goals" on public.goals;
create policy "Users can insert own goals"
  on public.goals for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own goals" on public.goals;
create policy "Users can update own goals"
  on public.goals for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own goals" on public.goals;
create policy "Users can delete own goals"
  on public.goals for delete
  using ((select auth.uid()) = user_id);

-- journeys
drop policy if exists "Users can view own journeys" on public.journeys;
create policy "Users can view own journeys"
  on public.journeys for select
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own journeys" on public.journeys;
create policy "Users can insert own journeys"
  on public.journeys for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own journeys" on public.journeys;
create policy "Users can update own journeys"
  on public.journeys for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own journeys" on public.journeys;
create policy "Users can delete own journeys"
  on public.journeys for delete
  using ((select auth.uid()) = user_id);

-- journey_milestones
drop policy if exists "Users can view own milestones" on public.journey_milestones;
create policy "Users can view own milestones"
  on public.journey_milestones for select
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own milestones" on public.journey_milestones;
create policy "Users can insert own milestones"
  on public.journey_milestones for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own milestones" on public.journey_milestones;
create policy "Users can update own milestones"
  on public.journey_milestones for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own milestones" on public.journey_milestones;
create policy "Users can delete own milestones"
  on public.journey_milestones for delete
  using ((select auth.uid()) = user_id);

-- quests
drop policy if exists "Users can view own quests" on public.quests;
create policy "Users can view own quests"
  on public.quests for select
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own quests" on public.quests;
create policy "Users can insert own quests"
  on public.quests for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own quests" on public.quests;
create policy "Users can update own quests"
  on public.quests for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own quests" on public.quests;
create policy "Users can delete own quests"
  on public.quests for delete
  using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- Privileges. Supabase's default privileges may grant anon access to new
-- tables; revoke that so only signed-in users can reach them (RLS would deny
-- anon anyway, this is defense in depth).
-- ---------------------------------------------------------------------------

revoke all on public.goals from anon;
revoke all on public.journeys from anon;
revoke all on public.journey_milestones from anon;
revoke all on public.quests from anon;

grant select, insert, update, delete on public.goals to authenticated;
grant select, insert, update, delete on public.journeys to authenticated;
grant select, insert, update, delete on public.journey_milestones to authenticated;
grant select, insert, update, delete on public.quests to authenticated;
