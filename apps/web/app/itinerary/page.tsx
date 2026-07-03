import { ItineraryExplorer } from "@/components/itinerary-explorer";
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
      <ItineraryExplorer timeline={timeline} weeks={weeks} currentWeekId={currentWeek} />
    </>
  );
}
