import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  MapPin,
  NotebookPen,
  Radar,
  ShieldCheck,
  WifiOff
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, cn } from "@pure-advance/design-system";

import { Chip, EmptyState, IconSquare } from "@/components/command-kit";
import { MissionClockHero } from "@/components/mission-clock";
import { NextActionCard } from "@/components/next-action-card";
import { PageHeader } from "@/components/page-header";
import { RelatedTargetChips } from "@/components/related-targets";
import { StatusPill } from "@/components/status-pill";
import { getCurrentMissionNow } from "@/lib/clock";
import { activeTrip } from "@/lib/demo-data";
import { itineraryKindMeta } from "@/lib/itinerary-kinds";
import { buildMissionOps, type OperationalEvent } from "@/lib/mission-ops";
import { shortDate } from "@/lib/mission-timeline";

function eventStateLabel(entry: OperationalEvent) {
  if (entry.day.state === "now") return "Now";
  if (entry.day.state === "next") return "Next";
  return entry.event.item.status.replaceAll("_", " ");
}

function EventBlock({
  entry,
  compact = false
}: Readonly<{ entry: OperationalEvent; compact?: boolean }>) {
  const highlighted = entry.day.state === "now" || entry.day.state === "next";
  const kind = itineraryKindMeta[entry.event.item.kind];
  const KindIcon = kind.icon;

  return (
    <div
      className={cn(
        "flex min-w-0 items-start gap-3 rounded-[var(--cc-r-row)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] p-3",
        highlighted && "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)]"
      )}
    >
      <div
        className={cn(
          "w-11 shrink-0 rounded-[var(--cc-r-icon)] border border-[var(--cc-border-faint)] bg-[var(--cc-surface)] py-1.5 text-center font-mono",
          highlighted && "border-[var(--cc-cyan-line-soft)]"
        )}
      >
        <div className="text-[9px] uppercase leading-none tracking-[0.08em] text-[var(--cc-text-dim)]">
          {entry.day.monthLabel}
        </div>
        <div className="mt-1 text-[16px] font-semibold leading-none text-[var(--cc-text)]">
          {entry.day.dayNumber}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex min-w-0 items-center gap-1.5 font-mono text-[11px] font-medium text-[var(--cc-cyan)]">
            <KindIcon className="size-3.5 shrink-0" aria-hidden="true" />
            {entry.event.timeLabel}
          </span>
          {highlighted ? (
            <Chip tone="cyan">{eventStateLabel(entry)}</Chip>
          ) : (
            <StatusPill status={entry.event.item.status} />
          )}
        </div>
        <p
          className={cn(
            "mt-1.5 font-bold tracking-[-0.01em] text-[var(--cc-text)]",
            compact ? "truncate text-[13px]" : "text-[14px] leading-[1.3]"
          )}
        >
          {entry.event.item.title}
        </p>
        <p className="mt-1 flex min-w-0 items-center gap-1.5 text-[11.5px] text-[var(--cc-text-3)]">
          <MapPin className="size-3.5 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
          <span className="truncate">
            {entry.event.locationName
              ? `${entry.event.locationName} · ${entry.event.city}`
              : entry.event.city || entry.phase.city}
          </span>
        </p>
        {compact ? null : (
          <>
            {entry.event.item.notes ? (
              <p className="mt-2 line-clamp-3 text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
                {entry.event.item.notes}
              </p>
            ) : null}
            <RelatedTargetChips targetIds={entry.intel?.relatedTargetIds ?? []} />
          </>
        )}
      </div>
    </div>
  );
}

function EmptyScheduleState() {
  return (
    <EmptyState
      icon={CalendarClock}
      title="No remaining scheduled blocks"
      body="The timeline is complete. Capture the final debrief and keep follow-ups in notes."
    />
  );
}

const statusItemIcon: Record<string, typeof Radar> = {
  "Mission state": Radar,
  "Public boundary": ShieldCheck,
  Notes: NotebookPen,
  Offline: WifiOff
};

