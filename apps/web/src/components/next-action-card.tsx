import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, MapPin } from "lucide-react";

import { MetaChip, type ChipTone } from "@/components/command-kit";
import { ConfidenceDot } from "@/components/source-confidence-badge";
import type { TargetRelevance } from "@/lib/mission-ops";
import { categoryMeta, priorityMeta } from "@/lib/targets";

const priorityChipTone: Record<string, ChipTone> = {
  cyan: "cyanSolid",
  green: "green",
  amber: "amber",
  neutral: "neutral"
};

export function NextActionCard({ relevance }: Readonly<{ relevance: TargetRelevance }>) {
  const { target } = relevance;
  const priority = priorityMeta[target.priority];

  return (
    <Link
      href={`/business-targets/${target.id}`}
      className="lift group block min-w-0 rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)] hover:border-[var(--cc-border-strong)]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex min-w-0 flex-wrap items-center gap-1.5">
          <MetaChip tone={priorityChipTone[priority.tone]}>{priority.label}</MetaChip>
          <span className="font-mono text-[9px] uppercase tracking-[0.09em] text-[var(--cc-text-faint)]">
            {categoryMeta[target.category].short}
          </span>
        </span>
        <ConfidenceDot confidence={target.confidence} className="shrink-0" />
      </div>
      <h3 className="mt-2 flex items-center gap-1.5 text-[14px] font-bold leading-tight tracking-[-0.01em] text-[var(--cc-text)]">
        <span className="min-w-0 truncate">{target.name}</span>
        <ArrowRight
          className="ml-auto size-3.5 shrink-0 text-[var(--cc-cyan)] transition-transform duration-[var(--cc-dur-fast)] ease-[var(--cc-ease)] group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-[var(--cc-text-3)]">
        <MapPin className="size-3.5 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
        <span className="min-w-0 truncate">
          {target.area} · {target.corridor}
        </span>
      </p>
      <p className="mt-2 flex items-start gap-1.5 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.05em] text-[var(--cc-amber-text)]">
        <CalendarClock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        <span className="line-clamp-2 min-w-0">{relevance.whyNow}</span>
      </p>
      <p className="mt-2 flex items-start gap-1.5 border-t border-[var(--cc-border-faint)] pt-2 text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
        <CheckCircle2
          className="mt-[2px] size-3.5 shrink-0 text-[var(--cc-green)]"
          aria-hidden="true"
        />
        <span className="line-clamp-3 min-w-0">
          <span className="font-semibold text-[var(--cc-text)]">Next action:</span>{" "}
          {relevance.nextAction}
        </span>
      </p>
    </Link>
  );
}
