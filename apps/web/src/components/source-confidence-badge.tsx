import { cn } from "@pure-advance/design-system";
import type { BusinessTargetDossier } from "@pure-advance/domain";

type Confidence = BusinessTargetDossier["confidence"];

const confidenceMeta: Record<Confidence, { chip: string; dot: string }> = {
  verified: {
    chip: "border-transparent bg-[var(--cc-green-tint)] text-[var(--cc-green)]",
    dot: "bg-[var(--cc-green)]"
  },
  high: {
    chip: "border-[var(--cc-cyan-line-soft)] bg-[var(--cc-cyan-tint-2)] text-[var(--cc-cyan)]",
    dot: "bg-[var(--cc-cyan)]"
  },
  medium: {
    chip: "border-[var(--cc-border)] bg-[var(--cc-surface-inset)] text-[var(--cc-text-2)]",
    dot: "bg-[var(--cc-cyan)]"
  },
  low: {
    chip: "border-[var(--cc-amber-line)] bg-[var(--cc-amber-tint)] text-[var(--cc-amber-text)]",
    dot: "bg-[var(--cc-amber)]"
  },
  unknown: {
    chip: "border-[var(--cc-amber-line)] bg-[var(--cc-amber-tint)] text-[var(--cc-amber-text)]",
    dot: "bg-[var(--cc-amber)]"
  }
};

/** Source-confidence as a dot-status chip: instrument light + mono label. */
export function SourceConfidenceBadge({
  confidence,
  className
}: Readonly<{ confidence: Confidence; className?: string }>) {
  const meta = confidenceMeta[confidence];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-[var(--cc-r-chip)] border px-[8px] py-[4px] font-mono text-[9.5px] uppercase leading-none tracking-[0.07em]",
        meta.chip,
        className
      )}
    >
      <span className={cn("size-[6px] rounded-full", meta.dot)} aria-hidden="true" />
      {confidence} confidence
    </span>
  );
}
