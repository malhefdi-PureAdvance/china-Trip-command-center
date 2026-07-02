import { getSupabaseConfigStatus, readSupabaseRuntimeConfig } from "@pure-advance/database";

/**
 * Private-tier shell state. Honest by construction:
 * - "not_configured"  — Supabase public env vars absent; auth cannot exist.
 * - "ready_inactive"  — env present but the tier is deliberately OFF. Default
 *   in production until Mohammed verifies RLS + redirect URLs and flips the
 *   flag. Sign-in is disabled in this state.
 * - "enabled"         — NEXT_PUBLIC_PRIVATE_TIER_ENABLED === "true". Sign-in UI
 *   becomes interactive; Tier-2 features still require a provisioned
 *   app_members row (RLS fail-closed).
 *
 * None of these states ever claims RLS/auth is verified — verification is a
 * manual production step documented in docs/PRIVATE_TIER.md.
 */
export type PrivateTierStatus = "not_configured" | "ready_inactive" | "enabled";

export const PRIVATE_TIER_FLAG = "NEXT_PUBLIC_PRIVATE_TIER_ENABLED";

export function resolvePrivateTierStatus(
  isPublicConfigured: boolean,
  flagValue: string | undefined
): PrivateTierStatus {
  if (!isPublicConfigured) return "not_configured";
  return flagValue === "true" ? "enabled" : "ready_inactive";
}

/** Server-side read (dynamic env access is fine on the server). */
export function getPrivateTierState() {
  const config = readSupabaseRuntimeConfig();
  const status = getSupabaseConfigStatus(config);
  const tier = resolvePrivateTierStatus(status.isPublicConfigured, process.env[PRIVATE_TIER_FLAG]);

  return {
    tier,
    // Public-by-definition values, passed to the client auth panel only when
    // the tier is enabled. Never includes the service-role key.
    publicConfig: tier === "enabled" ? { url: config.url!, anonKey: config.anonKey! } : null
  };
}

export const privateTierCopy: Record<PrivateTierStatus, { label: string; detail: string }> = {
  not_configured: {
    label: "Not configured",
    detail: "Supabase environment variables are not set — auth cannot start."
  },
  ready_inactive: {
    label: "Ready · inactive",
    detail: `Auth shell is wired but sign-in is disabled until ${PRIVATE_TIER_FLAG}=true is set after RLS and redirect URLs are verified.`
  },
  enabled: {
    label: "Enabled · not verified",
    detail:
      "Sign-in is active. RLS and membership provisioning still require production verification."
  }
};
