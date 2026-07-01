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
    sourceUrl: z.string().url().optional(),
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

const normalizedSensitiveFields = new Set(
  businessVisitDataStandard.blockedSensitiveFields.map((fieldName) => normalizeFieldName(fieldName))
);

export function requiresHumanReview(record: Pick<IngestionRecord, "confidence">) {
  return record.confidence === "unknown" || record.confidence === "low";
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
