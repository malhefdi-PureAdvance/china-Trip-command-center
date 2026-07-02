import type { SupabaseHealth } from "@pure-advance/database";
import { describe, expect, it } from "vitest";

import { buildSupabaseHealthRows } from "./supabase-health-view";

const baseHealth: SupabaseHealth = {
  status: "not_configured",
  databaseReachable: false,
  configStatus: {
    mode: "not_configured",
    isPublicConfigured: false,
    isAdminConfigured: false,
    missingPublicEnv: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
    missingAdminEnv: ["SUPABASE_SERVICE_ROLE_KEY"]
  },
  migrationPath: "packages/database/migrations/0001_core_schema.sql",
  demoSeedPath: "packages/database/seeds/china_2026_demo.sql",
  standardId: "china-2026-business-visit-v0.1",
  standardVersion: null,
  demoSeedStatus: "not_checked",
  rlsPolicyMode:
    "authenticated-read-only-placeholder; no anonymous or mutation policies are created",
  checkedAt: "2026-07-01T22:00:00.000Z",
  message: "Supabase public environment variables are not configured. Demo data remains active."
};

describe("Supabase health view model", () => {
  it("summarizes a missing Supabase configuration as a non-blocking demo state", () => {
    expect(buildSupabaseHealthRows(baseHealth)).toEqual([
      expect.objectContaining({
        label: "Supabase config",
        tone: "amber",
        value: "Action required"
      }),
      expect.objectContaining({
        label: "Database reachability",
        tone: "amber",
        value: "Not verified"
      }),
      expect.objectContaining({
        label: "Business visit seed",
        tone: "amber",
        value: "Not verified"
      }),
      expect.objectContaining({
        label: "RLS policy mode",
        tone: "amber",
        value: "Not verified"
      })
    ]);
  });

  it("summarizes a ready backend as green for admin review", () => {
    expect(
      buildSupabaseHealthRows({
        ...baseHealth,
        status: "ready",
        databaseReachable: true,
        configStatus: {
          mode: "admin_configured",
          isPublicConfigured: true,
          isAdminConfigured: true,
          missingPublicEnv: [],
          missingAdminEnv: [],
          projectRef: "china-command"
        },
        standardVersion: "0.1.0",
        demoSeedStatus: "present",
        message: "Supabase is configured and the business visit data standard seed is present."
      })
    ).toEqual([
      expect.objectContaining({
        label: "Supabase config",
        tone: "green",
        value: "Verified"
      }),
      expect.objectContaining({
        label: "Database reachability",
        tone: "green",
        value: "Verified"
      }),
      expect.objectContaining({ label: "Business visit seed", tone: "green", value: "0.1.0" }),
      expect.objectContaining({
        label: "RLS policy mode",
        tone: "amber",
        value: "Not verified"
      })
    ]);
  });
});
