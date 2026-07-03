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

import { Chip, FitGauge } from "@/components/command-kit";
import { SourceConfidenceBadge } from "@/components/source-confidence-badge";
import { deriveTargetRelevance } from "@/lib/mission-ops";
import { categoryMeta, priorityMeta } from "@/lib/targets";

export const categoryIcons: Record<TargetCategory, typeof Brain> = {
  "ai-biotech": Brain,
  biomanufacturing: FlaskConical,
  "coolvex-sourcing": Sprout,
  "corporate-visit": Building2,
  ecosystem: Network
};

/** Category identity rides on the icon hue only — the chip itself stays a
 *  quiet surface so the priority chip remains the sole toned box per card. */
export const categoryIconTone: Record<TargetCategory, string> = {
  "ai-biotech": "text-[var(--cc-purple-soft)]",
  biomanufacturing: "text-[var(--cc-green)]",
  "coolvex-sourcing": "text-[var(--cc-amber-text)]",
  "corporate-visit": "text-[var(--cc-cyan)]",
  ecosystem: "text-[var(--cc-text-3)]"
};

const priorityChipTone = {
  cyan: "cyan",
  green: "green",
  amber: "amber",
  coral: "amber",
  neutral: "neutral"
} as const;

export function TargetCard({ target }: Readonly<{ target: BusinessTargetDossier }>) {
  const priority = priorityMeta[target.priority];
  const category = categoryMeta[target.category];
  const CategoryIcon = categoryIcons[target.category];
  const relevance = deriveTargetRelevance(target);
  const mustContact = target.priority === "must_contact";
  const watchlist = target.priority === "watchlist";

  return (
    <Link
      href={`/business-targets/${target.id}`}
      className={cn(
        "cc-lift cc-press group relative block min-w-0 overflow-hidden rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]",
        mustContact && "border-[var(--cc-cyan-line-soft)] pl-[15px]",
        watchlist && "bg-[var(--cc-surface-inset)] shadow-none"
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
        <Chip
          tone="soft"
          icon={CategoryIcon}
          iconClassName={categoryIconTone[target.category]}
          className="min-w-0"
        >
          {category.short}
        </Chip>
        {typeof target.fitScore === "number" ? (
          <FitGauge score={target.fitScore} className="ml-auto" />
        ) : null}
      </div>
      <h3 className="mt-2.5 flex items-baseline gap-2 text-[14.5px] font-bold leading-tight tracking-[-0.01em] text-[var(--cc-text)]">
        <span className="min-w-0 truncate">{target.name}</span>
        {target.nameLocal ? (
          <span className="hidden min-w-0 truncate font-mono text-[10px] font-normal text-[var(--cc-text-faint)] sm:inline">
            {target.nameLocal}
          </span>
        ) : null}
      </h3>
      <p className="mt-1 line-clamp-2 text-[12px] leading-[1.5] text-[var(--cc-text-3)]">
        {target.oneLiner}
      </p>
      {mustContact ? (
        <p className="mt-2 flex items-start gap-1.5 text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
          <CheckCircle2
            className="mt-[2px] size-3.5 shrink-0 text-[var(--cc-green)]"
            aria-hidden="true"
          />
          <span className="line-clamp-2 min-w-0">
            <span className="font-semibold text-[var(--cc-text)]">Next action:</span>{" "}
            {relevance.nextAction}
          </span>
        </p>
      ) : null}
      <div className="mt-2.5 flex items-center gap-1.5 border-t border-[var(--cc-border-faint)] pt-2.5">
        <MapPin className="size-3.5 shrink-0 text-[var(--cc-text-faint)]" aria-hidden="true" />
        <span className="min-w-0 truncate text-[11px] text-[var(--cc-text-faint)]">
          {target.area} · {target.corridor}
        </span>
        <span className="ml-auto shrink-0">
          <SourceConfidenceBadge confidence={target.confidence} compact />
        </span>
        <ChevronRight
          className="size-4 shrink-0 text-[var(--cc-text-dim)] transition-[color,transform] duration-[var(--cc-dur-fast)] group-hover:translate-x-0.5 group-hover:text-[var(--cc-cyan)] motion-reduce:transition-none"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
