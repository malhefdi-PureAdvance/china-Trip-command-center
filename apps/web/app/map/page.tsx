import { MapPin } from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";

import { PageHeader } from "@/components/page-header";
import { activeTrip, getRouteLocations } from "@/lib/demo-data";

export default function MapPage() {
  const routeLocations = getRouteLocations();

  return (
    <>
      <PageHeader
        eyebrow="Map"
        title="Hong Kong <-> Shenzhen Corridor"
        summary={`Static scaffold map for ${activeTrip.region}. Map provider integration is intentionally deferred.`}
        badge="Provider pending"
      />
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div
          className="route-visual command-grid"
          aria-label="Hong Kong to Shenzhen route placeholder"
        >
          <span className="route-point left-[24%] top-[34%]" aria-hidden="true" />
          <span className="route-point route-point-end left-[73%] top-[55%]" aria-hidden="true" />
          <div className="absolute left-[8%] top-[58%] rounded-[var(--pa-radius-control)] border border-[var(--pa-border)] bg-[var(--pa-surface)] px-3 py-2 text-sm">
            Hong Kong
          </div>
          <div className="absolute right-[8%] top-[22%] rounded-[var(--pa-radius-control)] border border-[var(--pa-border)] bg-[var(--pa-surface)] px-3 py-2 text-sm">
            Shenzhen
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Saved Locations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {routeLocations.map((location) => (
              <div
                key={location.id}
                className="border-b border-[var(--pa-border)] pb-4 last:border-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <MapPin className="size-4 text-[var(--pa-cyan)]" aria-hidden="true" />
                  <h2 className="text-sm font-semibold tracking-normal">{location.name}</h2>
                  <Badge tone="neutral">{location.locationType}</Badge>
                </div>
                <p className="mt-2 text-sm text-[var(--pa-muted)]">{location.label}</p>
                <p className="mt-1 text-xs text-[var(--pa-muted)]">{location.coordinates}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
