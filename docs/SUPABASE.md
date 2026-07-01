# Supabase Foundation

This repository is backend-ready but does not contain live Supabase credentials.

## Current status

- SQL migration: `packages/database/migrations/0001_core_schema.sql`
- Demo seed: `packages/database/seeds/china_2026_demo.sql`
- Typed client helpers: `packages/database/src/supabase.ts`
- Initial database types: `packages/database/src/database.types.ts`
- Admin health surface: `/admin/data-review`

The current environment does **not** have Supabase CLI or Supabase credentials configured, so PR #4 cannot create the remote project or apply the migration from this machine. The app handles that state safely: demo data remains active and the admin page reports Supabase as `Not configured`.

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

## Admin health behavior

`/admin/data-review` checks backend readiness on request:

1. If public URL/anon key are missing, it reports `Not configured` and performs no network call.
2. If public config exists but `SUPABASE_SERVICE_ROLE_KEY` is missing, it reports `Public only` and performs no RLS-protected query.
3. If server admin config exists, it queries `business_visit_data_standards` for `china-2026-business-visit-v0.1`.
4. If that row exists, the health row reports the seeded standard version.

## Verification

Run:

```bash
pnpm --filter @pure-advance/database test
pnpm --filter @pure-advance/web test -- --run src/lib/supabase-health-view.test.ts
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
```
