import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, MapPin } from "lucide-react";

import { cn } from "@pure-advance/design-system";

import { Chip, FitGauge } from "@/components/command-kit";
import { categoryIcons } from "@/components/target-card";
import type { TargetRelevance } from "@/lib/mission-ops";
import { categoryMeta, priorityMeta } from "@/lib/targets";

const priorityChipTone = {
  cyan: "cyan",
  green: "green",
  amber: "amber",
  coral: "amber",
  neutral: "neutral"
} as const;

/** Compact "act on this now" card for the Today cockpit. */
export function NextActionCard({ relevance }: Readonly<{ relevance: TargetRelevance }>) {
  const { target } = relevance;
  const priority = priorityMeta[target.priority];
  const CategoryIcon = categoryIcons[target.category];
  const mustContact = target.priority === "must_contact";

  return (
    <Link
      href={`/business-targets/${target.id}`}
      className={cn(
        "cc-lift group relative block min-w-0 overflow-hidden rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]",
        mustContact && "border-[var(--cc-cyan-line-soft)] pl-[15px]"
      )}
    >
      {mustContact ? (
        <span
          className="absolute inset-y-0 left-0 w-[3px] bg-[var(--cc-cyan)]"
          aria-hidden="true"
        />
      ) : null}
      <div className="flex items-center gap-1.5">
        <Chip tone={priorityChipTone[priority.tone]}>{priority.label}</Chip>
        <Chip tone="soft" icon={CategoryIcon} className="min-w-0">
          {categoryMeta[target.category].short}
        </Chip>
        {typeof target.fitScore === "number" ? (
          <FitGauge score={target.fitScore} className="ml-auto" />
        ) : null}
      </div>
      <h3 className="mt-2 flex items-center gap-1.5 text-[14px] font-bold leading-tight tracking-[-0.01em] text-[var(--cc-text)]">
        <span className="min-w-0 truncate">{target.name}</span>
        <ArrowRight
          className="ml-auto size-3.5 shrink-0 text-[var(--cc-cyan)] transition-transform duration-[var(--cc-dur-fast)] group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--cc-text-faint)]">
        <MapPin className="size-3.5 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
        <span className="min-w-0 truncate">
          {target.area} · {target.corridor}
        </span>
      </p>
      <p className="mt-2 flex items-start gap-1.5 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.05em] text-[var(--cc-amber-text)]">
        <CalendarClock className="mt-[1px] size-3.5 shrink-0" aria-hidden="true" />
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
