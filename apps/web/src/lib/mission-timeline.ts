import type { ItineraryItem, MissionPhase, Trip } from "@pure-advance/domain";

// Everything on this trip is expressed in the +08:00 Hong Kong / Shenzhen wall
// clock. We keep the date math offset-explicit and locale-free so the timeline
// renders identically on the server, the client, and in tests with a pinned
// clock.
const HK_OFFSET_MS = 8 * 60 * 60 * 1000;
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
] as const;

export type DayState = "done" | "now" | "next" | "upcoming";
export type ClockState = "preflight" | "active" | "complete";

export interface MissionClock {
  state: ClockState;
  countdown: string;
  headline: string;
  detail: string;
  dayIndex: number | null;
  totalDays: number;
}

export interface TimelineEvent {
  item: ItineraryItem;
  timeLabel: string;
  locationName: string | null;
  city: string;
  ownerInitial: string | null;
  ownerName: string | null;
}

export interface TimelineDay {
  date: string;
  monthLabel: string;
  dayNumber: string;
  weekday: string;
  state: DayState;
  events: TimelineEvent[];
}

export interface TimelinePhase {
  phase: MissionPhase;
  days: TimelineDay[];
}

export interface MissionTimeline {
  phases: TimelinePhase[];
  totalEvents: number;
}

export interface TimelineResolvers {
  getLocationName: (locationId: string | null) => string | null;
  getLocationCity: (locationId: string | null) => string | null;
  getOwnerName: (userId: string | null) => string | null;
}

/** Wall-clock calendar date (YYYY-MM-DD) at the +08:00 corridor offset. */
export function corridorDateKey(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Date(date.getTime() + HK_OFFSET_MS).toISOString().slice(0, 10);
}

function dateParts(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map((part) => Number.parseInt(part, 10));
  const weekdayIndex = new Date(Date.UTC(year, month - 1, day)).getUTCDay();

  return {
    monthLabel: MONTHS[month - 1] ?? "",
    dayNumber: String(day),
    weekday: WEEKDAYS[weekdayIndex] ?? ""
  };
}

/** Short mono label for a calendar date, e.g. "JUL 8". */
export function shortDate(dateKey: string): string {
  const { monthLabel, dayNumber } = dateParts(dateKey);
  return `${monthLabel} ${dayNumber}`;
}

/** Whole days from `fromKey` to `toKey` (both YYYY-MM-DD), signed. */
export function daysBetween(fromKey: string, toKey: string): number {
  const from = Date.parse(`${fromKey}T00:00:00Z`);
  const to = Date.parse(`${toKey}T00:00:00Z`);
  return Math.round((to - from) / (24 * 60 * 60 * 1000));
}

function timeLabel(item: ItineraryItem): string {
  const start = item.startsAt.slice(11, 16);
  const end = item.endsAt.slice(11, 16);
  return end && end !== start ? `${start}–${end}` : start;
}

function phaseForDate(dateKey: string, phases: MissionPhase[]): MissionPhase | null {
  const matching = phases.filter((phase) => dateKey >= phase.startsOn && dateKey <= phase.endsOn);

  if (matching.length === 0) {
    return null;
  }

  // Prefer the most specific (latest-starting) phase so a short transition
  // window wins over the broad week it overlaps.
  return matching.reduce((best, phase) => (phase.startsOn > best.startsOn ? phase : best));
}

export function missionClock(trip: Trip, now: Date): MissionClock {
  const today = corridorDateKey(now);
  const totalDays = daysBetween(trip.startsOn, trip.endsOn) + 1;

  if (today < trip.startsOn) {
    const days = daysBetween(today, trip.startsOn);
    return {
      state: "preflight",
      countdown: `T‑${days}D`,
      headline: "to wheels-up",
      detail: "Riyadh → Hong Kong",
      dayIndex: null,
      totalDays
    };
  }

  if (today > trip.endsOn) {
    return {
      state: "complete",
      countdown: "COMPLETE",
      headline: "mission complete",
      detail: "Demo Day delivered · Jul 31",
      dayIndex: null,
      totalDays
    };
  }

  const dayIndex = daysBetween(trip.startsOn, today) + 1;
  return {
    state: "active",
    countdown: `DAY ${dayIndex}`,
    headline: `of ${totalDays}`,
    detail: "Mission in progress",
    dayIndex,
    totalDays
  };
}

export function buildMissionTimeline(
  items: ItineraryItem[],
  phases: MissionPhase[],
  now: Date,
  resolvers: TimelineResolvers
): MissionTimeline {
  const today = corridorDateKey(now);
  const sorted = [...items].sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  // Group events into calendar days keyed by phase.
  const dayMap = new Map<string, { phase: MissionPhase | null; events: TimelineEvent[] }>();
  const orderedDayKeys: string[] = [];

  for (const item of sorted) {
    const key = corridorDateKey(item.startsAt);

    if (!dayMap.has(key)) {
      dayMap.set(key, { phase: phaseForDate(key, phases), events: [] });
      orderedDayKeys.push(key);
    }

    dayMap.get(key)!.events.push({
      item,
      timeLabel: timeLabel(item),
      locationName: resolvers.getLocationName(item.locationId),
      city: resolvers.getLocationCity(item.locationId) ?? phaseForDate(key, phases)?.city ?? "",
      ownerName: resolvers.getOwnerName(item.ownerUserId),
      ownerInitial: resolvers.getOwnerName(item.ownerUserId)?.charAt(0).toUpperCase() ?? null
    });
  }

  // The earliest future day is "next"; today (if it has events) is "now".
  const firstFutureKey = orderedDayKeys.find((key) => key > today) ?? null;

  const dayState = (key: string): DayState => {
    if (key < today) {
      return "done";
    }
    if (key === today) {
      return "now";
    }
    return key === firstFutureKey ? "next" : "upcoming";
  };

  // Assemble phases in canonical order, keeping only phases that carry days.
  const orderedPhases = [...phases].sort((a, b) => a.order - b.order);
  const timelinePhases: TimelinePhase[] = [];

  for (const phase of orderedPhases) {
    const days: TimelineDay[] = orderedDayKeys
      .filter((key) => dayMap.get(key)!.phase?.id === phase.id)
      .map((key) => ({
        date: key,
        ...dateParts(key),
        state: dayState(key),
        events: dayMap.get(key)!.events
      }));

    if (days.length > 0) {
      timelinePhases.push({ phase, days });
    }
  }

  return { phases: timelinePhases, totalEvents: sorted.length };
}
