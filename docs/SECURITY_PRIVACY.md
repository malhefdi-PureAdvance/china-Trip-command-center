# Security And Privacy

## Current Posture

This repository is a scaffold with synthetic demo content only. It must not contain real sensitive data.

Do not import or commit:

- Passport, national ID, government ID, date of birth, or visa records.
- Personal phone, personal email, home address, or private contact data.
- Payment card, bank account, invoice, or financial account data.
- Passwords, API keys, tokens, secrets, or live credentials.
- Unsourced supplier, contact, or visit intelligence.

## Ingestion Guardrails

`packages/data-ingestion` recursively checks payload field names before parsing. If a blocked field is found, validation returns `rejected` and the placeholder import function stages zero records.

The dry-run contract validates each record independently. It accepts source-backed Hong Kong/Shenzhen rows for human review, rejects unsafe rows with row-level reasons, and always reports `writesPerformed: 0`. The admin data-review screen uses only synthetic fixture rows to demonstrate accepted/rejected outcomes.

The current import function is intentionally non-writing. Future ingestion must be source-backed, human-reviewed, authenticated, authorized, and covered by tests before it can persist records.

## Database RLS

The first migration enables RLS on all core tables and creates authenticated read-only placeholder policies. Anonymous access and mutation policies are not granted by this scaffold.

Production policies still need team membership checks, role checks, trip scoping, admin controls, and audit coverage before real deployment.

## Environment Files

`.env.example` contains placeholders only. Local `.env` files are ignored. Never commit live Supabase credentials or provider tokens.

`SUPABASE_SERVICE_ROLE_KEY` is server-only. It must be set only in Vercel/server secrets or local ignored env files. It must never be referenced from client components, browser bundles, public JSON, screenshots, or docs examples with live values.
