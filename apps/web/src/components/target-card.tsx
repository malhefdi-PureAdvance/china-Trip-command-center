import Link from "next/link";
import {
  Brain,
  Building2,
  ChevronRight,
  FlaskConical,
  MapPin,
  Network,
  Sprout
} from "lucide-react";

import { cn } from "@pure-advance/design-system";
import type { BusinessTargetDossier, TargetCategory } from "@pure-advance/domain";

import { categoryMeta, priorityMeta } from "@/lib/targets";

export const categoryIcons: Record<TargetCategory, typeof Brain> = {
  "ai-biotech": Brain,
  biomanufacturing: FlaskConical,
  "coolvex-sourcing": Sprout,
  "corporate-visit": Building2,
  ecosystem: Network
};

const priorityToneClass: Record<string, string> = {
  cyan: "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]",
  green: "border-transparent bg-[var(--cc-green-tint)] text-[var(--cc-green)]",
  amber: "border-[var(--cc-amber-line)] bg-[var(--cc-amber-tint)] text-[var(--cc-amber-text)]",
  neutral: "border-[var(--cc-border-strong)] bg-transparent text-[var(--cc-text-3)]"
};

export function TargetCard({ target }: Readonly<{ target: BusinessTargetDossier }>) {
  const priority = priorityMeta[target.priority];
  const category = categoryMeta[target.category];
  const CategoryIcon = categoryIcons[target.category];

  return (
    <Link
      href={`/business-targets/${target.id}`}
      className="block min-w-0 rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)] transition-[background,transform] active:translate-y-px"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "rounded-full border px-2 py-1 font-mono text-[9px] font-semibold uppercase leading-none tracking-[0.08em]",
            priorityToneClass[priority.tone]
          )}
        >
          {priority.label}
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--cc-text-faint)]">
            <CategoryIcon className="size-3 text-[var(--cc-text-dim)]" aria-hidden="true" />
            {category.short}
          </span>
          {typeof target.fitScore === "number" ? (
            <span className="font-mono text-[10px] font-semibold text-[var(--cc-cyan)]">
              FIT {target.fitScore}
            </span>
          ) : null}
        </div>
      </div>
      <h3 className="mt-2 flex items-baseline gap-2 text-[14px] font-semibold leading-tight tracking-[-0.01em] text-[var(--cc-text)]">
        <span className="min-w-0 truncate">{target.name}</span>
      </h3>
      {target.nameLocal ? (
        <p className="mt-0.5 truncate font-mono text-[10px] text-[var(--cc-text-faint)]">
          {target.nameLocal}
        </p>
      ) : null}
      <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.45] text-[var(--cc-text-3)]">
        {target.oneLiner}
      </p>
      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[var(--cc-text-faint)]">
        <MapPin className="size-3.5 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
        <span className="min-w-0 truncate">
          {target.area} · {target.corridor}
        </span>
        <ChevronRight
          className="ml-auto size-4 shrink-0 text-[var(--cc-text-dim)]"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
