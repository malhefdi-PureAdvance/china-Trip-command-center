import { z } from "zod";

const UuidSchema = z.string().uuid();
const IsoDateTimeSchema = z.string().datetime({ offset: true });
const IsoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/u, "Expected YYYY-MM-DD");

export const UserRoleSchema = z.enum(["owner", "admin", "member", "viewer"]);
export const PersonKindSchema = z.enum(["traveler", "operator", "business_contact", "external"]);
export const MembershipRoleSchema = z.enum(["lead", "operator", "traveler", "advisor", "viewer"]);
export const TripStatusSchema = z.enum(["planning", "active", "complete", "archived"]);
export const TripMemberRoleSchema = z.enum(["mission_lead", "traveler", "host", "remote_support"]);
export const ItineraryItemKindSchema = z.enum([
  "flight",
  "train",
  "transfer",
  "hotel",
  "meeting",
  "site_visit",
  "meal",
  "buffer",
  "admin"
]);
export const ItineraryItemStatusSchema = z.enum([
  "draft",
  "proposed",
  "confirmed",
  "changed",
  "cancelled",
  "complete"
]);
export const NoteVisibilitySchema = z.enum(["private", "team", "trip"]);
export const BusinessTargetStatusSchema = z.enum([
  "candidate",
  "source_needed",
  "researched",
  "profiled",
  "reviewed",
  "submission_ready",
  "submitted",
  "scheduled",
  "visited",
  "follow_up",
  "archived"
]);
export const SourceConfidenceSchema = z.enum(["unknown", "low", "medium", "high", "verified"]);
export const VisitRequestStatusSchema = z.enum([
  "draft",
  "ready",
  "submitted",
  "accepted",
  "declined",
  "scheduled",
  "closed"
]);
export const LeadStageSchema = z.enum([
  "new",
  "qualified",
  "intro_requested",
  "meeting_booked",
  "nurture",
  "closed"
]);
export const SharePermissionSchema = z.enum(["read", "comment", "edit"]);
export const ProposalStatusSchema = z.enum(["draft", "open", "accepted", "rejected", "superseded"]);
export const ActivityEntitySchema = z.enum([
  "trip",
  "itinerary_item",
  "location",
  "note",
  "business_target",
  "visit_request",
  "lead",
  "share",
  "itinerary_proposal"
]);

