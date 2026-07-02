# Product Requirements

## Purpose

The China 2026 Command Center is the iPhone-first operational surface for the Pure Advance **China 2026 · Tech Founders** mission (Jul 4 – Aug 2, 2026): live mission clock and timeline, source-backed business visit dossiers, corridor intelligence, field capture, team roster, and an admin hydration/import cockpit.

The app is demo-safe by default: it carries **real sanitized trip anchors** (program schedule, public venues, first-name team roster) and **app-safe business intelligence** (public company facts, high-level rationale), while booking references, contact identifiers, personal data, and credentials stay in the private travel pack.

## Primary Users

- Mission lead (Mohammed): opens Today for now/next, drills into a target dossier before a meeting.
- Traveler (Sultan, Abdulrahman Alalmaee): scans the mission timeline and assigned context.
- Remote support: follows progress and shared notes.
- Future admin: reviews source-backed imports before business target records are staged.

## Current Scope (shipped)

- **Today** (`/`, `/today`): live mission clock (T-minus / DAY n / debrief), now/next schedule focus, priority-target deep link.
- **Itinerary**: phase-grouped mission timeline (arrival → Week 1 HK / LEAP East Jul 8–10 → transition → Weeks 2–4 Shenzhen → Demo Day Jul 31 → departure) with per-day state.
- **Business Targets**: 49 source-backed visit dossiers with corridor/category filters and per-target drill-in (what-they-do, why-it-matters, visit objective + route, talking points, open questions, risks, fit, confidence, public sources).
- **Map**: corridor intelligence — bases, program venues, target clusters by corridor, China-first navigation guidance (Amap/Baidu/DiDi).
- **Notes**: shared mission context plus local-only field capture (meeting note / lead follow-up / daily debrief templates; browser storage, no uploads).
- **Team**: Pure Advance roster separated from program representatives.
- **Admin / Data Review**: hydration counts and source files, privacy-guard status, Supabase readiness, ingestion dry-run.
- Shared domain schemas (Zod) with app-facing `MissionPhase` and `BusinessTargetDossier` structures.
- SQL migration for core domain tables and conservative RLS placeholders; ingestion dry-run contract (`writesPerformed: 0`).

## Out Of Scope (still)

- Real authentication and authorization flows.
- Live map provider integration.
- Contact identifiers, booking references, identity, credential, payment, or financial data in app content.
- Automated scraping or unsourced business enrichment.
- Production write workflows for ingestion.

## Acceptance Criteria

- The repo installs with pnpm and the app builds.
- All seven routes render meaningful, hydrated content with shared design-system components.
- App content stays in the Hong Kong/Shenzhen Greater Bay Area corridor and never regresses to the April 2026 placeholder dates (regression-tested).
- Business dossiers contain no contact identifiers or exact addresses (unit-tested and e2e-tested).
- The business target data standard is represented in Zod schemas, SQL metadata, seed data, and docs.
- E2E coverage: smoke on every route, iPhone-first shell (no horizontal overflow, thumb nav), mission timeline anchors, dossier flow.
