// Workspace-relative source files the app data was hydrated from. Provenance
// metadata only — safe for the public tier and for the Supabase seed.
export const demoHydrationSources = [
  {
    path: "itinerary/master_itinerary.md",
    note: "Trip anchors: outbound Jul 4-5, HK base Jul 5-12, Shenzhen base Jul 12-Aug 1, return Aug 1-2."
  },
  {
    path: "itinerary/hong_kong_week1_plan.md",
    note: "Week 1 sub-schedule: LEAP East show hours, Rocket Fuel blocks, prep, free day, border move."
  },
  {
    path: "dashboard/program_phases.csv",
    note: "Seven-phase Tech Founders program spine."
  },
  {
    path: "business/dossiers/*.md",
    note: "49 curated visit dossiers, privacy-filtered to app-safe fields."
  },
  {
    path: "dashboard/places.csv",
    note: "Bases and program venues (public rows only)."
  }
] as const;

export type HydrationSource = (typeof demoHydrationSources)[number];
