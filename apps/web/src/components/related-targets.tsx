import Link from "next/link";
import { BookOpenText } from "lucide-react";

import { getTargetById } from "@/lib/targets";

/**
 * Compact dossier chips for schedule items whose program context is
 * source-linked to specific business targets. Deep-links to the dossier.
 */
export function RelatedTargetChips({ targetIds }: Readonly<{ targetIds: string[] }>) {
  const targets = targetIds
    .map((id) => getTargetById(id))
    .filter((target): target is NonNullable<typeof target> => target !== null);

  if (targets.length === 0) return null;

  return (
    <div className="mt-2 flex min-w-0 flex-wrap items-center gap-1.5">
      <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--cc-text-faint)]">
        <BookOpenText className="size-3" aria-hidden="true" />
        Dossiers
      </span>
      {targets.map((target) => (
        <Link
          key={target.id}
          href={`/business-targets/${target.id}`}
          className="max-w-full truncate rounded-full border border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] px-2 py-1 font-mono text-[10px] leading-none text-[var(--cc-cyan)] active:translate-y-px"
        >
          {target.name}
        </Link>
      ))}
    </div>
  );
}
