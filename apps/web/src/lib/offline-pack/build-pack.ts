import {
  activeTrip,
  getItineraryIntel,
  getMissionTimeline,
  getRouteLocations,
  missionPhases
} from "../demo-data";
import { shortDate, type TimelineDay, type TimelineEvent } from "../mission-timeline";
import {
  businessTargets,
  categoryMeta,
  priorityMeta,
  sortTargets,
  visitWindowHint
} from "../targets";

import {
  FORBIDDEN_OFFLINE_FIELD_PATTERNS,
  FORBIDDEN_OFFLINE_ROUTES,
  OFFLINE_PACK_ID,
  OFFLINE_PACK_SCHEMA_VERSION,
  OFFLINE_PACK_STALE_HOURS,
  type FlightBriefingSection,
  type OfflineFlightPack,
  type OfflineReadinessItem,
  type OfflineSearchDocument
} from "./schema";

/**
 * Builds the Tier 1 app-safe offline flight pack from the same public domain
 * data the public routes render (see flight-pack-policy.md). Deterministic
 * for a fixed `generatedAt`; never imports admin/private/auth modules.
 */

export interface BuildPackOptions {
  generatedAt?: string;
  sourceCommit?: string;
}

const REDACTION_POLICY_VERSION = "2026-07-04.1";
const PACK_VERSION = "1.0.0";

type FlatDayEvent = { day: TimelineDay; event: TimelineEvent };

function flattenTimeline(now: Date): FlatDayEvent[] {
  return getMissionTimeline(now).phases.flatMap((phase) =>
    phase.days.flatMap((day) => day.events.map((event) => ({ day, event })))
  );
}

function eventPlace(event: TimelineEvent): string {
  if (event.locationName && event.city) return `${event.locationName} · ${event.city}`;
  return event.locationName ?? event.city;
}

function buildBriefing(entries: FlatDayEvent[]): FlightBriefingSection[] {
  const weeks = missionPhases.filter((phase) => phase.label.startsWith("Week"));
  const tripStart = entries[0]?.day.date;
  const firstThreeDays = [...new Set(entries.map(({ day }) => day.date))].slice(0, 3);

  const leapEntries = entries.filter(({ event }) => event.item.title.includes("LEAP East"));
  const topTargets = sortTargets(businessTargets).slice(0, 5);

  const proposedEntries = entries.filter(({ event }) => event.item.status !== "confirmed");
  const mustContactGaps = sortTargets(businessTargets)
    .filter((target) => target.priority === "must_contact" && target.openQuestions.length > 0)
    .slice(0, 4);

  return [
    {
      id: "trip-at-a-glance",
      title: "Trip at a glance",
      summary: activeTrip.summary ?? `${activeTrip.name} across the ${activeTrip.region} corridor.`,
      bullets: [
        `${activeTrip.name} · ${activeTrip.region}`,
        `${shortDate(activeTrip.startsOn)} – ${shortDate(activeTrip.endsOn)}`,
        ...weeks.map(
          (phase) =>
            `${phase.label} · ${phase.weekTag} — ${phase.name} (${shortDate(phase.startsOn)} – ${shortDate(phase.endsOn)})`
        )
      ],
      relatedHref: "/today"
    },
    {
      id: "next-72-hours",
      title: "Next 72 hours after landing",
      summary: tripStart
        ? `The first three mission days, ${shortDate(tripStart)} onward — work them in order.`
        : "The first three mission days.",
      bullets: entries
        .filter(({ day }) => firstThreeDays.includes(day.date))
        .map(
          ({ day, event }) =>
            `${shortDate(day.date)} · ${event.timeLabel} — ${event.item.title} (${eventPlace(event)})`
        ),
      relatedHref: "/itinerary"
    },
    {
      id: "leap-east-priorities",
      title: "LEAP East priorities",
      summary: "The HKCEC program block is the week-one anchor — badge first, then work the floor.",
      bullets: leapEntries.map(({ day, event }) => {
        const intel = getItineraryIntel(event.item.id);
        const sessions = intel?.subSessions.slice(0, 2).map((session) => session.title) ?? [];
        const suffix = sessions.length > 0 ? ` — ${sessions.join("; ")}` : "";
        return `${shortDate(day.date)} · ${event.item.title}${suffix}`;
      }),
      relatedHref: "/itinerary"
    },
    {
      id: "top-targets",
      title: "Top business targets",
      summary: "Highest-priority visit targets to rehearse before landing.",
      bullets: topTargets.map((target) => {
        const window = visitWindowHint(target);
        return `${target.name} — ${priorityMeta[target.priority].label} · ${categoryMeta[target.category].short} · ${target.area}${window ? ` · ${window}` : ""}`;
      }),
      relatedHref: "/business-targets"
    },
    {
      id: "planning-gaps",
      title: "Planning gaps to verify after landing",
      summary: "Unconfirmed blocks and open questions — resolve these once online.",
      bullets: [
        ...proposedEntries.map(
          ({ day, event }) =>
            `Confirm: ${event.item.title} (${shortDate(day.date)} · ${event.item.status.replaceAll("_", " ")})`
        ),
        ...mustContactGaps.map(
          (target) =>
            `${target.name}: ${target.openQuestions.length} open question${target.openQuestions.length === 1 ? "" : "s"} to resolve before outreach`
        )
      ].slice(0, 10),
      relatedHref: "/itinerary"
    },
    {
      id: "landing-checklist",
      title: "Landing checklist",
      summary: "First moves on the ground, in order.",
      bullets: [
        ...entries
          .filter(({ day }) => day.date === tripStart)
          .map(({ event }) => `${event.timeLabel} — ${event.item.title}`),
        "Reconnect and refresh the app — this pack goes stale 72 hours after generation.",
        "Re-check the next operating block on /today before acting on cached times."
      ],
      relatedHref: "/today"
    }
  ];
}

