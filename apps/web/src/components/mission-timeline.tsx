import { MapPin } from "lucide-react";

import { cn } from "@pure-advance/design-system";

import { Chip } from "@/components/command-kit";
import { RelatedTargetChips } from "@/components/related-targets";
import { StatusPill } from "@/components/status-pill";
import { getItineraryIntel } from "@/lib/demo-data";
import { itineraryKindMeta } from "@/lib/itinerary-kinds";
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

const movementKinds = new Set(["flight", "train", "transfer"]);

function EventCard({
  event,
  dayState,
  emphasize
}: Readonly<{ event: TimelineEvent; dayState: DayState; emphasize: boolean }>) {
  const { item } = event;
  const intel = getItineraryIntel(item.id);
  const finale = isFinaleEvent(event);
  const key = item.title.includes("LEAP East");
  const glow = dayState === "now" || (dayState === "next" && emphasize);
  const kind = itineraryKindMeta[item.kind];
  const KindIcon = kind.icon;
  const movement = movementKinds.has(item.kind);
  const accented = glow || key || finale;

  // Movement legs are connective tissue, not destinations: render them as a
  // slim one-line row so meetings and visits carry the visual mass.
  if (movement && !finale && !glow && !(intel && intel.subSessions.length > 0)) {
    return (
      <article className="flex min-w-0 items-center gap-2 rounded-[var(--cc-r-row)] border border-dashed border-[var(--cc-border)] px-3 py-2">
        <KindIcon className="size-3.5 shrink-0 text-[var(--cc-text-3)]" aria-hidden="true" />
        <span className="shrink-0 font-mono text-[11px] font-medium text-[var(--cc-text-3)]">
          {event.timeLabel}
        </span>
        <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-[var(--cc-text-2)]">
          {item.title}
        </span>
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--cc-text-faint)]">
          {kind.label}
        </span>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "rounded-[var(--cc-r-row)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]",
        movement && !finale && "border-dashed bg-[var(--cc-surface-inset)] shadow-none",
        key && !finale && "border-l-[3px] border-l-[var(--cc-cyan)]",
        glow && !finale && "border-[var(--cc-cyan-line)] shadow-[var(--cc-glow-cyan)]",
        finale &&
          "border-l-[3px] border-[var(--cc-finale-border)] border-l-[var(--cc-finale-rule)] bg-[var(--cc-finale-bg)] shadow-[var(--cc-finale-shadow)]"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex min-w-0 items-center gap-1.5 font-mono text-[11px] font-medium tracking-[0.02em]",
            finale
              ? "text-[var(--cc-finale-date)]"
              : accented
                ? "text-[var(--cc-cyan)]"
                : "text-[var(--cc-text-3)]"
          )}
        >
          <KindIcon
            className={cn("size-3.5 shrink-0", !finale && movement && "text-[var(--cc-text-3)]")}
            aria-hidden="true"
          />
          {event.timeLabel}
          {movement ? (
            <span className="truncate font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--cc-text-faint)]">
              · {kind.label}
            </span>
          ) : null}
        </span>
        {finale ? (
          <Chip tone="purple">Finale</Chip>
        ) : key ? (
          <Chip tone="cyanTint">Key event</Chip>
        ) : dayState === "next" && emphasize ? (
          <Chip tone="cyanTint">Next</Chip>
        ) : (
          <StatusPill status={item.status} />
        )}
      </div>
      <h3
        className={cn(
          "mt-1.5 text-[14px] font-bold leading-[1.3] tracking-[-0.01em]",
          finale ? "text-[var(--cc-finale-title)]" : "text-[var(--cc-text)]"
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
                finale
                  ? "text-[var(--cc-finale-date)]"
                  : accented
                    ? "text-[var(--cc-cyan)]"
                    : "text-[var(--cc-text-faint)]"
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
            "mt-2 space-y-1 border-t pt-2",
            finale ? "border-[var(--cc-finale-border)]" : "border-[var(--cc-border-faint)]"
          )}
        >
          {intel.subSessions.map((session) => (
            <li key={`${session.time}-${session.title}`} className="flex min-w-0 gap-2">
              <span
                className={cn(
                  "w-11 shrink-0 text-right font-mono text-[9.5px] font-semibold uppercase leading-[1.7] tracking-[0.04em]",
                  finale
                    ? "text-[var(--cc-finale-date)]"
                    : accented
                      ? "text-[var(--cc-cyan)]"
                      : "text-[var(--cc-text-faint)]"
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

export function MissionTimelineView({ timeline }: Readonly<{ timeline: MissionTimeline }>) {
  return (
    <div className="space-y-1">
      {timeline.phases.map(({ phase, days }) => (
        <section key={phase.id} aria-label={`${phase.label} — ${phase.name}`}>
          <div className="sticky top-0 z-10 -mx-1 mt-4 border-b border-[var(--cc-border-faint)] bg-[color-mix(in_srgb,var(--cc-bg)_92%,transparent)] px-1 py-2 backdrop-blur-sm">
            <div className="flex items-baseline gap-2">
              <span className="shrink-0 rounded-[var(--cc-r-chip)] border border-[var(--cc-cyan-line-soft)] bg-[var(--cc-cyan-tint-2)] px-[8px] py-[4px] font-mono text-[9.5px] font-bold uppercase leading-none tracking-[0.1em] text-[var(--cc-cyan)]">
                {phase.label} · {phase.weekTag}
              </span>
              <span className="min-w-0 truncate text-[12.5px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
                {phase.name}
              </span>
              <span className="ml-auto shrink-0 font-mono text-[9.5px] uppercase text-[var(--cc-text-dim)]">
                {shortDate(phase.startsOn)}
                {phase.startsOn !== phase.endsOn ? ` – ${shortDate(phase.endsOn)}` : ""}
              </span>
            </div>
          </div>
          <div className="mission-rail pt-1.5">
            {days.map((day) => {
              const finaleDay = day.events.some(isFinaleEvent);

              return (
                <div key={day.date} className="mission-day mb-3">
                  <div className="mission-date font-mono">
                    <div
                      className={cn(
                        "text-[17px] font-semibold leading-none tracking-[-0.01em]",
                        day.state === "now" ? "text-[var(--cc-cyan)]" : "text-[var(--cc-text-2)]"
                      )}
                    >
                      {day.dayNumber}
                    </div>
                    <div className="mt-[3px] text-[9px] uppercase tracking-[0.1em] text-[var(--cc-text-dim)]">
                      {day.weekday}
                    </div>
                  </div>
                  <span
                    className="mission-node"
                    data-state={day.state}
                    data-finale={finaleDay ? "true" : undefined}
                    aria-hidden="true"
                  />
                  <div className="space-y-1.5">
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
