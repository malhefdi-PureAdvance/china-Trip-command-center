update public.business_visit_data_standards
set required_fields = array[
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
]
where id = 'china-2026-business-visit-v0.1';
