/**
 * Deterministic seed generator. Emits packages/database/seeds/china_2026_demo.sql
 * from the sanitized domain dataset so the seed never diverges from what the
 * app ships. Public-tier / demo-safe content only — the generator refuses to
 * emit anything containing private-identifier patterns (see assertNoPrivate).
 *
 * Run: pnpm --filter @pure-advance/database generate:seed
 * Check (CI): pnpm --filter @pure-advance/database generate:seed -- --check
 */
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  businessVisitDataStandard,
  demoBusinessTargets,
  demoChina2026,
  demoHydrationSources,
  demoItineraryIntel,
  demoMissionPhases
} from "@pure-advance/domain";

type Row = Record<string, unknown>;

const SEED_PATH = fileURLToPath(new URL("../seeds/china_2026_demo.sql", import.meta.url));

function lit(value: unknown): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (Array.isArray(value)) {
    if (value.length === 0) return "array[]::text[]";
    return `array[${value.map((item) => lit(item)).join(", ")}]`;
  }
  if (typeof value === "object") {
    // jsonb literal
    return `${quote(JSON.stringify(value))}::jsonb`;
  }
  return quote(String(value));
}

function quote(text: string): string {
  return `'${text.replace(/'/g, "''")}'`;
}

function insert(table: string, columns: string[], rows: Row[]): string {
  if (rows.length === 0) return "";
  const values = rows
    .map((row) => `  (${columns.map((column) => lit(row[column])).join(", ")})`)
    .join(",\n");
  return (
    `insert into public.${table} (${columns.join(", ")})\nvalues\n${values}\n` +
    `on conflict (${columns[0]}) do nothing;\n`
  );
}

