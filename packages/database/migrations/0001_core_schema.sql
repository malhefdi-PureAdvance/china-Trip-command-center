create extension if not exists pgcrypto;

create type public.user_role as enum ('owner', 'admin', 'member', 'viewer');
create type public.person_kind as enum ('traveler', 'operator', 'business_contact', 'external');
create type public.membership_role as enum ('lead', 'operator', 'traveler', 'advisor', 'viewer');
create type public.trip_status as enum ('planning', 'active', 'complete', 'archived');
create type public.trip_member_role as enum ('mission_lead', 'traveler', 'host', 'remote_support');
create type public.itinerary_item_kind as enum (
  'flight',
  'train',
  'transfer',
  'hotel',
  'meeting',
  'site_visit',
  'meal',
  'buffer',
  'admin'
);
create type public.itinerary_item_status as enum (
  'draft',
  'proposed',
  'confirmed',
  'changed',
  'cancelled',
  'complete'
);
create type public.note_visibility as enum ('private', 'team', 'trip');
create type public.business_target_status as enum (
  'candidate',
  'source_needed',
  'researched',
  'profiled',
  'reviewed',
  'submission_ready',
  'submitted',
  'scheduled',
  'visited',
  'follow_up',
  'archived'
);
create type public.source_confidence as enum ('unknown', 'low', 'medium', 'high', 'verified');
create type public.visit_request_status as enum (
  'draft',
  'ready',
  'submitted',
  'accepted',
  'declined',
  'scheduled',
  'closed'
);
create type public.lead_stage as enum (
  'new',
  'qualified',
  'intro_requested',
  'meeting_booked',
  'nurture',
  'closed'
);
create type public.share_permission as enum ('read', 'comment', 'edit');
create type public.proposal_status as enum ('draft', 'open', 'accepted', 'rejected', 'superseded');
create type public.activity_entity as enum (
  'trip',
  'itinerary_item',
  'location',
  'note',
  'business_target',
  'visit_request',
  'lead',
  'share',
  'itinerary_proposal'
);
create type public.location_type as enum (
  'airport',
  'hotel',
  'venue',
  'office',
  'factory',
  'restaurant',
  'other'
);
create type public.attendee_response_status as enum ('pending', 'accepted', 'declined', 'tentative');

