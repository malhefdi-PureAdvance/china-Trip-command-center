-- Auth / private-tier shell (Tier 2 foundation — see docs/PRIVATE_TIER.md).
-- Ships EMPTY: no member rows, no notes, no private data. Everything here is
-- fail-closed: a signed-in user with no app_members row gets nothing.
--
-- Role model:
--   owner          — Mohammed (full Tier-2 read/write once features exist)
--   team           — Pure Advance travelers (Sultan, Abdulrahman Alalmaee)
--   program_viewer — program/external contacts (no Tier-2 access by default)
--
-- Membership is provisioned ONLY via the service role / SQL editor (there is
-- deliberately no insert policy), e.g. after a user first signs in:
--   insert into public.app_members (user_id, handle, role)
--   values ('<auth.users id>', 'mohammed', 'owner');

create type public.app_role as enum ('owner', 'team', 'program_viewer');

create table public.app_members (
  user_id uuid primary key references auth.users (id) on delete cascade,
  handle text not null unique check (char_length(handle) >= 2),
  role public.app_role not null default 'program_viewer',
  created_at timestamptz not null default now()
);

-- Tier-2 placeholder shape (team-private notes). Created empty so RLS can be
-- verified end-to-end before any real Tier-2 content exists.
create table public.team_notes (
  id uuid primary key default gen_random_uuid(),
  author_user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(title) >= 2),
  body text not null check (char_length(body) >= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Role lookup for the CURRENT user. security definer so it can read
-- app_members regardless of that table's own policies; search_path pinned.
-- Returns null when the user has no membership row → every policy below
-- evaluates false → fail closed.
create function public.current_app_role() returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.app_members where user_id = auth.uid()
$$;

revoke all on function public.current_app_role() from public;
grant execute on function public.current_app_role() to authenticated;

alter table public.app_members enable row level security;
alter table public.team_notes enable row level security;

-- app_members: a user may see only their own membership row. No insert/
-- update/delete policies — provisioning is service-role only.
create policy app_members_self_read on public.app_members
  for select to authenticated
  using (user_id = auth.uid());

-- team_notes: owner/team read; author-scoped writes; program_viewer and
-- non-members get nothing. Anonymous role has no policies at all.
create policy team_notes_team_read on public.team_notes
  for select to authenticated
  using (public.current_app_role() in ('owner', 'team'));

create policy team_notes_team_insert on public.team_notes
  for insert to authenticated
  with check (
    public.current_app_role() in ('owner', 'team')
    and author_user_id = auth.uid()
  );

create policy team_notes_author_update on public.team_notes
  for update to authenticated
  using (author_user_id = auth.uid() and public.current_app_role() in ('owner', 'team'))
  with check (author_user_id = auth.uid());

create policy team_notes_author_delete on public.team_notes
  for delete to authenticated
  using (author_user_id = auth.uid() and public.current_app_role() in ('owner', 'team'));

comment on table public.app_members is
  'Private-tier membership + role (owner / team / program_viewer). Provisioned via service role only; ships empty.';
comment on table public.team_notes is
  'Tier-2 placeholder: team-private notes. RLS fail-closed via current_app_role(); ships empty — no private data seeded.';
comment on function public.current_app_role() is
  'Role of the signed-in user, or null (fail closed) when no app_members row exists.';
