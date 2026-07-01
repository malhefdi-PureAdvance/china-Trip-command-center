export const coreMigrationPath = "packages/database/migrations/0001_core_schema.sql";
export const demoSeedPath = "packages/database/seeds/china_2026_demo.sql";

export const databaseArtifactPaths = {
  migrations: [coreMigrationPath],
  seeds: [demoSeedPath]
} as const;

export const conservativeRlsPolicyMode =
  "authenticated-read-only-placeholder; no anonymous or mutation policies are created";

export const businessVisitDataStandardId = "china-2026-business-visit-v0.1";
