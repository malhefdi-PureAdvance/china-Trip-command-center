import { describe, expect, it } from "vitest";

import { FORBIDDEN_OFFLINE_ROUTES } from "./schema";
import { auditPackSafety, buildOfflineFlightPack } from "./build-pack";

const FIXED_OPTIONS = { generatedAt: "2026-07-04T12:00:00.000Z", sourceCommit: "test" };

// The unambiguous Tier 3 content denylist (see flight-pack-policy.md). Word
// boundaries keep app-safe prose like "payments check" out of scope while
// still catching real identifiers.
const forbiddenText =
  /(passport|\bpnr\b|booking\s?ref|ticket\s?number|barcode|qr\s?payload|service_role|\bsecret\b|\btoken\b|private calendar)/i;

/** The manifest/privacy sections legitimately NAME excluded routes and field
 *  patterns for auditability — content scans cover everything else. */
function scannableText(pack: ReturnType<typeof buildOfflineFlightPack>): string {
  return JSON.stringify({
    trip: pack.trip,
    readiness: pack.readiness,
    briefing: pack.briefing,
    searchDocuments: pack.searchDocuments,
    exports: pack.exports
  });
}

describe("buildOfflineFlightPack", () => {
  it("builds a versioned app-safe pack with required sections", () => {
    const pack = buildOfflineFlightPack(FIXED_OPTIONS);
    expect(pack.manifest.packId).toBe("china-2026");
    expect(pack.manifest.schemaVersion).toBe(1);
    expect(pack.manifest.dataTier).toBe("tier1-public-safe");
    expect(pack.manifest.sourceCommit).toBe("test");
    expect(pack.briefing.map((section) => section.id)).toEqual([
      "trip-at-a-glance",
      "next-72-hours",
      "leap-east-priorities",
      "top-targets",
      "planning-gaps",
      "landing-checklist"
    ]);
    expect(pack.searchDocuments.length).toBeGreaterThan(10);
    expect(pack.readiness.length).toBeGreaterThanOrEqual(9);
  });

  it("is deterministic for a fixed generatedAt", () => {
    expect(buildOfflineFlightPack(FIXED_OPTIONS)).toEqual(buildOfflineFlightPack(FIXED_OPTIONS));
  });

  it("marks the pack stale 72 hours after generation", () => {
    const pack = buildOfflineFlightPack(FIXED_OPTIONS);
    expect(pack.manifest.staleAfter).toBe("2026-07-07T12:00:00.000Z");
  });

  it("does not link or refer to network-only routes outside the audit fields", () => {
    const pack = buildOfflineFlightPack(FIXED_OPTIONS);
    const text = scannableText(pack);
    for (const route of FORBIDDEN_OFFLINE_ROUTES) {
      expect(text).not.toContain(route);
    }

    const hrefs = [
      ...pack.searchDocuments.map((doc) => doc.href),
      ...pack.readiness.flatMap((item) => (item.href ? [item.href] : [])),
      ...pack.briefing.flatMap((section) => (section.relatedHref ? [section.relatedHref] : []))
    ];
    for (const href of hrefs) {
      expect(
        FORBIDDEN_OFFLINE_ROUTES.some((route) => href.startsWith(route)),
        `forbidden href: ${href}`
      ).toBe(false);
    }
  });

  it("lists excluded routes and fields for auditability", () => {
    const pack = buildOfflineFlightPack(FIXED_OPTIONS);
    expect(pack.manifest.excludedRoutes).toEqual(["/admin", "/private", "/auth"]);
    expect(pack.privacy.excludedRoutes).toEqual(["/admin", "/private", "/auth"]);
    expect(pack.privacy.excludedFields).toContain("passport");
    expect(pack.manifest.excludedDatasets).toContain("private-tier");
  });

  it("does not include forbidden private content or identifiers", () => {
    const pack = buildOfflineFlightPack(FIXED_OPTIONS);
    expect(scannableText(pack)).not.toMatch(forbiddenText);
  });

  it("fails closed when a forbidden link is injected", () => {
    const pack = buildOfflineFlightPack(FIXED_OPTIONS);
    pack.searchDocuments[0] = { ...pack.searchDocuments[0], href: "/admin/data-review" };
    expect(() => auditPackSafety(pack)).toThrow(/network-only route/);
  });

  it("fails closed when forbidden content is injected", () => {
    const pack = buildOfflineFlightPack(FIXED_OPTIONS);
    pack.briefing[0] = {
      ...pack.briefing[0],
      bullets: [...pack.briefing[0].bullets, "PNR ABC123"]
    };
    expect(() => auditPackSafety(pack)).toThrow(/forbidden content/);
  });

  it("exports an app-safe markdown briefing with a classification header", () => {
    const pack = buildOfflineFlightPack(FIXED_OPTIONS);
    expect(pack.exports.markdown).toContain("# China 2026 Flight Briefing");
    expect(pack.exports.markdown).toContain("Classification: App-safe operational export");
    expect(pack.exports.markdown).toContain("## Landing checklist");
  });

  it("covers itinerary, targets, locations, and briefing in the search index", () => {
    const pack = buildOfflineFlightPack(FIXED_OPTIONS);
    const types = new Set(pack.searchDocuments.map((doc) => doc.type));
    expect(types).toEqual(new Set(["trip", "itinerary", "target", "location", "briefing"]));
    expect(pack.searchDocuments.some((doc) => doc.id === "target-hk-insilico-medicine")).toBe(true);
  });
});
