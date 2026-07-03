import { Badge, cn, type BadgeProps } from "@pure-advance/design-system";
import type { BusinessTargetDossier } from "@pure-advance/domain";

type Confidence = BusinessTargetDossier["confidence"];

const toneByConfidence: Record<Confidence, BadgeProps["tone"]> = {
  verified: "green",
  high: "cyan",
  medium: "cyan",
  low: "amber",
  unknown: "amber"
};

const dotByConfidence: Record<Confidence, string> = {
  verified: "bg-[var(--cc-green)]",
  high: "bg-[var(--cc-cyan)]",
  medium: "bg-[var(--cc-cyan)]",
  low: "bg-[var(--cc-amber)]",
  unknown: "bg-[var(--cc-amber)]"
};

export function SourceConfidenceBadge({ confidence }: Readonly<{ confidence: Confidence }>) {
  return <Badge tone={toneByConfidence[confidence]}>{confidence} confidence</Badge>;
}

/** Compact source-confidence readout for dense cards: status dot + mono word. */
export function ConfidenceDot({
  confidence,
  className
}: Readonly<{ confidence: Confidence; className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase leading-none tracking-[0.07em] text-[var(--cc-text-faint)]",
        className
      )}
      title={`${confidence} source confidence`}
    >
      <span
        className={cn("size-[6px] shrink-0 rounded-full", dotByConfidence[confidence])}
        aria-hidden="true"
      />
      {confidence}
    </span>
  );
}
