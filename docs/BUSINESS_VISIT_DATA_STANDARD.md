# Business Visit Data Standard

Standard ID: `china-2026-business-visit-v0.1`

This standard defines the minimum demo-safe shape for future source-backed business target ingestion. It is not approval to import real sensitive data.

## Corridor

Records in this scaffold must stay within the Hong Kong and Shenzhen Greater Bay Area corridor.

Allowed demo cities:

- `Hong Kong`
- `Shenzhen`

Allowed country value:

- `China`

## Required Fields

- `name`: organization or site name.
- `city`: `Hong Kong` or `Shenzhen`.
- `country`: `China`.
- `sector`: business category.
- `status`: business target workflow status.
- `source_confidence`: `unknown`, `low`, `medium`, `high`, or `verified`.
- `source_label`: human-readable source name.
- `last_checked_at`: ISO timestamp for source review.
- `action_summary`: short operational summary.
- `visit_objective`: reason to consider a visit.

## Optional Profile Fields

- `products_or_capabilities`
- `talking_points`
- `open_questions`
- `risks`
- `priority_rank`
- `fit_score`
- `access_score`
- `timing_score`
- `priority_score`

Scores are integers from 0 to 100.

## Blocked Fields

The standard blocks identity, payment, credential, private contact, and home address fields, including:

`passport_number`, `national_id`, `government_id`, `date_of_birth`, `personal_phone`, `personal_email`, `home_address`, `payment_card`, `bank_account`, `password`, `api_key`, `secret`.

## Safe Example

```json
{
  "name": "Demo Shenzhen Advanced Materials Group",
  "city": "Shenzhen",
  "country": "China",
  "sector": "Advanced materials",
  "sourceLabel": "Demo research note",
  "sourceUrl": "https://example.com/demo-source",
  "capturedAt": "2026-01-15T09:30:00+08:00",
  "confidence": "medium",
  "actionSummary": "Validate whether the demo supplier can support a short capability visit.",
  "visitObjective": "Assess capability fit, lead times, quality controls, and next-step ownership."
}
```

## Review Rule

Unknown or low-confidence records require human review. The scaffold stages zero database writes until an approved ingestion source contract exists.
