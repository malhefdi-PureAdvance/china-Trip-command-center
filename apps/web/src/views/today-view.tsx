import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin } from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle, cn } from "@pure-advance/design-system";

import { MissionClockHero } from "@/components/mission-clock";
import { PageHeader } from "@/components/page-header";
import { RelatedTargetChips } from "@/components/related-targets";
import { StatusPill } from "@/components/status-pill";
import {
  activeTrip,
  getItineraryIntel,
  getMissionClock,
  getMissionTimeline
} from "@/lib/demo-data";
import { categoryMeta, priorityMeta, topTarget } from "@/lib/targets";
import { shortDate } from "@/lib/mission-timeline";

export function TodayView() {
  const now = new Date();
  const clock = getMissionClock(now);
  const timeline = getMissionTimeline(now);

  const currentPhase = timeline.phases.find((phase) =>
    phase.days.some((day) => day.state === "now" || day.state === "next")
  )?.phase;

  const upcoming = timeline.phases
    .flatMap((phase) => phase.days)
    .filter((day) => day.state !== "done")
    .flatMap((day) => day.events.map((event) => ({ event, day })))
    .slice(0, 4);

  const featured = topTarget();

  // The next schedule item with source-linked dossiers — what to prep for.
  const nextLinked = timeline.phases
    .flatMap((phase) => phase.days)
    .filter((day) => day.state !== "done")
    .flatMap((day) => day.events.map((event) => ({ event, day })))
    .map((entry) => ({ ...entry, intel: getItineraryIntel(entry.event.item.id) }))
    .find((entry) => (entry.intel?.relatedTargetIds.length ?? 0) > 0);

  return (
    <>
      <PageHeader
        eyebrow="Today"
        title={activeTrip.name}
        summary={
          activeTrip.summary ?? "Mission command rhythm for the Hong Kong / Shenzhen corridor."
        }
        badge={activeTrip.region}
      />
      <div className="space-y-4">
        <MissionClockHero clock={clock} context={currentPhase?.headline ?? currentPhase?.name} />

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="min-w-0">
            <CardHeader className="flex items-center justify-between gap-3">
              <CardTitle>Up next</CardTitle>
              <Link
                href="/itinerary"
                className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--cc-cyan)]"
              >
                Timeline
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {upcoming.map(({ event, day }, index) => (
                <div
                  key={event.item.id}
                  className={cn(
                    "flex items-start gap-3 rounded-[var(--cc-r-row)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] p-3",
                    index === 0 &&
                      (day.state === "now" || day.state === "next") &&
                      "border-[var(--cc-cyan-line)] shadow-[var(--cc-glow-cyan)]"
                  )}
                >
                  <div className="w-11 shrink-0 text-center font-mono">
                    <div className="text-[10px] uppercase leading-none tracking-[0.08em] text-[var(--cc-text-dim)]">
                      {day.monthLabel}
                    </div>
                    <div className="mt-0.5 text-[16px] font-semibold leading-none text-[var(--cc-text)]">
                      {day.dayNumber}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-medium text-[var(--cc-cyan)]">
                        {event.timeLabel}
                      </span>
                      {index === 0 && (day.state === "now" || day.state === "next") ? (
                        <span className="rounded-full border border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint)] px-2 py-1 font-mono text-[9px] font-semibold uppercase leading-none tracking-[0.08em] text-[var(--cc-cyan)]">
                          {day.state === "now" ? "Now" : "Next"}
                        </span>
                      ) : (
                        <StatusPill status={event.item.status} />
                      )}
                    </div>
                    <p className="mt-1 truncate text-[13px] font-semibold tracking-[-0.01em] text-[var(--cc-text)]">
                      {event.item.title}
                    </p>
                    <p className="mt-1 flex min-w-0 items-center gap-1.5 text-[11.5px] text-[var(--cc-text-3)]">
                      <MapPin
                        className="size-3.5 shrink-0 text-[var(--cc-cyan)]"
                        aria-hidden="true"
                      />
                      <span className="truncate">
                        {event.locationName ? `${event.locationName} · ${event.city}` : event.city}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
              {nextLinked ? (
                <div className="rounded-[var(--cc-r-row)] border border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] p-3">
                  <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
                    Prep · {shortDate(nextLinked.day.date)}
                  </p>
                  <p className="mt-1 truncate text-[12.5px] font-semibold text-[var(--cc-text)]">
                    {nextLinked.event.item.title}
                  </p>
                  <RelatedTargetChips targetIds={nextLinked.intel?.relatedTargetIds ?? []} />
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex items-center justify-between gap-3">
              <CardTitle>Priority target</CardTitle>
              <Link
                href="/business-targets"
                className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--cc-cyan)]"
              >
                All
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </CardHeader>
            <CardContent>
              <Link href={`/business-targets/${featured.id}`} className="block">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="cyan">{priorityMeta[featured.priority].label}</Badge>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--cc-text-faint)]">
                    {categoryMeta[featured.category].label}
                  </span>
                </div>
                <h2 className="mt-2 flex items-center gap-1.5 text-[15px] font-semibold tracking-[-0.01em] text-[var(--cc-text)]">
                  <span className="min-w-0 truncate">{featured.name}</span>
                  <ChevronRight
                    className="size-4 shrink-0 text-[var(--cc-text-dim)]"
                    aria-hidden="true"
                  />
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-[12px] text-[var(--cc-text-3)]">
                  <MapPin className="size-3.5 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
                  {featured.area} · {featured.corridor}
                </p>
                <p className="mt-3 line-clamp-3 text-[12.5px] leading-[1.5] text-[var(--cc-text-2)]">
                  {featured.whyItMatters}
                </p>
                {typeof featured.fitScore === "number" ? (
                  <div className="mt-4">
                    <Badge tone="cyan">Fit {featured.fitScore}</Badge>
                  </div>
                ) : null}
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
