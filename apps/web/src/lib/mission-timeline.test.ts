import { demoChina2026, demoMissionPhases } from "@pure-advance/domain";
import { describe, expect, it } from "vitest";

import {
  buildMissionTimeline,
  corridorDateKey,
  daysBetween,
  missionClock,
  shortDate,
  type TimelineResolvers
} from "./mission-timeline";

const locationsById = new Map(demoChina2026.locations.map((location) => [location.id, location]));
const trip = demoChina2026.trips[0];

const resolvers: TimelineResolvers = {
  getLocationName: (id) => (id ? (locationsById.get(id)?.name ?? null) : null),
  getLocationCity: (id) => (id ? (locationsById.get(id)?.city ?? null) : null),
  getOwnerName: () => "Mohammed"
};

function timelineAt(iso: string) {
  return buildMissionTimeline(
    demoChina2026.itineraryItems,
    demoMissionPhases,
    new Date(iso),
    resolvers
  );
}

function allDays(iso: string) {
  return timelineAt(iso).phases.flatMap((phase) => phase.days);
}

describe("corridor date helpers", () => {
  it("resolves the +08:00 wall-clock calendar day", () => {
    expect(corridorDateKey("2026-07-05T09:00:00+08:00")).toBe("2026-07-05");
    // 20:00Z on Jul 4 is already Jul 5 in Hong Kong.
    expect(corridorDateKey(new Date("2026-07-04T20:00:00Z"))).toBe("2026-07-05");
  });

  it("counts whole days between calendar keys", () => {
    expect(daysBetween("2026-07-04", "2026-08-02")).toBe(29);
    expect(daysBetween("2026-07-08", "2026-07-04")).toBe(-4);
  });

  it("formats short mono date labels", () => {
    expect(shortDate("2026-07-08")).toBe("JUL 8");
    expect(shortDate("2026-08-01")).toBe("AUG 1");
  });
});

describe("missionClock", () => {
  it("counts down to wheels-up before the trip", () => {
    const clock = missionClock(trip, new Date("2026-07-02T09:00:00+08:00"));
    expect(clock.state).toBe("preflight");
    expect(clock.countdown).toBe("T‑2D");
    expect(clock.totalDays).toBe(30);
  });

  it("reports the live mission day during the trip", () => {
    const clock = missionClock(trip, new Date("2026-07-08T12:00:00+08:00"));
    expect(clock.state).toBe("active");
    expect(clock.dayIndex).toBe(5);
    expect(clock.countdown).toBe("DAY 5");
  });

  it("switches to debrief after the trip", () => {
    const clock = missionClock(trip, new Date("2026-08-05T09:00:00+08:00"));
    expect(clock.state).toBe("complete");
  });
});

describe("buildMissionTimeline", () => {
  it("groups every itinerary item under the seven-phase spine", () => {
    const timeline = timelineAt("2026-07-02T09:00:00+08:00");
    expect(timeline.totalEvents).toBe(demoChina2026.itineraryItems.length);
    expect(timeline.phases).toHaveLength(7);
  });

  it("marks the current day live and the earliest future day next", () => {
    const days = allDays("2026-07-08T12:00:00+08:00");
    const byDate = new Map(days.map((day) => [day.date, day]));

    expect(byDate.get("2026-07-07")?.state).toBe("done");
    expect(byDate.get("2026-07-08")?.state).toBe("now");
    expect(byDate.get("2026-07-09")?.state).toBe("next");

    const liveDay = byDate.get("2026-07-08");
    expect(
      liveDay?.events.some((event) => event.item.title.startsWith("LEAP East at HKCEC — Day 1"))
    ).toBe(true);
  });

  it("marks the first upcoming day next when the trip has not started", () => {
    const days = allDays("2026-07-02T09:00:00+08:00");
    const byDate = new Map(days.map((day) => [day.date, day]));

    expect(byDate.get("2026-07-05")?.state).toBe("next");
    expect(days.some((day) => day.state === "now")).toBe(false);
  });
});
