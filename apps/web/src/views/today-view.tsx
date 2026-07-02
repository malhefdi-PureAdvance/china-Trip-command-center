import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle, cn } from "@pure-advance/design-system";

import { MissionClockHero } from "@/components/mission-clock";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import {
  activeTrip,
  demoData,
  getMissionClock,
  getMissionTimeline,
  getTargetProfile,
  getTargetScore
} from "@/lib/demo-data";

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

  const topTarget = demoData.businessTargets[0];
  const topProfile = getTargetProfile(topTarget.id);
  const topScore = getTargetScore(topTarget.id);

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
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader>
              <CardTitle>Priority target</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[15px] font-semibold tracking-[-0.01em]">{topTarget.name}</h2>
                <StatusPill status={topTarget.status} />
              </div>
              <p className="mt-2 text-[12px] font-medium text-[var(--cc-text-3)]">
                {topTarget.city} · {topTarget.sector}
              </p>
              {topProfile ? (
                <p className="mt-3 text-[12.5px] leading-[1.5] text-[var(--cc-text-2)]">
                  {topProfile.actionSummary}
                </p>
              ) : null}
              {topScore ? (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Badge tone="cyan">Fit {topScore.fitScore}</Badge>
                  <Badge tone="green">Priority {topScore.priorityScore}</Badge>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
