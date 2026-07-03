import { MapPin, Waypoints } from "lucide-react";

import { cn } from "@pure-advance/design-system";

import { MetaChip } from "@/components/command-kit";
import { RelatedTargetChips } from "@/components/related-targets";
import { StatusPill } from "@/components/status-pill";
import { getItineraryIntel } from "@/lib/demo-data";
import {
  shortDate,
  type DayState,
  type MissionTimeline,
  type TimelineEvent
} from "@/lib/mission-timeline";

const ownerTone: Record<string, string> = {
  M: "bg-[var(--cc-amber)]",
  S: "bg-[var(--cc-green)]",
  A: "bg-[var(--cc-brand)]"
};

function OwnerAvatar({ initial, name }: Readonly<{ initial: string; name: string | null }>) {
  return (
    <span
      title={name ?? undefined}
      className={cn(
        "grid size-4 place-items-center rounded-full font-mono text-[8px] font-bold text-white",
        ownerTone[initial] ?? "bg-[var(--cc-text-disabled)]"
      )}
    >
      {initial}
    </span>
  );
}

function isFinaleEvent(event: TimelineEvent) {
  return event.item.title.startsWith("Demo Day");
}

/** Corridor moves (border crossing, return flight) read as transit, not sessions. */
function isTransitEvent(event: TimelineEvent) {
  return event.item.title.includes("→");
}

/** Anchor blocks of the mission get extra visual weight. */
function isKeyEvent(event: TimelineEvent) {
  return event.item.title.includes("LEAP East") || event.item.title.includes("Science Park");
}

