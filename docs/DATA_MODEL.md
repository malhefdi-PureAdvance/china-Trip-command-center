# Data Model

## Core Entities

- `persons`: travelers, operators, business contacts, and external placeholders.
- `users`: application users mapped to persons.
- `teams`, `memberships`: workspace ownership and membership roles.
- `trips`, `trip_members`: mission-level planning and assigned people.
- `locations`, `saved_locations`: route and venue placeholders.
- `itinerary_items`, `itinerary_attendees`, `itinerary_proposals`: schedule records and proposed changes.
- `notes`: team notes with visibility and tags.
- `business_targets`: candidate organizations for business visits.
- `business_target_profiles`: visit objectives, talking points, questions, and risks.
- `business_target_sources`: source labels, URLs, confidence, and extracted notes.
- `business_target_scores`: fit, access, timing, and priority scores.
- `visit_requests`: draft visit outreach windows and message drafts.
- `leads`: follow-up ownership and pipeline stage.
- `shares`: entity-level sharing placeholders.
- `activity_log`: audit-style activity summaries.

## App-facing structures (in `packages/domain`, outside `DemoDataset`)

These typed constants power the productized screens and are validated by Zod:

- `demoMissionPhases` (`MissionPhaseSchema`): the seven-phase program spine (arrival → Week 1 HK / LEAP East → transition → Weeks 2–4 Shenzhen → Demo Day → departure). Drives the Today mission clock and the Itinerary timeline.
- `demoBusinessTargets` (`BusinessTargetDossierSchema`): app-facing, human-curated visit dossiers (what-they-do, rationale, visit objective + route, talking points, open questions, risks, fit, confidence, public sources). Distinct from the ingestion-demo `business_targets`. Sanitized for a public deployment — no contact identifiers, personal names, or exact addresses (see SECURITY_PRIVACY).

## Business Target Workflow

Business target statuses are:

`candidate`, `source_needed`, `researched`, `profiled`, `reviewed`, `submission_ready`, `submitted`, `scheduled`, `visited`, `follow_up`, `archived`.

Source confidence values are:

`unknown`, `low`, `medium`, `high`, `verified`.

## Business Visit Data Standard

The standard ID is `china-2026-business-visit-v0.1`. It is represented in:

- `BusinessVisitDataStandardSchema` in `packages/domain/src/schemas.ts`.
- `business_visit_data_standards` in `packages/database/migrations/0001_core_schema.sql`, with `packages/database/migrations/0002_business_visit_source_url_standard.sql` aligning the required source URL metadata.
- Demo seed metadata in `packages/database/seeds/china_2026_demo.sql`.

Required fields are `name`, `city`, `country`, `sector`, `status`, `source_confidence`, `source_label`, `source_url`, `last_checked_at`, `action_summary`, and `visit_objective`.

`packages/data-ingestion` implements the current dry-run contract. It validates rows independently, accepts source-backed Hong Kong/Shenzhen rows for human review, rejects unsafe rows with reasons, and always reports `writesPerformed: 0`.

Blocked sensitive fields include identity, payment, credential, private contact, and home address fields.

## Demo / app data scope

App-facing content uses **real sanitized trip anchors** for the Jul 4 – Aug 2, 2026 mission (Hong Kong Week 1 with LEAP East at HKCEC Jul 8–10, the Shenzhen program through Demo Day on Jul 31), plus the source-backed visit dossiers. All of it stays inside the Hong Kong / Shenzhen Greater Bay Area corridor and excludes booking references, personal identifiers, and contact details. The `business_targets` ingestion demo and the Supabase seed remain synthetic. A regression test blocks any return of the old April 2026 placeholder dates.
