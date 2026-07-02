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
    const model = buildActivationReadinessModel(health(), 27, "not_configured");
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
      27,
      "ready_inactive"
    );
    expect(model.liveConfirmed).toBe(false);
    expect(model.headline).not.toContain("Live");
  });

  it("confirms core connection but never asserts 0003/seed as applied", () => {
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
      27,
      "ready_inactive"
    );
    expect(model.liveConfirmed).toBe(true);
    expect(model.headline).toContain("Connected · core schema live");
    expect(model.missingEnv).toHaveLength(0);
    // The health check cannot prove 0003/0004 or the current seed — never "ready".
    const intel = model.steps.find((step) => step.label === "App-intel + auth tables (0003–0004)");
    const seed = model.steps.find((step) => step.label === "Seed freshness");
    expect(intel?.status).toBe("pending");
    expect(seed?.status).toBe("pending");
  });

  it("keeps the private tier pending even when the flag is enabled", () => {
    const model = buildActivationReadinessModel(
      health({
        status: "ready",
        databaseReachable: true,
        configStatus: {
          mode: "admin_configured",
          isPublicConfigured: true,
          isAdminConfigured: true,
          missingPublicEnv: [],
          missingAdminEnv: []
        }
      }),
      27,
      "enabled"
    );
    const tier = model.steps.find((step) => step.label === "Private tier");
    const auth = model.steps.find((step) => step.label === "Auth shell");
    expect(tier?.status).toBe("pending");
    expect(tier?.detail).toContain("not verified");
    expect(auth?.status).toBe("pending");
    expect(auth?.detail).toContain("unverified");
  });

  it("marks auth as inactive-but-wired when configured with the flag off", () => {
    const model = buildActivationReadinessModel(
      health({
        configStatus: {
          mode: "public_configured",
          isPublicConfigured: true,
          isAdminConfigured: false,
          missingPublicEnv: [],
          missingAdminEnv: ["SUPABASE_SERVICE_ROLE_KEY"]
        }
      }),
      27,
      "ready_inactive"
    );
    const auth = model.steps.find((step) => step.label === "Auth shell");
    expect(auth?.status).toBe("ready");
    expect(auth?.detail).toContain("deliberately inactive");
  });
});
