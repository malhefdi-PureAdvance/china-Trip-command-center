import type { ItineraryIntel } from "../schemas";

// App-facing itinerary enrichment, sanitized for a PUBLIC deployment.
// Sources: itinerary/hong_kong_week1_plan.md, itinerary/master_itinerary.md,
// business/dossiers/INDEX.md (extracted operational program facts only — no
// booking references, flight numbers, contact identifiers, or private links).
// relatedTargetIds must reference demoBusinessTargets ids; every link is
// source-grounded (Science Park program blocks → Science Park dossiers,
// InnoX-route targets → the InnoX kickoff, INDEX "corporate site-visits from
// the itinerary" → the Week 3 supply-chain block).
export const demoItineraryIntel = [
  {
    // Jul 5 · Arrival & Hong Kong base setup
    itineraryItemId: "00000000-0000-4000-8000-000000000901",
    subSessions: [
      { time: "09:00", title: "Land HKG · Airport Express to Wan Chai" },
      { time: "MIDDAY", title: "Octopus card · eSIM/VPN · payments check" },
      { time: "15:00", title: "Check-in · light recovery, no over-scheduling" }
    ],
    relatedTargetIds: []
  },
  {
    // Jul 6 · LEAP East prep (new item)
    itineraryItemId: "00000000-0000-4000-8000-000000000913",
    subSessions: [
      { time: "P0", title: "Badge & Customer Center registration" },
      { time: "P0", title: "Exhibitor app access · lead capture ready" },
      { time: "NOTE", title: "Booth setup deadline · Jul 7 evening" }
    ],
    relatedTargetIds: []
  },
  {
    // Jul 7 · Hong Kong Science Park — visit & founder mixer
    itineraryItemId: "00000000-0000-4000-8000-000000000904",
    subSessions: [
      { time: "10:30", title: "Science Park tour · showcase & Q&A" },
      { time: "13:15", title: "Why Hong Kong is Asia's tech launchpad" },
      { time: "15:15", title: "Keynote · agentic AI + startup demo day" },
      { time: "17:15", title: "Networking reception" }
    ],
    relatedTargetIds: [
      "hk-insilico-medicine",
      "hk-great-bay-bio",
      "hk-ailsynbio",
      "hk-gutolution",
      "hk-zellulin"
    ]
  },
  {
    // Jul 8 · LEAP East Day 1
    itineraryItemId: "00000000-0000-4000-8000-000000000905",
    subSessions: [
      { time: "09:00", title: "Show open · booths & matchmaking" },
      { time: "XCHG", title: "Ecosystem Xchange · First Money In" },
      { time: "15:00", title: "Rocket Fuel East · semi-finals round 1" }
    ],
    relatedTargetIds: []
  },
  {
    // Jul 9 · LEAP East Day 2
    itineraryItemId: "00000000-0000-4000-8000-000000000906",
    subSessions: [
      { time: "09:00", title: "Show open · investor matchmaking" },
      { time: "XCHG", title: "Xchange · capital-efficient cross-border" },
      { time: "15:00", title: "Rocket Fuel East · semi-finals round 2" },
      { time: "EVE", title: "Abdulrahman lands · evening handoff" }
    ],
    relatedTargetIds: []
  },
  {
    // Jul 10 · LEAP East Day 3 & Grand Finale
    itineraryItemId: "00000000-0000-4000-8000-000000000907",
    subSessions: [
      { time: "09:00", title: "Final day · close out matchmaking" },
      { time: "15:00", title: "Rocket Fuel Grand Finale · Main Stage" },
      { time: "16:45", title: "Winners announced" },
      { time: "BD", title: "Lead triage · owner assignment" }
    ],
    relatedTargetIds: []
  },
  {
    // Jul 11 · Free day (new item) — also the Science Park fallback window
    itineraryItemId: "00000000-0000-4000-8000-000000000914",
    subSessions: [
      { time: "AM", title: "Heritage Museum · Bruce Lee exhibition" },
      { time: "PM", title: "Avenue of Stars · TST waterfront" },
      { time: "ALT", title: "Fallback window · Science Park visit" }
    ],
    relatedTargetIds: ["hk-insilico-medicine"]
  },
  {
    // Jul 12 · Border crossing & base move
    itineraryItemId: "00000000-0000-4000-8000-000000000908",
    subSessions: [
      { time: "12:00", title: "Check out · Hong Kong base" },
      { time: "PM", title: "Border crossing → Nanshan" },
      { time: "EVE", title: "Ascott check-in · confirm key collection" }
    ],
    relatedTargetIds: []
  },
  {
    // Jul 13 · Week 2 kickoff — InnoX mentors & KAUST Shenzhen Hub
    itineraryItemId: "00000000-0000-4000-8000-000000000909",
    subSessions: [{ time: "ASK", title: "Mentor intro requests · partner asks ready" }],
    relatedTargetIds: [
      "sz-national-biomanufacturing-center",
      "sz-siat-isynbio",
      "sz-synceres",
      "gz-moonbio"
    ]
  },
  {
    // Jul 20 · Week 3 — enterprise & supply-chain visits
    itineraryItemId: "00000000-0000-4000-8000-000000000910",
    subSessions: [{ time: "GBA", title: "Enterprise visits · 1:1 supply-chain matching" }],
    relatedTargetIds: ["dg-xbotpark", "sz-byd", "sz-lenovo", "dg-oppo", "dg-vivo"]
  }
] satisfies ItineraryIntel[];
