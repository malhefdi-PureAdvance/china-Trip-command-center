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
    'Demo Mission Lead',
    'Pure Advance',
    'Mission Lead',
    'Coordinates the China 2026 operating rhythm.',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000000102',
    'operator',
    'Demo Operations Coordinator',
    'Pure Advance',
    'Operations',
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
    'mission-lead',
    'owner',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000000202',
    '00000000-0000-4000-8000-000000000102',
    'demo',
    'ops',
    'admin',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  )
on conflict (id) do nothing;

insert into public.teams (id, name, slug, description, created_at, updated_at)
values (
  '00000000-0000-4000-8000-000000000301',
  'Pure Advance China 2026',
  'pure-advance-china-2026',
  'Demo command center team for planning and review.',
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
    'operator',
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
  'China 2026 Demo Mission',
  'china-2026-demo-mission',
  'planning',
  'Hong Kong / Shenzhen Greater Bay Area',
  '2026-04-12',
  '2026-04-21',
  'Demo-safe operating plan for business visits, logistics, and team notes.',
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
    'Demo availability only.',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000000602',
    '00000000-0000-4000-8000-000000000501',
    '00000000-0000-4000-8000-000000000102',
    'remote_support',
    'Supports daily review windows.',
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
    'Demo Hong Kong Arrival Base',
    'Hong Kong',
    'China',
    'Demo harbor district, no real address',
    22.3193,
    114.1694,
    'hotel',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000000702',
    'Demo Shenzhen Innovation Campus',
    'Shenzhen',
    'China',
    'Demo industrial zone, no real address',
    22.5431,
    114.0579,
    'factory',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  )
on conflict (id) do nothing;

insert into public.saved_locations (id, trip_id, location_id, label, note, created_by_user_id, created_at)
values (
  '00000000-0000-4000-8000-000000000801',
  '00000000-0000-4000-8000-000000000501',
  '00000000-0000-4000-8000-000000000701',
  'Base',
  'Demo staging location for daily briefings.',
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
    'Arrival and operations briefing',
    'admin',
    'confirmed',
    '2026-04-12T18:00:00+08:00',
    '2026-04-12T19:00:00+08:00',
    'Asia/Hong_Kong',
    '00000000-0000-4000-8000-000000000202',
    'Review demo route plan and business target readiness.',
    '2026-01-15T09:00:00+08:00',
    '2026-01-15T09:00:00+08:00'
  ),
  (
    '00000000-0000-4000-8000-000000000902',
    '00000000-0000-4000-8000-000000000501',
    '00000000-0000-4000-8000-000000000702',
    'Demo Shenzhen supplier capability visit',
    'site_visit',
    'proposed',
    '2026-04-14T10:00:00+08:00',
    '2026-04-14T12:00:00+08:00',
    'Asia/Hong_Kong',
    '00000000-0000-4000-8000-000000000201',
    'Placeholder visit pending source review.',
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
  'Daily command rhythm',
  'Demo note: hold a short morning brief and evening data review.',
  'team',
  array['ops', 'demo'],
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
  '2026-04-14T09:00:00+08:00',
  '2026-04-14T17:00:00+08:00',
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
  'Move supplier visit after readiness review',
  'Source confidence should be reviewed before calendar lock.',
  'open',
  '2026-04-15T10:00:00+08:00',
  '2026-04-15T12:00:00+08:00',
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
