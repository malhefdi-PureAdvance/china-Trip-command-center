import { describe, expect, it } from "vitest";

import { ItineraryIntelListSchema } from "../schemas";
import { demoBusinessTargets } from "./business-targets";
import { demoChina2026 } from "./china-2026";
import { demoItineraryIntel } from "./itinerary-intel";

describe("itinerary intel", () => {
  it("validates against the schema", () => {
    expect(() => ItineraryIntelListSchema.parse(demoItineraryIntel)).not.toThrow();
  });

  it("references only real itinerary items, at most once each", () => {
    const itemIds = new Set(demoChina2026.itineraryItems.map((item) => item.id));
    const seen = new Set<string>();
    for (const intel of demoItineraryIntel) {
      expect(itemIds.has(intel.itineraryItemId), intel.itineraryItemId).toBe(true);
      expect(seen.has(intel.itineraryItemId), `duplicate ${intel.itineraryItemId}`).toBe(false);
      seen.add(intel.itineraryItemId);
    }
  });

  it("links only to real business-target dossiers", () => {
    const targetIds = new Set(demoBusinessTargets.map((target) => target.id));
    for (const intel of demoItineraryIntel) {
      for (const id of intel.relatedTargetIds) {
        expect(targetIds.has(id), `${intel.itineraryItemId} → ${id}`).toBe(true);
      }
    }
  });

  it("keeps the Science Park day and Week 3 supply-chain block linked", () => {
    const scienceP = demoItineraryIntel.find(
      (intel) => intel.itineraryItemId === "00000000-0000-4000-8000-000000000904"
    );
    expect(scienceP?.relatedTargetIds).toContain("hk-insilico-medicine");
    const week3 = demoItineraryIntel.find(
      (intel) => intel.itineraryItemId === "00000000-0000-4000-8000-000000000910"
    );
    expect(week3?.relatedTargetIds).toContain("dg-xbotpark");
  });

  it("never ships contact identifiers in sub-sessions", () => {
    const text = JSON.stringify(demoItineraryIntel);
    expect(text).not.toMatch(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
    expect(text).not.toMatch(/\+\d[\d\s-]{6,}/);
    expect(text).not.toMatch(/wechat|微信/i);
    // No flight numbers or booking-reference-shaped tokens.
    expect(text).not.toMatch(/\b(EY|QR|CX|EK)\s?\d{2,4}\b/);
  });
});
