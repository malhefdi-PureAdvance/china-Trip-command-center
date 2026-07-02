import type { SupabaseHealth } from "@pure-advance/database";

import { PRIVATE_TIER_FLAG, privateTierCopy, type PrivateTierStatus } from "./private-tier";

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
  expectedTableCount: number,
  privateTier: PrivateTierStatus
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
        // The health check does not query 0003/0004 tables, so these are never
        // asserted as applied — they stay manual steps until verified.
        label: "App-intel + auth tables (0003–0004)",
        status: "pending",
        detail: `Not verified by the health check — apply 0003–0004 + reseed (${expectedTableCount} tables) for mission phases, dossiers, itinerary intel, and the role model`
      },
      {
        label: "Seed freshness",
        status: "pending",
        detail: "Regenerate and reapply china_2026_demo.sql so live data matches the domain dataset"
      },
      {
        label: "Auth shell",
        status:
          privateTier === "not_configured"
            ? "action"
            : privateTier === "enabled"
              ? "pending"
              : "ready",
        detail:
          privateTier === "not_configured"
            ? "Supabase env vars missing — auth cannot start"
            : privateTier === "enabled"
              ? `${PRIVATE_TIER_FLAG}=true — sign-in active, RLS/membership still unverified`
              : "Wired and deliberately inactive until RLS + redirect URLs are verified"
      },
      {
        // Never "ready": even when enabled, activation is unverified until
        // Mohammed confirms sign-in + RLS against production.
        label: "Private tier",
        status: "pending",
        detail: privateTierCopy[privateTier].label + " — " + privateTierCopy[privateTier].detail
      },
      {
        label: "RLS posture",
        status: "pending",
        detail:
          "Fail-closed role model in 0004 (owner / team / program_viewer); verification in production still required"
      }
    ]
  };
}
