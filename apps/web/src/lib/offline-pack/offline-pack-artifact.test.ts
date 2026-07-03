import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { auditPackSafety } from "./build-pack";
import { OFFLINE_PACK_ARTIFACT_URL, type OfflineFlightPack } from "./schema";

// The committed artifact is what the PWA actually installs — hold it to the
// same safety bar as a fresh build, so a stale or hand-edited artifact can
// never ship forbidden content even if generation is skipped.
const artifactPath = join(__dirname, "../../../public", OFFLINE_PACK_ARTIFACT_URL);

describe("offline pack artifact", () => {
  const pack = JSON.parse(readFileSync(artifactPath, "utf8")) as OfflineFlightPack;

  it("matches the current schema and pack identity", () => {
    expect(pack.manifest.packId).toBe("china-2026");
    expect(pack.manifest.schemaVersion).toBe(1);
    expect(pack.manifest.dataTier).toBe("tier1-public-safe");
    expect(pack.searchDocuments.length).toBeGreaterThan(10);
    expect(pack.briefing.map((section) => section.id)).toContain("landing-checklist");
    expect(pack.readiness.some((item) => item.status === "network-only")).toBe(true);
  });

  it("passes the same safety audit as a fresh build", () => {
    expect(() => auditPackSafety(pack)).not.toThrow();
  });

  it("declares its exclusions for audit", () => {
    expect(pack.manifest.excludedRoutes).toEqual(["/admin", "/private", "/auth"]);
    expect(pack.privacy.classification).toBe("app-safe-operational-pack");
  });
});
