import type {
  BusinessVisitReviewSnapshot,
  BusinessVisitReviewTarget
} from "@pure-advance/database";
import type { IngestionDryRunResult } from "@pure-advance/data-ingestion";
import type { BadgeProps } from "@pure-advance/design-system";
import type { BusinessTarget, DemoDataset } from "@pure-advance/domain";

type BadgeTone = NonNullable<BadgeProps["tone"]>;

export type DataReviewSummaryRow = {
  label: string;
  value: number | string;
  tone: BadgeTone;
  note: string;
};

export type DataReviewSource = {
  label: "Live Supabase" | "Demo fallback";
  tone: BadgeTone;
  note: string;
};

export type DataReviewModel = {
  source: DataReviewSource;
  summaryRows: DataReviewSummaryRow[];
  targetsAwaitingVerification: BusinessVisitReviewTarget[];
};

export type IngestionDryRunRejectionRow = {
  index: number;
  name: string;
  tone: BadgeTone;
  reasons: string[];
};

export type IngestionDryRunModel = {
  status: {
    label: "Dry-run clean" | "Dry-run corrections needed";
    tone: BadgeTone;
    note: string;
  };
  summaryRows: DataReviewSummaryRow[];
  rejectionRows: IngestionDryRunRejectionRow[];
};

function isVerifiedSource(sourceConfidence: string) {
  return sourceConfidence === "verified";
}

function toneForManualQueue(count: number): BadgeTone {
  return count > 0 ? "amber" : "green";
}

function fromDemoTarget(target: BusinessTarget): BusinessVisitReviewTarget {
  return {
    id: target.id,
    name: target.name,
    city: target.city,
    sourceConfidence: target.sourceConfidence,
    status: target.status,
    priorityRank: target.priorityRank
  };
}

function buildDemoReviewModel(
  snapshot: BusinessVisitReviewSnapshot,
  demoData: DemoDataset
): DataReviewModel {
  const targetsAwaitingVerification = demoData.businessTargets
    .filter((target) => !isVerifiedSource(target.sourceConfidence))
    .map(fromDemoTarget);

  return {
    source: {
      label: "Demo fallback",
      tone: "amber",
      note: snapshot.message
    },
    summaryRows: [
      {
        label: "Business target sources",
        value: demoData.businessTargetSources.length,
        tone: "cyan",
        note: "Synthetic records only"
      },
      {
        label: "Sensitive field guardrail",
        value: "On",
        tone: "green",
        note: "Future ingestion rejects blocked fields"
      },
      {
        label: "Manual review queue",
        value: targetsAwaitingVerification.length,
        tone: toneForManualQueue(targetsAwaitingVerification.length),
        note: "Demo targets below verified confidence"
      }
    ],
    targetsAwaitingVerification
  };
}

export function buildBusinessVisitReviewModel(
  snapshot: BusinessVisitReviewSnapshot,
  demoData: DemoDataset
): DataReviewModel {
  if (snapshot.source !== "supabase" || snapshot.status !== "ready") {
    return buildDemoReviewModel(snapshot, demoData);
  }

  const manualReviewQueueCount = snapshot.manualReviewQueueCount ?? 0;

  return {
    source: {
      label: "Live Supabase",
      tone: "green",
      note: snapshot.message
    },
    summaryRows: [
      {
        label: "Business target sources",
        value: snapshot.businessTargetSourceCount ?? 0,
        tone: "green",
        note: "Live Supabase rows"
      },
      {
        label: "Sensitive field guardrail",
        value: "On",
        tone: "green",
        note: "Future ingestion rejects blocked fields"
      },
      {
        label: "Manual review queue",
        value: manualReviewQueueCount,
        tone: toneForManualQueue(manualReviewQueueCount),
        note: "Live targets below verified confidence"
      }
    ],
    targetsAwaitingVerification: snapshot.targetsAwaitingVerification
  };
}

export function buildIngestionDryRunModel(dryRun: IngestionDryRunResult): IngestionDryRunModel {
  const hasRejections = dryRun.summary.rejectedRecords > 0;

  return {
    status: {
      label: hasRejections ? "Dry-run corrections needed" : "Dry-run clean",
      tone: hasRejections ? "amber" : "green",
      note: "No database writes performed"
    },
    summaryRows: [
      {
        label: "Dry-run accepted",
        value: dryRun.summary.acceptedRecords,
        tone: "green",
        note: "Rows ready for human review"
      },
      {
        label: "Dry-run rejected",
        value: dryRun.summary.rejectedRecords,
        tone: hasRejections ? "amber" : "green",
        note: "Rows blocked before staging"
      },
      {
        label: "Database writes",
        value: dryRun.summary.writesPerformed,
        tone: "green",
        note: "Dry-run only"
      }
    ],
    rejectionRows: dryRun.rejectedRecords.map((record) => ({
      index: record.index,
      name: record.name ?? `Record ${record.index + 1}`,
      tone: record.sensitiveFieldPaths.length > 0 ? "coral" : "amber",
      reasons: record.reasons
    }))
  };
}
