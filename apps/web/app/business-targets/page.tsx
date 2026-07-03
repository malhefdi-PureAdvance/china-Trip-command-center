import Link from "next/link";
import { CalendarClock, SearchX } from "lucide-react";

import { cn } from "@pure-advance/design-system";

import { EmptyState } from "@/components/command-kit";
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
  sortTargets,
  visitWindowHint
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
        "cc-lift cc-press inline-flex min-h-10 shrink-0 items-center rounded-[var(--cc-r-icon)] border px-3 font-mono text-[10px] uppercase tracking-[0.06em] transition-colors",
        active
          ? "border-[var(--cc-cyan)] bg-[var(--cc-cyan)] font-semibold text-[var(--cc-cyan-ink)]"
          : "border-[var(--cc-border)] bg-[var(--cc-surface-inset)] text-[var(--cc-text-3)]"
      )}
    >
      {children}
    </Link>
  );
}

function CorridorHeader({
  corridor,
  count,
  windowHint
}: Readonly<{ corridor: string; count: number; windowHint: string | null }>) {
  return (
    <div className="mb-2.5">
      <div className="flex items-baseline gap-2.5">
        <h2 className="text-[16px] font-[var(--cc-fw-x)] leading-tight tracking-[-0.015em] text-[var(--cc-text)]">
          {corridor}
        </h2>
        <span className="h-px flex-1 self-center bg-[var(--cc-border)]" aria-hidden="true" />
        <span className="font-mono text-[10px] text-[var(--cc-text-dim)]">
          {count} {count === 1 ? "target" : "targets"}
        </span>
      </div>
      {windowHint ? (
        <p className="mt-1 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.05em] text-[var(--cc-amber-text)]">
          <CalendarClock className="size-3 shrink-0" aria-hidden="true" />
          <span className="min-w-0 truncate">{windowHint}</span>
        </p>
      ) : null}
    </div>
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
        tone="purple"
      />

      <TargetSearch />
      <div className="mb-2 flex items-center gap-2">
        <span className="cc-eyebrow-faint w-14 shrink-0">Corridor</span>
        <div
          role="group"
          aria-label="Filter by corridor"
          className="cc-fade-x flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-1 pr-7"
        >
          <FilterChip href={chipHref({ category, q })} active={!corridor}>
            All corridors
          </FilterChip>
          {corridors.map((c) => (
            <FilterChip
              key={c}
              href={chipHref({ corridor: c, category, q })}
              active={corridor === c}
            >
              {c}
            </FilterChip>
          ))}
        </div>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <span className="cc-eyebrow-faint w-14 shrink-0">Type</span>
        <div
          role="group"
          aria-label="Filter by type"
          className="cc-fade-x flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-1 pr-7"
        >
          <FilterChip href={chipHref({ corridor, q })} active={!category}>
            All types
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c}
              href={chipHref({ corridor, category: c, q })}
              active={category === c}
            >
              {categoryMeta[c].label}
            </FilterChip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No targets match"
          body="Try a different corridor or type, or clear the filters to see the full target book."
          action={
            <Link
              href="/business-targets"
              className="cc-lift inline-flex min-h-9 items-center rounded-[var(--cc-r-icon)] border border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--cc-cyan)]"
            >
              Clear filters
            </Link>
          }
        />
      ) : grouped ? (
        <div className="space-y-6">
          {grouped.map(({ corridor: c, targets }) => (
            <section key={c} aria-label={c}>
              <CorridorHeader
                corridor={c}
                count={targets.length}
                windowHint={visitWindowHint(targets[0])}
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
