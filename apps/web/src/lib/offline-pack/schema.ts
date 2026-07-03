/**
 * Offline flight pack contract. Versioned, app-safe (Tier 1 only — see
 * flight-pack-policy.md). The pack is generated from public domain data at
 * build time, served as a static JSON artifact, and installed into
 * IndexedDB by a user-triggered flow on /flight-pack.
 */

export const OFFLINE_PACK_SCHEMA_VERSION = 1;
export const OFFLINE_PACK_ID = "china-2026";
export const OFFLINE_PACK_ARTIFACT_URL = "/offline-pack/china-2026.v1.json";

/** Hours after generation at which the pack should prompt a refresh. */
export const OFFLINE_PACK_STALE_HOURS = 72;

export type OfflineDataTier = "tier1-public-safe";

export type OfflineDocumentType =
  "trip" | "itinerary" | "target" | "location" | "briefing" | "readiness" | "team" | "map";

export interface OfflinePackManifest {
  packId: string;
  schemaVersion: number;
  packVersion: string;
  generatedAt: string;
  sourceCommit?: string;
  dataTier: OfflineDataTier;
  staleAfter: string;
  includedRoutes: string[];
  excludedRoutes: string[];
  includedDatasets: string[];
  excludedDatasets: string[];
  redactionPolicyVersion: string;
}

export interface OfflineSearchDocument {
  id: string;
  type: OfflineDocumentType;
  title: string;
  subtitle?: string;
  body: string;
  tags: string[];
  href: string;
  dateKey?: string;
  city?: string;
  priority?: string;
}

export interface OfflineReadinessItem {
  id: string;
  label: string;
  description: string;
  status: "required" | "recommended" | "network-only";
  href?: string;
}

export interface FlightBriefingSection {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  relatedHref?: string;
}

export interface OfflineFlightPack {
  manifest: OfflinePackManifest;
  trip: {
    name: string;
    corridor: string;
    primaryPurpose: string;
    startsAt?: string;
    endsAt?: string;
  };
  readiness: OfflineReadinessItem[];
  briefing: FlightBriefingSection[];
  searchDocuments: OfflineSearchDocument[];
  exports: {
    markdown: string;
  };
  privacy: {
    classification: "app-safe-operational-pack";
    excludedRoutes: string[];
    excludedFields: string[];
  };
}

export const FORBIDDEN_OFFLINE_ROUTES = ["/admin", "/private", "/auth"] as const;

/** Field-name patterns that must never appear as keys in pack data, and
 *  (for the unambiguous ones) never as content either — see build-pack's
 *  self-audit for the exact content-scan subset. */
export const FORBIDDEN_OFFLINE_FIELD_PATTERNS = [
  "passport",
  "pnr",
  "bookingRef",
  "booking",
  "ticketNumber",
  "confirmation",
  "barcode",
  "qr",
  "visa",
  "payment",
  "card",
  "token",
  "secret",
  "service_role",
  "privateEmail",
  "phone",
  "wechat"
] as const;
