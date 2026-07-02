import type { BusinessTargetDossier, ItineraryIntel, MissionPhase } from "@pure-advance/domain";
import type { BadgeProps } from "@pure-advance/design-system";

import { getItineraryIntel, getMissionClock, getMissionTimeline, missionPhases } from "./demo-data";
import {
  businessTargets,
  getTargetById,
  priorityMeta,
  sortTargets,
  visitWindowHint
} from "./targets";
import {
  corridorDateKey,
  shortDate,
  type MissionClock,
  type MissionTimeline,
  type TimelineDay,
  type TimelineEvent
} from "./mission-timeline";
import type { Template } from "./team-notes-sync";

type Tone = NonNullable<BadgeProps["tone"]>;

export type OperationalEvent = {
  phase: MissionPhase;
  day: TimelineDay;
  event: TimelineEvent;
  intel: ItineraryIntel | null;
  relatedTargets: BusinessTargetDossier[];
};

export type TargetRelevance = {
  target: BusinessTargetDossier;
  relatedEvent: OperationalEvent | null;
  whyNow: string;
  nextAction: string;
  visitWindow: string | null;
};

export type FieldNotePrompt = {
  id: string;
  template: Template;
  label: string;
  title: string;
  body: string;
};

export type OperationalStatusItem = {
  label: string;
  value: string;
  detail: string;
  tone: Tone;
  href?: string;
};

export type MissionOpsModel = {
  now: Date;
  clock: MissionClock;
  timeline: MissionTimeline;
  currentPhase: MissionPhase | null;
  focusEntry: OperationalEvent | null;
  currentEntries: OperationalEvent[];
  upcomingEntries: OperationalEvent[];
  nextPrepEntry: OperationalEvent | null;
  relevantTargets: TargetRelevance[];
  notePrompts: FieldNotePrompt[];
  statusItems: OperationalStatusItem[];
};

function allEntries(timeline: MissionTimeline): OperationalEvent[] {
  return timeline.phases.flatMap(({ phase, days }) =>
    days.flatMap((day) =>
      day.events.map((event) => {
        const intel = getItineraryIntel(event.item.id);
        return {
          phase,
          day,
          event,
          intel,
          relatedTargets: (intel?.relatedTargetIds ?? [])
            .map((id) => getTargetById(id))
            .filter((target): target is BusinessTargetDossier => target !== null)
        };
      })
    )
  );
}

function phaseForNow(now: Date): MissionPhase | null {
  const today = corridorDateKey(now);
  const active = missionPhases.find((phase) => today >= phase.startsOn && today <= phase.endsOn);
  if (active) return active;
  return missionPhases.find((phase) => today < phase.startsOn) ?? missionPhases.at(-1) ?? null;
}

function hasPrepSignal(entry: OperationalEvent) {
  return Boolean(
    entry.intel?.subSessions.length ||
    entry.relatedTargets.length ||
    entry.event.item.notes?.trim().length
  );
}

function normalizeSentence(value: string) {
  const trimmed = value.trim();
  if (trimmed.endsWith(".") || trimmed.endsWith("!") || trimmed.endsWith("?")) return trimmed;
  return `${trimmed}.`;
}

function targetNextAction(target: BusinessTargetDossier, entry: OperationalEvent | null) {
  const needsSourceCheck = target.confidence === "unknown" || target.confidence === "low";

  if (needsSourceCheck) {
    return "Verify source confidence before outreach; then use the visit objective as the meeting ask.";
  }

  if (entry) {
    return `Before ${shortDate(entry.day.date)}, turn the dossier objective into the meeting ask.`;
  }

  if (target.priority === "must_contact" || target.priority === "high") {
    return "Prepare the private outreach route and meeting ask; keep contact details out of the app.";
  }

  return "Keep the dossier ready and use the open questions if a visit window opens.";
}

export function deriveTargetRelevance(
  target: BusinessTargetDossier,
  relatedEvent: OperationalEvent | null = null
): TargetRelevance {
  const visitWindow = visitWindowHint(target);
  const priority = priorityMeta[target.priority].label;
  const whyNow = relatedEvent
    ? `${shortDate(relatedEvent.day.date)} · linked to ${relatedEvent.event.item.title}`
    : visitWindow
      ? `Visit window · ${visitWindow}`
      : `${priority} target in ${target.corridor}`;

  return {
    target,
    relatedEvent,
    whyNow,
    nextAction: targetNextAction(target, relatedEvent),
    visitWindow
  };
}

