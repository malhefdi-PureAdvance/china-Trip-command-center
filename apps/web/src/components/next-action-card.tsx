import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, MapPin } from "lucide-react";

import { Badge } from "@pure-advance/design-system";

import { SourceConfidenceBadge } from "@/components/source-confidence-badge";
import type { TargetRelevance } from "@/lib/mission-ops";
import { categoryMeta, priorityMeta } from "@/lib/targets";

export function NextActionCard({ relevance }: Readonly<{ relevance: TargetRelevance }>) {
  const { target } = relevance;
  const priority = priorityMeta[target.priority];

  return (
    <Link
      href={`/business-targets/${target.id}`}
      className="block min-w-0 rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)] active:translate-y-px"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge tone={priority.tone}>{priority.label}</Badge>
        <SourceConfidenceBadge confidence={target.confidence} />
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--cc-text-faint)]">
          {categoryMeta[target.category].short}
        </span>
      </div>
      <h3 className="mt-2 flex items-center gap-1.5 text-[14px] font-semibold leading-tight text-[var(--cc-text)]">
        <span className="min-w-0 truncate">{target.name}</span>
        <ArrowRight
          className="ml-auto size-3.5 shrink-0 text-[var(--cc-cyan)]"
          aria-hidden="true"
        />
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-[var(--cc-text-3)]">
        <MapPin className="size-3.5 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
        <span className="min-w-0 truncate">
          {target.area} · {target.corridor}
        </span>
      </p>
      <p className="mt-2 flex items-start gap-1.5 font-mono text-[10.5px] uppercase leading-[1.45] tracking-[0.05em] text-[var(--cc-amber-text)]">
        <CalendarClock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        <span className="line-clamp-2">{relevance.whyNow}</span>
      </p>
      <p className="mt-2 flex items-start gap-1.5 text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
        <CheckCircle2
          className="mt-0.5 size-3.5 shrink-0 text-[var(--cc-green)]"
          aria-hidden="true"
        />
        <span className="line-clamp-3">
          <span className="font-semibold text-[var(--cc-text)]">Next action:</span>{" "}
          {relevance.nextAction}
        </span>
      </p>
    </Link>
  );
}
