import type { SupabaseHealth } from "@pure-advance/database";
import { describe, expect, it } from "vitest";

import { buildActivationReadinessModel } from "./activation-readiness-view";

function health(overrides: Partial<SupabaseHealth> = {}): SupabaseHealth {
  return {
    status: "not_configured",
    databaseReachable: false,
    configStatus: {
      mode: "not_configured",
      isPublicConfigured: false,
      isAdminConfigured: false,
      missingPublicEnv: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
      missingAdminEnv: ["SUPABASE_SERVICE_ROLE_KEY"]
    },
    migrationPath: "x",
    demoSeedPath: "y",
    standardId: "china-2026-business-visit-v0.1",
    standardVersion: null,
    demoSeedStatus: "not_checked",
    rlsPolicyMode: "placeholder",
    checkedAt: "2026-07-02T00:00:00.000Z",
    message: "",
    ...overrides
  };
}

describe("activation readiness model", () => {
  it("never claims live when not configured", () => {
    const model = buildActivationReadinessModel(health(), 25);
    expect(model.liveConfirmed).toBe(false);
    expect(model.headline).toContain("Not activated");
    expect(model.missingEnv).toContain("SUPABASE_SERVICE_ROLE_KEY");
    expect(model.steps.find((step) => step.label === "Environment variables")?.status).toBe(
      "action"
    );
  });

  it("does not claim live when configured but connection unconfirmed", () => {
    const model = buildActivationReadinessModel(
      health({
        status: "admin_key_missing",
        configStatus: {
          mode: "public_configured",
          isPublicConfigured: true,
          isAdminConfigured: false,
          missingPublicEnv: [],
          missingAdminEnv: ["SUPABASE_SERVICE_ROLE_KEY"]
        }
      }),
      25
    );
    expect(model.liveConfirmed).toBe(false);
    expect(model.headline).not.toContain("Live");
  });

  it("confirms live only when the DB is reachable and seeded", () => {
    const model = buildActivationReadinessModel(
      health({
        status: "ready",
        databaseReachable: true,
        demoSeedStatus: "present",
        configStatus: {
          mode: "admin_configured",
          isPublicConfigured: true,
          isAdminConfigured: true,
          missingPublicEnv: [],
          missingAdminEnv: []
        }
      }),
      25
    );
    expect(model.liveConfirmed).toBe(true);
    expect(model.headline).toContain("Live");
    expect(model.missingEnv).toHaveLength(0);
  });
});
