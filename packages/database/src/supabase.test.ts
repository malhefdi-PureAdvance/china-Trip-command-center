import { describe, expect, it, vi } from "vitest";

import {
  checkSupabaseHealth,
  getSupabaseConfigStatus,
  readSupabaseRuntimeConfig,
  supabaseEnvKeys
} from "./supabase";

describe("Supabase runtime configuration", () => {
  it("treats placeholder example values as missing", () => {
    const config = readSupabaseRuntimeConfig({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "public-anon-placeholder",
      SUPABASE_SERVICE_ROLE_KEY: "server-service-role-placeholder",
      SUPABASE_PROJECT_REF: "demo-project-ref"
    });

    expect(config).toEqual({});
    expect(getSupabaseConfigStatus(config)).toMatchObject({
      mode: "not_configured",
      isPublicConfigured: false,
      isAdminConfigured: false,
      missingPublicEnv: [supabaseEnvKeys.url, supabaseEnvKeys.anonKey],
      missingAdminEnv: [supabaseEnvKeys.serviceRoleKey]
    });
  });

  it("separates public browser config from server-only admin config", () => {
    const config = readSupabaseRuntimeConfig({
      NEXT_PUBLIC_SUPABASE_URL: "https://china-command.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-live-shaped-value",
      SUPABASE_SERVICE_ROLE_KEY: "service-role-live-shaped-value",
      SUPABASE_PROJECT_REF: "china-command"
    });

    expect(getSupabaseConfigStatus(config)).toEqual({
      mode: "admin_configured",
      isPublicConfigured: true,
      isAdminConfigured: true,
      missingPublicEnv: [],
      missingAdminEnv: [],
      projectRef: "china-command"
    });
  });
});

describe("Supabase health check", () => {
  it("does not perform network calls when Supabase is not configured", async () => {
    const fetcher = vi.fn();

    await expect(checkSupabaseHealth({}, { fetcher })).resolves.toMatchObject({
      status: "not_configured",
      databaseReachable: false,
      standardVersion: null,
      demoSeedStatus: "not_checked"
    });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("reports admin key missing without querying RLS-protected tables", async () => {
    const fetcher = vi.fn();

    await expect(
      checkSupabaseHealth(
        {
          url: "https://china-command.supabase.co",
          anonKey: "anon-live-shaped-value"
        },
        { fetcher }
      )
    ).resolves.toMatchObject({
      status: "admin_key_missing",
      databaseReachable: false,
      demoSeedStatus: "not_checked"
    });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("reads the seeded business visit standard when admin config is present", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            id: "china-2026-business-visit-v0.1",
            version: "0.1.0",
            created_at: "2026-01-15T09:00:00+08:00"
          }
        ]),
        { status: 200 }
      )
    );

    await expect(
      checkSupabaseHealth(
        {
          url: "https://china-command.supabase.co/",
          anonKey: "anon-live-shaped-value",
          serviceRoleKey: "service-role-live-shaped-value"
        },
        { fetcher }
      )
    ).resolves.toMatchObject({
      status: "ready",
      databaseReachable: true,
      standardVersion: "0.1.0",
      demoSeedStatus: "present"
    });

    expect(fetcher).toHaveBeenCalledWith(
      "https://china-command.supabase.co/rest/v1/business_visit_data_standards?select=id%2Cversion%2Ccreated_at&id=eq.china-2026-business-visit-v0.1&limit=1",
      expect.objectContaining({
        headers: expect.objectContaining({
          apikey: "service-role-live-shaped-value",
          Authorization: "Bearer service-role-live-shaped-value"
        })
      })
    );
  });
});
