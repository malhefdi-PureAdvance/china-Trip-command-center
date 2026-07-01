import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@pure-advance/design-system";

import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import {
  activeTrip,
  demoData,
  getLocationById,
  getRouteSummaries,
  getTargetProfile,
  getTargetScore
} from "@/lib/demo-data";

export function TodayView() {
  const topTarget = demoData.businessTargets[0];
  const topProfile = getTargetProfile(topTarget.id);
  const topScore = getTargetScore(topTarget.id);

  return (
    <>
      <PageHeader
        eyebrow="Today"
        title={activeTrip.name}
        summary={activeTrip.summary ?? "Demo command rhythm for trip planning and review."}
        badge={activeTrip.region}
      />
      <section className="grid gap-4 md:grid-cols-3">
        {getRouteSummaries().map((summary) => (
          <Card key={summary.href}>
            <CardHeader>
              <CardTitle>{summary.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold tracking-normal">{summary.count}</p>
                <p className="text-sm text-[var(--pa-muted)]">{summary.label}</p>
              </div>
              <Button asChild variant="ghost" size="icon" aria-label={`Open ${summary.title}`}>
                <Link href={summary.href}>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Operating Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {demoData.itineraryItems.map((item) => {
              const location = getLocationById(item.locationId);

              return (
                <div
                  key={item.id}
                  className="grid gap-3 border-b border-[var(--pa-border)] pb-4 last:border-0 last:pb-0 md:grid-cols-[1fr_auto]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold tracking-normal">{item.title}</h2>
                      <StatusPill status={item.status} />
                    </div>
                    <p className="mt-2 text-sm text-[var(--pa-muted)]">{item.notes}</p>
                    {location ? (
                      <p className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--pa-muted)]">
                        <MapPin className="size-4 text-[var(--pa-cyan)]" aria-hidden="true" />
                        {location.name}, {location.city}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex min-w-40 items-center gap-2 text-sm text-[var(--pa-muted)]">
                    <Clock3 className="size-4 text-[var(--pa-amber)]" aria-hidden="true" />
                    <span>
                      {new Date(item.startsAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric"
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Priority Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-normal">{topTarget.name}</h2>
              <StatusPill status={topTarget.status} />
            </div>
            <p className="mt-2 text-sm text-[var(--pa-muted)]">
              {topTarget.city} / {topTarget.sector}
            </p>
            {topProfile ? (
              <p className="mt-4 text-sm leading-6">{topProfile.actionSummary}</p>
            ) : null}
            {topScore ? (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Badge tone="cyan">Fit {topScore.fitScore}</Badge>
                <Badge tone="green">Priority {topScore.priorityScore}</Badge>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
