import Link from "next/link";
import {
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  MapPin,
  Network,
  Sprout
} from "lucide-react";

import { cn } from "@pure-advance/design-system";
import type { BusinessTargetDossier, TargetCategory } from "@pure-advance/domain";

import { MetaChip, type ChipTone } from "@/components/command-kit";
import { ConfidenceDot } from "@/components/source-confidence-badge";
import { deriveTargetRelevance } from "@/lib/mission-ops";
import { categoryMeta, priorityMeta } from "@/lib/targets";

export const categoryIcons: Record<TargetCategory, typeof Brain> = {
  "ai-biotech": Brain,
  biomanufacturing: FlaskConical,
  "coolvex-sourcing": Sprout,
  "corporate-visit": Building2,
  ecosystem: Network
};

const priorityChipTone: Record<string, ChipTone> = {
  cyan: "cyanSolid",
  green: "green",
  amber: "amber",
  neutral: "neutral"
};

export function TargetCard({ target }: Readonly<{ target: BusinessTargetDossier }>) {
  const priority = priorityMeta[target.priority];
  const category = categoryMeta[target.category];
  const CategoryIcon = categoryIcons[target.category];
  const relevance = deriveTargetRelevance(target);
  const mustContact = target.priority === "must_contact";

  return (
    <Link
      href={`/business-targets/${target.id}`}
      className={cn(
        "lift group relative block min-w-0 overflow-hidden rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)] hover:border-[var(--cc-border-strong)]",
        mustContact && "border-[var(--cc-cyan-line-soft)] pl-3.5 hover:border-[var(--cc-cyan-line)]"
      )}
    >
      {mustContact ? (
        <span
          className="absolute inset-y-0 left-0 w-[3px] bg-[var(--cc-cyan)]"
          aria-hidden="true"
        />
      ) : null}
      <div className="flex items-center justify-between gap-2">
        <MetaChip tone={priorityChipTone[priority.tone]}>{priority.label}</MetaChip>
        <span className="flex min-w-0 items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.09em] text-[var(--cc-text-faint)]">
            <CategoryIcon className="size-3 text-[var(--cc-text-dim)]" aria-hidden="true" />
            {category.short}
          </span>
          {typeof target.fitScore === "number" ? (
            <span className="font-mono text-[10px] font-semibold leading-none text-[var(--cc-cyan)]">
              FIT {target.fitScore}
            </span>
          ) : null}
        </span>
      </div>
      <h3 className="mt-2.5 text-[14.5px] font-bold leading-tight tracking-[-0.01em] text-[var(--cc-text)]">
        <span className="block truncate">{target.name}</span>
      </h3>
      {target.nameLocal ? (
        <p className="mt-0.5 truncate font-mono text-[10px] leading-[1.4] text-[var(--cc-text-faint)]">
          {target.nameLocal}
        </p>
      ) : null}
      <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.5] text-[var(--cc-text-3)]">
        {target.oneLiner}
      </p>
      <p className="mt-2.5 flex items-start gap-1.5 border-t border-[var(--cc-border-faint)] pt-2.5 text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
        <CheckCircle2
          className="mt-[2px] size-3.5 shrink-0 text-[var(--cc-green)]"
          aria-hidden="true"
        />
        <span className="line-clamp-2 min-w-0">
          <span className="font-semibold text-[var(--cc-text)]">Next action:</span>{" "}
          {relevance.nextAction}
        </span>
      </p>
      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[var(--cc-text-faint)]">
        <MapPin className="size-3.5 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
        <span className="min-w-0 truncate">
          {target.area} · {target.corridor}
        </span>
        <ConfidenceDot confidence={target.confidence} className="ml-auto shrink-0" />
        <ChevronRight
          className="size-4 shrink-0 text-[var(--cc-text-dim)] transition-transform duration-[var(--cc-dur-fast)] ease-[var(--cc-ease)] group-hover:translate-x-0.5 group-hover:text-[var(--cc-cyan)] motion-reduce:transition-none"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
