import { describe, expect, it } from "vitest";

import {
  BusinessTargetStatusSchema,
  BusinessVisitDataStandardSchema,
  DemoDatasetSchema,
  businessVisitDataStandard,
  demoChina2026
} from ".";

describe("domain schemas", () => {
  it("validates the China 2026 demo dataset", () => {
    expect(() => DemoDatasetSchema.parse(demoChina2026)).not.toThrow();
  });

  it("contains the required business target workflow statuses", () => {
    expect(BusinessTargetStatusSchema.options).toEqual([
      "candidate",
      "source_needed",
      "researched",
      "profiled",
      "reviewed",
      "submission_ready",
      "submitted",
      "scheduled",
      "visited",
      "follow_up",
      "archived"
    ]);
  });

  it("documents the business visit data standard in schemas", () => {
    expect(() => BusinessVisitDataStandardSchema.parse(businessVisitDataStandard)).not.toThrow();
    expect(businessVisitDataStandard.requiredFields).toContain("source_confidence");
    expect(businessVisitDataStandard.blockedSensitiveFields).toContain("passport_number");
  });
});
