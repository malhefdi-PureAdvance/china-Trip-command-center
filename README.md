# China 2026 Command Center

Demo-safe command center scaffold for a Pure Advance China 2026 business visit corridor between Hong Kong and Shenzhen.

The repository is a pnpm monorepo with a Next.js App Router web app, shared domain schemas, design-system primitives, map helpers, database SQL stubs, and future ingestion guardrails. Current data is synthetic and must not be treated as real trip, contact, supplier, identity, credential, or financial data.

## Quick Start

```bash
corepack enable
corepack prepare pnpm@11.9.0 --activate
pnpm install
pnpm dev
```

The web app runs from `apps/web` and exposes:

- `/` and `/today`
- `/itinerary`
- `/map`
- `/business-targets`
- `/notes`
- `/team`
- `/admin/data-review`

## Deployment

Production is deployed on Vercel:

- URL: https://china-2026-command-center.vercel.app
- Project: `pure-advance/china-2026-command-center`
- Root directory: `apps/web`
- Build command: `pnpm --filter @pure-advance/web build`
- Install command: `corepack enable && corepack prepare pnpm@11.9.0 --activate && pnpm install --frozen-lockfile`

## Supabase

The app is backend-ready but remains safe without live credentials. See `docs/SUPABASE.md` for required env vars, migration/seed commands, and RLS posture.

`/admin/data-review` reports Supabase health at runtime and falls back to demo mode when credentials are absent.

## Validation

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
```

`pnpm test:e2e` uses Playwright and may require browser binaries to be installed in the local environment.

## Packages

- `apps/web`: Next.js command center UI.
- `packages/domain`: Zod schemas, TypeScript types, and synthetic Hong Kong/Shenzhen demo data.
- `packages/design-system`: Tokens, CSS theme, and base React components.
- `packages/maps`: Map/provider placeholder helpers.
- `packages/database`: SQL migration and demo seed artifact references.
- `packages/data-ingestion`: Future source-backed ingestion validators that reject sensitive fields.

## Data Safety

Do not import real sensitive data into this scaffold. The demo seed and domain fixture are synthetic only. The data-ingestion package blocks identity, payment, credential, private contact, and home address fields before parsing.