function buildRelevantTargets(entries: OperationalEvent[]): TargetRelevance[] {
  const seen = new Set<string>();
  const linked: TargetRelevance[] = [];

  for (const entry of entries) {
    for (const target of sortTargets(entry.relatedTargets)) {
      if (seen.has(target.id)) continue;
      seen.add(target.id);
      linked.push(deriveTargetRelevance(target, entry));
    }
  }

  if (linked.length > 0) return linked;

  return sortTargets(businessTargets)
    .slice(0, 3)
    .map((target) => deriveTargetRelevance(target));
}

export function relevanceForTarget(model: MissionOpsModel, target: BusinessTargetDossier) {
  const existing = model.relevantTargets.find((candidate) => candidate.target.id === target.id);
  if (existing) return existing;

  const entry =
    [...model.currentEntries, ...model.upcomingEntries].find((candidate) =>
      candidate.relatedTargets.some((related) => related.id === target.id)
    ) ?? null;

  return deriveTargetRelevance(target, entry);
}

function promptBody(entry: OperationalEvent, template: Template, targetNames: string[]) {
  const context = `${shortDate(entry.day.date)} · ${entry.event.item.title}`;
  const targetLine =
    targetNames.length > 0 ? `\nRelated dossiers:\n- ${targetNames.join("\n- ")}\n` : "";

  if (template === "debrief") {
    return `Context:\n${context}${targetLine}\nWins:\n- \n\nBlockers:\n- \n\nFollow-ups:\n- \n\nTomorrow:\n- `;
  }

  return `Context:\n${context}${targetLine}\nKey points:\n- \n- \n\nAsks / offers:\n- \n\nNext action (owner · when):\n- `;
}

function buildNotePrompts(focusEntry: OperationalEvent | null, relevantTargets: TargetRelevance[]) {
  const prompts: FieldNotePrompt[] = [];

  if (focusEntry) {
    const template: Template = focusEntry.day.state === "now" ? "debrief" : "meeting";
    const targetNames = focusEntry.relatedTargets.map((target) => target.name);

    prompts.push({
      id: `event-${focusEntry.event.item.id}`,
      template,
      label: focusEntry.day.state === "now" ? "Debrief current block" : "Prep next block",
      title: `${shortDate(focusEntry.day.date)} · ${focusEntry.event.item.title}`,
      body: promptBody(focusEntry, template, targetNames)
    });
  }

  const target = relevantTargets[0]?.target;
  if (target) {
    prompts.push({
      id: `target-${target.id}`,
      template: "lead",
      label: "Target follow-up",
      title: `Follow-up · ${target.name}`,
      body: `Stage:\nOwner:\nNext step:\n${normalizeSentence(relevantTargets[0].nextAction)}\nDue:\nNotes:\n- `
    });
  }

  return prompts;
}

function buildStatusItems(clock: MissionClock): OperationalStatusItem[] {
  return [
    {
      label: "Mission state",
      value:
        clock.state === "active" ? "Live" : clock.state === "preflight" ? "Pre-flight" : "Debrief",
      detail: clock.detail,
      tone: clock.state === "active" ? "green" : "cyan",
      href: "/itinerary"
    },
    {
      label: "Public boundary",
      value: "App-safe",
      detail: "No booking refs, IDs, payment data, private contacts, or private links.",
      tone: "green",
      href: "/admin/data-review"
    },
    {
      label: "Notes",
      value: "Local-first",
      detail: "Saved on device first; team sync only runs after sign-in.",
      tone: "cyan",
      href: "/notes"
    },
    {
      label: "Offline",
      value: "Public shell",
      detail:
        "Today, itinerary, targets, map, and offline page can be cached; private/admin stay network-only.",
      tone: "neutral",
      href: "/offline"
    }
  ];
}

export function buildMissionOps(now: Date): MissionOpsModel {
  const clock = getMissionClock(now);
  const timeline = getMissionTimeline(now);
  const entries = allEntries(timeline);
  const activeEntries = entries.filter((entry) => entry.day.state === "now");
  const futureEntries = entries.filter((entry) => entry.day.state !== "done");
  const upcomingEntries = futureEntries.filter((entry) => entry.day.state !== "now");
  const focusEntry = activeEntries[0] ?? upcomingEntries[0] ?? null;
  const linkedFutureEntries = futureEntries.filter((entry) => entry.relatedTargets.length > 0);
  const relevantTargets = buildRelevantTargets(linkedFutureEntries);

  return {
    now,
    clock,
    timeline,
    currentPhase: phaseForNow(now),
    focusEntry,
    currentEntries: activeEntries,
    upcomingEntries,
    nextPrepEntry: futureEntries.find(hasPrepSignal) ?? null,
    relevantTargets,
    notePrompts: buildNotePrompts(focusEntry, relevantTargets),
    statusItems: buildStatusItems(clock)
  };
}
