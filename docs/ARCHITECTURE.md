# Architecture

## Monorepo Layout

- `apps/web`: Next.js App Router application.
- `packages/domain`: shared Zod schemas, inferred types, and the synthetic demo dataset.
- `packages/design-system`: reusable UI primitives and theme tokens.
- `packages/maps`: provider-agnostic map placeholder helpers.
- `packages/database`: SQL migration, seed artifact paths, Supabase config helpers, initial database types, and admin health checks.
- `packages/data-ingestion`: validation and placeholder import logic for future source-backed records.

## Web App

The web app uses server-rendered App Router pages for the route placeholders. Shared UI lives in `src/components`, view-level composition lives in `src/views`, and demo-data selectors live in `src/lib`.

The app imports:

- `@pure-advance/domain` for typed demo data.
- `@pure-advance/design-system` for cards, badges, buttons, tokens, and CSS theme.
- `@pure-advance/maps` for coordinate and static label helpers.

## Data Flow

Current flow is static:

1. Zod schemas define the domain contract.
2. `demoChina2026` provides synthetic Hong Kong/Shenzhen data.
3. Web helpers select and format demo records.
4. Routes render operational placeholders.

Future production flow:

1. Source-backed records enter `packages/data-ingestion`.
2. Sensitive field detection runs before parsing.
3. Valid records are staged for human review.
4. Approved records write into Supabase tables guarded by RLS policies.

## Database

`packages/database/migrations/0001_core_schema.sql` creates enums and core tables matching the domain model. RLS is enabled on every table with authenticated read-only placeholder policies. Mutation policies are intentionally not created yet.

`packages/database/seeds/china_2026_demo.sql` inserts synthetic demo data only.

`packages/database/src/supabase.ts` exposes runtime-safe Supabase configuration helpers. The web app uses these helpers in `/admin/data-review` to distinguish four states: not configured, public config only, reachable with seed present, and unreachable/error.
