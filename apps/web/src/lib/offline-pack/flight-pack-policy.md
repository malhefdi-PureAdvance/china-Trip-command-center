# Offline Flight Pack — Data Policy

Governs what may enter the offline flight pack, the offline search index, and
any default export. The pack exists so a long-haul flight (and the HK ↔
Shenzhen crossing) can be productive without a connection — it is **not** a
private vault.

> Offline does not mean private. Anything in a public offline pack is
> device-local but copyable, inspectable, exportable, and potentially
> forwardable. Only Tier 1 app-safe data may enter the deployed offline pack,
> public search index, or default export.

## Tier 1 — App-safe, cacheable (allowed in the pack)

- Public trip overview (name, corridor, dates, mission summary).
- Sanitized itinerary anchors: titles, times, public venue names, cities,
  program sub-sessions, confirmed/proposed status.
- Public business-target summaries: names, priorities, categories, areas,
  one-liners, visit windows, public source URLs.
- Public map/corridor notes and venue coordinates already shown on `/map`.
- App shell, icons, fonts, manifest.
- User-created local notes stay on-device (localStorage) — they are _near_
  the pack but never inside the deployed pack artifact or default export.

## Tier 2 — Authenticated / syncable (never service-worker cached)

- Team-private notes and sync statuses stored under Supabase auth + RLS.
- Any same-origin or cross-origin request carrying an `Authorization` header.
- Supabase configuration, health, and admin readiness states.

Tier 2 flows stay network-only: `/admin`, `/private`, `/auth`, Supabase REST,
and authenticated API calls are never intercepted, cached, packed, indexed,
or exported.

## Tier 3 — Never-pack (forbidden everywhere)

- Credentials, tokens, secrets, `service_role` keys.
- PNRs, booking references, ticket numbers, hotel confirmation numbers.
- QR/barcode payloads and boarding-pass data.
- Passport/visa/national-ID numbers, dates of birth.
- Payment, card, or bank details.
- Private emails, phone numbers, WeChat handles, private contact routes.
- Private calendar links and raw email bodies.
- Unreleased IP, LOIs, CRM records, private contact intelligence.

Tier 3 material belongs in Wallet, the password manager, or the airline/hotel
apps — never in this app's storage, pack, index, or exports.

## Enforcement

- `schema.ts` encodes `FORBIDDEN_OFFLINE_ROUTES` (`/admin`, `/private`,
  `/auth`) and `FORBIDDEN_OFFLINE_FIELD_PATTERNS`.
- `build-pack.ts` self-audits every generated pack and throws if a forbidden
  route link or forbidden content pattern appears — generation fails closed.
- `build-pack.test.ts` locks the denylist in CI.
- The service worker keeps `/admin`, `/private`, `/auth`, non-GET,
  cross-origin, and Authorization-bearing requests network-only.
