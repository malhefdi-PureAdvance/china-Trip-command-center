import { describe, expect, it } from "vitest";

import { buildMissionOps, relevanceForTarget } from "./mission-ops";
import { getTargetById } from "./targets";

describe("mission ops model", () => {
  it("uses an injected clock to build the pre-flight cockpit", () => {
    const model = buildMissionOps(new Date("2026-07-02T09:00:00+08:00"));

    expect(model.clock.state).toBe("preflight");
    expect(model.currentPhase?.id).toBe("phase_arrival_hk");
    expect(model.focusEntry?.event.item.title).toBe("Arrival & Hong Kong base setup");
    expect(model.nextPrepEntry?.event.item.title).toBe("Arrival & Hong Kong base setup");
    expect(model.notePrompts[0]).toEqual(
      expect.objectContaining({
        id: "event-00000000-0000-4000-8000-000000000901",
        template: "meeting",
        title: "JUL 5 · Arrival & Hong Kong base setup"
      })
    );
  });

  it("derives itinerary-linked target relevance and next actions", () => {
    const model = buildMissionOps(new Date("2026-07-13T09:00:00+08:00"));
    const target = getTargetById("sz-synceres");

    expect(target).not.toBeNull();
    const relevance = relevanceForTarget(model, target!);

    expect(relevance.relatedEvent?.event.item.title).toBe(
      "Week 2 kickoff · InnoX mentors & KAUST Shenzhen Hub"
    );
    expect(relevance.whyNow).toContain("JUL 13");
    expect(relevance.nextAction).toContain("Before JUL 13");
  });

  it("falls back to target priority after the timeline is complete", () => {
    const model = buildMissionOps(new Date("2026-08-05T09:00:00+08:00"));

    expect(model.clock.state).toBe("complete");
    expect(model.focusEntry).toBeNull();
    expect(model.nextPrepEntry).toBeNull();
    expect(model.relevantTargets.length).toBeGreaterThan(0);
    expect(model.statusItems.find((item) => item.label === "Offline")?.value).toBe("Public shell");
  });
});
