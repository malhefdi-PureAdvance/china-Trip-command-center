insert into public.business_visit_data_standards (
  id,
  version,
  required_fields,
  blocked_sensitive_fields,
  notes,
  created_at
)
values (
  'china-2026-business-visit-v0.1',
  '0.1.0',
  array[
    'name',
    'city',
    'country',
    'sector',
    'status',
    'source_confidence',
    'source_label',
    'source_url',
    'last_checked_at',
    'action_summary',
    'visit_objective'
  ],
  array[
    'passport_number',
    'national_id',
    'government_id',
    'date_of_birth',
    'personal_phone',
    'personal_email',
    'home_address',
    'payment_card',
    'bank_account',
    'password',
    'api_key',
    'secret'
  ],
  'Demo-only standard for future source-backed Hong Kong and Shenzhen business visit ingestion.',
  '2026-01-15T09:00:00+08:00'
)
on conflict (id) do nothing;

insert into public.persons (
  id,
  kind,
  display_name,
  organization,
  title,
  bio,
  created_at,
  updated_at
)
values
  (
    '00000000-0000-4000-8000-000000000101',
    'traveler',
    'Mohammed',
    'Pure Advance',
    'Founder · Mission Lead',
    'Runs the China 2026 operating rhythm across Hong Kong and Shenzhen.',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000000102',
    'traveler',
    'Sultan',
    'Pure Advance',
    'Co-founder',
    null,
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000000103',
    'business_contact',
    'Demo Supplier Liaison',
    'Demo Shenzhen Partner',
    'Business Development',
    null,
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  )
on conflict (id) do nothing;

insert into public.users (id, person_id, auth_provider, handle, role, created_at, updated_at)
values
  (
    '00000000-0000-4000-8000-000000000201',
    '00000000-0000-4000-8000-000000000101',
    'demo',
    'mohammed',
    'owner',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000000202',
    '00000000-0000-4000-8000-000000000102',
    'demo',
    'sultan',
    'admin',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  )
on conflict (id) do nothing;

insert into public.teams (id, name, slug, description, created_at, updated_at)
values (
  '00000000-0000-4000-8000-000000000301',
  'Pure Advance · China 2026',
  'pure-advance-china-2026',
  'Command center team for the Tech Founders China 2026 mission.',
  '2026-01-15T09:00:00+08:00',
  '2026-01-15T09:00:00+08:00'
)
on conflict (id) do nothing;

insert into public.memberships (id, team_id, user_id, role, joined_at)
values
  (
    '00000000-0000-4000-8000-000000000401',
    '00000000-0000-4000-8000-000000000301',
    '00000000-0000-4000-8000-000000000201',
    'lead',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000000402',
    '00000000-0000-4000-8000-000000000301',
    '00000000-0000-4000-8000-000000000202',
    'traveler',
    '2026-01-15T09:00:00+08:00'
  )
on conflict (id) do nothing;

insert into public.trips (
  id,
  team_id,
  name,
  slug,
  status,
  region,
  starts_on,
  ends_on,
  summary,
  created_at,
  updated_at
)
values (
  '00000000-0000-4000-8000-000000000501',
  '00000000-0000-4000-8000-000000000301',
  'China 2026 · Tech Founders',
  'china-2026-tech-founders',
  'planning',
  'Hong Kong / Shenzhen Greater Bay Area',
  '2026-07-04',
  '2026-08-02',
  'Hong Kong Week 1 (Go Global from GBA) with LEAP East at HKCEC Jul 8-10, then the Shenzhen Tech Founders program through Demo Day on Jul 31.',
  '2026-01-15T09:00:00+08:00',
  '2026-01-15T09:00:00+08:00'
)
on conflict (id) do nothing;

insert into public.trip_members (id, trip_id, person_id, role, availability_note, created_at)
values
  (
    '00000000-0000-4000-8000-000000000601',
    '00000000-0000-4000-8000-000000000501',
    '00000000-0000-4000-8000-000000000101',
    'mission_lead',
    'On-ground Hong Kong Jul 5 through Shenzhen Demo Day Jul 31.',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000000602',
    '00000000-0000-4000-8000-000000000501',
    '00000000-0000-4000-8000-000000000102',
    'traveler',
    'Hong Kong base from Jul 4; full program traveler.',
    '2026-01-15T09:00:00+08:00'
  )
on conflict (id) do nothing;

insert into public.locations (
  id,
  name,
  city,
  country,
  address_label,
  latitude,
  longitude,
  location_type,
  created_at,
  updated_at
)
values
  (
    '00000000-0000-4000-8000-000000000701',
    'The Hari Hong Kong',
    'Hong Kong',
    'China',
    'Wan Chai, Hong Kong',
    22.2789,
    114.1755,
    'hotel',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000000702',
    'Ascott Raffles City Shenzhen',
    'Shenzhen',
    'China',
    'Nanshan, Shenzhen',
    22.5267,
    113.9345,
    'hotel',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  )
