import { z } from "zod";

import {
  BusinessTargetStatusSchema,
  SourceConfidenceSchema,
  businessVisitDataStandard
} from "@pure-advance/domain";

export const BusinessTargetIngestionRecordSchema = z
  .object({
    name: z.string().min(2),
    city: z.enum(["Hong Kong", "Shenzhen"]),
    country: z.literal("China"),
    sector: z.string().min(2),
    sourceLabel: z.string().min(2),
    sourceUrl: z.string().url(),
    capturedAt: z.string().datetime({ offset: true }),
    confidence: SourceConfidenceSchema,
    proposedStatus: BusinessTargetStatusSchema.default("source_needed"),
    actionSummary: z.string().min(10).optional(),
    visitObjective: z.string().min(10).optional(),
    productsOrCapabilities: z.array(z.string().min(2)).default([]),
    talkingPoints: z.array(z.string().min(2)).default([]),
    openQuestions: z.array(z.string().min(2)).default([]),
    risks: z.array(z.string().min(2)).default([]),
    notes: z.string().max(2_000).optional()
  })
  .strict();

export const IngestionRecordSchema = BusinessTargetIngestionRecordSchema;

export const IngestionBatchSchema = z
  .object({
    sourceSystem: z.string().min(2).default("manual-demo"),
    records: z.array(BusinessTargetIngestionRecordSchema).min(1)
  })
  .strict();

export type IngestionRecord = z.infer<typeof IngestionRecordSchema>;
export type IngestionBatch = z.infer<typeof IngestionBatchSchema>;

const fixtureSafeBusinessTarget = {
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

export const businessTargetDryRunFixtureBatch = {
  sourceSystem: "dry-run-fixture",
  records: [
    fixtureSafeBusinessTarget,
    {
      ...fixtureSafeBusinessTarget,
      name: "Demo Missing Source URL",
      sourceUrl: undefined
    },
    {
      ...fixtureSafeBusinessTarget,
      name: "Demo Private Payload",
      paymentCard: "fixture-blocked-value"
    },
    {
      ...fixtureSafeBusinessTarget,
      name: "Demo Shanghai Out-of-Corridor Lead",
      city: "Shanghai"
    }
  ]
} as const;

export interface IngestionValidationResult {
  status: "ready_for_human_review" | "rejected";
  dataStandardId: typeof businessVisitDataStandard.id;
  records: IngestionRecord[];
  rejectedSensitiveFields: string[];
  message: string;
}

export interface IngestionImportResult extends IngestionValidationResult {
  recordsImported: 0;
  recordsStaged: number;
}

export interface IngestionDryRunRejectedRecord {
  index: number;
  name: string | null;
  reasons: string[];
  sensitiveFieldPaths: string[];
}

export interface IngestionDryRunSummary {
  totalRecords: number;
  acceptedRecords: number;
  rejectedRecords: number;
  writesPerformed: 0;
}

export interface IngestionDryRunResult {
  mode: "dry_run";
  status: "ready_for_human_review" | "rejected";
  dataStandardId: typeof businessVisitDataStandard.id;
  acceptedRecords: IngestionRecord[];
  rejectedRecords: IngestionDryRunRejectedRecord[];
  summary: IngestionDryRunSummary;
  message: string;
}

const normalizedSensitiveFields = new Set(
  businessVisitDataStandard.blockedSensitiveFields.map((fieldName) => normalizeFieldName(fieldName))
);

export function requiresHumanReview(record: Pick<IngestionRecord, "confidence">) {
  return record.confidence === "unknown" || record.confidence === "low";
}

export function dryRunBusinessTargetIngestionBatch(input: unknown): IngestionDryRunResult {
  const rawRecords = isRecord(input) && Array.isArray(input.records) ? input.records : [];
  const acceptedRecords: IngestionRecord[] = [];
  const rejectedRecords: IngestionDryRunRejectedRecord[] = [];

  for (const [index, rawRecord] of rawRecords.entries()) {
    const sensitiveFieldPaths = findSensitiveFieldPaths(rawRecord, ["records", String(index)]);
    const name = readRecordName(rawRecord);

    if (sensitiveFieldPaths.length > 0) {
      rejectedRecords.push({
        index,
        name,
        sensitiveFieldPaths,
        reasons: [`Blocked sensitive fields: ${sensitiveFieldPaths.join(", ")}`]
      });
      continue;
    }

    const parsed = BusinessTargetIngestionRecordSchema.safeParse(rawRecord);

    if (!parsed.success) {
      rejectedRecords.push({
        index,
        name,
        sensitiveFieldPaths: [],
        reasons: parsed.error.issues.map(mapDryRunIssue)
      });
      continue;
    }

    acceptedRecords.push(parsed.data);
  }

  if (rawRecords.length === 0) {
    rejectedRecords.push({
      index: 0,
      name: null,
      sensitiveFieldPaths: [],
      reasons: ["records must contain at least one business target record"]
    });
  }

  return {
    mode: "dry_run",
    status: rejectedRecords.length > 0 ? "rejected" : "ready_for_human_review",
    dataStandardId: businessVisitDataStandard.id,
    acceptedRecords,
    rejectedRecords,
    summary: {
      totalRecords: rawRecords.length,
      acceptedRecords: acceptedRecords.length,
      rejectedRecords: rejectedRecords.length,
      writesPerformed: 0
    },
    message:
      rejectedRecords.length > 0
        ? "Dry run found records that require correction before human review. No database writes were performed."
        : "Dry run passed. Records are ready for human review only; no database writes were performed."
  };
}

export function findSensitiveFieldPaths(value: unknown, path: string[] = []): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => findSensitiveFieldPaths(item, [...path, String(index)]));
  }

  if (!isRecord(value)) {
    return [];
  }

  return Object.entries(value).flatMap(([key, childValue]) => {
    const currentPath = [...path, key];
    const keyMatchesSensitiveField = normalizedSensitiveFields.has(normalizeFieldName(key));
    const nestedMatches = findSensitiveFieldPaths(childValue, currentPath);

    return keyMatchesSensitiveField ? [currentPath.join("."), ...nestedMatches] : nestedMatches;
  });
}

