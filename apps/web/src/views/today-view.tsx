import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  MapPin,
  NotebookPen,
  Radar,
  ShieldCheck,
  WifiOff
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, cn } from "@pure-advance/design-system";

import { Chip, EmptyState, FitGauge, IconSquare } from "@/components/command-kit";
import { MissionClockHero } from "@/components/mission-clock";
import { NextActionCard } from "@/components/next-action-card";
import { PageHeader } from "@/components/page-header";
import { RelatedTargetChips } from "@/components/related-targets";
import { StatusPill } from "@/components/status-pill";
import { categoryIcons } from "@/components/target-card";
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

/** Hero treatment for the single block that matters right now. */
function FocusEventBlock({ entry }: Readonly<{ entry: OperationalEvent }>) {
  const highlighted = entry.day.state === "now" || entry.day.state === "next";
  const kind = itineraryKindMeta[entry.event.item.kind];
  const KindIcon = kind.icon;

  return (
    <div
      className={cn(
        "relative flex min-w-0 items-start gap-3 overflow-hidden rounded-[var(--cc-r-row)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] p-3",
        highlighted && "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] pl-[15px]"
      )}
    >
      {highlighted ? (
        <span
          className="absolute inset-y-0 left-0 w-[3px] bg-[var(--cc-cyan)]"
          aria-hidden="true"
        />
      ) : null}
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
          <span
            className={cn(
              "inline-flex min-w-0 items-center gap-1.5 font-mono text-[11.5px] font-medium",
              highlighted ? "text-[var(--cc-cyan)]" : "text-[var(--cc-text-3)]"
            )}
          >
            <KindIcon className="size-3.5 shrink-0" aria-hidden="true" />
            {entry.event.timeLabel}
          </span>
          {highlighted ? (
            <Chip tone="cyan">{eventStateLabel(entry)}</Chip>
          ) : (
            <StatusPill status={entry.event.item.status} />
          )}
        </div>
        <p className="mt-1.5 text-[16px] font-bold leading-[1.25] tracking-[-0.01em] text-[var(--cc-text)]">
          {entry.event.item.title}
        </p>
        <p className="mt-1 flex min-w-0 items-center gap-1.5 text-[11.5px] text-[var(--cc-text-3)]">
          <MapPin className="size-3.5 shrink-0 text-[var(--cc-text-faint)]" aria-hidden="true" />
          <span className="truncate">
            {entry.event.locationName
              ? `${entry.event.locationName} · ${entry.event.city}`
              : entry.event.city || entry.phase.city}
          </span>
        </p>
        {entry.event.item.notes ? (
          <p className="mt-2 line-clamp-3 text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
            {entry.event.item.notes}
          </p>
        ) : null}
        <RelatedTargetChips targetIds={entry.intel?.relatedTargetIds ?? []} />
      </div>
    </div>
  );
}