function buildSearchDocuments(
  entries: FlatDayEvent[],
  briefing: FlightBriefingSection[]
): OfflineSearchDocument[] {
  const tripDoc: OfflineSearchDocument = {
    id: "trip-overview",
    type: "trip",
    title: activeTrip.name,
    subtitle: `${shortDate(activeTrip.startsOn)} – ${shortDate(activeTrip.endsOn)}`,
    body: `${activeTrip.summary ?? ""} ${activeTrip.region}`.trim(),
    tags: ["trip", activeTrip.region],
    href: "/today"
  };

  const itineraryDocs = entries.map(({ day, event }): OfflineSearchDocument => {
    const intel = getItineraryIntel(event.item.id);
    const sessions = intel?.subSessions.map((session) => session.title) ?? [];
    return {
      id: `itinerary-${event.item.id}`,
      type: "itinerary",
      title: event.item.title,
      subtitle: `${shortDate(day.date)} · ${event.timeLabel}`,
      body: [eventPlace(event), event.item.notes ?? "", ...sessions].filter(Boolean).join(" · "),
      tags: [event.item.kind, event.item.status, event.city].filter(Boolean),
      href: "/itinerary",
      dateKey: day.date,
      city: event.city
    };
  });

  const targetDocs = businessTargets.map((target): OfflineSearchDocument => ({
    id: `target-${target.id}`,
    type: "target",
    title: target.name,
    subtitle: `${priorityMeta[target.priority].label} · ${categoryMeta[target.category].short}`,
    body: [target.nameLocal ?? "", target.oneLiner, target.area, target.corridor]
      .filter(Boolean)
      .join(" · "),
    tags: [target.priority, target.category, target.corridor],
    href: `/business-targets/${target.id}`,
    city: target.area,
    priority: target.priority
  }));

  const locationDocs = getRouteLocations().map((location): OfflineSearchDocument => ({
    id: `location-${location.id}`,
    type: "location",
    title: location.name,
    subtitle: `${location.locationType} · ${location.city}`,
    body: [location.addressLabel ?? "", location.city, location.country, location.label]
      .filter(Boolean)
      .join(" · "),
    tags: ["location", location.locationType, location.city],
    href: "/map",
    city: location.city
  }));

  const briefingDocs = briefing.map((section): OfflineSearchDocument => ({
    id: `briefing-${section.id}`,
    type: "briefing",
    title: section.title,
    body: [section.summary, ...section.bullets].join(" · "),
    tags: ["briefing"],
    href: "/flight-pack"
  }));

  return [tripDoc, ...itineraryDocs, ...targetDocs, ...locationDocs, ...briefingDocs];
}

function buildReadiness(): OfflineReadinessItem[] {
  return [
    {
      id: "app-shell",
      label: "App shell cached",
      description: "Core interface, icons, and styles served by the offline shell worker.",
      status: "required"
    },
    {
      id: "route-today",
      label: "Today cockpit available",
      description: "Mission clock, operating blocks, and target focus.",
      status: "required",
      href: "/today"
    },
    {
      id: "route-itinerary",
      label: "Itinerary available",
      description: "Full mission timeline with week and day filters.",
      status: "required",
      href: "/itinerary"
    },
    {
      id: "route-targets",
      label: "Business targets available",
      description: "Target book and dossiers you have opened.",
      status: "required",
      href: "/business-targets"
    },
    {
      id: "route-map",
      label: "Corridor map available",
      description: "Bases, target clusters, and China-first navigation notes.",
      status: "required",
      href: "/map"
    },
    {
      id: "pack-data",
      label: "Flight pack data installed",
      description: "Briefing, readiness, and search index stored on this device.",
      status: "required",
      href: "/flight-pack"
    },
    {
      id: "search-index",
      label: "Offline search index installed",
      description: "Ships inside the pack; the search screen arrives in a later update.",
      status: "recommended"
    },
    {
      id: "notes-local",
      label: "Notes capture is local-first",
      description: "Meeting notes and debriefs save on-device without a connection.",
      status: "required",
      href: "/notes"
    },
    {
      id: "network-admin",
      label: "Admin data review",
      description: "Live readiness checks are never cached — network required.",
      status: "network-only"
    },
    {
      id: "network-private",
      label: "Private tier",
      description: "Sign-in and private surfaces are never cached — network required.",
      status: "network-only"
    },
    {
      id: "network-team-sync",
      label: "Team note sync",
      description: "Supabase sync is authenticated and network-only; local notes still save.",
      status: "network-only"
    }
  ];
}

