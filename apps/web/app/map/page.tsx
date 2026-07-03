import Link from "next/link";
import { ArrowRight, Bed, Building2, Landmark, MapPin, Navigation, Waypoints } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, cn } from "@pure-advance/design-system";

import { Chip, IconSquare, SectionHeading } from "@/components/command-kit";
import { PageHeader } from "@/components/page-header";
import { activeTrip, demoData } from "@/lib/demo-data";
import { businessTargets } from "@/lib/targets";

function corridorClusters() {
  const byCorridor = new Map<string, { count: number; areas: Map<string, number> }>();
  for (const target of businessTargets) {
    const entry = byCorridor.get(target.corridor) ?? { count: 0, areas: new Map() };
    entry.count += 1;
    entry.areas.set(target.area, (entry.areas.get(target.area) ?? 0) + 1);
    byCorridor.set(target.corridor, entry);
  }
  const order = ["Hong Kong", "Shenzhen", "Guangzhou", "Dongguan", "Zhuhai", "Foshan", "Other"];
  return order
    .filter((corridor) => byCorridor.has(corridor))
    .map((corridor) => {
      const entry = byCorridor.get(corridor)!;
      const topAreas = [...entry.areas.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([area]) => area);
      return { corridor, count: entry.count, topAreas };
    });
}

const locationTypeMeta: Record<string, { label: string; icon: typeof MapPin }> = {
  hotel: { label: "Base", icon: Bed },
  venue: { label: "Venue", icon: Landmark },
  office: { label: "Venue", icon: Building2 }
};

export default function MapPage() {
  const clusters = corridorClusters();
  const hkBase = demoData.locations.find(
    (l) => l.city === "Hong Kong" && l.locationType === "hotel"
  );
  const szBase = demoData.locations.find(
    (l) => l.city === "Shenzhen" && l.locationType === "hotel"
  );
  const venues = demoData.locations.filter((l) => l.locationType !== "hotel");

  return (
    <>
      <PageHeader
        eyebrow="Map"
        title="Hong Kong ↔ Shenzhen Corridor"
        summary={`Corridor intelligence for ${activeTrip.region}: bases, program venues, and where the ${businessTargets.length} visit targets cluster. Provider map deferred; navigation stays China-first.`}
        badge="Corridor view"
      />

      {/* Corridor schematic: two bases + the cross-border hop */}
      <section
        aria-label="Corridor route"
        className="grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr]"
      >
        {[hkBase, szBase].map((base, index) => (
          <div
            key={base?.id ?? index}
            className={cn(
              "relative overflow-hidden rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]",
              index === 0 ? "sm:order-1" : "sm:order-3"
            )}
          >
            <span
              className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--cc-cyan)] via-[var(--cc-cyan-line-soft)] to-transparent"
              aria-hidden="true"
            />
            <div className="flex items-start gap-2.5">
              <IconSquare icon={Bed} size="sm" />
              <div className="min-w-0">
                <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
                  {index === 0 ? "Week 1 · Hong Kong" : "Weeks 2–4 · Shenzhen"}
                </p>
                <p className="mt-1 text-[14px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
                  {base?.name}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-[var(--cc-text-3)]">
                  <MapPin className="size-3.5 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
                  <span className="min-w-0 truncate">{base?.addressLabel}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center gap-2 py-1 sm:order-2 sm:flex-col sm:px-1">
          <span
            className="h-px flex-1 border-t border-dashed border-[var(--cc-cyan-line-soft)] sm:h-4 sm:w-px sm:flex-none sm:border-l sm:border-t-0"
            aria-hidden="true"
          />
          <span
            className="grid size-7 shrink-0 place-items-center rounded-full border border-[var(--cc-cyan-line-soft)] bg-[var(--cc-cyan-tint-2)] text-[var(--cc-cyan)]"
            aria-hidden="true"
          >
            <Waypoints className="size-3.5" />
          </span>
          <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--cc-text-dim)]">
            Jul 11–12 · border
          </span>
          <span
            className="h-px flex-1 border-t border-dashed border-[var(--cc-cyan-line-soft)] sm:h-4 sm:w-px sm:flex-none sm:border-l sm:border-t-0"
            aria-hidden="true"
          />
        </div>
      </section>

      <section aria-label="Target clusters" className="mt-6">
        <SectionHeading icon={Navigation} title="Target clusters" />
        <div className="grid gap-2.5 sm:grid-cols-2">
          {clusters.map((cluster) => (
            <Link
              key={cluster.corridor}
              href={`/business-targets?corridor=${encodeURIComponent(cluster.corridor)}`}
              className="cc-lift group block min-w-0 rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="min-w-0 truncate text-[14px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
                  {cluster.corridor}
                </span>
                <span className="shrink-0 font-mono text-[16px] font-semibold leading-none text-[var(--cc-cyan)]">
                  {cluster.count}
                  <span className="ml-1 text-[9px] uppercase tracking-[0.08em] text-[var(--cc-text-faint)]">
                    targets
                  </span>
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {cluster.topAreas.map((area) => (
                  <Chip key={area} tone="soft" className="max-w-[46%]">
                    {area}
                  </Chip>
                ))}
              </div>
              <span className="mt-2.5 inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--cc-cyan)]">
                View targets
                <ArrowRight
                  className="size-3.5 transition-transform duration-[var(--cc-dur-fast)] group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Key venues" className="mt-6">
        <SectionHeading icon={Landmark} title="Program venues" />
        <div className="grid gap-2.5 sm:grid-cols-2">
          {venues.map((location) => {
            const meta = locationTypeMeta[location.locationType] ?? locationTypeMeta.venue;
            return (
              <div
                key={location.id}
                className="flex items-start gap-2.5 rounded-[var(--cc-r-row)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]"
              >
                <IconSquare icon={meta.icon} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-[var(--cc-text)]">
                    {location.name}
                  </p>
                  <p className="mt-0.5 truncate text-[11.5px] text-[var(--cc-text-3)]">
                    {location.addressLabel} · {location.city}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center gap-2.5">
          <IconSquare icon={Navigation} size="sm" />
          <CardTitle>China-first navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-[12.5px] leading-[1.55] text-[var(--cc-text-2)]">
          <p>
            On the mainland, use <strong>Amap</strong> or <strong>Baidu Maps</strong> and hail with{" "}
            <strong>DiDi</strong>; Google Maps is unreliable across the border.
          </p>
          <p>
            Keep <strong>WeChat Pay</strong> and <strong>Alipay</strong> linked before Shenzhen, and
            carry the Chinese address for each stop for driver hand-off.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Chip tone="cyanTint">Amap / Baidu</Chip>
            <Chip tone="cyanTint">DiDi-ready</Chip>
            <Chip tone="soft">HK ↔ SZ border · Jul 11–12</Chip>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
