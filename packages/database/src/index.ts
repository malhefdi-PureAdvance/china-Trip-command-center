export const coreMigrationPath = "packages/database/migrations/0001_core_schema.sql";
export const demoSeedPath = "packages/database/seeds/china_2026_demo.sql";

export const databaseArtifactPaths = {
  migrations: [coreMigrationPath],
  seeds: [demoSeedPath]
} as const;

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
