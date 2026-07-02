import type { BusinessVisitReviewSnapshot } from "@pure-advance/database";
import { demoChina2026 } from "@pure-advance/domain";
import { describe, expect, it } from "vitest";

import { buildBusinessVisitReviewModel } from "./data-review-view";

const liveSnapshot: BusinessVisitReviewSnapshot = {
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
};

describe("data review view model", () => {
  it("uses live Supabase review metrics when the review snapshot is ready", () => {
    const model = buildBusinessVisitReviewModel(liveSnapshot, demoChina2026);

    expect(model.source).toEqual({
      label: "Live Supabase",
      tone: "green",
      note: "Supabase business visit review data loaded."
    });
    expect(model.summaryRows).toEqual([
      expect.objectContaining({
        label: "Business target sources",
        value: 3,
        tone: "green",
        note: "Live Supabase rows"
      }),
      expect.objectContaining({ label: "Sensitive field guardrail", value: "On" }),
      expect.objectContaining({
        label: "Manual review queue",
        value: 2,
        tone: "amber",
        note: "Live targets below verified confidence"
      })
    ]);
    expect(model.targetsAwaitingVerification).toEqual(liveSnapshot.targetsAwaitingVerification);
  });

  it("falls back to demo review metrics when live Supabase review data is unavailable", () => {
    const model = buildBusinessVisitReviewModel(
      {
        ...liveSnapshot,
        status: "not_configured",
        source: "unavailable",
        businessTargetSourceCount: null,
        manualReviewQueueCount: null,
        targetsAwaitingVerification: [],
        message: "Supabase public environment variables are not configured."
      },
      demoChina2026
    );

    expect(model.source).toEqual({
      label: "Demo fallback",
      tone: "amber",
      note: "Supabase public environment variables are not configured."
    });
    expect(model.summaryRows).toEqual([
      expect.objectContaining({
        label: "Business target sources",
        value: demoChina2026.businessTargetSources.length,
        tone: "cyan",
        note: "Synthetic records only"
      }),
      expect.objectContaining({ label: "Sensitive field guardrail", value: "On" }),
      expect.objectContaining({
        label: "Manual review queue",
        value: demoChina2026.businessTargets.length,
        tone: "amber",
        note: "Demo targets below verified confidence"
      })
    ]);
  });
});
