import Link from "next/link";
import { SearchX } from "lucide-react";

import { cn } from "@pure-advance/design-system";

import { EmptyState, MetaChip, SectionLabel } from "@/components/command-kit";
import { PageHeader } from "@/components/page-header";
import { TargetCard } from "@/components/target-card";
import { TargetSearch } from "@/components/target-search";
import {
  businessTargets,
  categoriesPresent,
  categoryMeta,
  corridorsPresent,
  filterTargets,
  groupByCorridor,
  sortTargets
} from "@/lib/targets";

type Search = { corridor?: string; category?: string; q?: string };

function chipHref(next: Search): string {
  const query = new URLSearchParams();
  if (next.corridor) query.set("corridor", next.corridor);
  if (next.category) query.set("category", next.category);
  if (next.q) query.set("q", next.q);
  const q = query.toString();
  return q ? `/business-targets?${q}` : "/business-targets";
}

function FilterChip({
  href,
  active,
  children
}: Readonly<{ href: string; active: boolean; children: React.ReactNode }>) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-8 shrink-0 items-center rounded-full border px-3 font-mono text-[10px] uppercase tracking-[0.06em] transition-colors",
        active
          ? "border-[var(--cc-cyan)] bg-[var(--cc-cyan)] font-semibold text-[var(--cc-cyan-ink)]"
          : "border-[var(--cc-border)] bg-[var(--cc-surface-inset)] text-[var(--cc-text-3)] hover:border-[var(--cc-border-strong)] hover:text-[var(--cc-text)]"
      )}
    >
      {children}
    </Link>
  );
}

export default async function BusinessTargetsPage({
  searchParams
}: Readonly<{ searchParams: Promise<Search> }>) {
  const { corridor, category, q } = await searchParams;
  const active: Search = { corridor, category, q };

  const filtered = filterTargets(businessTargets, active);
  const corridors = corridorsPresent(businessTargets);
  const categories = categoriesPresent(businessTargets);
  const grouped = corridor ? null : groupByCorridor(filtered);

  return (
    <>
      <PageHeader
        eyebrow="Business Targets"
        title="Visit Targets"
        summary={`${businessTargets.length} source-backed visit targets across the Hong Kong / Shenzhen corridor and Greater Bay Area. Contact routes stay in your private pack.`}
        badge="App-safe intel"
      />

      <TargetSearch />
      <div className="mb-1.5 flex gap-1.5 overflow-x-auto pb-1">
        <FilterChip href={chipHref({ category, q })} active={!corridor}>
          All corridors
        </FilterChip>
        {corridors.map((c) => (
          <FilterChip key={c} href={chipHref({ corridor: c, category, q })} active={corridor === c}>
            {c}
          </FilterChip>
        ))}
      </div>
      <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1">
        <FilterChip href={chipHref({ corridor, q })} active={!category}>
          All types
        </FilterChip>
        {categories.map((c) => (
          <FilterChip key={c} href={chipHref({ corridor, category: c, q })} active={category === c}>
            {categoryMeta[c].label}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No targets match"
          hint="Try a different corridor or type, or clear the active filters."
        >
          <Link
            href="/business-targets"
            className="lift inline-flex min-h-9 items-center rounded-[var(--cc-r-chip)] border border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint)] px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--cc-cyan)]"
          >
            Clear filters
          </Link>
        </EmptyState>
      ) : grouped ? (
        <div className="space-y-6">
          {grouped.map(({ corridor: c, targets }) => (
            <section key={c} aria-label={c}>
              <SectionLabel
                label={c}
                meta={<MetaChip tone="faint">{targets.length}</MetaChip>}
                className="mb-2.5"
              />
              <div className="grid gap-2.5 sm:grid-cols-2">
                {targets.map((target) => (
                  <TargetCard key={target.id} target={target} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {sortTargets(filtered).map((target) => (
            <TargetCard key={target.id} target={target} />
          ))}
        </div>
      )}
    </>
  );
}
