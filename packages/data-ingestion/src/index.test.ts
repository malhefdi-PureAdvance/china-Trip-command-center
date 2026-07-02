import { describe, expect, it } from "vitest";

import {
  assertNoSensitiveFields,
  businessTargetDryRunFixtureBatch,
  dryRunBusinessTargetIngestionBatch,
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

  it("dry-runs mixed records with row-level accepted and rejected outcomes without writes", () => {
    const result = dryRunBusinessTargetIngestionBatch({
      sourceSystem: "manual-demo",
      records: [
        safeRecord,
        {
          ...safeRecord,
          name: "Demo Private Payload",
          paymentCard: "4111 1111 1111 1111"
        },
        {
          ...safeRecord,
          name: "Demo Shanghai Out-of-Corridor Lead",
          city: "Shanghai"
        },
        {
          ...safeRecord,
          name: "Demo Missing Source URL",
          sourceUrl: undefined
        }
      ]
    });

    expect(result.mode).toBe("dry_run");
    expect(result.summary).toEqual({
      totalRecords: 4,
      acceptedRecords: 1,
      rejectedRecords: 3,
      writesPerformed: 0
    });
    expect(result.acceptedRecords).toHaveLength(1);
    expect(result.acceptedRecords[0]?.name).toBe("Demo Shenzhen Advanced Materials Group");
    expect(result.rejectedRecords).toEqual([
      expect.objectContaining({
        index: 1,
        name: "Demo Private Payload",
        sensitiveFieldPaths: ["records.1.paymentCard"],
        reasons: expect.arrayContaining(["Blocked sensitive fields: records.1.paymentCard"])
      }),
      expect.objectContaining({
        index: 2,
        name: "Demo Shanghai Out-of-Corridor Lead",
        sensitiveFieldPaths: [],
        reasons: expect.arrayContaining(["city must stay in the Hong Kong/Shenzhen corridor"])
      }),
      expect.objectContaining({
        index: 3,
        name: "Demo Missing Source URL",
        sensitiveFieldPaths: [],
        reasons: expect.arrayContaining(["sourceUrl is required"])
      })
    ]);
  });

  it("ships a synthetic dry-run fixture with accepted and rejected examples", () => {
    const result = dryRunBusinessTargetIngestionBatch(businessTargetDryRunFixtureBatch);

    expect(result.summary).toEqual({
      totalRecords: 4,
      acceptedRecords: 1,
      rejectedRecords: 3,
      writesPerformed: 0
    });
    expect(result.acceptedRecords[0]?.name).toContain("Advanced Materials");
    expect(result.rejectedRecords.map((record) => record.name)).toEqual([
      "Demo Missing Source URL",
      "Demo Private Payload",
      "Demo Shanghai Out-of-Corridor Lead"
    ]);
  });
});