export function assertNoSensitiveFields(value: unknown) {
  const sensitiveFieldPaths = findSensitiveFieldPaths(value);

  if (sensitiveFieldPaths.length > 0) {
    throw new SensitiveDataRejectedError(sensitiveFieldPaths);
  }
}

export function validateBusinessTargetIngestionBatch(input: unknown): IngestionValidationResult {
  const rejectedSensitiveFields = findSensitiveFieldPaths(input);

  if (rejectedSensitiveFields.length > 0) {
    return {
      status: "rejected",
      dataStandardId: businessVisitDataStandard.id,
      records: [],
      rejectedSensitiveFields,
      message:
        "Rejected sensitive fields before parsing. This placeholder is for future source-backed ingestion and must not accept identity, payment, credential, private contact, or home address data."
    };
  }

  const parsed = IngestionBatchSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "rejected",
      dataStandardId: businessVisitDataStandard.id,
      records: [],
      rejectedSensitiveFields: [],
      message: parsed.error.issues.map((issue) => issue.message).join("; ")
    };
  }

  return {
    status: "ready_for_human_review",
    dataStandardId: businessVisitDataStandard.id,
    records: parsed.data.records,
    rejectedSensitiveFields: [],
    message:
      "Validated for manual review only. Future source-backed ingestion can stage these records after review; this scaffold performs no database writes."
  };
}

export function importBusinessTargetsForReview(input: unknown): IngestionImportResult {
  const validation = validateBusinessTargetIngestionBatch(input);

  return {
    ...validation,
    recordsImported: 0,
    recordsStaged: validation.status === "ready_for_human_review" ? validation.records.length : 0,
    message:
      validation.status === "ready_for_human_review"
        ? `${validation.message} Records imported: 0.`
        : validation.message
  };
}

export class SensitiveDataRejectedError extends Error {
  readonly fields: string[];

  constructor(fields: string[]) {
    super(`Sensitive fields are not allowed in ingestion payloads: ${fields.join(", ")}`);
    this.name = "SensitiveDataRejectedError";
    this.fields = fields;
  }
}

function normalizeFieldName(fieldName: string) {
  return fieldName.replace(/[^a-z0-9]/giu, "").toLowerCase();
}

function mapDryRunIssue(issue: z.core.$ZodIssue): string {
  const path = issue.path.join(".");

  if (path === "sourceUrl" && issue.code === "invalid_type") {
    return "sourceUrl is required";
  }

  if (path === "city") {
    return "city must stay in the Hong Kong/Shenzhen corridor";
  }

  return path ? `${path}: ${issue.message}` : issue.message;
}

function readRecordName(value: unknown): string | null {
  if (!isRecord(value) || typeof value.name !== "string" || value.name.trim().length === 0) {
    return null;
  }

  return value.name;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
