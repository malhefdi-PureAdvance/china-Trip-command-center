import { CalendarDays, MapPin, UserRound } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";

import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { activeTrip, demoData, getLocationById, getUserPerson } from "@/lib/demo-data";

export default function ItineraryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Itinerary"
        title="Mission Schedule"
        summary={`${activeTrip.startsOn} to ${activeTrip.endsOn} across ${activeTrip.region}.`}
        badge="Draft operations plan"
      />
      <section className="grid gap-4">
        {demoData.itineraryItems.map((item) => {
          const location = getLocationById(item.locationId);
          const owner = getUserPerson(item.ownerUserId);

          return (
            <Card key={item.id}>
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>{item.title}</CardTitle>
                <StatusPill status={item.status} />
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <p className="flex items-center gap-2 text-sm text-[var(--pa-muted)]">
                  <CalendarDays className="size-4 text-[var(--pa-cyan)]" aria-hidden="true" />
                  {new Date(item.startsAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit"
                  })}
                </p>
                <p className="flex items-center gap-2 text-sm text-[var(--pa-muted)]">
                  <MapPin className="size-4 text-[var(--pa-green)]" aria-hidden="true" />
                  {location ? `${location.name}, ${location.city}` : "Location pending"}
                </p>
                <p className="flex items-center gap-2 text-sm text-[var(--pa-muted)]">
                  <UserRound className="size-4 text-[var(--pa-amber)]" aria-hidden="true" />
                  {owner?.displayName ?? "Owner pending"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </>
  );
}
