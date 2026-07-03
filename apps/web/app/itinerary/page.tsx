import { cn } from "@pure-advance/design-system";

import { MissionTimelineView } from "@/components/mission-timeline";
import { PageHeader } from "@/components/page-header";
import { getCurrentMissionNow } from "@/lib/clock";
import { demoData, getMissionTimeline, missionPhases } from "@/lib/demo-data";
import { corridorDateKey, shortDate } from "@/lib/mission-timeline";

function activeWeekId(now: Date) {
  const today = corridorDateKey(now);
  const weeks = missionPhases.filter((phase) => phase.label.startsWith("Week"));
  const current = weeks.find((phase) => today >= phase.startsOn && today <= phase.endsOn);

  if (current) {
    return current.id;
  }

  const upcoming = weeks.find((phase) => phase.startsOn > today);
  return (upcoming ?? weeks.at(-1))?.id;
}

export const dynamic = "force-dynamic";

export default function ItineraryPage() {
  const now = getCurrentMissionNow();
  const timeline = getMissionTimeline(now);
  const items = demoData.itineraryItems;
  const firstKey = corridorDateKey(items[0].startsAt);
  const lastKey = corridorDateKey(items[items.length - 1].startsAt);
  const currentWeek = activeWeekId(now);
  const weeks = missionPhases.filter((phase) => phase.label.startsWith("Week"));

  return (
    <>
      <PageHeader
        eyebrow="Itinerary"
        title="Mission Timeline"
        summary={`${shortDate(firstKey)} – ${shortDate(lastKey)} · Hong Kong → Shenzhen · Tech Founders program`}
        badge={`${timeline.totalEvents} events`}
      />
      <section aria-label="Program weeks" className="mb-2 flex gap-1.5">
        {weeks.map((phase) => {
          const isActive = phase.id === currentWeek;

          return (
            <div
              key={phase.id}
              className={cn(
                "relative min-w-0 flex-1 overflow-hidden rounded-[var(--cc-r-icon)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] px-2 py-2 text-center",
                isActive &&
                  "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] shadow-[var(--cc-elev-1)]"
              )}
            >
              {isActive ? (
                <span
                  className="absolute inset-x-0 top-0 h-[2px] bg-[var(--cc-cyan)]"
                  aria-hidden="true"
                />
              ) : null}
              <div
                className={cn(
                  "font-mono text-[9px] font-semibold tracking-[0.1em]",
                  isActive ? "text-[var(--cc-cyan)]" : "text-[var(--cc-text-faint)]"
                )}
              >
                {phase.label.replace("Week ", "WK ")} · {phase.weekTag}
              </div>
              <div
                className={cn(
                  "mt-1 truncate text-[11px] font-semibold",
                  isActive ? "text-[var(--cc-text)]" : "text-[var(--cc-text-2)]"
                )}
              >
                {phase.name}
              </div>
            </div>
          );
        })}
      </section>
      <MissionTimelineView timeline={timeline} />
    </>
  );
}
