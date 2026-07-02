# Supabase Foundation

This repository is backend-ready but does not contain live Supabase credentials. Local development and CI are expected to run safely without secrets; production can read from Supabase when Vercel provides the server-side environment variables.

## Current status

- SQL migration: `packages/database/migrations/0001_core_schema.sql`
- Demo seed: `packages/database/seeds/china_2026_demo.sql`
- Typed client helpers: `packages/database/src/supabase.ts`
- Initial database types: `packages/database/src/database.types.ts`
- Admin health surface: `/admin/data-review`
- Live read-only review metrics: `/admin/data-review` can fetch business target source counts, manual review queue counts, and targets awaiting verification from Supabase when admin config is available

The repo does not commit Supabase CLI credentials, service-role keys, database passwords, or connection strings. The app handles missing secrets safely: demo data remains active, live review metrics fall back to synthetic demo rows, and the admin page reports Supabase as `Not configured` or `Public only` as appropriate. Production activation requires Vercel environment variables plus the migration and seed applied to the remote Supabase project.

## Required environment variables

| Variable                        | Scope              | Purpose                                                          |
| ------------------------------- | ------------------ | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | browser + server   | Public project REST/API URL                                      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | browser + server   | Public anon key for future authenticated browser sessions        |
| `SUPABASE_SERVICE_ROLE_KEY`     | server only        | Admin health check and future server-side migrations/maintenance |
| `SUPABASE_PROJECT_REF`          | server/scripts     | Optional project reference for CLI/script metadata               |
| `SUPABASE_DB_PASSWORD`          | local scripts only | Optional CLI database password, never committed                  |

Never commit live values. Put production values in Vercel environment variables and local values in an ignored `.env.local` or shell session.

## Applying the schema once credentials exist

Install or authenticate Supabase CLI outside the repo if needed:

```bash
supabase --version
supabase login
```

Link the project:

```bash
supabase link --project-ref "$SUPABASE_PROJECT_REF"
```

Apply the migration and demo seed:

```bash
supabase db push
supabase db execute --file packages/database/seeds/china_2026_demo.sql
```

If using the SQL editor instead of CLI, apply in this order:

1. `packages/database/migrations/0001_core_schema.sql`
2. `packages/database/seeds/china_2026_demo.sql`

## RLS posture

The first migration enables RLS on every core table and creates authenticated read-only placeholder policies only.

- Anonymous access: not granted.
- Mutation policies: not granted.
- Production writes: deferred until source-backed ingestion and role/team scoping are implemented.

## Admin health and review behavior

`/admin/data-review` checks backend readiness and review metrics on request:

1. If public URL/anon key are missing, it reports `Not configured`, performs no network call for health/review tables, and uses demo review metrics.
2. If public config exists but `SUPABASE_SERVICE_ROLE_KEY` is missing, it reports `Public only`, performs no RLS-protected query, and uses demo review metrics.
3. If server admin config exists, it queries `business_visit_data_standards` for `china-2026-business-visit-v0.1`.
4. If that row exists, the health row reports the seeded standard version.
5. When admin config is available, the page also performs read-only REST queries for:
   - `business_target_sources` exact count;
   - `business_targets` exact count where `source_confidence != verified`;
   - up to six `business_targets` awaiting verification.
6. If any live review query is unavailable, the page keeps the admin health result visible and falls back to demo review metrics rather than crashing.

These live reads use the server-side service-role key only from the Next.js server component. The key is never passed to a client component or static bundle.

## Verification

Run:

```bash
pnpm --filter @pure-advance/database test
pnpm --filter @pure-advance/web test -- src/lib/supabase-health-view.test.ts src/lib/data-review-view.test.ts
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
```
