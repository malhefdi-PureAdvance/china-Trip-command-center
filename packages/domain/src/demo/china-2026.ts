import type { DemoDataset, MissionPhase } from "../schemas";

// Planning/record timestamp (pre-trip). App-facing schedule uses the real
// sanitized Jul 4 - Aug 2, 2026 trip anchors. No booking references, e-ticket
// numbers, gate passes, room/voucher details, or private attendee data appear
// here — only operational, program-published facts for the Hong Kong /
// Shenzhen Greater Bay Area corridor.
const now = "2026-07-02T09:00:00+08:00";

export const demoChina2026 = {
  persons: [
    {
      id: "00000000-0000-4000-8000-000000000101",
      kind: "traveler",
      displayName: "Mohammed",
      organization: "Pure Advance",
      title: "Founder · Mission Lead",
      bio: "Runs the China 2026 operating rhythm across Hong Kong and Shenzhen.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000102",
      kind: "traveler",
      displayName: "Sultan",
      organization: "Pure Advance",
      title: "Co-founder",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000103",
      kind: "traveler",
      displayName: "Abdulrahman",
      organization: "Pure Advance",
      title: "BD · Investor Follow-up",
      bio: "Joins in Hong Kong for LEAP East; leads BD triage and investor follow-up.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000104",
      kind: "business_contact",
      displayName: "Program partner liaison (demo)",
      organization: "Demo Shenzhen Partner",
      title: "Business Development",
      createdAt: now,
      updatedAt: now
    }
  ],
  users: [
    {
      id: "00000000-0000-4000-8000-000000000201",
      personId: "00000000-0000-4000-8000-000000000101",
      authProvider: "demo",
      handle: "mohammed",
      role: "owner",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000202",
      personId: "00000000-0000-4000-8000-000000000102",
      authProvider: "demo",
      handle: "sultan",
      role: "admin",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000203",
      personId: "00000000-0000-4000-8000-000000000103",
      authProvider: "demo",
      handle: "abdulrahman",
      role: "member",
      createdAt: now,
      updatedAt: now
    }
  ],
  teams: [
    {
      id: "00000000-0000-4000-8000-000000000301",
      name: "Pure Advance · China 2026",
      slug: "pure-advance-china-2026",
      description: "Command center team for the Tech Founders China 2026 mission.",
      createdAt: now,
      updatedAt: now
    }
  ],
  memberships: [
    {
      id: "00000000-0000-4000-8000-000000000401",
      teamId: "00000000-0000-4000-8000-000000000301",
      userId: "00000000-0000-4000-8000-000000000201",
      role: "lead",
      joinedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000402",
      teamId: "00000000-0000-4000-8000-000000000301",
      userId: "00000000-0000-4000-8000-000000000202",
      role: "traveler",
      joinedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000403",
      teamId: "00000000-0000-4000-8000-000000000301",
      userId: "00000000-0000-4000-8000-000000000203",
      role: "traveler",
      joinedAt: now
    }
  ],
  trips: [
    {
      id: "00000000-0000-4000-8000-000000000501",
      teamId: "00000000-0000-4000-8000-000000000301",
      name: "China 2026 · Tech Founders",
      slug: "china-2026-tech-founders",
      status: "planning",
      region: "Hong Kong / Shenzhen Greater Bay Area",
      startsOn: "2026-07-04",
      endsOn: "2026-08-02",
      summary:
        "Hong Kong Week 1 (Go Global from GBA) with LEAP East at HKCEC Jul 8-10, then the Shenzhen Tech Founders program through Demo Day on Jul 31.",
      createdAt: now,
      updatedAt: now
    }
  ],
  tripMembers: [
    {
      id: "00000000-0000-4000-8000-000000000601",
      tripId: "00000000-0000-4000-8000-000000000501",
      personId: "00000000-0000-4000-8000-000000000101",
      role: "mission_lead",
      availabilityNote: "On-ground Hong Kong Jul 5 through Shenzhen Demo Day Jul 31.",
      createdAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000602",
      tripId: "00000000-0000-4000-8000-000000000501",
      personId: "00000000-0000-4000-8000-000000000102",
      role: "traveler",
      availabilityNote: "Hong Kong base from Jul 4; full program traveler.",
      createdAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000603",
      tripId: "00000000-0000-4000-8000-000000000501",
      personId: "00000000-0000-4000-8000-000000000103",
      role: "traveler",
      availabilityNote: "Joins Hong Kong Jul 9 for LEAP East; supports through Jul 16.",
      createdAt: now
    }
  ],
  locations: [
    {
      id: "00000000-0000-4000-8000-000000000701",
      name: "The Hari Hong Kong",
      city: "Hong Kong",
      country: "China",
      addressLabel: "Wan Chai, Hong Kong",
      latitude: 22.2789,
      longitude: 114.1755,
      locationType: "hotel",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000702",
      name: "Ascott Raffles City Shenzhen",
      city: "Shenzhen",
      country: "China",
      addressLabel: "Nanshan, Shenzhen",
      latitude: 22.5267,
      longitude: 113.9345,
      locationType: "hotel",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000703",
      name: "HKCEC — LEAP East",
      city: "Hong Kong",
      country: "China",
      addressLabel: "Wan Chai, Hong Kong",
      latitude: 22.283,
      longitude: 114.1735,
      locationType: "venue",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000704",
      name: "Hong Kong Science Park",
      city: "Hong Kong",
      country: "China",
      addressLabel: "Pak Shek Kok, Hong Kong",
      latitude: 22.4239,
      longitude: 114.21,
      locationType: "venue",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000705",
      name: "Hong Kong Polytechnic University",
      city: "Hong Kong",
      country: "China",
      addressLabel: "Hung Hom, Hong Kong",
      latitude: 22.3045,
      longitude: 114.1795,
      locationType: "venue",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000706",
      name: "InnoX · KAUST Shenzhen Hub",
      city: "Shenzhen",
      country: "China",
      addressLabel: "Nanshan, Shenzhen",
      latitude: 22.533,
      longitude: 113.945,
      locationType: "office",
      createdAt: now,
      updatedAt: now
    }
  ],
  savedLocations: [
    {
      id: "00000000-0000-4000-8000-000000000801",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000701",
      label: "Hong Kong base",
      note: "Week 1 base in Wan Chai — walkable to HKCEC for LEAP East.",
      createdByUserId: "00000000-0000-4000-8000-000000000202",
      createdAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000802",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000702",
      label: "Shenzhen base",
      note: "Program base in Nanshan from Jul 12 through Demo Day.",
      createdByUserId: "00000000-0000-4000-8000-000000000201",
      createdAt: now
    }
  ],
  itineraryItems: [
    {
      id: "00000000-0000-4000-8000-000000000901",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000701",
      title: "Arrival & Hong Kong base setup",
      kind: "admin",
      status: "confirmed",
      startsAt: "2026-07-05T09:00:00+08:00",
      endsAt: "2026-07-05T12:00:00+08:00",
      timezone: "Asia/Hong_Kong",
      ownerUserId: "00000000-0000-4000-8000-000000000201",
      notes: "Arrive HKG and settle the Hong Kong base. Payments, eSIM/VPN, and maps readiness.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000902",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000705",
      title: "PolyU — tech-transfer & entrepreneurship sharing",
      kind: "meeting",
      status: "confirmed",
      startsAt: "2026-07-06T10:00:00+08:00",
      endsAt: "2026-07-06T12:00:00+08:00",
      timezone: "Asia/Hong_Kong",
      ownerUserId: "00000000-0000-4000-8000-000000000201",
      notes: "PolyU-hosted sharing on technology transfer and entrepreneurship & innovation.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000903",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: null,
      title: "Networking mixer at Alibaba",
      kind: "meeting",
      status: "proposed",
      startsAt: "2026-07-06T16:00:00+08:00",
      endsAt: "2026-07-06T18:00:00+08:00",
      timezone: "Asia/Hong_Kong",
      ownerUserId: "00000000-0000-4000-8000-000000000202",
      notes: "Early networking / market-expansion mixer. Exact venue and routing to confirm.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000904",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000704",
      title: "Hong Kong Science Park — visit & founder mixer",
      kind: "site_visit",
      status: "confirmed",
      startsAt: "2026-07-07T10:30:00+08:00",
      endsAt: "2026-07-07T18:00:00+08:00",
      timezone: "Asia/Hong_Kong",
      ownerUserId: "00000000-0000-4000-8000-000000000201",
      notes:
        "HKSTP morning visit plus the organiser afternoon agenda and founder mixer. Gate pass required.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000905",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000703",
      title: "LEAP East at HKCEC — Day 1",
      kind: "site_visit",
      status: "confirmed",
      startsAt: "2026-07-08T10:00:00+08:00",
      endsAt: "2026-07-08T17:00:00+08:00",
      timezone: "Asia/Hong_Kong",
      ownerUserId: "00000000-0000-4000-8000-000000000201",
      notes: "LEAP East exhibition booths plus Rocket Fuel East semi-finals on the DeepFest stage.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000906",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000703",
      title: "LEAP East at HKCEC — Day 2",
      kind: "site_visit",
      status: "confirmed",
      startsAt: "2026-07-09T10:00:00+08:00",
      endsAt: "2026-07-09T17:00:00+08:00",
      timezone: "Asia/Hong_Kong",
      ownerUserId: "00000000-0000-4000-8000-000000000201",
      notes: "LEAP East Day 2. Abdulrahman arrives HKG in the evening for handoff.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000907",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000703",
      title: "LEAP East — Day 3 & Rocket Fuel Grand Finale",
      kind: "site_visit",
      status: "confirmed",
      startsAt: "2026-07-10T10:00:00+08:00",
      endsAt: "2026-07-10T16:30:00+08:00",
      timezone: "Asia/Hong_Kong",
      ownerUserId: "00000000-0000-4000-8000-000000000203",
      notes:
        "LEAP East Day 3 and the Grand Finale. Abdulrahman leads BD triage and investor follow-up.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000908",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000702",
      title: "Hong Kong → Shenzhen · border crossing & base move",
      kind: "transfer",
      status: "proposed",
      startsAt: "2026-07-11T12:00:00+08:00",
      endsAt: "2026-07-11T15:00:00+08:00",
      timezone: "Asia/Hong_Kong",
      ownerUserId: "00000000-0000-4000-8000-000000000201",
      notes: "Wan Chai to Nanshan. Confirm the border plan and Shenzhen check-in before moving.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000909",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000706",
      title: "Week 2 kickoff · InnoX mentors & KAUST Shenzhen Hub",
      kind: "meeting",
      status: "proposed",
      startsAt: "2026-07-13T10:00:00+08:00",
      endsAt: "2026-07-13T12:00:00+08:00",
      timezone: "Asia/Shanghai",
      ownerUserId: "00000000-0000-4000-8000-000000000201",
      notes:
        "1:1 mentor support and tailored plan. Prepare Pure Advance intro asks before this week.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000910",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: null,
      title: "Week 3 · Enterprise & supply-chain visits",
      kind: "site_visit",
      status: "proposed",
      startsAt: "2026-07-20T10:00:00+08:00",
      endsAt: "2026-07-20T16:00:00+08:00",
      timezone: "Asia/Shanghai",
      ownerUserId: "00000000-0000-4000-8000-000000000201",
      notes: "Enterprise visits and 1:1 supply-chain matching across the Greater Bay Area.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000911",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: null,
      title: "Demo Day — final pitch before investors & delegation",
      kind: "meeting",
      status: "confirmed",
      startsAt: "2026-07-31T14:00:00+08:00",
      endsAt: "2026-07-31T17:00:00+08:00",
      timezone: "Asia/Shanghai",
      ownerUserId: "00000000-0000-4000-8000-000000000201",
      notes:
        "Demo Day in Shenzhen — pitch, validation checklist, and 90-day plan before investors and the delegation.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000912",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000702",
      title: "Checkout & return · Hong Kong → Riyadh",
      kind: "transfer",
      status: "confirmed",
      startsAt: "2026-08-01T15:00:00+08:00",
      endsAt: "2026-08-01T20:10:00+08:00",
      timezone: "Asia/Hong_Kong",
      ownerUserId: "00000000-0000-4000-8000-000000000201",
      notes:
        "Shenzhen checkout and cross-border transfer to HKG for the evening return; arrives Riyadh Aug 2.",
      createdAt: now,
      updatedAt: now
    }
  ],
  itineraryAttendees: [
    {
      id: "00000000-0000-4000-8000-000000001001",
      itineraryItemId: "00000000-0000-4000-8000-000000000901",
      personId: "00000000-0000-4000-8000-000000000101",
      responseStatus: "accepted",
      createdAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000001002",
      itineraryItemId: "00000000-0000-4000-8000-000000000907",
      personId: "00000000-0000-4000-8000-000000000103",
      responseStatus: "accepted",
      createdAt: now
    }
  ],
  notes: [
    {
      id: "00000000-0000-4000-8000-000000001101",
      tripId: "00000000-0000-4000-8000-000000000501",
      authorUserId: "00000000-0000-4000-8000-000000000202",
      title: "Week 1 · Go Global from GBA",
      body: "Hong Kong Week 1 priority: LEAP East at HKCEC (Jul 8-10) and Saudi-ecosystem networking. Keep BJJ and food as recovery slots around HKCEC and The Hari.",
      visibility: "team",
      tags: ["week1", "hong kong", "leap-east"],
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000001102",
      tripId: "00000000-0000-4000-8000-000000000501",
      authorUserId: "00000000-0000-4000-8000-000000000201",
      title: "Shenzhen base readiness",
      body: "Before the Jul 12 Shenzhen move: confirm WeChat Pay & Alipay, DiDi and Amap, and the Hong Kong to Shenzhen border plan.",
      visibility: "team",
      tags: ["shenzhen", "logistics"],
      createdAt: now,
      updatedAt: now
    }
  ],
  businessTargets: [
    {
      id: "00000000-0000-4000-8000-000000001201",
      tripId: "00000000-0000-4000-8000-000000000501",
      name: "Demo Shenzhen Advanced Materials Group",
      city: "Shenzhen",
      country: "China",
      sector: "Advanced materials",
      status: "profiled",
      priorityRank: 1,
      sourceConfidence: "medium",
      lastCheckedAt: "2026-07-01T09:30:00+08:00",
      ownerUserId: "00000000-0000-4000-8000-000000000201",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000001202",
      tripId: "00000000-0000-4000-8000-000000000501",
      name: "Demo Hong Kong Packaging Systems Studio",
      city: "Hong Kong",
      country: "China",
      sector: "Packaging automation",
      status: "source_needed",
      priorityRank: null,
      sourceConfidence: "unknown",
      lastCheckedAt: null,
      ownerUserId: "00000000-0000-4000-8000-000000000202",
      createdAt: now,
      updatedAt: now
    }
  ],
  businessTargetProfiles: [
    {
      id: "00000000-0000-4000-8000-000000001301",
      businessTargetId: "00000000-0000-4000-8000-000000001201",
      actionSummary: "Validate whether the demo supplier can support a short capability visit.",
      visitObjective:
        "Assess capability fit, lead times, quality controls, and next-step ownership.",
      productsOrCapabilities: [
        "Demo composite material",
        "Prototype review",
        "Factory process overview"
      ],
      talkingPoints: [
        "Capacity assumptions",
        "Quality assurance process",
        "Export documentation path"
      ],
      openQuestions: ["Which product lines are available for visit review?"],
      risks: ["Source confidence is not yet verified."],
      createdAt: now,
      updatedAt: now
    }
  ],
  businessTargetSources: [
    {
      id: "00000000-0000-4000-8000-000000001401",
      businessTargetId: "00000000-0000-4000-8000-000000001201",
      sourceLabel: "Demo research note",
      sourceUrl: "https://example.com/demo-source",
      sourceConfidence: "medium",
      lastCheckedAt: "2026-07-01T09:30:00+08:00",
      extractedNotes: "Synthetic source for schema validation only.",
      createdAt: now
    }
  ],
  businessTargetScores: [
    {
      id: "00000000-0000-4000-8000-000000001501",
      businessTargetId: "00000000-0000-4000-8000-000000001201",
      fitScore: 82,
      accessScore: 64,
      timingScore: 70,
      priorityScore: 75,
      rationale: "Strong demo fit, but access and source confidence still need review.",
      scoredByUserId: "00000000-0000-4000-8000-000000000201",
      scoredAt: "2026-07-01T10:00:00+08:00"
    }
  ],
  visitRequests: [
    {
      id: "00000000-0000-4000-8000-000000001601",
      businessTargetId: "00000000-0000-4000-8000-000000001201",
      requestedByUserId: "00000000-0000-4000-8000-000000000201",
      status: "draft",
      requestedWindowStart: "2026-07-20T09:00:00+08:00",
      requestedWindowEnd: "2026-07-20T17:00:00+08:00",
      messageDraft: "Demo request draft. Replace with sourced, approved outreach before use.",
      createdAt: now,
      updatedAt: now
    }
  ],
  leads: [
    {
      id: "00000000-0000-4000-8000-000000001701",
      tripId: "00000000-0000-4000-8000-000000000501",
      businessTargetId: "00000000-0000-4000-8000-000000001201",
      personId: "00000000-0000-4000-8000-000000000104",
      stage: "qualified",
      summary: "Demo liaison may help validate visit readiness.",
      nextAction: "Confirm source confidence and profile completeness.",
      ownerUserId: "00000000-0000-4000-8000-000000000202",
      createdAt: now,
      updatedAt: now
    }
  ],
  shares: [
    {
      id: "00000000-0000-4000-8000-000000001801",
      entityType: "business_target",
      entityId: "00000000-0000-4000-8000-000000001201",
      sharedByUserId: "00000000-0000-4000-8000-000000000202",
      sharedWithUserId: "00000000-0000-4000-8000-000000000201",
      sharedWithTeamId: null,
      permission: "comment",
      createdAt: now,
      expiresAt: null
    }
  ],
  itineraryProposals: [
    {
      id: "00000000-0000-4000-8000-000000001901",
      tripId: "00000000-0000-4000-8000-000000000501",
      proposedByUserId: "00000000-0000-4000-8000-000000000202",
      title: "Shift a Shenzhen visit after readiness review",
      reason: "Source confidence should be reviewed before calendar lock.",
      status: "open",
      startsAt: "2026-07-20T10:00:00+08:00",
      endsAt: "2026-07-20T12:00:00+08:00",
      locationId: "00000000-0000-4000-8000-000000000702",
      createdAt: now,
      updatedAt: now
    }
  ],
  activityLog: [
    {
      id: "00000000-0000-4000-8000-000000002001",
      tripId: "00000000-0000-4000-8000-000000000501",
      actorUserId: "00000000-0000-4000-8000-000000000202",
      entityType: "business_target",
      entityId: "00000000-0000-4000-8000-000000001201",
      action: "profile.updated",
      summary: "Demo target profile created for review.",
      createdAt: now
    }
  ]
} satisfies DemoDataset;

