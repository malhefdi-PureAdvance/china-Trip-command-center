import type { SupabaseHealth } from "@pure-advance/database";

export type ReadinessStepStatus = "ready" | "pending" | "action";

export type ReadinessStep = {
  label: string;
  status: ReadinessStepStatus;
  detail: string;
};

export type ActivationReadinessModel = {
  /** True only when a live Supabase connection is proven, never inferred. */
  liveConfirmed: boolean;
  headline: string;
  steps: ReadinessStep[];
  missingEnv: string[];
};

/**
 * Builds the "activation readiness" checklist for the admin page WITHOUT
 * claiming Supabase is live unless the health check actually reached the DB
 * and found the seeded standard (`status === "ready"`). Everything else is
 * shown as pending/action so the page never overstates backend state.
 */
export function buildActivationReadinessModel(
  health: SupabaseHealth,
  expectedTableCount: number
): ActivationReadinessModel {
  const config = health.configStatus;
  const liveConfirmed = health.status === "ready" && health.databaseReachable;
  const missingEnv = [...config.missingPublicEnv, ...config.missingAdminEnv];

  const envStatus: ReadinessStepStatus = config.isAdminConfigured
    ? "ready"
    : config.isPublicConfigured
      ? "pending"
      : "action";

  const migrationStatus: ReadinessStepStatus = liveConfirmed
    ? "ready"
    : health.databaseReachable
      ? "action"
      : "pending";

  const seedStatus: ReadinessStepStatus =
    health.demoSeedStatus === "present"
      ? "ready"
      : health.demoSeedStatus === "missing"
        ? "action"
        : "pending";

  return {
    liveConfirmed,
    headline: liveConfirmed
      ? "Live · Supabase connected and seeded"
      : config.isAdminConfigured
        ? "Configured · connection not yet confirmed"
        : "Not activated · running on public demo data",
    missingEnv,
    steps: [
      {
        label: "Environment variables",
        status: envStatus,
        detail:
          missingEnv.length > 0
            ? `Set in Vercel: ${missingEnv.join(", ")}`
            : "Public + service-role keys present"
      },
      {
        label: "Migrations applied",
        status: migrationStatus,
        detail: `3 migrations → ${expectedTableCount} expected tables`
      },
      {
        label: "Demo seed applied",
        status: seedStatus,
        detail: "china_2026_demo.sql — regenerated from domain data"
      },
      {
        label: "RLS posture",
        status: "pending",
        detail: "Authenticated read-only placeholders; no anon/mutation policies"
      }
    ]
  };
}
