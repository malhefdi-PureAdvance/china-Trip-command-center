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
      return { tone: "green" as const, value: "Verified" };
    case "public_configured":
      return { tone: "amber" as const, value: "Action required" };
    case "not_configured":
      return { tone: "amber" as const, value: "Action required" };
  }
}

function reachabilityValue(health: SupabaseHealth) {
  if (health.databaseReachable) {
    return { tone: "green" as const, value: "Verified" };
  }

  if (health.status === "not_configured" || health.status === "admin_key_missing") {
    return { tone: "amber" as const, value: "Not verified" };
  }

  return { tone: "coral" as const, value: "Action required" };
}

function seedValue(health: SupabaseHealth) {
  switch (health.demoSeedStatus) {
    case "present":
      return { tone: "green" as const, value: health.standardVersion ?? "Verified" };
    case "missing":
      return { tone: "coral" as const, value: "Action required" };
    case "not_checked":
      return { tone: "amber" as const, value: "Not verified" };
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
      value: "Not verified",
      tone: "amber",
      note: `${health.rlsPolicyMode}; production RLS behavior requires manual verification`
    }
  ];
}