on conflict (id) do nothing;

insert into public.saved_locations (id, trip_id, location_id, label, note, created_by_user_id, created_at)
values (
  '00000000-0000-4000-8000-000000000801',
  '00000000-0000-4000-8000-000000000501',
  '00000000-0000-4000-8000-000000000701',
  'Hong Kong base',
  'Week 1 base in Wan Chai — walkable to HKCEC for LEAP East.',
  '00000000-0000-4000-8000-000000000202',
  '2026-01-15T09:00:00+08:00'
)
on conflict (id) do nothing;

insert into public.itinerary_items (
  id,
  trip_id,
  location_id,
  title,
  kind,
  status,
  starts_at,
  ends_at,
  timezone,
  owner_user_id,
  notes,
  created_at,
  updated_at
)
values
  (
    '00000000-0000-4000-8000-000000000901',
    '00000000-0000-4000-8000-000000000501',
    '00000000-0000-4000-8000-000000000701',
    'Arrival & Hong Kong base setup',
    'admin',
    'confirmed',
    '2026-07-05T09:00:00+08:00',
    '2026-07-05T12:00:00+08:00',
    'Asia/Hong_Kong',
    '00000000-0000-4000-8000-000000000202',
    'Arrive HKG and settle the Hong Kong base. Payments, eSIM/VPN, and maps readiness.',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000000902',
    '00000000-0000-4000-8000-000000000501',
    '00000000-0000-4000-8000-000000000702',
    'Week 2 kickoff · InnoX mentors & KAUST Shenzhen Hub',
    'meeting',
    'proposed',
    '2026-07-13T10:00:00+08:00',
    '2026-07-13T12:00:00+08:00',
    'Asia/Shanghai',
    '00000000-0000-4000-8000-000000000201',
    '1:1 mentor support and tailored plan. Prepare Pure Advance intro asks before this week.',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  )
on conflict (id) do nothing;

insert into public.itinerary_attendees (id, itinerary_item_id, person_id, response_status, created_at)
values (
  '00000000-0000-4000-8000-000000001001',
  '00000000-0000-4000-8000-000000000901',
  '00000000-0000-4000-8000-000000000101',
  'accepted',
  '2026-01-15T09:00:00+08:00'
)
on conflict (id) do nothing;

insert into public.notes (
  id,
  trip_id,
  author_user_id,
  title,
  body,
  visibility,
  tags,
  created_at,
  updated_at
)
values (
  '00000000-0000-4000-8000-000000001101',
  '00000000-0000-4000-8000-000000000501',
  '00000000-0000-4000-8000-000000000202',
  'Week 1 · Go Global from GBA',
  'Hong Kong Week 1 priority: LEAP East at HKCEC (Jul 8-10) and Saudi-ecosystem networking. Keep BJJ and food as recovery slots.',
  'team',
  array['week1', 'hong kong', 'leap-east'],
  '2026-01-15T09:00:00+08:00',
  '2026-01-15T09:00:00+08:00'
)
on conflict (id) do nothing;

insert into public.business_targets (
  id,
  trip_id,
  name,
  city,
  country,
  sector,
  status,
  priority_rank,
  source_confidence,
  last_checked_at,
  owner_user_id,
  created_at,
  updated_at
)
values
  (
    '00000000-0000-4000-8000-000000001201',
    '00000000-0000-4000-8000-000000000501',
    'Demo Shenzhen Advanced Materials Group',
    'Shenzhen',
    'China',
    'Advanced materials',
    'profiled',
    1,
    'medium',
    '2026-01-15T09:30:00+08:00',
    '00000000-0000-4000-8000-000000000201',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000001202',
    '00000000-0000-4000-8000-000000000501',
    'Demo Hong Kong Packaging Systems Studio',
    'Hong Kong',
    'China',
    'Packaging automation',
    'source_needed',
    null,
    'unknown',
    null,
    '00000000-0000-4000-8000-000000000202',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  )
on conflict (id) do nothing;

insert into public.business_target_profiles (
  id,
  business_target_id,
  action_summary,
  visit_objective,
  products_or_capabilities,
  talking_points,
  open_questions,
  risks,
  created_at,
  updated_at
)
values (
  '00000000-0000-4000-8000-000000001301',
  '00000000-0000-4000-8000-000000001201',
  'Validate whether the demo supplier can support a short capability visit.',
  'Assess capability fit, lead times, quality controls, and next-step ownership.',
  array['Demo composite material', 'Prototype review', 'Factory process overview'],
  array['Capacity assumptions', 'Quality assurance process', 'Export documentation path'],
  array['Which product lines are available for visit review?'],
  array['Source confidence is not yet verified.'],
  '2026-01-15T09:00:00+08:00',
  '2026-01-15T09:00:00+08:00'
)
on conflict (id) do nothing;