// Program phase spine (sanitized from the Tech Founders program structure).
// Used by Today (mission clock) and Itinerary (timeline grouping). Dates are
// operational anchors only.
export const demoMissionPhases = [
  {
    id: "phase_arrival_hk",
    order: 1,
    label: "Arrival",
    name: "Hong Kong base setup",
    city: "Hong Kong",
    weekTag: "HK",
    startsOn: "2026-07-05",
    endsOn: "2026-07-05",
    headline: "Arrive HKG · settle the Wan Chai base"
  },
  {
    id: "phase_week1_hk",
    order: 2,
    label: "Week 1",
    name: "Go Global from GBA",
    city: "Hong Kong",
    weekTag: "HK",
    startsOn: "2026-07-06",
    endsOn: "2026-07-12",
    headline: "LEAP East at HKCEC · Jul 8-10"
  },
  {
    id: "phase_transition_sz",
    order: 3,
    label: "Transition",
    name: "Hong Kong → Shenzhen",
    city: "Shenzhen",
    weekTag: "SZ",
    startsOn: "2026-07-11",
    endsOn: "2026-07-12",
    headline: "Border crossing · base move to Nanshan"
  },
  {
    id: "phase_week2_sz",
    order: 4,
    label: "Week 2",
    name: "Innovation Growth Engine",
    city: "Shenzhen",
    weekTag: "SZ",
    startsOn: "2026-07-13",
    endsOn: "2026-07-17",
    headline: "InnoX mentors · KAUST Shenzhen Hub"
  },
  {
    id: "phase_week3_gba",
    order: 5,
    label: "Week 3",
    name: "Supply Chain & Industrialization",
    city: "Shenzhen / GBA",
    weekTag: "GBA",
    startsOn: "2026-07-20",
    endsOn: "2026-07-24",
    headline: "Enterprise visits · 1:1 supply-chain matching"
  },
  {
    id: "phase_week4_demo",
    order: 6,
    label: "Week 4",
    name: "Integration & Demo Day",
    city: "Shenzhen / GBA",
    weekTag: "SZ",
    startsOn: "2026-07-27",
    endsOn: "2026-07-31",
    headline: "Demo Day · Jul 31"
  },
  {
    id: "phase_departure",
    order: 7,
    label: "Departure",
    name: "Hong Kong → Riyadh",
    city: "Hong Kong",
    weekTag: "RUH",
    startsOn: "2026-08-01",
    endsOn: "2026-08-02",
    headline: "Checkout · return flight"
  }
] satisfies MissionPhase[];
