import { describe, expect, it } from "vitest";

import { MissionPhasesSchema } from "../schemas";
import { demoChina2026, demoMissionPhases } from "./china-2026";

const serialized = JSON.stringify(demoChina2026);

describe("China 2026 real trip anchors", () => {
  it("uses the real sanitized Jul 4 – Aug 2, 2026 trip frame", () => {
    const trip = demoChina2026.trips[0];
    expect(trip.startsOn).toBe("2026-07-04");
    expect(trip.endsOn).toBe("2026-08-02");
    expect(trip.region).toBe("Hong Kong / Shenzhen Greater Bay Area");
  });

  it("never regresses to the April 2026 placeholder dates", () => {
    // Guards against reverting to the old synthetic April scaffold.
    expect(serialized).not.toContain("2026-04");
    expect(JSON.stringify(demoMissionPhases)).not.toContain("2026-04");
    expect(serialized).toContain("2026-07");
    expect(serialized).toContain("2026-08");
  });

  it("anchors the signature program moments on their real dates", () => {
    const leapEastDayOne = demoChina2026.itineraryItems.find((item) =>
      item.title.includes("LEAP East at HKCEC — Day 1")
    );
    const demoDay = demoChina2026.itineraryItems.find((item) => item.title.startsWith("Demo Day"));

    expect(leapEastDayOne?.startsAt.startsWith("2026-07-08")).toBe(true);
    expect(demoDay?.startsAt.startsWith("2026-07-31")).toBe(true);
  });

  it("keeps every itinerary item inside the real July/August window", () => {
    for (const item of demoChina2026.itineraryItems) {
      expect(item.startsAt >= "2026-07-05").toBe(true);
      expect(item.startsAt <= "2026-08-02").toBe(true);
    }
  });

  it("exposes a valid seven-phase mission spine with four program weeks", () => {
    expect(() => MissionPhasesSchema.parse(demoMissionPhases)).not.toThrow();
    expect(demoMissionPhases).toHaveLength(7);
    expect(demoMissionPhases.filter((phase) => phase.label.startsWith("Week"))).toHaveLength(4);
    // Phases are ordered and stay in the Hong Kong / Shenzhen corridor.
    expect(demoMissionPhases.map((phase) => phase.order)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
