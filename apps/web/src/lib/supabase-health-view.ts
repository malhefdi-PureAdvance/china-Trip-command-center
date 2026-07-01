import type { SupabaseHealth } from "@pure-advance/database";
import type { BadgeProps } from "@pure-advance/design-system";

type BadgeTone = NonNullable<BadgeProps["tone"]>;

export type SupabaseHealthRow = {
  label: string;
  value: string;
  tone: BadgeTone;
  note: string;
};

function configValue(health: SupabaseHealth) {
  switch (health.configStatus.mode) {
    case "admin_configured":
      return { tone: "green" as const, value: "Admin configured" };
    case "public_configured":
      return { tone: "amber" as const, value: "Public only" };
    case "not_configured":
      return { tone: "amber" as const, value: "Not configured" };
  }
}

function reachabilityValue(health: SupabaseHealth) {
  if (health.databaseReachable) {
    return { tone: "green" as const, value: "Reachable" };
  }

  if (health.status === "not_configured" || health.status === "admin_key_missing") {
    return { tone: "amber" as const, value: "Not checked" };
  }

  return { tone: "coral" as const, value: "Unreachable" };
}

function seedValue(health: SupabaseHealth) {
  switch (health.demoSeedStatus) {
    case "present":
      return { tone: "green" as const, value: health.standardVersion ?? "Present" };
    case "missing":
      return { tone: "coral" as const, value: "Missing" };
    case "not_checked":
      return { tone: "amber" as const, value: "Not checked" };
  }
}

export function buildSupabaseHealthRows(health: SupabaseHealth): SupabaseHealthRow[] {
  const config = configValue(health);
  const reachability = reachabilityValue(health);
  const seed = seedValue(health);

  return [
    {
      label: "Supabase config",
      value: config.value,
      tone: config.tone,
      note:
        health.configStatus.mode === "not_configured"
          ? `Missing ${health.configStatus.missingPublicEnv.join(", ")}`
          : health.configStatus.projectRef
            ? `Project ${health.configStatus.projectRef}`
            : "Environment variables present"
    },
    {
      label: "Database reachability",
      value: reachability.value,
      tone: reachability.tone,
      note: health.statusCode ? `HTTP ${health.statusCode}` : health.message
    },
    {
      label: "Business visit seed",
      value: seed.value,
      tone: seed.tone,
      note: health.standardId
    },
    {
      label: "RLS policy mode",
      value: "Read-only placeholder",
      tone: "cyan",
      note: health.rlsPolicyMode
    }
  ];
}
