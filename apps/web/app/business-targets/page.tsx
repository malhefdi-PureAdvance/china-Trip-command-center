import Link from "next/link";

import { cn } from "@pure-advance/design-system";

import { PageHeader } from "@/components/page-header";
import { TargetCard } from "@/components/target-card";
import {
  businessTargets,
  categoriesPresent,
  categoryMeta,
  corridorsPresent,
  filterTargets,
  groupByCorridor,
  sortTargets
} from "@/lib/targets";

type Search = { corridor?: string; category?: string };

function chipHref(next: Search): string {
  const query = new URLSearchParams();
  if (next.corridor) query.set("corridor", next.corridor);
  if (next.category) query.set("category", next.category);
  const q = query.toString();
  return q ? `/business-targets?${q}` : "/business-targets";
}

function Chip({
  href,
  active,
  children
}: Readonly<{ href: string; active: boolean; children: React.ReactNode }>) {
  return (
    <Link
      href={href}
      className={cn(
        "shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.06em] transition-colors",
        active
          ? "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]"
          : "border-[var(--cc-border)] bg-[var(--cc-surface-inset)] text-[var(--cc-text-3)]"
      )}
    >
      {children}
    </Link>
  );
}

export default async function BusinessTargetsPage({
  searchParams
}: Readonly<{ searchParams: Promise<Search> }>) {
  const { corridor, category } = await searchParams;
  const active: Search = { corridor, category };

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

      <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
        <Chip href={chipHref({ category })} active={!corridor}>
          All corridors
        </Chip>
        {corridors.map((c) => (
          <Chip key={c} href={chipHref({ corridor: c, category })} active={corridor === c}>
            {c}
          </Chip>
        ))}
      </div>
      <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1">
        <Chip href={chipHref({ corridor })} active={!category}>
          All types
        </Chip>
        {categories.map((c) => (
          <Chip key={c} href={chipHref({ corridor, category: c })} active={category === c}>
            {categoryMeta[c].label}
          </Chip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-6 text-center">
          <p className="text-[13px] font-semibold text-[var(--cc-text)]">No targets match</p>
          <p className="mt-1 text-[12px] text-[var(--cc-text-3)]">
            Try a different corridor or type, or{" "}
            <Link href="/business-targets" className="text-[var(--cc-cyan)]">
              clear filters
            </Link>
            .
          </p>
        </div>
      ) : grouped ? (
        <div className="space-y-5">
          {grouped.map(({ corridor: c, targets }) => (
            <section key={c} aria-label={c}>
              <div className="mb-2 flex items-center gap-2.5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
                  {c}
                </span>
                <span className="h-px flex-1 bg-[var(--cc-border)]" />
                <span className="font-mono text-[10px] text-[var(--cc-text-dim)]">
                  {targets.length}
                </span>
              </div>
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