function buildMarkdownExport(briefing: FlightBriefingSection[], generatedAt: string): string {
  const sections = briefing
    .map((section) => {
      const bullets = section.bullets.map((bullet) => `- ${bullet}`).join("\n");
      return `## ${section.title}\n\n${section.summary}\n\n${bullets}`;
    })
    .join("\n\n");

  return [
    "# China 2026 Flight Briefing",
    "",
    "Classification: App-safe operational export",
    `Generated: ${generatedAt}`,
    `Source pack: ${OFFLINE_PACK_ID} v${PACK_VERSION}`,
    "Do not forward outside the Pure Advance travel context.",
    "Refresh after landing before acting on time-sensitive details.",
    "",
    sections,
    ""
  ].join("\n");
}

/** Content patterns that are forbidden regardless of field name. A subset of
 *  FORBIDDEN_OFFLINE_FIELD_PATTERNS: only the unambiguous terms, so app-safe
 *  prose like "payments check" or "Octopus card" cannot false-positive. */
const FORBIDDEN_CONTENT_PATTERN =
  /(passport|\bpnr\b|booking\s?ref|ticket\s?number|barcode|qr\s?payload|service_role|\bsecret\b|\btoken\b|private calendar)/iu;

/** Throws if the pack links to network-only routes or carries forbidden
 *  content. The manifest/privacy sections are excluded from the scan — they
 *  legitimately NAME the excluded routes and field patterns for audit. */
export function auditPackSafety(pack: OfflineFlightPack): void {
  const hrefs = [
    ...pack.searchDocuments.map((doc) => doc.href),
    ...pack.readiness.map((item) => item.href).filter((href): href is string => Boolean(href)),
    ...pack.briefing
      .map((section) => section.relatedHref)
      .filter((href): href is string => Boolean(href))
  ];
  for (const href of hrefs) {
    if (FORBIDDEN_OFFLINE_ROUTES.some((route) => href.startsWith(route))) {
      throw new Error(`offline pack links to a network-only route: ${href}`);
    }
  }

  const scannable = JSON.stringify({
    trip: pack.trip,
    readiness: pack.readiness,
    briefing: pack.briefing,
    searchDocuments: pack.searchDocuments,
    exports: pack.exports
  });
  const contentMatch = scannable.match(FORBIDDEN_CONTENT_PATTERN);
  if (contentMatch) {
    throw new Error(`offline pack contains forbidden content: "${contentMatch[0]}"`);
  }
  for (const route of FORBIDDEN_OFFLINE_ROUTES) {
    if (scannable.includes(route)) {
      throw new Error(`offline pack content references network-only route ${route}`);
    }
  }
}

export function buildOfflineFlightPack(options: BuildPackOptions = {}): OfflineFlightPack {
  const generatedAt = options.generatedAt ?? new Date().toISOString();
  const staleAfter = new Date(
    new Date(generatedAt).getTime() + OFFLINE_PACK_STALE_HOURS * 60 * 60 * 1000
  ).toISOString();

  const entries = flattenTimeline(new Date(generatedAt));
  const briefing = buildBriefing(entries);
  const searchDocuments = buildSearchDocuments(entries, briefing);

  const pack: OfflineFlightPack = {
    manifest: {
      packId: OFFLINE_PACK_ID,
      schemaVersion: OFFLINE_PACK_SCHEMA_VERSION,
      packVersion: PACK_VERSION,
      generatedAt,
      ...(options.sourceCommit ? { sourceCommit: options.sourceCommit } : {}),
      dataTier: "tier1-public-safe",
      staleAfter,
      includedRoutes: [
        "/offline",
        "/today",
        "/itinerary",
        "/business-targets",
        "/map",
        "/flight-pack"
      ],
      excludedRoutes: [...FORBIDDEN_OFFLINE_ROUTES],
      includedDatasets: [
        "trip-overview",
        "mission-phases",
        "itinerary-timeline",
        "itinerary-intel",
        "business-targets",
        "route-locations"
      ],
      excludedDatasets: ["team-notes", "supabase-status", "private-tier", "admin-readiness"],
      redactionPolicyVersion: REDACTION_POLICY_VERSION
    },
    trip: {
      name: activeTrip.name,
      corridor: activeTrip.region,
      primaryPurpose:
        activeTrip.summary ?? `${activeTrip.name} across the ${activeTrip.region} corridor.`,
      startsAt: activeTrip.startsOn,
      endsAt: activeTrip.endsOn
    },
    readiness: buildReadiness(),
    briefing,
    searchDocuments,
    exports: {
      markdown: buildMarkdownExport(briefing, generatedAt)
    },
    privacy: {
      classification: "app-safe-operational-pack",
      excludedRoutes: [...FORBIDDEN_OFFLINE_ROUTES],
      excludedFields: [...FORBIDDEN_OFFLINE_FIELD_PATTERNS]
    }
  };

  auditPackSafety(pack);
  return pack;
}
