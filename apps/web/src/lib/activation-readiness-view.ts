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
 * Builds the "activation readiness" checklist for the admin page.
 *
 * Honesty rule: only assert what the health check actually proves. It queries
 * ONE core table (the `0001` data-standard row via the service-role key), so it
 * can confirm the connection and the core schema — but it does NOT verify that
 * migration `0003` (app-intel tables) or the current regenerated seed are
 * applied. Those steps are therefore reported as unverified/pending regardless
 * of connection state, so the page never overstates what is live.
 */
export function buildActivationReadinessModel(
  health: SupabaseHealth,
  expectedTableCount: number
): ActivationReadinessModel {
  const config = health.configStatus;
  // "Connected" = env present, DB reachable, core standard row found. This is
  // the strongest thing the health check can prove — not full activation.
  const liveConfirmed = health.status === "ready" && health.databaseReachable;
  const missingEnv = [...config.missingPublicEnv, ...config.missingAdminEnv];

  const envStatus: ReadinessStepStatus = config.isAdminConfigured
    ? "ready"
    : config.isPublicConfigured
      ? "pending"
      : "action";

  const coreStatus: ReadinessStepStatus = liveConfirmed
    ? "ready"
    : health.databaseReachable
      ? "action"
      : "pending";

  return {
    liveConfirmed,
    headline: liveConfirmed
      ? "Connected · core schema live (verify app-intel migration + seed)"
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
        label: "Core schema + standard",
        status: coreStatus,
        detail: liveConfirmed
          ? "0001–0002 confirmed via the data-standard row"
          : "Health check queries the business_visit_data_standards row"
      },
      {
        // The health check does not query 0003's tables, so this is never
        // asserted as applied — it stays a manual step until verified.
        label: "App-intel tables (0003)",
        status: "pending",
        detail: `Not verified by the health check — apply 0003 + reseed (${expectedTableCount} tables) to activate mission phases, dossiers, and itinerary intel`
      },
      {
        label: "Seed freshness",
        status: "pending",
        detail: "Regenerate and reapply china_2026_demo.sql so live data matches the domain dataset"
      },
      {
        label: "RLS posture",
        status: "pending",
        detail: "Authenticated read-only placeholders; no anon/mutation policies"
      }
    ]
  };
}
