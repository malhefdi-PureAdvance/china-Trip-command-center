-- App-facing mission intelligence tables. These back the structures that the
-- public app currently ships statically from packages/domain (mission phases,
-- itinerary intelligence, curated business-target dossiers, hydration source
-- metadata) so a future authenticated tier can serve the same shapes from
-- Supabase. Content policy: PUBLIC-TIER, demo-safe data only — no contact
-- identifiers, booking references, or private material (see docs/PRIVATE_TIER.md).

create type public.target_category as enum (
  'ai-biotech',
  'biomanufacturing',
  'coolvex-sourcing',
  'corporate-visit',
  'ecosystem'
);
create type public.target_priority as enum ('must_contact', 'high', 'medium', 'watchlist');

create table public.mission_phases (
  id text primary key check (char_length(id) >= 2),
  sort_order integer not null check (sort_order > 0),
  label text not null check (char_length(label) >= 1),
  name text not null check (char_length(name) >= 2),
  city text not null check (char_length(city) >= 2),
  week_tag text not null check (char_length(week_tag) >= 1),
  starts_on date not null,
  ends_on date not null check (ends_on >= starts_on),
  headline text check (headline is null or char_length(headline) >= 2),
  created_at timestamptz not null default now(),
  unique (sort_order)
);

create table public.business_target_dossiers (
  id text primary key check (char_length(id) >= 2),
  name text not null check (char_length(name) >= 2),
  name_local text,
  category public.target_category not null,
  city text not null check (char_length(city) >= 2),
  area text not null check (char_length(area) >= 1),
  corridor text not null check (char_length(corridor) >= 2),
  website text,
  one_liner text not null check (char_length(one_liner) >= 2),
  what_they_do text not null check (char_length(what_they_do) >= 2),
  why_it_matters text not null check (char_length(why_it_matters) >= 2),
  visit_objective text not null check (char_length(visit_objective) >= 2),
  route text not null check (char_length(route) >= 1),
  priority public.target_priority not null,
  confidence public.source_confidence not null,
  talking_points text[] not null default '{}',
  open_questions text[] not null default '{}',
  risks text[] not null default '{}',
  fit_score integer check (fit_score is null or (fit_score >= 0 and fit_score <= 100)),
  status public.business_target_status not null,
  public_sources text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.itinerary_intel (
  itinerary_item_id uuid primary key references public.itinerary_items(id) on delete cascade,
  sub_sessions jsonb not null default '[]'::jsonb,
  related_target_ids text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.hydration_sources (
  path text primary key check (char_length(path) >= 2),
  note text,
  created_at timestamptz not null default now()
);

create index business_target_dossiers_corridor_priority_idx
  on public.business_target_dossiers(corridor, priority);
create index mission_phases_sort_order_idx on public.mission_phases(sort_order);

comment on table public.mission_phases is
  'Program phase spine for the mission timeline (arrival through departure). Public-tier operational anchors only.';
comment on table public.business_target_dossiers is
  'App-facing curated visit dossiers. Public-tier only: no contact identifiers, personal names, or exact unit/street addresses.';
comment on table public.itinerary_intel is
  'Per-itinerary-item enrichment: compact sub-sessions (jsonb array of {time,title}) and source-grounded dossier links.';
comment on table public.hydration_sources is
  'Workspace-relative source files the app data was hydrated from; provenance metadata only.';

do $$
declare
  table_id text;
begin
  foreach table_id in array array[
    'mission_phases',
    'business_target_dossiers',
    'itinerary_intel',
    'hydration_sources'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_id);
    execute format(
      'create policy %I on public.%I for select to authenticated using (true)',
      table_id || '_authenticated_read_placeholder',
      table_id
    );
  end loop;
end $$;