function EventCard({
  event,
  dayState,
  emphasize
}: Readonly<{ event: TimelineEvent; dayState: DayState; emphasize: boolean }>) {
  const { item } = event;
  const intel = getItineraryIntel(item.id);
  const finale = isFinaleEvent(event);
  const transit = isTransitEvent(event) && !finale;
  const key = isKeyEvent(event) && !finale && !transit;
  const glow = dayState === "now" || (dayState === "next" && emphasize);

  return (
    <article
      className={cn(
        "rounded-[var(--cc-r-row)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]",
        key && "border-l-[3px] border-l-[var(--cc-cyan)]",
        transit &&
          "border-dashed border-[var(--cc-border-strong)] bg-[var(--cc-surface-inset)] shadow-none",
        glow && !finale && "border-[var(--cc-cyan-line)] shadow-[var(--cc-glow-cyan)]",
        glow && !finale && key && "border-l-[var(--cc-cyan)]",
        finale &&
          "border-l-[3px] border-[var(--cc-finale-border)] border-l-[var(--cc-finale-rule)] bg-[var(--cc-finale-bg)] shadow-[var(--cc-finale-shadow)]"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "flex min-w-0 items-center gap-1.5 font-mono text-[11px] font-medium tracking-[0.02em]",
            finale ? "text-[var(--cc-finale-date)]" : "text-[var(--cc-cyan)]"
          )}
        >
          {transit ? (
            <Waypoints
              className="size-3.5 shrink-0 text-[var(--cc-text-faint)]"
              aria-hidden="true"
            />
          ) : null}
          {event.timeLabel}
        </span>
        {finale ? (
          <MetaChip tone="purple">Finale</MetaChip>
        ) : transit ? (
          <MetaChip tone="faint">Transit</MetaChip>
        ) : dayState === "next" && emphasize ? (
          <MetaChip tone="cyanSolid">Next</MetaChip>
        ) : (
          <StatusPill status={item.status} />
        )}
      </div>
      <h3
        className={cn(
          "mt-1.5 text-[13.5px] font-bold leading-[1.3] tracking-[-0.01em]",
          finale ? "text-[var(--cc-finale-title)]" : "text-[var(--cc-text)]",
          transit && "font-semibold text-[var(--cc-text-2)]"
        )}
      >
        {item.title}
      </h3>
      <div
        className={cn(
          "mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11.5px]",
          finale ? "text-[var(--cc-finale-text)]" : "text-[var(--cc-text-3)]"
        )}
      >
        {event.locationName ? (
          <span className="inline-flex items-center gap-1.5">
            <MapPin
              className={cn(
                "size-3.5",
                finale ? "text-[var(--cc-finale-date)]" : "text-[var(--cc-cyan)]"
              )}
              aria-hidden="true"
            />
            {event.locationName}
          </span>
        ) : null}
        {event.locationName && event.city ? (
          <span className="text-[var(--cc-text-dim)]" aria-hidden="true">
            ·
          </span>
        ) : null}
        {event.city ? <span>{event.city}</span> : null}
        {event.ownerInitial ? (
          <span className="ml-auto inline-flex items-center gap-1.5">
            <OwnerAvatar initial={event.ownerInitial} name={event.ownerName} />
          </span>
        ) : null}
      </div>
      {intel && intel.subSessions.length > 0 ? (
        <ul
          className={cn(
            "mt-2.5 space-y-1.5 border-t pt-2.5",
            finale ? "border-[var(--cc-finale-border)]" : "border-[var(--cc-border-faint)]"
          )}
        >
          {intel.subSessions.map((session) => (
            <li key={`${session.time}-${session.title}`} className="flex min-w-0 gap-2.5">
              <span
                className={cn(
                  "w-11 shrink-0 text-right font-mono text-[9.5px] uppercase leading-[1.7] tracking-[0.04em]",
                  finale ? "text-[var(--cc-finale-date)]" : "text-[var(--cc-cyan)]"
                )}
              >
                {session.time}
              </span>
              <span
                className={cn(
                  "min-w-0 truncate text-[11.5px] leading-[1.5]",
                  finale ? "text-[var(--cc-finale-text)]" : "text-[var(--cc-text-3)]"
                )}
              >
                {session.title}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {intel ? <RelatedTargetChips targetIds={intel.relatedTargetIds} /> : null}
    </article>
  );
}

const dayStateLabel: Partial<Record<DayState, { text: string; className: string }>> = {
  now: { text: "Now", className: "text-[var(--cc-cyan)]" },
  next: { text: "Next", className: "text-[var(--cc-cyan)]" }
};

export function MissionTimelineView({ timeline }: Readonly<{ timeline: MissionTimeline }>) {
  return (
    <div className="space-y-1">
      {timeline.phases.map(({ phase, days }) => (
        <section key={phase.id} aria-label={`${phase.label} — ${phase.name}`}>
          <div className="mb-3 mt-6 flex min-w-0 items-center gap-2.5">
            <span className="shrink-0 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.14em] text-[var(--cc-cyan)]">
              {phase.label} · {phase.weekTag}
            </span>
            <span className="min-w-0 truncate text-[12.5px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
              {phase.name}
            </span>
            <span className="h-px min-w-3 flex-1 bg-[var(--cc-border)]" aria-hidden="true" />
            <span className="shrink-0 font-mono text-[9.5px] uppercase leading-none text-[var(--cc-text-faint)]">
              {shortDate(phase.startsOn)}
              {phase.startsOn !== phase.endsOn ? ` – ${shortDate(phase.endsOn)}` : ""}
            </span>
          </div>
          <div className="mission-rail">
            {days.map((day) => {
              const finaleDay = day.events.some(isFinaleEvent);
              const stateLabel = dayStateLabel[day.state];

              return (
                <div key={day.date} className="mission-day mb-3.5">
                  <div className="mission-date font-mono">
                    <div
                      className={cn(
                        "text-[15px] font-semibold leading-none",
                        day.state === "now" || day.state === "next"
                          ? "text-[var(--cc-text)]"
                          : "text-[var(--cc-text-2)]"
                      )}
                    >
                      {day.dayNumber}
                    </div>
                    <div className="mt-[3px] text-[9px] uppercase tracking-[0.1em] text-[var(--cc-text-dim)]">
                      {day.weekday}
                    </div>
                    {stateLabel ? (
                      <div
                        className={cn(
                          "mt-1 text-[8px] font-bold uppercase tracking-[0.12em]",
                          stateLabel.className
                        )}
                      >
                        {stateLabel.text}
                      </div>
                    ) : null}
                  </div>
                  <span
                    className="mission-node"
                    data-state={day.state}
                    data-finale={finaleDay ? "true" : undefined}
                    aria-hidden="true"
                  />
                  <div className="space-y-2">
                    {day.events.map((event, index) => (
                      <EventCard
                        key={event.item.id}
                        event={event}
                        dayState={day.state}
                        emphasize={index === 0}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
