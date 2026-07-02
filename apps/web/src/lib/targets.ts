import {
  demoBusinessTargets,
  type BusinessTargetDossier,
  type TargetCategory,
  type TargetPriority
} from "@pure-advance/domain";
import type { BadgeProps } from "@pure-advance/design-system";

type Tone = NonNullable<BadgeProps["tone"]>;

export const businessTargets: BusinessTargetDossier[] = demoBusinessTargets;

export const categoryMeta: Record<TargetCategory, { label: string; short: string }> = {
  "ai-biotech": { label: "AI · Biotech", short: "AI/Bio" },
  biomanufacturing: { label: "Biomanufacturing", short: "Biomfg" },
  "coolvex-sourcing": { label: "Coolvex sourcing", short: "Sourcing" },
  "corporate-visit": { label: "Corporate visit", short: "Corp" },
  ecosystem: { label: "Ecosystem", short: "Ecosystem" }
};

export const priorityMeta: Record<TargetPriority, { label: string; rank: number; tone: Tone }> = {
  must_contact: { label: "Must contact", rank: 0, tone: "cyan" },
  high: { label: "High", rank: 1, tone: "green" },
  medium: { label: "Medium", rank: 2, tone: "amber" },
  watchlist: { label: "Watchlist", rank: 3, tone: "neutral" }
};

// Canonical corridor order (Hong Kong first — Week 1 — then the Shenzhen base,
// then Greater Bay Area day-trip cities).
const CORRIDOR_ORDER = [
  "Hong Kong",
  "Shenzhen",
  "Guangzhou",
  "Dongguan",
  "Zhuhai",
  "Foshan",
  "Other"
];

export function getTargetById(id: string): BusinessTargetDossier | null {
  return businessTargets.find((target) => target.id === id) ?? null;
}

export function sortTargets(list: BusinessTargetDossier[]): BusinessTargetDossier[] {
  return [...list].sort((a, b) => {
    const byPriority = priorityMeta[a.priority].rank - priorityMeta[b.priority].rank;
    if (byPriority !== 0) return byPriority;
    const byFit = (b.fitScore ?? 0) - (a.fitScore ?? 0);
    if (byFit !== 0) return byFit;
    return a.name.localeCompare(b.name);
  });
}

export function corridorsPresent(list: BusinessTargetDossier[]): string[] {
  const present = new Set(list.map((target) => target.corridor));
  return CORRIDOR_ORDER.filter((corridor) => present.has(corridor));
}

export function categoriesPresent(list: BusinessTargetDossier[]): TargetCategory[] {
  const order: TargetCategory[] = [
    "ai-biotech",
    "biomanufacturing",
    "coolvex-sourcing",
    "corporate-visit",
    "ecosystem"
  ];
  const present = new Set(list.map((target) => target.category));
  return order.filter((category) => present.has(category));
}

export function filterTargets(
  list: BusinessTargetDossier[],
  filters: { corridor?: string; category?: string }
): BusinessTargetDossier[] {
  return list.filter((target) => {
    if (filters.corridor && target.corridor !== filters.corridor) return false;
    if (filters.category && target.category !== filters.category) return false;
    return true;
  });
}

export function groupByCorridor(
  list: BusinessTargetDossier[]
): { corridor: string; targets: BusinessTargetDossier[] }[] {
  return corridorsPresent(list).map((corridor) => ({
    corridor,
    targets: sortTargets(list.filter((target) => target.corridor === corridor))
  }));
}

/** The single highest-priority target — Today's featured priority target. */
export function topTarget(): BusinessTargetDossier {
  return sortTargets(businessTargets)[0];
}
