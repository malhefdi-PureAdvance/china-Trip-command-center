import { describe, expect, it } from "vitest";

import {
  assertNoSensitiveFields,
  importBusinessTargetsForReview,
  requiresHumanReview,
  validateBusinessTargetIngestionBatch
} from ".";

const safeRecord = {
  name: "Demo Shenzhen Advanced Materials Group",
  city: "Shenzhen",
  country: "China",
  sector: "Advanced materials",
  sourceLabel: "Demo research note",
  sourceUrl: "https://example.com/demo-source",
  capturedAt: "2026-01-15T09:30:00+08:00",
  confidence: "medium",
  actionSummary: "Validate whether the demo supplier can support a short capability visit.",
  visitObjective: "Assess capability fit, lead times, quality controls, and next-step ownership."
} as const;

describe("data ingestion placeholders", () => {
  it("rejects sensitive fields before parsing", () => {
    const payload = {
      sourceSystem: "manual-demo",
      records: [{ ...safeRecord, passportNumber: "DEMO-DO-NOT-STORE" }]
    };

    const result = validateBusinessTargetIngestionBatch(payload);

    expect(result.status).toBe("rejected");
    expect(result.rejectedSensitiveFields).toEqual(["records.0.passportNumber"]);
    expect(() => assertNoSensitiveFields(payload)).toThrow("Sensitive fields are not allowed");
  });

  it("validates safe records for review without importing", () => {
    const result = importBusinessTargetsForReview({
      sourceSystem: "manual-demo",
      records: [safeRecord]
    });

    expect(result.status).toBe("ready_for_human_review");
    expect(result.recordsStaged).toBe(1);
    expect(result.recordsImported).toBe(0);
  });

  it("marks low-confidence records for human review", () => {
    expect(requiresHumanReview({ ...safeRecord, confidence: "low" })).toBe(true);
  });
});
