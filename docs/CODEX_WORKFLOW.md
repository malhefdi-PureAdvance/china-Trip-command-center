# Codex Workflow

## Repository Boundaries

- Work only in `/home/malhefdi/repos/china-2026-command-center`.
- Do not touch `/home/malhefdi/repos/china-2026-companion`.
- Do not commit unless explicitly asked.
- Do not import real sensitive data.

## Setup

```bash
corepack enable
corepack prepare pnpm@11.9.0 --activate
pnpm install
```

## Validation Order

Run these before handing off scaffold changes:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
```

If Playwright browsers are missing, keep the config and tests in place and report the blocker clearly.

## Data Rules

- Keep demo content limited to Hong Kong and Shenzhen.
- Use synthetic names, addresses, and source labels.
- Keep source URLs to safe placeholder domains unless a real source-backed workflow is approved.
- Reject sensitive ingestion fields before parsing.

## Change Style

- Prefer existing package patterns and shared components.
- Keep docs aligned with domain schemas and SQL.
- Keep route placeholders buildable and test-covered.
