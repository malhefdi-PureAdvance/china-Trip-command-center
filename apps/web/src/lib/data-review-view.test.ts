import type { BusinessVisitReviewSnapshot } from "@pure-advance/database";
import {
  businessTargetDryRunFixtureBatch,
  dryRunBusinessTargetIngestionBatch
} from "@pure-advance/data-ingestion";
import { demoChina2026 } from "@pure-advance/domain";
import { describe, expect, it } from "vitest";

import { buildBusinessVisitReviewModel, buildIngestionDryRunModel } from "./data-review-view";

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
      label: "Verified",
      tone: "green",
      note: "Supabase business visit review data loaded."
    });
    expect(model.summaryRows).toEqual([
      expect.objectContaining({
        label: "Business target sources",
        value: 3,
        tone: "green",
        note: "Verified Supabase rows"
      }),
      expect.objectContaining({ label: "Sensitive field guardrail", value: "On" }),
      expect.objectContaining({
        label: "Manual review queue",
        value: 2,
        tone: "amber",
        note: "Verified rows below source confidence"
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
        note: "Static fallback rows"
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

  it("summarizes the dry-run ingestion contract and rejection reasons", () => {
    const dryRun = dryRunBusinessTargetIngestionBatch(businessTargetDryRunFixtureBatch);
    const model = buildIngestionDryRunModel(dryRun);

    expect(model.status).toEqual({
      label: "Dry-run corrections needed",
      tone: "amber",
      note: "No database writes performed"
    });
    expect(model.summaryRows).toEqual([
      {
        label: "Dry-run accepted",
        value: 1,
        tone: "green",
        note: "Rows ready for human review"
      },
      {
        label: "Dry-run rejected",
        value: 3,
        tone: "amber",
        note: "Rows blocked before staging"
      },
      {
        label: "Database writes",
        value: 0,
        tone: "green",
        note: "Dry-run only"
      }
    ]);
    expect(model.rejectionRows).toEqual([
      expect.objectContaining({
        index: 1,
        name: "Demo Missing Source URL",
        tone: "amber",
        reasons: ["sourceUrl is required"]
      }),
      expect.objectContaining({
        index: 2,
        name: "Demo Private Payload",
        tone: "coral",
        reasons: ["Blocked sensitive fields: records.2.paymentCard"]
      }),
      expect.objectContaining({
        index: 3,
        name: "Demo Shanghai Out-of-Corridor Lead",
        tone: "amber",
        reasons: ["city must stay in the Hong Kong/Shenzhen corridor"]
      })
    ]);
  });
});
