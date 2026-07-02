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

## Why the tiers matter

A service worker caches whatever the origin serves into device storage, and
this deployment is unauthenticated. If Tier 2 or Tier 3 data were placed on a
public route it would be exposed both over the network and in the on-device
cache. Therefore private-tier data stays out until authentication, RLS-based
authorization, and a private-tier caching policy are implemented and verified.

See also: `docs/SUPABASE.md` (activation steps), `docs/SECURITY_PRIVACY.md`
(caching boundaries and blocked fields).