// Private-identifier guard: the seed ships publicly, so fail closed if any
// value looks like an email, phone, WeChat handle, or booking/flight token.
function assertNoPrivate(sql: string) {
  const patterns: Array<[string, RegExp]> = [
    // Non-example email addresses only (example.com is used by the demo source).
    ["email", /[A-Za-z0-9._%+-]+@(?!example\.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,}/],
    ["phone", /\+\d[\d\s-]{6,}/],
    // WeChat as a contact route (handle/id), not the "WeChat Pay" app name.
    ["wechat-handle", /wechat\s*(?:id|handle|[:：#])|微信\s*[:：]/i],
    ["flight-no", /\b(EY|QR|CX|EK)\s?\d{2,4}\b/],
    ["pnr", /\bPNR\b/i]
  ];
  const offenders = patterns.filter(([, rx]) => rx.test(sql)).map(([name]) => name);
  if (offenders.length > 0) {
    throw new Error(
      `Seed generation blocked — private-identifier patterns found: ${offenders.join(", ")}`
    );
  }
}

function build(): string {
  const d = demoChina2026;
  const parts: string[] = [];
  parts.push(
    "-- GENERATED FILE — do not edit by hand.",
    "-- Source: packages/database/scripts/generate-seed.ts (from @pure-advance/domain).",
    "-- Regenerate: pnpm --filter @pure-advance/database generate:seed",
    "-- Public-tier / demo-safe content only. No private identifiers.",
    ""
  );

  parts.push(
    insert(
      "business_visit_data_standards",
      ["id", "version", "required_fields", "blocked_sensitive_fields", "notes", "created_at"],
      [
        {
          id: businessVisitDataStandard.id,
          version: businessVisitDataStandard.version,
          required_fields: businessVisitDataStandard.requiredFields,
          blocked_sensitive_fields: businessVisitDataStandard.blockedSensitiveFields,
          notes: businessVisitDataStandard.notes,
          created_at: d.persons[0].createdAt
        }
      ]
    )
  );

  parts.push(
    insert(
      "persons",
      ["id", "kind", "display_name", "organization", "title", "bio", "created_at", "updated_at"],
      d.persons.map((p) => ({
        ...p,
        display_name: p.displayName,
        created_at: p.createdAt,
        updated_at: p.updatedAt,
        organization: p.organization ?? null,
        title: p.title ?? null,
        bio: p.bio ?? null
      }))
    )
  );
  parts.push(
    insert(
      "users",
      ["id", "person_id", "auth_provider", "handle", "role", "created_at", "updated_at"],
      d.users.map((u) => ({
        ...u,
        person_id: u.personId,
        auth_provider: u.authProvider,
        created_at: u.createdAt,
        updated_at: u.updatedAt
      }))
    )
  );
  parts.push(
    insert(
      "teams",
      ["id", "name", "slug", "description", "created_at", "updated_at"],
      d.teams.map((t) => ({
        ...t,
        description: t.description ?? null,
        created_at: t.createdAt,
        updated_at: t.updatedAt
      }))
    )
  );
  parts.push(
    insert(
      "memberships",
      ["id", "team_id", "user_id", "role", "joined_at"],
      d.memberships.map((m) => ({
        ...m,
        team_id: m.teamId,
        user_id: m.userId,
        joined_at: m.joinedAt
      }))
    )
  );
  parts.push(
    insert(
      "trips",
      [
        "id",
        "team_id",
        "name",
        "slug",
        "status",
        "region",
        "starts_on",
        "ends_on",
        "summary",
        "created_at",
        "updated_at"
      ],
      d.trips.map((t) => ({
        ...t,
        team_id: t.teamId,
        starts_on: t.startsOn,
        ends_on: t.endsOn,
        summary: t.summary ?? null,
        created_at: t.createdAt,
        updated_at: t.updatedAt
      }))
    )
  );
  parts.push(
    insert(
      "trip_members",
      ["id", "trip_id", "person_id", "role", "availability_note", "created_at"],
      d.tripMembers.map((m) => ({
        ...m,
        trip_id: m.tripId,
        person_id: m.personId,
        availability_note: m.availabilityNote ?? null,
        created_at: m.createdAt
      }))
    )
  );
  parts.push(
    insert(
      "locations",
      [
        "id",
        "name",
        "city",
        "country",
        "address_label",
        "latitude",
        "longitude",
        "location_type",
        "created_at",
        "updated_at"
      ],
      d.locations.map((l) => ({
        ...l,
        address_label: l.addressLabel ?? null,
        location_type: l.locationType,
        created_at: l.createdAt,
        updated_at: l.updatedAt
      }))
    )
  );
  parts.push(
    insert(
      "saved_locations",
      ["id", "trip_id", "location_id", "label", "note", "created_by_user_id", "created_at"],
      d.savedLocations.map((s) => ({
        ...s,
        trip_id: s.tripId,
        location_id: s.locationId,
        note: s.note ?? null,
        created_by_user_id: s.createdByUserId,
        created_at: s.createdAt
      }))
    )
  );
  parts.push(
    insert(
      "itinerary_items",
      [
        "id",
        "trip_id",
        "location_id",
        "title",
        "kind",
        "status",
        "starts_at",
        "ends_at",
        "timezone",
        "owner_user_id",
        "notes",
        "created_at",
        "updated_at"
      ],
      d.itineraryItems.map((i) => ({
        ...i,
        trip_id: i.tripId,
        location_id: i.locationId,
        starts_at: i.startsAt,
        ends_at: i.endsAt,
        owner_user_id: i.ownerUserId,
        notes: i.notes ?? null,
        created_at: i.createdAt,
        updated_at: i.updatedAt
      }))
    )
  );
  parts.push(
    insert(
      "itinerary_attendees",
      ["id", "itinerary_item_id", "person_id", "response_status", "created_at"],
      d.itineraryAttendees.map((a) => ({
        ...a,
        itinerary_item_id: a.itineraryItemId,
        person_id: a.personId,
        response_status: a.responseStatus,
        created_at: a.createdAt
      }))
    )
  );
  parts.push(
    insert(
      "notes",
      [
        "id",
        "trip_id",
        "author_user_id",
        "title",
        "body",
        "visibility",
        "tags",
        "created_at",
        "updated_at"
      ],
      d.notes.map((n) => ({
        ...n,
        trip_id: n.tripId,
        author_user_id: n.authorUserId,
        created_at: n.createdAt,
        updated_at: n.updatedAt
      }))
    )
  );
  parts.push(
    insert(
      "business_targets",
      [
        "id",
        "trip_id",
        "name",
        "city",
        "country",
        "sector",
        "status",
        "priority_rank",
        "source_confidence",
        "last_checked_at",
        "owner_user_id",
        "created_at",
        "updated_at"
      ],
      d.businessTargets.map((b) => ({
        ...b,
        trip_id: b.tripId,
        priority_rank: b.priorityRank,
        source_confidence: b.sourceConfidence,
        last_checked_at: b.lastCheckedAt,
        owner_user_id: b.ownerUserId,
        created_at: b.createdAt,
        updated_at: b.updatedAt
      }))
    )
  );
  parts.push(
    insert(
      "business_target_profiles",
      [
        "id",
        "business_target_id",
        "action_summary",
        "visit_objective",
        "products_or_capabilities",
        "talking_points",
        "open_questions",
        "risks",
        "created_at",
        "updated_at"
      ],
      d.businessTargetProfiles.map((p) => ({
        ...p,
        business_target_id: p.businessTargetId,
        action_summary: p.actionSummary,
        visit_objective: p.visitObjective,
        products_or_capabilities: p.productsOrCapabilities,
        talking_points: p.talkingPoints,
        open_questions: p.openQuestions,
        created_at: p.createdAt,
        updated_at: p.updatedAt
      }))
    )
  );
  parts.push(
    insert(
      "business_target_sources",
      [
        "id",
        "business_target_id",
        "source_label",
        "source_url",
        "source_confidence",
        "last_checked_at",
        "extracted_notes",
        "created_at"
      ],
      d.businessTargetSources.map((s) => ({
        ...s,
        business_target_id: s.businessTargetId,
        source_label: s.sourceLabel,
        source_url: s.sourceUrl ?? null,
        source_confidence: s.sourceConfidence,
        last_checked_at: s.lastCheckedAt,
        extracted_notes: s.extractedNotes ?? null,
        created_at: s.createdAt
      }))
    )
  );
  parts.push(
    insert(
      "business_target_scores",
      [
        "id",
        "business_target_id",
        "fit_score",
        "access_score",
        "timing_score",
        "priority_score",
        "rationale",
        "scored_by_user_id",
        "scored_at"
      ],
      d.businessTargetScores.map((s) => ({
        ...s,
        business_target_id: s.businessTargetId,
        fit_score: s.fitScore,
        access_score: s.accessScore,
        timing_score: s.timingScore,
        priority_score: s.priorityScore,
        scored_by_user_id: s.scoredByUserId,
        scored_at: s.scoredAt
      }))
    )
  );
  parts.push(
    insert(
      "visit_requests",
      [
        "id",
        "business_target_id",
        "requested_by_user_id",
        "status",
        "requested_window_start",
        "requested_window_end",
        "message_draft",
        "created_at",
        "updated_at"
      ],
      d.visitRequests.map((v) => ({
        ...v,
        business_target_id: v.businessTargetId,
        requested_by_user_id: v.requestedByUserId,
        requested_window_start: v.requestedWindowStart,
        requested_window_end: v.requestedWindowEnd,
        message_draft: v.messageDraft,
        created_at: v.createdAt,
        updated_at: v.updatedAt
      }))
    )
  );
  parts.push(
    insert(
      "leads",
      [
        "id",
        "trip_id",
        "business_target_id",
        "person_id",
        "stage",
        "summary",
        "next_action",
        "owner_user_id",
        "created_at",
        "updated_at"
      ],
      d.leads.map((l) => ({
        ...l,
        trip_id: l.tripId,
        business_target_id: l.businessTargetId,
        person_id: l.personId,
        next_action: l.nextAction ?? null,
        owner_user_id: l.ownerUserId,
        created_at: l.createdAt,
        updated_at: l.updatedAt
      }))
    )
  );
  parts.push(
    insert(
      "shares",
      [
        "id",
        "entity_type",
        "entity_id",
        "shared_by_user_id",
        "shared_with_user_id",
        "shared_with_team_id",
        "permission",
        "created_at",
        "expires_at"
      ],
      d.shares.map((s) => ({
        ...s,
        entity_type: s.entityType,
        entity_id: s.entityId,
        shared_by_user_id: s.sharedByUserId,
        shared_with_user_id: s.sharedWithUserId,
        shared_with_team_id: s.sharedWithTeamId,
        created_at: s.createdAt,
        expires_at: s.expiresAt
      }))
    )
  );
  parts.push(
    insert(
      "itinerary_proposals",
      [
        "id",
        "trip_id",
        "proposed_by_user_id",
        "title",
        "reason",
        "status",
        "starts_at",
        "ends_at",
        "location_id",
        "created_at",
        "updated_at"
      ],
      d.itineraryProposals.map((p) => ({
        ...p,
        trip_id: p.tripId,
        proposed_by_user_id: p.proposedByUserId,
        starts_at: p.startsAt,
        ends_at: p.endsAt,
        location_id: p.locationId,
        created_at: p.createdAt,
        updated_at: p.updatedAt
      }))
    )
  );
  parts.push(
    insert(
      "activity_log",
      [
        "id",
        "trip_id",
        "actor_user_id",
        "entity_type",
        "entity_id",
        "action",
        "summary",
        "created_at"
      ],
      d.activityLog.map((a) => ({
        ...a,
        trip_id: a.tripId,
        actor_user_id: a.actorUserId,
        entity_type: a.entityType,
        entity_id: a.entityId,
        created_at: a.createdAt
      }))
    )
  );

  // App intel tables (migration 0003)
  parts.push(
    insert(
      "mission_phases",
      [
        "id",
        "sort_order",
        "label",
        "name",
        "city",
        "week_tag",
        "starts_on",
        "ends_on",
        "headline",
        "created_at"
      ],
      demoMissionPhases.map((p) => ({
        id: p.id,
        sort_order: p.order,
        label: p.label,
        name: p.name,
        city: p.city,
        week_tag: p.weekTag,
        starts_on: p.startsOn,
        ends_on: p.endsOn,
        headline: p.headline ?? null,
        created_at: d.persons[0].createdAt
      }))
    )
  );
  parts.push(
    insert(
      "business_target_dossiers",
      [
        "id",
        "name",
        "name_local",
        "category",
        "city",
        "area",
        "corridor",
        "website",
        "one_liner",
        "what_they_do",
        "why_it_matters",
        "visit_objective",
        "route",
        "priority",
        "confidence",
        "talking_points",
        "open_questions",
        "risks",
        "fit_score",
        "status",
        "public_sources",
        "created_at",
        "updated_at"
      ],
      demoBusinessTargets.map((b) => ({
        id: b.id,
        name: b.name,
        name_local: b.nameLocal ?? null,
        category: b.category,
        city: b.city,
        area: b.area,
        corridor: b.corridor,
        website: b.website ?? null,
        one_liner: b.oneLiner,
        what_they_do: b.whatTheyDo,
        why_it_matters: b.whyItMatters,
        visit_objective: b.visitObjective,
        route: b.route,
        priority: b.priority,
        confidence: b.confidence,
        talking_points: b.talkingPoints,
        open_questions: b.openQuestions,
        risks: b.risks,
        fit_score: b.fitScore ?? null,
        status: b.status,
        public_sources: b.publicSources,
        created_at: d.persons[0].createdAt,
        updated_at: d.persons[0].createdAt
      }))
    )
  );
  parts.push(
    insert(
      "itinerary_intel",
      ["itinerary_item_id", "sub_sessions", "related_target_ids", "created_at", "updated_at"],
      demoItineraryIntel.map((i) => ({
        itinerary_item_id: i.itineraryItemId,
        sub_sessions: i.subSessions,
        related_target_ids: i.relatedTargetIds,
        created_at: d.persons[0].createdAt,
        updated_at: d.persons[0].createdAt
      }))
    )
  );
  parts.push(
    insert(
      "hydration_sources",
      ["path", "note", "created_at"],
      demoHydrationSources.map((s) => ({
        path: s.path,
        note: s.note ?? null,
        created_at: d.persons[0].createdAt
      }))
    )
  );

  const sql = parts.filter(Boolean).join("\n");
  assertNoPrivate(sql);
  return sql;
}

/** Public builder — used by the CLI and by tests to assert seed↔domain sync. */
export function buildSeedSql(): string {
  return build();
}

export const seedPath = SEED_PATH;

const invokedDirectly =
  typeof process.argv[1] === "string" && fileURLToPath(import.meta.url) === process.argv[1];

if (invokedDirectly) {
  const sql = buildSeedSql();
  if (process.argv.includes("--check")) {
    const current = readFileSync(SEED_PATH, "utf8");
    if (current.trim() !== sql.trim()) {
      console.error("Seed is out of date. Run: pnpm --filter @pure-advance/database generate:seed");
      process.exit(1);
    }
    console.log("Seed is in sync with domain data.");
  } else {
    writeFileSync(SEED_PATH, sql);
    console.log(`Wrote ${SEED_PATH}`);
  }
}
