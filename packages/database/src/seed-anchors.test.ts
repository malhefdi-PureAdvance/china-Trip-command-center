import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { buildSeedSql, seedPath } from "../scripts/generate-seed";

const seed = readFileSync(
  fileURLToPath(new URL("../seeds/china_2026_demo.sql", import.meta.url)),
  "utf8"
);

describe("China 2026 demo seed", () => {
  it("is regenerated from domain data (run generate:seed if this fails)", () => {
    expect(seed.trim()).toBe(buildSeedSql().trim());
    expect(seedPath).toContain("china_2026_demo.sql");
  });

  it("uses the real July/August 2026 trip anchors", () => {
    expect(seed).toContain("'2026-07-04'");
    expect(seed).toContain("'2026-08-02'");
    expect(seed).toContain("China 2026 · Tech Founders");
  });

  it("never regresses to the April 2026 placeholder dates", () => {
    expect(seed).not.toContain("2026-04");
  });

  it("seeds the app intel tables aligned with the domain dataset", () => {
    for (const table of [
      "public.mission_phases",
      "public.business_target_dossiers",
      "public.itinerary_intel",
      "public.hydration_sources"
    ]) {
      expect(seed).toContain(`insert into ${table}`);
    }
    // All 49 curated dossiers reach the seed.
    const dossierIds = new Set(seed.match(/'(cn|dg|fs|gz|hk|sz|zh)-[a-z0-9-]+'/g) ?? []);
    expect(dossierIds.size).toBeGreaterThanOrEqual(49);
  });

  it("contains no private identifiers", () => {
    // example.com is the allowed demo source URL; real emails are not allowed.
    expect(seed).not.toMatch(/[A-Za-z0-9._%+-]+@(?!example\.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
    expect(seed).not.toMatch(/\+\d[\d\s-]{6,}/);
    expect(seed).not.toMatch(/wechat\s*(?:id|handle|[:：#])|微信\s*[:：]/i);
    expect(seed).not.toMatch(/\b(EY|QR|CX|EK)\s?\d{2,4}\b/);
    expect(seed).not.toMatch(/\bPNR\b/i);
  });
});
