# Three-Tier Data Model

The command center separates data into three tiers by sensitivity. This is the
governing rule for what may ship where. It exists because the production app is
currently a **public, unauthenticated deployment** — anything in tiers 1 is
world-readable and cacheable on-device by the service worker.

## Tier 1 — Public static bundle (shipped today)

Everything the app currently serves. World-readable; cached by the offline
service worker (except `/admin`).

**Belongs here:** sanitized trip anchors and mission phases; the itinerary and
its compact sub-sessions; curated business-target dossiers (public company
facts, district/area, high-level rationale, visit objective, talking points,
open questions, risks, public source URLs); hydration/provenance metadata;
design tokens, fonts, icons. Field notes are Tier 1 UX but stay **on-device**
(localStorage), never uploaded.

**Rule:** demo-safe, source-grounded, no identifiers. A domain test and the seed
generator both fail closed if a contact identifier or booking token appears.

## Tier 2 — Authenticated Supabase-backed app data (foundation ready, not active)

The same shapes as Tier 1 plus editable/operational data, served only to
signed-in team members once auth exists. Backed by the SQL schema
(`migrations/0001–0003`) and the seed regenerated from domain data.

**Belongs here (later):** team-private notes and debriefs; visit-request drafts
and lead pipeline state; edits/approvals; anything that should be shared within
the team but not world-readable. RLS must enforce team/role scoping before any
of this is written or served.

**Rule:** requires authentication, authorization (RLS with real team/role
checks — the current policies are read-only placeholders), and a private-tier
cache policy (or `no-store`) before it ships. Do **not** add Tier 2 content to
any public route, the precache list, or the static bundle.

## Tier 3 — Private local pack / password-manager pointers (never in the app)

Data that must never enter the repo, the bundle, or Supabase-as-public.

**Belongs here:** booking references, PNRs, ticket numbers; QR / barcode /
gate-pass payloads; passport, visa, national-ID, payment, and bank data;
private contact identifiers (personal emails/phones/WeChat handles); private
calendar links and hidden guest details; LOI / IP-specific material;
credentials, API keys, and service-role keys.

**Rule:** the app only ever _points_ to these ("verify privately"). They live in
the traveler's private pack, wallet, or a password manager — never committed,
never rendered, never cached.

## Role model (migration `0004_auth_private_tier.sql`)

| Role             | Who                                       | Tier-2 access                         |
| ---------------- | ----------------------------------------- | ------------------------------------- |
| `owner`          | Mohammed                                  | Full read/write once features exist   |
| `team`           | Pure Advance travelers (Sultan, Alalmaee) | Team-private notes / operational data |
| `program_viewer` | Program / external contacts               | None by default                       |

Mechanics: `public.app_members` maps `auth.users` → role; `current_app_role()`
(security definer, fail-closed) drives every policy; `team_notes` is the empty
Tier-2 placeholder shape used to verify RLS end-to-end. There are deliberately
**no insert/update/delete policies on `app_members`** — membership is
provisioned only via the service role / SQL editor. A signed-in user without a
membership row gets nothing.

## Auth shell state machine

The `/private` page and the admin readiness section derive one of three honest
states (`apps/web/src/lib/private-tier.ts`):

1. **Not configured** — Supabase public env vars absent. Sign-in impossible.
2. **Ready · inactive** — env present, `NEXT_PUBLIC_PRIVATE_TIER_ENABLED` not
   `"true"`. Sign-in UI is disabled. This is the intended production default
   until activation is verified.
3. **Enabled · not verified** — flag set. Magic-link sign-in becomes active,
   but the UI keeps saying activation is unverified until Mohammed confirms
   RLS + membership in production. No state ever claims "verified".

## Activation runbook (Mohammed)

1. Set Vercel env vars: `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only).
2. Apply migrations `0003` and `0004`, then re-run the regenerated seed
   (`docs/SUPABASE.md` has the order).
3. In Supabase Auth settings, set the Site URL to the production origin and add
   `https://china-2026-command-center.vercel.app/private` to allowed redirect
   URLs (magic links land there).
4. Provision memberships via the SQL editor (service role), e.g.
   `insert into public.app_members (user_id, handle, role) values ('<auth-user-id>', 'mohammed', 'owner');`
5. Verify fail-closed RLS in production: a signed-in user **without** a
   membership row must see zero `team_notes` rows; a `program_viewer` likewise.
6. Only then set `NEXT_PUBLIC_PRIVATE_TIER_ENABLED=true` in Vercel and
   redeploy. Re-check `/private` and `/admin/data-review`.

## Why the tiers matter

A service worker caches whatever the origin serves into device storage, and
this deployment is unauthenticated. If Tier 2 or Tier 3 data were placed on a
public route it would be exposed both over the network and in the on-device
cache. Therefore private-tier data stays out until authentication, RLS-based
authorization, and a private-tier caching policy are implemented and verified.

See also: `docs/SUPABASE.md` (activation steps), `docs/SECURITY_PRIVACY.md`
(caching boundaries and blocked fields).
