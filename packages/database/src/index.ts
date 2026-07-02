export const coreMigrationPath = "packages/database/migrations/0001_core_schema.sql";
export const demoSeedPath = "packages/database/seeds/china_2026_demo.sql";

export const migrationPaths = [
  "packages/database/migrations/0001_core_schema.sql",
  "packages/database/migrations/0002_business_visit_source_url_standard.sql",
  "packages/database/migrations/0003_app_intel_tables.sql"
] as const;

export const databaseArtifactPaths = {
  migrations: [...migrationPaths],
  seeds: [demoSeedPath]
} as const;

// Tables a live Supabase project must contain after migrations, used by the
// admin readiness surface. Extends the core schema with the app-intel tables
// (migration 0003) that back the mission timeline and dossier flow.
export const expectedTables = [
  "persons",
  "users",
  "teams",
  "memberships",
  "trips",
  "trip_members",
  "locations",
  "saved_locations",
  "itinerary_items",
  "itinerary_attendees",
  "notes",
  "business_targets",
  "business_target_profiles",
  "business_target_sources",
  "business_target_scores",
  "visit_requests",
  "leads",
  "shares",
  "itinerary_proposals",
  "activity_log",
  "business_visit_data_standards",
  "mission_phases",
  "business_target_dossiers",
  "itinerary_intel",
  "hydration_sources"
] as const;

export const requiredEnvVars = [
  { name: "NEXT_PUBLIC_SUPABASE_URL", scope: "public" as const, purpose: "Project REST/API URL" },
  {
    name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    scope: "public" as const,
    purpose: "Anon key for authenticated browser sessions"
  },
  {
    name: "SUPABASE_SERVICE_ROLE_KEY",
    scope: "server" as const,
    purpose: "Server-only admin health checks and maintenance"
  }
] as const;

export const conservativeRlsPolicyMode =
  "authenticated-read-only-placeholder; no anonymous or mutation policies are created";

export const businessVisitDataStandardId = "china-2026-business-visit-v0.1";

export type { Database, Json } from "./database.types";
export {
  checkSupabaseHealth,
  createSupabaseAdminClient,
  createSupabaseBrowserClient,
  fetchBusinessVisitReviewSnapshot,
  getSupabaseConfigStatus,
  readSupabaseRuntimeConfig,
  supabaseEnvKeys
} from "./supabase";
export type {
  BusinessVisitReviewSnapshot,
  BusinessVisitReviewTarget,
  SupabaseConfigMode,
  SupabaseConfigStatus,
  SupabaseDemoSeedStatus,
  SupabaseHealth,
  SupabaseHealthOptions,
  SupabaseHealthStatus,
  SupabaseRuntimeConfig
} from "./supabase";
