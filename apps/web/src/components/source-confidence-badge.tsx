import { Badge, type BadgeProps } from "@pure-advance/design-system";
import type { BusinessTargetDossier } from "@pure-advance/domain";

const toneByConfidence: Record<BusinessTargetDossier["confidence"], BadgeProps["tone"]> = {
  verified: "green",
  high: "cyan",
  medium: "cyan",
  low: "amber",
  unknown: "amber"
};

export function SourceConfidenceBadge({
  confidence
}: Readonly<{ confidence: BusinessTargetDossier["confidence"] }>) {
  return <Badge tone={toneByConfidence[confidence]}>{confidence} confidence</Badge>;
}
