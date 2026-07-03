"use client";

import { useMemo, useState } from "react";

import { cn } from "@pure-advance/design-system";
import type { MissionPhase } from "@pure-advance/domain";

import { MissionTimelineView } from "@/components/mission-timeline";
import { shortDate, type MissionTimeline } from "@/lib/mission-timeline";

type ItineraryExplorerProps = Readonly<{
  timeline: MissionTimeline;
  weeks: MissionPhase[];
  currentWeekId: string | undefined;
}>;

function countEvents(timeline: MissionTimeline): number {
  return timeline.phases.reduce(
    (phaseTotal, phase) =>
      phaseTotal + phase.days.reduce((dayTotal, day) => dayTotal + day.events.length, 0),
    0
  );
}

export function ItineraryExplorer({ timeline, weeks, currentWeekId }: ItineraryExplorerProps) {
  const firstWeekId = currentWeekId ?? weeks[0]?.id ?? timeline.phases[0]?.phase.id;
  const [selectedWeekId, setSelectedWeekId] = useState<string | undefined>(firstWeekId);
  const [selectedDay, setSelectedDay] = useState<string>("all");

  const selectedPhase = useMemo(
    () => timeline.phases.find(({ phase }) => phase.id === selectedWeekId) ?? timeline.phases[0],
    [selectedWeekId, timeline.phases]
  );

  const dayOptions = selectedPhase?.days ?? [];
  const filteredTimeline = useMemo<MissionTimeline>(() => {
    const phases = selectedWeekId
      ? timeline.phases.filter(({ phase }) => phase.id === selectedWeekId)
      : timeline.phases;

    const nextPhases = phases
      .map((phase) => ({
        ...phase,
        days:
          selectedDay === "all" ? phase.days : phase.days.filter((day) => day.date === selectedDay)
      }))
      .filter((phase) => phase.days.length > 0);

    return { phases: nextPhases, totalEvents: countEvents({ phases: nextPhases, totalEvents: 0 }) };
  }, [selectedDay, selectedWeekId, timeline.phases]);

  return (
    <section className="space-y-3" aria-label="Interactive itinerary planner">
      <div className="rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]">
        <div className="flex items-center justify-between gap-3">
          <p className="cc-eyebrow text-[var(--cc-text-3)]">Filter timeline</p>
          <span className="shrink-0 rounded-[var(--cc-r-chip)] border border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] px-2.5 py-1 font-mono text-[10px] font-bold text-[var(--cc-cyan)]">
            {filteredTimeline.totalEvents} events
          </span>
        </div>

        <div
          className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4"
          role="tablist"
          aria-label="Program weeks"
        >
          {weeks.map((phase) => {
            const isActive = phase.id === selectedWeekId;

            return (
              <button
                key={phase.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setSelectedWeekId(phase.id);
                  setSelectedDay("all");
                }}
                className={cn(
                  "cc-press relative min-h-14 overflow-hidden rounded-[var(--cc-r-icon)] border px-3 py-2 text-left transition-[border-color,background-color,box-shadow,transform] active:translate-y-px",
                  isActive
                    ? "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] pl-[14px] shadow-[var(--cc-elev-1)]"
                    : "border-[var(--cc-border)] bg-[var(--cc-surface-inset)] hover:border-[var(--cc-border-strong)]"
                )}
              >
                {isActive ? (
                  <span
                    className="absolute inset-y-0 left-0 w-[3px] bg-[var(--cc-cyan)]"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={cn(
                    "block font-mono text-[9px] font-bold uppercase tracking-[0.12em]",
                    isActive ? "text-[var(--cc-cyan)]" : "text-[var(--cc-text-faint)]"
                  )}
                >
                  {phase.label.replace("Week ", "WK ")} · {phase.weekTag}
                </span>
                <span className="mt-1 block text-[12px] font-bold leading-tight text-[var(--cc-text)]">
                  {phase.name}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="cc-fade-x mt-3 flex gap-2 overflow-x-auto pb-1 pr-7"
          aria-label="Day filter"
        >
          <button
            type="button"
            aria-pressed={selectedDay === "all"}
            onClick={() => setSelectedDay("all")}
            className={cn(
              "cc-press min-h-11 shrink-0 rounded-[var(--cc-r-chip)] border px-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] transition-[border-color,background-color,transform] active:translate-y-px",
              selectedDay === "all"
                ? "border-[var(--cc-cyan)] bg-[var(--cc-cyan)] text-[var(--cc-cyan-ink)]"
                : "border-[var(--cc-border)] bg-[var(--cc-surface-inset)] text-[var(--cc-text-3)]"
            )}
          >
            All days
          </button>
          {dayOptions.map((day) => (
            <button
              key={day.date}
              type="button"
              aria-pressed={selectedDay === day.date}
              onClick={() => setSelectedDay(day.date)}
              className={cn(
                "cc-press min-h-11 shrink-0 rounded-[var(--cc-r-chip)] border px-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] transition-[border-color,background-color,transform] active:translate-y-px",
                selectedDay === day.date
                  ? "border-[var(--cc-cyan)] bg-[var(--cc-cyan)] text-[var(--cc-cyan-ink)]"
                  : "border-[var(--cc-border)] bg-[var(--cc-surface-inset)] text-[var(--cc-text-3)]"
              )}
            >
              {shortDate(day.date)} · {day.weekday}
            </button>
          ))}
        </div>
      </div>

      <MissionTimelineView timeline={filteredTimeline} />
    </section>
  );
}