export function TodayView({ now = getCurrentMissionNow() }: Readonly<{ now?: Date }>) {
  const ops = buildMissionOps(now);
  const nextPrompt = ops.notePrompts[0];
  const promptHref = nextPrompt ? `/notes?prompt=${encodeURIComponent(nextPrompt.id)}` : "/notes";

  const allDays = ops.timeline.phases.flatMap((phase) => phase.days);
  const doneDays =
    allDays.filter((day) => day.state === "done").length +
    (allDays.some((day) => day.state === "now") ? 1 : 0);
  const progress =
    ops.clock.state === "preflight" ? null : { done: doneDays, total: allDays.length };

  return (
    <>
      <PageHeader
        eyebrow="Today"
        title={activeTrip.name}
        summary={
          activeTrip.summary ?? "Mission command rhythm for the Hong Kong / Shenzhen corridor."
        }
        badge={ops.currentPhase?.weekTag ?? activeTrip.region}
      />
      <div className="space-y-4">
        <MissionClockHero
          clock={ops.clock}
          context={ops.currentPhase?.headline ?? undefined}
          progress={progress}
        />

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="min-w-0">
            <CardHeader className="flex items-center justify-between gap-3">
              <CardTitle>
                {ops.currentEntries.length > 0 ? "Current operating block" : "Next operating block"}
              </CardTitle>
              <Link
                href="/itinerary"
                className="group inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--cc-cyan)]"
              >
                Timeline
                <ArrowRight
                  className="size-3.5 transition-transform duration-[var(--cc-dur-fast)] group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </Link>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {ops.focusEntry ? <EventBlock entry={ops.focusEntry} /> : <EmptyScheduleState />}
              {ops.upcomingEntries.slice(0, 3).map((entry) => (
                <EventBlock key={entry.event.item.id} entry={entry} compact />
              ))}
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex items-center justify-between gap-3">
              <CardTitle>Next preparation action</CardTitle>
              <Chip tone="cyanTint">Prep</Chip>
            </CardHeader>
            <CardContent>
              {ops.nextPrepEntry ? (
                <div className="space-y-3">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
                      {shortDate(ops.nextPrepEntry.day.date)} · {ops.nextPrepEntry.phase.name}
                    </p>
                    <h2 className="mt-1.5 text-[15px] font-bold leading-tight tracking-[-0.01em] text-[var(--cc-text)]">
                      {ops.nextPrepEntry.event.item.title}
                    </h2>
                    {ops.nextPrepEntry.event.item.notes ? (
                      <p className="mt-2 line-clamp-3 text-[12.5px] leading-[1.5] text-[var(--cc-text-2)]">
                        {ops.nextPrepEntry.event.item.notes}
                      </p>
                    ) : null}
                  </div>
                  {ops.nextPrepEntry.intel?.subSessions.length ? (
                    <ul className="space-y-1.5 border-t border-[var(--cc-border-faint)] pt-3">
                      {ops.nextPrepEntry.intel.subSessions.slice(0, 4).map((session) => (
                        <li key={`${session.time}-${session.title}`} className="flex gap-2">
                          <span className="w-12 shrink-0 text-right font-mono text-[9.5px] font-semibold uppercase leading-[1.7] tracking-[0.04em] text-[var(--cc-cyan)]">
                            {session.time}
                          </span>
                          <span className="min-w-0 text-[11.5px] leading-[1.5] text-[var(--cc-text-3)]">
                            {session.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <RelatedTargetChips targetIds={ops.nextPrepEntry.intel?.relatedTargetIds ?? []} />
                </div>
              ) : (
                <EmptyScheduleState />
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_0.72fr]">
          <Card className="min-w-0">
            <CardHeader className="flex items-center justify-between gap-3">
              <CardTitle>Targets that matter now</CardTitle>
              <Link
                href="/business-targets"
                className="group inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--cc-cyan)]"
              >
                All targets
                <ArrowRight
                  className="size-3.5 transition-transform duration-[var(--cc-dur-fast)] group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </Link>
            </CardHeader>
            <CardContent className="grid gap-2.5 sm:grid-cols-2">
              {ops.relevantTargets.slice(0, 4).map((relevance) => (
                <NextActionCard key={relevance.target.id} relevance={relevance} />
              ))}
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center gap-2.5">
              <IconSquare icon={NotebookPen} size="sm" />
              <CardTitle>Capture next debrief</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[12.5px] leading-[1.55] text-[var(--cc-text-2)]">
                {nextPrompt
                  ? `${nextPrompt.label}: ${nextPrompt.title}`
                  : "Capture a mission note or follow-up from the next useful block."}
              </p>
              <Link
                href={promptHref}
                className="cc-lift mt-3 inline-flex min-h-10 items-center gap-2 rounded-[var(--cc-r-icon)] border border-[var(--cc-cyan-line)] bg-[var(--cc-cyan)] px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--cc-cyan-ink)] shadow-[var(--cc-shadow-cta)]"
              >
                <CheckCircle2 className="size-4" aria-hidden="true" />
                Open note prompt
              </Link>
              <p className="mt-3 flex items-start gap-1.5 text-[11.5px] leading-[1.5] text-[var(--cc-text-faint)]">
                <CalendarClock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                Notes are local-first. Team sync is explicit and requires sign-in.
              </p>
            </CardContent>
          </Card>
        </section>

        <section aria-label="Operational state" className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {ops.statusItems.map((item) => {
            const ItemIcon = statusItemIcon[item.label] ?? Radar;
            const content = (
              <>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex min-w-0 items-center gap-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[var(--cc-text-faint)]">
                    <ItemIcon
                      className="size-3.5 shrink-0 text-[var(--cc-cyan)]"
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  <Chip
                    tone={
                      item.tone === "green"
                        ? "green"
                        : item.tone === "cyan"
                          ? "cyanTint"
                          : item.tone === "amber" || item.tone === "coral"
                            ? "amber"
                            : "neutral"
                    }
                  >
                    {item.value}
                  </Chip>
                </div>
                <p className="mt-2 line-clamp-3 text-[11.5px] leading-[1.45] text-[var(--cc-text-3)]">
                  {item.detail}
                </p>
              </>
            );

            return item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="cc-lift block min-w-0 rounded-[var(--cc-r-tile)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] p-3"
              >
                {content}
              </Link>
            ) : (
              <div
                key={item.label}
                className="min-w-0 rounded-[var(--cc-r-tile)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] p-3"
              >
                {content}
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
