import type {
  BusinessVisitReviewSnapshot,
  BusinessVisitReviewTarget
} from "@pure-advance/database";
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
