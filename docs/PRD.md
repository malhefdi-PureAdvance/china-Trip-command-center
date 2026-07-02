# Product Requirements

## Purpose

The China 2026 Command Center gives a small mission team a single operational view for itinerary, locations, business visit targets, notes, team assignments, and data review.

The scaffold is intentionally demo-safe. It uses only synthetic Hong Kong and Shenzhen content for the Greater Bay Area corridor.

## Primary Users

- Mission lead: reviews the daily plan, target readiness, and follow-up ownership.
- Operations coordinator: maintains itinerary, notes, location placeholders, and data-review queues.
- Traveler or remote support member: scans the latest schedule and assigned context.
- Future admin: reviews source-backed imports before business target records are staged.

## Initial Scope

- Today command center at `/` and `/today`.
- Route placeholders for itinerary, map, business targets, notes, team, and admin data review.
- Shared domain schemas and demo data.
- Business target workflow statuses and source confidence tracking.
- SQL migration for core domain tables and conservative RLS placeholders.
- Future ingestion functions that validate schema shape, reject sensitive fields, and dry-run row-level acceptance/rejection before any write workflow exists.

## Out Of Scope

- Real authentication and authorization flows.
- Live map provider integration.
- Real trip, supplier, contact, identity, credential, payment, or financial data.
- Automated scraping or unsourced business enrichment.
- Production write workflows for ingestion.

## Acceptance Criteria

- The repo installs with pnpm and the app builds.
- Required routes render with shared design-system components.
- Demo content stays in the Hong Kong/Shenzhen corridor.
- Business target data standard is represented in Zod schemas, SQL metadata, seed data, and docs.
- E2E smoke tests cover the key screens.