export const PersonSchema = z.object({
  id: UuidSchema,
  kind: PersonKindSchema,
  displayName: z.string().min(2),
  organization: z.string().min(2).optional(),
  title: z.string().min(2).optional(),
  bio: z.string().max(1_000).optional(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema
});

export const UserSchema = z.object({
  id: UuidSchema,
  personId: UuidSchema.nullable(),
  authProvider: z.enum(["supabase", "demo"]),
  handle: z.string().min(2),
  role: UserRoleSchema,
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema
});

export const TeamSchema = z.object({
  id: UuidSchema,
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().max(500).optional(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema
});

export const MembershipSchema = z.object({
  id: UuidSchema,
  teamId: UuidSchema,
  userId: UuidSchema,
  role: MembershipRoleSchema,
  joinedAt: IsoDateTimeSchema
});

export const TripSchema = z.object({
  id: UuidSchema,
  teamId: UuidSchema,
  name: z.string().min(2),
  slug: z.string().min(2),
  status: TripStatusSchema,
  region: z.string().min(2),
  startsOn: IsoDateSchema,
  endsOn: IsoDateSchema,
  summary: z.string().max(1_000).optional(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema
});

export const TripMemberSchema = z.object({
  id: UuidSchema,
  tripId: UuidSchema,
  personId: UuidSchema,
  role: TripMemberRoleSchema,
  availabilityNote: z.string().max(500).optional(),
  createdAt: IsoDateTimeSchema
});

export const LocationSchema = z.object({
  id: UuidSchema,
  name: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
  addressLabel: z.string().min(2).optional(),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
  locationType: z.enum(["airport", "hotel", "venue", "office", "factory", "restaurant", "other"]),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema
});

export const SavedLocationSchema = z.object({
  id: UuidSchema,
  tripId: UuidSchema,
  locationId: UuidSchema,
  label: z.string().min(2),
  note: z.string().max(1_000).optional(),
  createdByUserId: UuidSchema,
  createdAt: IsoDateTimeSchema
});

export const ItineraryItemSchema = z.object({
  id: UuidSchema,
  tripId: UuidSchema,
  locationId: UuidSchema.nullable(),
  title: z.string().min(2),
  kind: ItineraryItemKindSchema,
  status: ItineraryItemStatusSchema,
  startsAt: IsoDateTimeSchema,
  endsAt: IsoDateTimeSchema,
  timezone: z.string().min(2),
  ownerUserId: UuidSchema.nullable(),
  notes: z.string().max(2_000).optional(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema
});

export const ItineraryAttendeeSchema = z.object({
  id: UuidSchema,
  itineraryItemId: UuidSchema,
  personId: UuidSchema,
  responseStatus: z.enum(["pending", "accepted", "declined", "tentative"]),
  createdAt: IsoDateTimeSchema
});

export const NoteSchema = z.object({
  id: UuidSchema,
  tripId: UuidSchema,
  authorUserId: UuidSchema,
  title: z.string().min(2),
  body: z.string().min(1),
  visibility: NoteVisibilitySchema,
  tags: z.array(z.string()).default([]),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema
});

export const BusinessTargetSchema = z.object({
  id: UuidSchema,
  tripId: UuidSchema,
  name: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
  sector: z.string().min(2),
  status: BusinessTargetStatusSchema,
  priorityRank: z.number().int().positive().nullable(),
  sourceConfidence: SourceConfidenceSchema,
  lastCheckedAt: IsoDateTimeSchema.nullable(),
  ownerUserId: UuidSchema.nullable(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema
});

export const BusinessTargetProfileSchema = z.object({
  id: UuidSchema,
  businessTargetId: UuidSchema,
  actionSummary: z.string().min(10),
  visitObjective: z.string().min(10),
  productsOrCapabilities: z.array(z.string()).default([]),
  talkingPoints: z.array(z.string()).default([]),
  openQuestions: z.array(z.string()).default([]),
  risks: z.array(z.string()).default([]),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema
});

export const BusinessTargetSourceSchema = z.object({
  id: UuidSchema,
  businessTargetId: UuidSchema,
  sourceLabel: z.string().min(2),
  sourceUrl: z.string().url().optional(),
  sourceConfidence: SourceConfidenceSchema,
  lastCheckedAt: IsoDateTimeSchema,
  extractedNotes: z.string().max(2_000).optional(),
  createdAt: IsoDateTimeSchema
});

export const BusinessTargetScoreSchema = z.object({
  id: UuidSchema,
  businessTargetId: UuidSchema,
  fitScore: z.number().int().min(0).max(100),
  accessScore: z.number().int().min(0).max(100),
  timingScore: z.number().int().min(0).max(100),
  priorityScore: z.number().int().min(0).max(100),
  rationale: z.string().min(10),
  scoredByUserId: UuidSchema.nullable(),
  scoredAt: IsoDateTimeSchema
});

export const BusinessVisitRequiredFieldSchema = z.enum([
  "name",
  "city",
  "country",
  "sector",
  "status",
  "source_confidence",
  "source_label",
  "source_url",
  "last_checked_at",
  "action_summary",
  "visit_objective"
]);
export const SensitiveFieldNameSchema = z.enum([
  "passport_number",
  "national_id",
  "government_id",
  "date_of_birth",
  "personal_phone",
  "personal_email",
  "home_address",
  "payment_card",
  "bank_account",
  "password",
  "api_key",
  "secret"
]);
export const BusinessVisitDataStandardSchema = z.object({
  id: z.literal("china-2026-business-visit-v0.1"),
  version: z.string().min(1),
  requiredFields: z.array(BusinessVisitRequiredFieldSchema).min(1),
  blockedSensitiveFields: z.array(SensitiveFieldNameSchema).min(1),
  notes: z.string().min(10)
});

export const businessVisitDataStandard = BusinessVisitDataStandardSchema.parse({
  id: "china-2026-business-visit-v0.1",
  version: "0.1.0",
  requiredFields: [
    "name",
    "city",
    "country",
    "sector",
    "status",
    "source_confidence",
    "source_label",
    "source_url",
    "last_checked_at",
    "action_summary",
    "visit_objective"
  ],
  blockedSensitiveFields: [
    "passport_number",
    "national_id",
    "government_id",
    "date_of_birth",
    "personal_phone",
    "personal_email",
    "home_address",
    "payment_card",
    "bank_account",
    "password",
    "api_key",
    "secret"
  ],
  notes:
    "Business visit records must be source-backed, demo-safe, and free of personal identity, payment, credential, or private contact fields."
});

export const VisitRequestSchema = z.object({
  id: UuidSchema,
  businessTargetId: UuidSchema,
  requestedByUserId: UuidSchema,
  status: VisitRequestStatusSchema,
  requestedWindowStart: IsoDateTimeSchema,
  requestedWindowEnd: IsoDateTimeSchema,
  messageDraft: z.string().max(4_000),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema
});

export const LeadSchema = z.object({
  id: UuidSchema,
  tripId: UuidSchema,
  businessTargetId: UuidSchema.nullable(),
  personId: UuidSchema.nullable(),
  stage: LeadStageSchema,
  summary: z.string().min(2),
  nextAction: z.string().min(2).optional(),
  ownerUserId: UuidSchema.nullable(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema
});

export const ShareSchema = z.object({
  id: UuidSchema,
  entityType: ActivityEntitySchema,
  entityId: UuidSchema,
  sharedByUserId: UuidSchema,
  sharedWithUserId: UuidSchema.nullable(),
  sharedWithTeamId: UuidSchema.nullable(),
  permission: SharePermissionSchema,
  createdAt: IsoDateTimeSchema,
  expiresAt: IsoDateTimeSchema.nullable()
});

export const ItineraryProposalSchema = z.object({
  id: UuidSchema,
  tripId: UuidSchema,
  proposedByUserId: UuidSchema,
  title: z.string().min(2),
  reason: z.string().min(2),
  status: ProposalStatusSchema,
  startsAt: IsoDateTimeSchema,
  endsAt: IsoDateTimeSchema,
  locationId: UuidSchema.nullable(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema
});

export const ActivityLogSchema = z.object({
  id: UuidSchema,
  tripId: UuidSchema.nullable(),
  actorUserId: UuidSchema.nullable(),
  entityType: ActivityEntitySchema,
  entityId: UuidSchema,
  action: z.string().min(2),
  summary: z.string().min(2),
  createdAt: IsoDateTimeSchema
});

export const MissionPhaseSchema = z.object({
  id: z.string().min(2),
  order: z.number().int().positive(),
  label: z.string().min(1),
  name: z.string().min(2),
  city: z.string().min(2),
  weekTag: z.string().min(1),
  startsOn: IsoDateSchema,
  endsOn: IsoDateSchema,
  headline: z.string().min(2).optional()
});

export const MissionPhasesSchema = z.array(MissionPhaseSchema).min(1);

export const DemoDatasetSchema = z.object({
  persons: z.array(PersonSchema),
  users: z.array(UserSchema),
  teams: z.array(TeamSchema),
  memberships: z.array(MembershipSchema),
  trips: z.array(TripSchema),
  tripMembers: z.array(TripMemberSchema),
  locations: z.array(LocationSchema),
  savedLocations: z.array(SavedLocationSchema),
  itineraryItems: z.array(ItineraryItemSchema),
  itineraryAttendees: z.array(ItineraryAttendeeSchema),
  notes: z.array(NoteSchema),
  businessTargets: z.array(BusinessTargetSchema),
  businessTargetProfiles: z.array(BusinessTargetProfileSchema),
  businessTargetSources: z.array(BusinessTargetSourceSchema),
  businessTargetScores: z.array(BusinessTargetScoreSchema),
  visitRequests: z.array(VisitRequestSchema),
  leads: z.array(LeadSchema),
  shares: z.array(ShareSchema),
  itineraryProposals: z.array(ItineraryProposalSchema),
  activityLog: z.array(ActivityLogSchema)
});

export type User = z.infer<typeof UserSchema>;
export type Person = z.infer<typeof PersonSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type Membership = z.infer<typeof MembershipSchema>;
export type Trip = z.infer<typeof TripSchema>;
export type TripMember = z.infer<typeof TripMemberSchema>;
export type Location = z.infer<typeof LocationSchema>;
export type SavedLocation = z.infer<typeof SavedLocationSchema>;
export type ItineraryItem = z.infer<typeof ItineraryItemSchema>;
export type ItineraryAttendee = z.infer<typeof ItineraryAttendeeSchema>;
export type Note = z.infer<typeof NoteSchema>;
export type BusinessTarget = z.infer<typeof BusinessTargetSchema>;
export type BusinessTargetProfile = z.infer<typeof BusinessTargetProfileSchema>;
export type BusinessTargetSource = z.infer<typeof BusinessTargetSourceSchema>;
export type BusinessTargetScore = z.infer<typeof BusinessTargetScoreSchema>;
export type BusinessVisitDataStandard = z.infer<typeof BusinessVisitDataStandardSchema>;
export type BusinessVisitRequiredField = z.infer<typeof BusinessVisitRequiredFieldSchema>;
export type SensitiveFieldName = z.infer<typeof SensitiveFieldNameSchema>;
export type VisitRequest = z.infer<typeof VisitRequestSchema>;
export type Lead = z.infer<typeof LeadSchema>;
export type Share = z.infer<typeof ShareSchema>;
export type ItineraryProposal = z.infer<typeof ItineraryProposalSchema>;
export type ActivityLog = z.infer<typeof ActivityLogSchema>;
export type MissionPhase = z.infer<typeof MissionPhaseSchema>;
export type DemoDataset = z.infer<typeof DemoDatasetSchema>;
