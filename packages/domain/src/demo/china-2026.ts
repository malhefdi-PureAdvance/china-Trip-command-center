import type { DemoDataset } from "../schemas";

const now = "2026-01-15T09:00:00+08:00";

export const demoChina2026 = {
  persons: [
    {
      id: "00000000-0000-4000-8000-000000000101",
      kind: "traveler",
      displayName: "Demo Mission Lead",
      organization: "Pure Advance",
      title: "Mission Lead",
      bio: "Coordinates the China 2026 operating rhythm.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000102",
      kind: "operator",
      displayName: "Demo Operations Coordinator",
      organization: "Pure Advance",
      title: "Operations",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000103",
      kind: "business_contact",
      displayName: "Demo Supplier Liaison",
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
      handle: "mission-lead",
      role: "owner",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000202",
      personId: "00000000-0000-4000-8000-000000000102",
      authProvider: "demo",
      handle: "ops",
      role: "admin",
      createdAt: now,
      updatedAt: now
    }
  ],
  teams: [
    {
      id: "00000000-0000-4000-8000-000000000301",
      name: "Pure Advance China 2026",
      slug: "pure-advance-china-2026",
      description: "Demo command center team for planning and review.",
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
      role: "operator",
      joinedAt: now
    }
  ],
  trips: [
    {
      id: "00000000-0000-4000-8000-000000000501",
      teamId: "00000000-0000-4000-8000-000000000301",
      name: "China 2026 Demo Mission",
      slug: "china-2026-demo-mission",
      status: "planning",
      region: "Hong Kong / Shenzhen Greater Bay Area",
      startsOn: "2026-04-12",
      endsOn: "2026-04-21",
      summary: "Demo-safe operating plan for business visits, logistics, and team notes.",
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
      availabilityNote: "Demo availability only.",
      createdAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000602",
      tripId: "00000000-0000-4000-8000-000000000501",
      personId: "00000000-0000-4000-8000-000000000102",
      role: "remote_support",
      availabilityNote: "Supports daily review windows.",
      createdAt: now
    }
  ],
  locations: [
    {
      id: "00000000-0000-4000-8000-000000000701",
      name: "Demo Hong Kong Arrival Base",
      city: "Hong Kong",
      country: "China",
      addressLabel: "Demo harbor district, no real address",
      latitude: 22.3193,
      longitude: 114.1694,
      locationType: "hotel",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000702",
      name: "Demo Shenzhen Innovation Campus",
      city: "Shenzhen",
      country: "China",
      addressLabel: "Demo industrial zone, no real address",
      latitude: 22.5431,
      longitude: 114.0579,
      locationType: "factory",
      createdAt: now,
      updatedAt: now
    }
  ],
  savedLocations: [
    {
      id: "00000000-0000-4000-8000-000000000801",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000701",
      label: "Base",
      note: "Demo staging location for daily briefings.",
      createdByUserId: "00000000-0000-4000-8000-000000000202",
      createdAt: now
    }
  ],
  itineraryItems: [
    {
      id: "00000000-0000-4000-8000-000000000901",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000701",
      title: "Arrival and operations briefing",
      kind: "admin",
      status: "confirmed",
      startsAt: "2026-04-12T18:00:00+08:00",
      endsAt: "2026-04-12T19:00:00+08:00",
      timezone: "Asia/Hong_Kong",
      ownerUserId: "00000000-0000-4000-8000-000000000202",
      notes: "Review demo route plan and business target readiness.",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "00000000-0000-4000-8000-000000000902",
      tripId: "00000000-0000-4000-8000-000000000501",
      locationId: "00000000-0000-4000-8000-000000000702",
      title: "Demo Shenzhen supplier capability visit",
      kind: "site_visit",
      status: "proposed",
      startsAt: "2026-04-14T10:00:00+08:00",
      endsAt: "2026-04-14T12:00:00+08:00",
      timezone: "Asia/Hong_Kong",
      ownerUserId: "00000000-0000-4000-8000-000000000201",
      notes: "Placeholder visit pending source review.",
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
    }
  ],
  notes: [
    {
      id: "00000000-0000-4000-8000-000000001101",
      tripId: "00000000-0000-4000-8000-000000000501",
      authorUserId: "00000000-0000-4000-8000-000000000202",
      title: "Daily command rhythm",
      body: "Demo note: hold a short morning brief and evening data review.",
      visibility: "team",
      tags: ["ops", "demo"],
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
      lastCheckedAt: "2026-01-15T09:30:00+08:00",
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
      lastCheckedAt: "2026-01-15T09:30:00+08:00",
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
      scoredAt: "2026-01-15T10:00:00+08:00"
    }
  ],
  visitRequests: [
    {
      id: "00000000-0000-4000-8000-000000001601",
      businessTargetId: "00000000-0000-4000-8000-000000001201",
      requestedByUserId: "00000000-0000-4000-8000-000000000201",
      status: "draft",
      requestedWindowStart: "2026-04-14T09:00:00+08:00",
      requestedWindowEnd: "2026-04-14T17:00:00+08:00",
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
      personId: "00000000-0000-4000-8000-000000000103",
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
      title: "Move supplier visit after readiness review",
      reason: "Source confidence should be reviewed before calendar lock.",
      status: "open",
      startsAt: "2026-04-15T10:00:00+08:00",
      endsAt: "2026-04-15T12:00:00+08:00",
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