insert into public.business_target_sources (
  id,
  business_target_id,
  source_label,
  source_url,
  source_confidence,
  last_checked_at,
  extracted_notes,
  created_at
)
values (
  '00000000-0000-4000-8000-000000001401',
  '00000000-0000-4000-8000-000000001201',
  'Demo research note',
  'https://example.com/demo-source',
  'medium',
  '2026-01-15T09:30:00+08:00',
  'Synthetic source for schema validation only.',
  '2026-01-15T09:00:00+08:00'
)
on conflict (id) do nothing;

insert into public.business_target_scores (
  id,
  business_target_id,
  fit_score,
  access_score,
  timing_score,
  priority_score,
  rationale,
  scored_by_user_id,
  scored_at
)
values (
  '00000000-0000-4000-8000-000000001501',
  '00000000-0000-4000-8000-000000001201',
  82,
  64,
  70,
  75,
  'Strong demo fit, but access and source confidence still need review.',
  '00000000-0000-4000-8000-000000000201',
  '2026-01-15T10:00:00+08:00'
)
on conflict (id) do nothing;

insert into public.visit_requests (
  id,
  business_target_id,
  requested_by_user_id,
  status,
  requested_window_start,
  requested_window_end,
  message_draft,
  created_at,
  updated_at
)
values (
  '00000000-0000-4000-8000-000000001601',
  '00000000-0000-4000-8000-000000001201',
  '00000000-0000-4000-8000-000000000201',
  'draft',
  '2026-07-20T09:00:00+08:00',
  '2026-07-20T17:00:00+08:00',
  'Demo request draft. Replace with sourced, approved outreach before use.',
  '2026-01-15T09:00:00+08:00',
  '2026-01-15T09:00:00+08:00'
)
on conflict (id) do nothing;

insert into public.leads (
  id,
  trip_id,
  business_target_id,
  person_id,
  stage,
  summary,
  next_action,
  owner_user_id,
  created_at,
  updated_at
)
values (
  '00000000-0000-4000-8000-000000001701',
  '00000000-0000-4000-8000-000000000501',
  '00000000-0000-4000-8000-000000001201',
  '00000000-0000-4000-8000-000000000103',
  'qualified',
  'Demo liaison may help validate visit readiness.',
  'Confirm source confidence and profile completeness.',
  '00000000-0000-4000-8000-000000000202',
  '2026-01-15T09:00:00+08:00',
  '2026-01-15T09:00:00+08:00'
)
on conflict (id) do nothing;

insert into public.shares (
  id,
  entity_type,
  entity_id,
  shared_by_user_id,
  shared_with_user_id,
  shared_with_team_id,
  permission,
  created_at,
  expires_at
)
values (
  '00000000-0000-4000-8000-000000001801',
  'business_target',
  '00000000-0000-4000-8000-000000001201',
  '00000000-0000-4000-8000-000000000202',
  '00000000-0000-4000-8000-000000000201',
  null,
  'comment',
  '2026-01-15T09:00:00+08:00',
  null
)
on conflict (id) do nothing;

insert into public.itinerary_proposals (
  id,
  trip_id,
  proposed_by_user_id,
  title,
  reason,
  status,
  starts_at,
  ends_at,
  location_id,
  created_at,
  updated_at
)
values (
  '00000000-0000-4000-8000-000000001901',
  '00000000-0000-4000-8000-000000000501',
  '00000000-0000-4000-8000-000000000202',
  'Shift a Shenzhen visit after readiness review',
  'Source confidence should be reviewed before calendar lock.',
  'open',
  '2026-07-20T10:00:00+08:00',
  '2026-07-20T12:00:00+08:00',
  '00000000-0000-4000-8000-000000000702',
  '2026-01-15T09:00:00+08:00',
  '2026-01-15T09:00:00+08:00'
)
on conflict (id) do nothing;

insert into public.activity_log (
  id,
  trip_id,
  actor_user_id,
  entity_type,
  entity_id,
  action,
  summary,
  created_at
)
values (
  '00000000-0000-4000-8000-000000002001',
  '00000000-0000-4000-8000-000000000501',
  '00000000-0000-4000-8000-000000000202',
  'business_target',
  '00000000-0000-4000-8000-000000001201',
  'profile.updated',
  'Demo target profile created for review.',
  '2026-01-15T09:00:00+08:00'
)
on conflict (id) do nothing;
