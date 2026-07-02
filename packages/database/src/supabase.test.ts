import { describe, expect, it, vi } from "vitest";

import {
  checkSupabaseHealth,
  fetchBusinessVisitReviewSnapshot,
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

describe("Business visit review snapshot", () => {
  it("does not query review tables until admin Supabase config is present", async () => {
    const fetcher = vi.fn();

    await expect(fetchBusinessVisitReviewSnapshot({}, { fetcher })).resolves.toMatchObject({
      status: "not_configured",
      source: "unavailable",
      businessTargetSourceCount: null,
      manualReviewQueueCount: null,
      targetsAwaitingVerification: []
    });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("reads source counts and unverified target queue from Supabase REST with the service role key", async () => {
    const fetcher = vi.fn(async (input: RequestInfo | URL) => {
      const url = input.toString();

      if (url.includes("/business_target_sources")) {
        return new Response("[]", {
          status: 200,
          headers: { "content-range": "0-0/3" }
        });
      }

      if (url.includes("/business_targets") && url.includes("limit=0")) {
        return new Response("[]", {
          status: 200,
          headers: { "content-range": "0-0/2" }
        });
      }

      if (url.includes("/business_targets")) {
        return new Response(
          JSON.stringify([
            {
              id: "00000000-0000-4000-8000-000000001201",
              name: "Demo Shenzhen Advanced Materials Group",
              city: "Shenzhen",
              source_confidence: "medium",
              status: "profiled",
              priority_rank: 1
            },
            {
              id: "00000000-0000-4000-8000-000000001202",
              name: "Demo Hong Kong Packaging Systems Studio",
              city: "Hong Kong",
              source_confidence: "unknown",
              status: "source_needed",
              priority_rank: null
            }
          ]),
          { status: 200 }
        );
      }

      return new Response("[]", { status: 404 });
    });

    await expect(
      fetchBusinessVisitReviewSnapshot(
        {
          url: "https://china-command.supabase.co/",
          anonKey: "anon-live-shaped-value",
          serviceRoleKey: "service-role-live-shaped-value"
        },
        { fetcher, now: () => new Date("2026-07-02T05:00:00.000Z") }
      )
    ).resolves.toEqual({
      status: "ready",
      source: "supabase",
      businessTargetSourceCount: 3,
      manualReviewQueueCount: 2,
      targetsAwaitingVerification: [
        {
          id: "00000000-0000-4000-8000-000000001201",
          name: "Demo Shenzhen Advanced Materials Group",
          city: "Shenzhen",
          sourceConfidence: "medium",
          status: "profiled",
          priorityRank: 1
        },
        {
          id: "00000000-0000-4000-8000-000000001202",
          name: "Demo Hong Kong Packaging Systems Studio",
          city: "Hong Kong",
          sourceConfidence: "unknown",
          status: "source_needed",
          priorityRank: null
        }
      ],
      checkedAt: "2026-07-02T05:00:00.000Z",
      message: "Supabase business visit review data loaded."
    });

    expect(fetcher).toHaveBeenCalledTimes(3);
    expect(fetcher).toHaveBeenCalledWith(
      expect.stringContaining("/rest/v1/business_targets"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer service-role-live-shaped-value",
          apikey: "service-role-live-shaped-value"
        })
      })
    );
  });
});
