import { describe, expect, it } from "vitest";

import { buildOfflineFlightPack } from "./build-pack";
import { deriveStatus, validatePackShape, warmableUrls } from "./install";

const FIXED = { generatedAt: "2026-07-04T12:00:00.000Z" };

describe("validatePackShape", () => {
  it("accepts a freshly built pack", () => {
    expect(validatePackShape(buildOfflineFlightPack(FIXED))).toBe(true);
  });

  it("rejects foreign or malformed payloads", () => {
    expect(validatePackShape(null)).toBe(false);
    expect(validatePackShape({})).toBe(false);
    expect(validatePackShape({ manifest: { packId: "other-trip", schemaVersion: 1 } })).toBe(false);
    const wrongSchema = buildOfflineFlightPack(FIXED);
    expect(
      validatePackShape({
        ...wrongSchema,
        manifest: { ...wrongSchema.manifest, schemaVersion: 99 }
      })
    ).toBe(false);
  });
});

describe("deriveStatus", () => {
  const pack = buildOfflineFlightPack(FIXED);
  const meta = {
    key: "manifest" as const,
    manifest: pack.manifest,
    installedAt: "2026-07-04T13:00:00.000Z",
    documentCount: pack.searchDocuments.length
  };

  it("reports not-installed without metadata", () => {
    expect(deriveStatus(undefined).state).toBe("not-installed");
  });

  it("reports installed inside the freshness window", () => {
    const status = deriveStatus(meta, new Date("2026-07-05T12:00:00.000Z"));
    expect(status.state).toBe("installed");
    expect(status.packVersion).toBe("1.0.0");
    expect(status.documentCount).toBeGreaterThan(10);
  });

  it("reports stale after the 72-hour window with an actionable message", () => {
    const status = deriveStatus(meta, new Date("2026-07-08T12:00:01.000Z"));
    expect(status.state).toBe("stale");
    expect(status.message).toMatch(/refresh/i);
  });
});

describe("warmableUrls", () => {
  it("warms only public allowlisted routes plus the artifact", () => {
    const pack = buildOfflineFlightPack(FIXED);
    const urls = warmableUrls(pack.manifest);
    expect(urls).toContain("/today");
    expect(urls).toContain("/flight-pack");
    expect(urls).toContain("/offline-pack/china-2026.v1.json");
    expect(urls.every((url) => url.startsWith("/"))).toBe(true);
  });

  it("refuses forbidden routes even if a tampered manifest lists them", () => {
    const pack = buildOfflineFlightPack(FIXED);
    const tampered = {
      ...pack.manifest,
      includedRoutes: [...pack.manifest.includedRoutes, "/admin/data-review", "/private"]
    };
    const urls = warmableUrls(tampered);
    expect(urls.some((url) => url.startsWith("/admin"))).toBe(false);
    expect(urls.some((url) => url.startsWith("/private"))).toBe(false);
  });
});