create table public.persons (
  id uuid primary key default gen_random_uuid(),
  kind public.person_kind not null,
  display_name text not null check (char_length(display_name) >= 2),
  organization text check (organization is null or char_length(organization) >= 2),
  title text check (title is null or char_length(title) >= 2),
  bio text check (bio is null or char_length(bio) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.users (
  id uuid primary key default gen_random_uuid(),
  person_id uuid references public.persons(id) on delete set null,
  auth_provider text not null check (auth_provider in ('supabase', 'demo')),
  handle text not null unique check (char_length(handle) >= 2),
  role public.user_role not null default 'viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) >= 2),
  slug text not null unique check (char_length(slug) >= 2),
  description text check (description is null or char_length(description) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role public.membership_role not null,
  joined_at timestamptz not null default now(),
  unique (team_id, user_id)
);

create table public.trips (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  name text not null check (char_length(name) >= 2),
  slug text not null unique check (char_length(slug) >= 2),
  status public.trip_status not null default 'planning',
  region text not null check (char_length(region) >= 2),
  starts_on date not null,
  ends_on date not null check (ends_on >= starts_on),
  summary text check (summary is null or char_length(summary) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.trip_members (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  person_id uuid not null references public.persons(id) on delete cascade,
  role public.trip_member_role not null,
  availability_note text check (availability_note is null or char_length(availability_note) <= 500),
  created_at timestamptz not null default now(),
  unique (trip_id, person_id, role)
);

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) >= 2),
  city text not null check (char_length(city) >= 2),
  country text not null check (char_length(country) >= 2),
  address_label text check (address_label is null or char_length(address_label) >= 2),
  latitude double precision check (latitude is null or latitude between -90 and 90),
  longitude double precision check (longitude is null or longitude between -180 and 180),
  location_type public.location_type not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.saved_locations (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  label text not null check (char_length(label) >= 2),
  note text check (note is null or char_length(note) <= 1000),
  created_by_user_id uuid not null references public.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  unique (trip_id, location_id, label)
);

create table public.itinerary_items (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  title text not null check (char_length(title) >= 2),
  kind public.itinerary_item_kind not null,
  status public.itinerary_item_status not null default 'draft',
  starts_at timestamptz not null,
  ends_at timestamptz not null check (ends_at >= starts_at),
  timezone text not null check (char_length(timezone) >= 2),
  owner_user_id uuid references public.users(id) on delete set null,
  notes text check (notes is null or char_length(notes) <= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.itinerary_attendees (
  id uuid primary key default gen_random_uuid(),
  itinerary_item_id uuid not null references public.itinerary_items(id) on delete cascade,
  person_id uuid not null references public.persons(id) on delete cascade,
  response_status public.attendee_response_status not null default 'pending',
  created_at timestamptz not null default now(),
  unique (itinerary_item_id, person_id)
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  author_user_id uuid not null references public.users(id) on delete restrict,
  title text not null check (char_length(title) >= 2),
  body text not null check (char_length(body) >= 1),
  visibility public.note_visibility not null default 'team',
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.business_targets (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  name text not null check (char_length(name) >= 2),
  city text not null check (char_length(city) >= 2),
  country text not null check (char_length(country) >= 2),
  sector text not null check (char_length(sector) >= 2),
  status public.business_target_status not null default 'candidate',
  priority_rank integer check (priority_rank is null or priority_rank > 0),
  source_confidence public.source_confidence not null default 'unknown',
  last_checked_at timestamptz,
  owner_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.business_target_profiles (
  id uuid primary key default gen_random_uuid(),
  business_target_id uuid not null unique references public.business_targets(id) on delete cascade,
  action_summary text not null check (char_length(action_summary) >= 10),
  visit_objective text not null check (char_length(visit_objective) >= 10),
  products_or_capabilities text[] not null default '{}',
  talking_points text[] not null default '{}',
  open_questions text[] not null default '{}',
  risks text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.business_target_sources (
  id uuid primary key default gen_random_uuid(),
  business_target_id uuid not null references public.business_targets(id) on delete cascade,
  source_label text not null check (char_length(source_label) >= 2),
  source_url text check (source_url is null or source_url ~ '^https?://'),
  source_confidence public.source_confidence not null default 'unknown',
  last_checked_at timestamptz not null,
  extracted_notes text check (extracted_notes is null or char_length(extracted_notes) <= 2000),
  created_at timestamptz not null default now()
);

create table public.business_target_scores (
  id uuid primary key default gen_random_uuid(),
  business_target_id uuid not null references public.business_targets(id) on delete cascade,
  fit_score integer not null check (fit_score between 0 and 100),
  access_score integer not null check (access_score between 0 and 100),
  timing_score integer not null check (timing_score between 0 and 100),
  priority_score integer not null check (priority_score between 0 and 100),
  rationale text not null check (char_length(rationale) >= 10),
  scored_by_user_id uuid references public.users(id) on delete set null,
  scored_at timestamptz not null
);

create table public.visit_requests (
  id uuid primary key default gen_random_uuid(),
  business_target_id uuid not null references public.business_targets(id) on delete cascade,
  requested_by_user_id uuid not null references public.users(id) on delete restrict,
  status public.visit_request_status not null default 'draft',
  requested_window_start timestamptz not null,
  requested_window_end timestamptz not null check (requested_window_end >= requested_window_start),
  message_draft text not null check (char_length(message_draft) <= 4000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  business_target_id uuid references public.business_targets(id) on delete set null,
  person_id uuid references public.persons(id) on delete set null,
  stage public.lead_stage not null default 'new',
  summary text not null check (char_length(summary) >= 2),
  next_action text check (next_action is null or char_length(next_action) >= 2),
  owner_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.shares (
  id uuid primary key default gen_random_uuid(),
  entity_type public.activity_entity not null,
  entity_id uuid not null,
  shared_by_user_id uuid not null references public.users(id) on delete restrict,
  shared_with_user_id uuid references public.users(id) on delete cascade,
  shared_with_team_id uuid references public.teams(id) on delete cascade,
  permission public.share_permission not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz,
  check (shared_with_user_id is not null or shared_with_team_id is not null)
);

create table public.itinerary_proposals (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  proposed_by_user_id uuid not null references public.users(id) on delete restrict,
  title text not null check (char_length(title) >= 2),
  reason text not null check (char_length(reason) >= 2),
  status public.proposal_status not null default 'draft',
  starts_at timestamptz not null,
  ends_at timestamptz not null check (ends_at >= starts_at),
  location_id uuid references public.locations(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.activity_log (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references public.trips(id) on delete set null,
  actor_user_id uuid references public.users(id) on delete set null,
  entity_type public.activity_entity not null,
  entity_id uuid not null,
  action text not null check (char_length(action) >= 2),
  summary text not null check (char_length(summary) >= 2),
  created_at timestamptz not null default now()
);

create table public.business_visit_data_standards (
  id text primary key,
  version text not null,
  required_fields text[] not null,
  blocked_sensitive_fields text[] not null,
  notes text not null,
  created_at timestamptz not null default now()
);

create index trips_team_id_idx on public.trips(team_id);
create index itinerary_items_trip_id_starts_at_idx on public.itinerary_items(trip_id, starts_at);
create index business_targets_trip_id_status_idx on public.business_targets(trip_id, status);
create index business_target_sources_target_id_idx on public.business_target_sources(business_target_id);
create index notes_trip_id_created_at_idx on public.notes(trip_id, created_at desc);
create index activity_log_trip_id_created_at_idx on public.activity_log(trip_id, created_at desc);

comment on table public.business_targets is
  'Business visit target records. Demo scaffold requires source confidence and excludes sensitive personal data.';
comment on table public.business_target_sources is
  'Source metadata for business target records. Production ingestion must be source-backed and human-reviewed.';
comment on table public.business_visit_data_standards is
  'Versioned business visit data standard metadata, including required fields and blocked sensitive fields.';

do $$
declare
  table_id text;
begin
  foreach table_id in array array[
    'persons',
    'users',
    'teams',
    'memberships',
    'trips',
    'trip_members',
    'locations',
    'saved_locations',
    'itinerary_items',
    'itinerary_attendees',
    'notes',
    'business_targets',
    'business_target_profiles',
    'business_target_sources',
    'business_target_scores',
    'visit_requests',
    'leads',
    'shares',
    'itinerary_proposals',
    'activity_log',
    'business_visit_data_standards'
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