/** Quiet single-entry row for the "up next" strip — scan, don't read. */
function UpcomingEventRow({ entry }: Readonly<{ entry: OperationalEvent }>) {
  return (
    <li className="flex min-w-0 items-center gap-2.5 py-2 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold leading-[1.35] text-[var(--cc-text)]">
          {entry.event.item.title}
        </p>
        <p className="mt-0.5 truncate font-mono text-[10.5px] text-[var(--cc-text-faint)]">
          {entry.day.monthLabel} {entry.day.dayNumber} · {entry.event.timeLabel}
        </p>
      </div>
      <StatusPill status={entry.event.item.status} />
    </li>
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

const statusValueTone: Record<string, string> = {
  green: "text-[var(--cc-green)]",
  cyan: "text-[var(--cc-cyan)]",
  amber: "text-[var(--cc-amber-text)]",
  coral: "text-[var(--cc-amber-text)]",
  neutral: "text-[var(--cc-text)]"
};

function SectionLink({ href, children }: Readonly<{ href: string; children: React.ReactNode }>) {
  return (
    <Link
      href={href}
      className="cc-press group -mr-2 inline-flex min-h-9 items-center gap-1 rounded-[var(--cc-r-icon)] px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--cc-cyan)]"
    >
      {children}
      <ArrowRight
        className="size-3.5 transition-transform duration-[var(--cc-dur-fast)] group-hover:translate-x-0.5 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </Link>
  );
}

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

  // Presentational dedupe: the focus block should not repeat in "up next".
  const upcomingEntries = ops.upcomingEntries
    .filter((entry) => entry.event.item.id !== ops.focusEntry?.event.item.id)
    .slice(0, 3);

  // When the next prep action belongs to the block already on screen AND has
  // a run of show to hand over, render the prep card as a continuation
  // instead of repeating the block. Without sub-sessions there is nothing to
  // continue with, so keep the full card (prep signal may come from notes).
  const prepContinuesFocus =
    Boolean(ops.nextPrepEntry) &&
    ops.nextPrepEntry?.event.item.id === ops.focusEntry?.event.item.id &&
    (ops.nextPrepEntry?.intel?.subSessions.length ?? 0) > 0;

  const [leadTarget, ...restTargets] = ops.relevantTargets.slice(0, 4);

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
              <SectionLink href="/itinerary">Timeline</SectionLink>
            </CardHeader>
            <CardContent>
              {ops.focusEntry ? <FocusEventBlock entry={ops.focusEntry} /> : <EmptyScheduleState />}
              {upcomingEntries.length > 0 ? (
                <>
                  <p className="cc-eyebrow-faint mt-3.5">Up next</p>
                  <ul className="mt-1.5 divide-y divide-[var(--cc-border-faint)]">
                    {upcomingEntries.map((entry) => (
                      <UpcomingEventRow key={entry.event.item.id} entry={entry} />
                    ))}
                  </ul>
                </>
              ) : null}
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex items-center justify-between gap-3">
              <CardTitle>Next preparation action</CardTitle>
            </CardHeader>
            <CardContent>
              {ops.nextPrepEntry ? (
                <div className="space-y-3">
                  <div>
                    <p className="cc-eyebrow text-[var(--cc-purple-soft)]">
                      {shortDate(ops.nextPrepEntry.day.date)} · {ops.nextPrepEntry.phase.name}
                    </p>
                    {prepContinuesFocus ? (
                      <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[var(--cc-text-3)]">
                        Run of show for the block on screen — work it top to bottom.
                      </p>
                    ) : (
                      <>
                        <h2 className="mt-1.5 text-[15px] font-bold leading-tight tracking-[-0.01em] text-[var(--cc-text)]">
                          {ops.nextPrepEntry.event.item.title}
                        </h2>
                        {ops.nextPrepEntry.event.item.notes ? (
                          <p className="mt-2 line-clamp-3 text-[12.5px] leading-[1.5] text-[var(--cc-text-2)]">
                            {ops.nextPrepEntry.event.item.notes}
                          </p>
                        ) : null}
                      </>
                    )}
                  </div>
                  {ops.nextPrepEntry.intel?.subSessions.length ? (
                    <ul
                      className={cn(
                        "space-y-1.5",
                        !prepContinuesFocus && "border-t border-[var(--cc-border-faint)] pt-3"
                      )}
                    >
                      {ops.nextPrepEntry.intel.subSessions.slice(0, 4).map((session) => (
                        <li key={`${session.time}-${session.title}`} className="flex gap-2">
                          <span className="w-12 shrink-0 text-right font-mono text-[9.5px] font-semibold uppercase leading-[1.7] tracking-[0.04em] text-[var(--cc-purple-soft)]">
                            {session.time}
                          </span>
                          <span className="min-w-0 text-[11.5px] leading-[1.5] text-[var(--cc-text-3)]">
                            {session.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {prepContinuesFocus ? null : (
                    <RelatedTargetChips
                      targetIds={ops.nextPrepEntry.intel?.relatedTargetIds ?? []}
                    />
                  )}
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
              <SectionLink href="/business-targets">All targets</SectionLink>
            </CardHeader>
            <CardContent>
              {leadTarget ? <NextActionCard relevance={leadTarget} /> : null}
              {restTargets.length > 0 ? (
                <ul className="mt-2 divide-y divide-[var(--cc-border-faint)]">
                  {restTargets.map((relevance, index) => {
                    const CategoryIcon = categoryIcons[relevance.target.category];

                    return (
                      <li key={relevance.target.id}>
                        <Link
                          href={`/business-targets/${relevance.target.id}`}
                          className="cc-press group flex min-h-11 min-w-0 items-center gap-2.5 rounded-[8px] py-1.5"
                        >
                          <span className="w-5 shrink-0 text-right font-mono text-[10.5px] text-[var(--cc-text-dim)]">
                            {String(index + 2).padStart(2, "0")}
                          </span>
                          <CategoryIcon
                            className="size-3.5 shrink-0 text-[var(--cc-text-faint)]"
                            aria-hidden="true"
                          />
                          <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[var(--cc-text)]">
                            {relevance.target.name}
                          </span>
                          {typeof relevance.target.fitScore === "number" ? (
                            <FitGauge score={relevance.target.fitScore} />
                          ) : null}
                          <ChevronRight
                            className="size-4 shrink-0 text-[var(--cc-text-dim)] transition-[color,transform] duration-[var(--cc-dur-fast)] group-hover:translate-x-0.5 group-hover:text-[var(--cc-cyan)] motion-reduce:transition-none"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center gap-2.5">
              <IconSquare icon={NotebookPen} size="sm" />
              <CardTitle>Capture next debrief</CardTitle>
            </CardHeader>
            <CardContent>
              {nextPrompt ? (
                <>
                  <p className="cc-eyebrow-faint">{nextPrompt.label}</p>
                  <p className="mt-1 text-[13.5px] font-semibold leading-[1.4] text-[var(--cc-text)]">
                    {nextPrompt.title}
                  </p>
                </>
              ) : (
                <p className="text-[12.5px] leading-[1.55] text-[var(--cc-text-2)]">
                  Capture a mission note or follow-up from the next useful block.
                </p>
              )}
              <Link
                href={promptHref}
                className="cc-lift cc-press mt-3 inline-flex min-h-11 items-center gap-2 rounded-[var(--cc-r-icon)] border border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--cc-cyan)]"
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
                  <span className="cc-eyebrow-faint inline-flex min-w-0 items-center gap-1.5">
                    <ItemIcon className="size-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.href ? (
                    <ArrowRight
                      className="size-3.5 shrink-0 text-[var(--cc-text-dim)]"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <p
                  className={cn(
                    "mt-2 truncate font-mono text-[13.5px] font-semibold leading-none",
                    statusValueTone[item.tone] ?? statusValueTone.neutral
                  )}
                >
                  {item.value}
                </p>
                <p className="mt-1.5 line-clamp-1 text-[11px] leading-[1.45] text-[var(--cc-text-faint)]">
                  {item.detail}
                </p>
              </>
            );

            return item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="cc-lift cc-press block min-w-0 rounded-[var(--cc-r-tile)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] p-3"
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
