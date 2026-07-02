import Link from "next/link";
import { ArrowRight, Building2, Landmark, MapPin, Navigation, Waypoints } from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle, cn } from "@pure-advance/design-system";

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
  hotel: { label: "Base", icon: MapPin },
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
              "rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]",
              index === 0 ? "sm:order-1" : "sm:order-3"
            )}
          >
            <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
              {index === 0 ? "Week 1 · Hong Kong" : "Weeks 2–4 · Shenzhen"}
            </p>
            <p className="mt-1 text-[14px] font-semibold text-[var(--cc-text)]">{base?.name}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-[var(--cc-text-3)]">
              <MapPin className="size-3.5 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
              {base?.addressLabel}
            </p>
          </div>
        ))}
        <div className="flex items-center justify-center gap-2 py-1 sm:order-2 sm:flex-col">
          <Waypoints className="size-4 text-[var(--cc-text-faint)]" aria-hidden="true" />
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--cc-text-dim)]">
            Jul 11–12 · border
          </span>
        </div>
      </section>

      <section aria-label="Target clusters" className="mt-6">
        <div className="mb-2 flex items-center gap-2.5">
          <Navigation className="size-4 text-[var(--cc-cyan)]" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
            Target clusters
          </span>
          <span className="h-px flex-1 bg-[var(--cc-border)]" />
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {clusters.map((cluster) => (
            <Link
              key={cluster.corridor}
              href={`/business-targets?corridor=${encodeURIComponent(cluster.corridor)}`}
              className="block min-w-0 rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)] active:translate-y-px"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13.5px] font-semibold text-[var(--cc-text)]">
                  {cluster.corridor}
                </span>
                <span className="font-mono text-[11px] font-semibold text-[var(--cc-cyan)]">
                  {cluster.count} targets
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-[11.5px] text-[var(--cc-text-3)]">
                {cluster.topAreas.join(" · ")}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--cc-cyan)]">
                View targets
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Key venues" className="mt-6">
        <div className="mb-2 flex items-center gap-2.5">
          <Landmark className="size-4 text-[var(--cc-cyan)]" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
            Program venues
          </span>
          <span className="h-px flex-1 bg-[var(--cc-border)]" />
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {venues.map((location) => {
            const meta = locationTypeMeta[location.locationType] ?? locationTypeMeta.venue;
            const Icon = meta.icon;
            return (
              <div
                key={location.id}
                className="flex items-start gap-2.5 rounded-[var(--cc-r-row)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-[var(--cc-r-icon)] bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
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
        <CardHeader className="flex items-center gap-2">
          <Navigation className="size-4 text-[var(--cc-cyan)]" aria-hidden="true" />
          <CardTitle>China-first navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
          <p>
            On the mainland, use <strong>Amap</strong> or <strong>Baidu Maps</strong> and hail with{" "}
            <strong>DiDi</strong>; Google Maps is unreliable across the border.
          </p>
          <p>
            Keep <strong>WeChat Pay</strong> and <strong>Alipay</strong> linked before Shenzhen, and
            carry the Chinese address for each stop for driver hand-off.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge tone="cyan">Amap / Baidu</Badge>
            <Badge tone="cyan">DiDi-ready</Badge>
            <Badge tone="neutral">HK ↔ SZ border · Jul 11–12</Badge>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
