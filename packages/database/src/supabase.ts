import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";
import {
  businessVisitDataStandardId,
  conservativeRlsPolicyMode,
  coreMigrationPath,
  demoSeedPath
} from "./index";

export const supabaseEnvKeys = {
  url: "NEXT_PUBLIC_SUPABASE_URL",
  anonKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  serviceRoleKey: "SUPABASE_SERVICE_ROLE_KEY",
  projectRef: "SUPABASE_PROJECT_REF"
} as const;

export type SupabaseRuntimeConfig = {
  url?: string;
  anonKey?: string;
  serviceRoleKey?: string;
  projectRef?: string;
};

export type SupabaseConfigMode = "not_configured" | "public_configured" | "admin_configured";

export type SupabaseConfigStatus = {
  mode: SupabaseConfigMode;
  isPublicConfigured: boolean;
  isAdminConfigured: boolean;
  missingPublicEnv: string[];
  missingAdminEnv: string[];
  projectRef?: string;
};

export type SupabaseHealthStatus =
  "not_configured" | "admin_key_missing" | "ready" | "seed_missing" | "unreachable";

export type SupabaseDemoSeedStatus = "not_checked" | "present" | "missing";

export type SupabaseHealth = {
  status: SupabaseHealthStatus;
  databaseReachable: boolean;
  configStatus: SupabaseConfigStatus;
  migrationPath: string;
  demoSeedPath: string;
  standardId: string;
  standardVersion: string | null;
  demoSeedStatus: SupabaseDemoSeedStatus;
  rlsPolicyMode: string;
  checkedAt: string;
  message: string;
  statusCode?: number;
};

export type SupabaseHealthOptions = {
  fetcher?: typeof fetch;
  now?: () => Date;
};

const placeholderValues = new Set([
  "https://example.supabase.co",
  "public-anon-placeholder",
  "server-service-role-placeholder",
  "local-development-placeholder",
  "demo-project-ref",
  "demo-service-role-placeholder",
  "service-role-placeholder"
]);

function cleanEnvValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();

  if (!trimmed || placeholderValues.has(trimmed)) {
    return undefined;
  }

  return trimmed;
}

export function readSupabaseRuntimeConfig(
  env: Partial<Record<keyof typeof supabaseEnvKeys | string, string | undefined>> = process.env
): SupabaseRuntimeConfig {
  return {
    url: cleanEnvValue(env[supabaseEnvKeys.url]),
    anonKey: cleanEnvValue(env[supabaseEnvKeys.anonKey]),
    serviceRoleKey: cleanEnvValue(env[supabaseEnvKeys.serviceRoleKey]),
    projectRef: cleanEnvValue(env[supabaseEnvKeys.projectRef])
  } satisfies SupabaseRuntimeConfig;
}

export function getSupabaseConfigStatus(config: SupabaseRuntimeConfig): SupabaseConfigStatus {
  const missingPublicEnv = [
    ...(config.url ? [] : [supabaseEnvKeys.url]),
    ...(config.anonKey ? [] : [supabaseEnvKeys.anonKey])
  ];
  const missingAdminEnv = config.serviceRoleKey ? [] : [supabaseEnvKeys.serviceRoleKey];
  const isPublicConfigured = missingPublicEnv.length === 0;
  const isAdminConfigured = isPublicConfigured && missingAdminEnv.length === 0;

  return {
    mode: isAdminConfigured
      ? "admin_configured"
      : isPublicConfigured
        ? "public_configured"
        : "not_configured",
    isPublicConfigured,
    isAdminConfigured,
    missingPublicEnv,
    missingAdminEnv,
    ...(config.projectRef ? { projectRef: config.projectRef } : {})
  };
}

export function createSupabaseBrowserClient(
  config: SupabaseRuntimeConfig = readSupabaseRuntimeConfig()
): SupabaseClient<Database> | null {
  const status = getSupabaseConfigStatus(config);

  if (!status.isPublicConfigured) {
    return null;
  }

  return createClient<Database>(config.url!, config.anonKey!, {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  });
}

export function createSupabaseAdminClient(
  config: SupabaseRuntimeConfig = readSupabaseRuntimeConfig()
): SupabaseClient<Database> | null {
  const status = getSupabaseConfigStatus(config);

  if (!status.isAdminConfigured) {
    return null;
  }

  return createClient<Database>(config.url!, config.serviceRoleKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

function getHealthEndpoint(url: string) {
  const endpoint = new URL(
    "/rest/v1/business_visit_data_standards",
    url.endsWith("/") ? url : `${url}/`
  );
  endpoint.searchParams.set("select", "id,version,created_at");
  endpoint.searchParams.set("id", `eq.${businessVisitDataStandardId}`);
  endpoint.searchParams.set("limit", "1");

  return endpoint.toString();
}

type BusinessVisitStandardHealthRow = {
  id: string;
  version: string;
  created_at: string;
};

type BusinessTargetStatus = Database["public"]["Enums"]["business_target_status"];
type SourceConfidence = Database["public"]["Enums"]["source_confidence"];

type BusinessVisitReviewTargetRow = {
  id: string;
  name: string;
  city: string;
  source_confidence: SourceConfidence;
  status: BusinessTargetStatus;
  priority_rank: number | null;
};

export type BusinessVisitReviewTarget = {
  id: string;
  name: string;
  city: string;
  sourceConfidence: SourceConfidence;
  status: BusinessTargetStatus;
  priorityRank: number | null;
};

export type BusinessVisitReviewSnapshot = {
  status: SupabaseHealthStatus;
  source: "supabase" | "unavailable";
  businessTargetSourceCount: number | null;
  manualReviewQueueCount: number | null;
  targetsAwaitingVerification: BusinessVisitReviewTarget[];
  checkedAt: string;
  message: string;
  statusCode?: number;
};

function makeHealthResult(
  health: Omit<SupabaseHealth, "migrationPath" | "demoSeedPath" | "standardId" | "rlsPolicyMode">
): SupabaseHealth {
  return {
    ...health,
    migrationPath: coreMigrationPath,
    demoSeedPath,
    standardId: businessVisitDataStandardId,
    rlsPolicyMode: conservativeRlsPolicyMode
  };
}

function getRestEndpoint(url: string, table: string, params: Array<[string, string]>): string {
  const endpoint = new URL(`/rest/v1/${table}`, url.endsWith("/") ? url : `${url}/`);

  for (const [key, value] of params) {
    endpoint.searchParams.append(key, value);
  }

  return endpoint.toString();
}

function getAdminRestHeaders(config: SupabaseRuntimeConfig, extra?: HeadersInit): HeadersInit {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${config.serviceRoleKey}`,
    apikey: config.serviceRoleKey!,
    ...extra
  };
}

function unavailableReviewSnapshot(
  status: SupabaseHealthStatus,
  checkedAt: string,
  message: string,
  statusCode?: number
): BusinessVisitReviewSnapshot {
  return {
    status,
    source: "unavailable",
    businessTargetSourceCount: null,
    manualReviewQueueCount: null,
    targetsAwaitingVerification: [],
    checkedAt,
    message,
    ...(statusCode ? { statusCode } : {})
  };
}

function parseExactCount(response: Response): number {
  const contentRange = response.headers.get("content-range");
  const countValue = contentRange?.split("/").at(-1);
  const count = Number(countValue);

  return Number.isFinite(count) ? count : 0;
}

async function fetchExactCount(
  config: SupabaseRuntimeConfig,
  fetcher: typeof fetch,
  table: string,
  filters: Array<[string, string]> = []
): Promise<{ count: number; statusCode?: never } | { count: null; statusCode: number }> {
  const response = await fetcher(
    getRestEndpoint(config.url!, table, [["select", "id"], ...filters, ["limit", "0"]]),
    {
      method: "GET",
      headers: getAdminRestHeaders(config, { Prefer: "count=exact" })
    }
  );

  if (!response.ok) {
    return { count: null, statusCode: response.status };
  }

  return { count: parseExactCount(response) };
}

function mapBusinessVisitReviewTarget(
  row: BusinessVisitReviewTargetRow
): BusinessVisitReviewTarget {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    sourceConfidence: row.source_confidence,
    status: row.status,
    priorityRank: row.priority_rank
  };
}

export async function fetchBusinessVisitReviewSnapshot(
  config: SupabaseRuntimeConfig = readSupabaseRuntimeConfig(),
  options: SupabaseHealthOptions = {}
): Promise<BusinessVisitReviewSnapshot> {
  const configStatus = getSupabaseConfigStatus(config);
  const checkedAt = (options.now?.() ?? new Date()).toISOString();

  if (!configStatus.isPublicConfigured) {
    return unavailableReviewSnapshot(
      "not_configured",
      checkedAt,
      "Supabase public environment variables are not configured. Demo review data remains active."
    );
  }

  if (!configStatus.isAdminConfigured) {
    return unavailableReviewSnapshot(
      "admin_key_missing",
      checkedAt,
      "Supabase admin key is missing. Live review metrics are disabled."
    );
  }

  const fetcher = options.fetcher ?? fetch;
  const sourceCount = await fetchExactCount(config, fetcher, "business_target_sources");

  if (sourceCount.count === null) {
    return unavailableReviewSnapshot(
      "unreachable",
      checkedAt,
      `Supabase business target source count failed with HTTP ${sourceCount.statusCode}.`,
      sourceCount.statusCode
    );
  }

  const manualReviewQueueCount = await fetchExactCount(config, fetcher, "business_targets", [
    ["source_confidence", "neq.verified"]
  ]);

  if (manualReviewQueueCount.count === null) {
    return unavailableReviewSnapshot(
      "unreachable",
      checkedAt,
      `Supabase manual review queue count failed with HTTP ${manualReviewQueueCount.statusCode}.`,
      manualReviewQueueCount.statusCode
    );
  }

  const targetsResponse = await fetcher(
    getRestEndpoint(config.url!, "business_targets", [
      ["select", "id,name,city,source_confidence,status,priority_rank"],
      ["source_confidence", "neq.verified"],
      ["order", "priority_rank.asc.nullslast"],
      ["order", "name.asc"],
      ["limit", "6"]
    ]),
    {
      method: "GET",
      headers: getAdminRestHeaders(config)
    }
  );

  if (!targetsResponse.ok) {
    return unavailableReviewSnapshot(
      "unreachable",
      checkedAt,
      `Supabase targets awaiting verification query failed with HTTP ${targetsResponse.status}.`,
      targetsResponse.status
    );
  }

  const targets = (await targetsResponse.json()) as BusinessVisitReviewTargetRow[];

  return {
    status: "ready",
    source: "supabase",
    businessTargetSourceCount: sourceCount.count,
    manualReviewQueueCount: manualReviewQueueCount.count,
    targetsAwaitingVerification: targets.map(mapBusinessVisitReviewTarget),
    checkedAt,
    message: "Supabase business visit review data loaded."
  };
}

export async function checkSupabaseHealth(
  config: SupabaseRuntimeConfig = readSupabaseRuntimeConfig(),
  options: SupabaseHealthOptions = {}
): Promise<SupabaseHealth> {
  const configStatus = getSupabaseConfigStatus(config);
  const checkedAt = (options.now?.() ?? new Date()).toISOString();

  if (!configStatus.isPublicConfigured) {
    return makeHealthResult({
      status: "not_configured",
      databaseReachable: false,
      configStatus,
      standardVersion: null,
      demoSeedStatus: "not_checked",
      checkedAt,
      message: "Supabase public environment variables are not configured. Demo data remains active."
    });
  }

  if (!configStatus.isAdminConfigured) {
    return makeHealthResult({
      status: "admin_key_missing",
      databaseReachable: false,
      configStatus,
      standardVersion: null,
      demoSeedStatus: "not_checked",
      checkedAt,
      message:
        "Supabase public config is present, but the server-only service role key is missing. Admin health checks are disabled."
    });
  }

  const fetcher = options.fetcher ?? fetch;
  const response = await fetcher(getHealthEndpoint(config.url!), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${config.serviceRoleKey}`,
      apikey: config.serviceRoleKey!
    }
  });

  if (!response.ok) {
    return makeHealthResult({
      status: "unreachable",
      databaseReachable: false,
      configStatus,
      standardVersion: null,
      demoSeedStatus: "not_checked",
      checkedAt,
      statusCode: response.status,
      message: `Supabase REST health query failed with HTTP ${response.status}.`
    });
  }

  const rows = (await response.json()) as BusinessVisitStandardHealthRow[];
  const standard = rows.find((row) => row.id === businessVisitDataStandardId);

  if (!standard) {
    return makeHealthResult({
      status: "seed_missing",
      databaseReachable: true,
      configStatus,
      standardVersion: null,
      demoSeedStatus: "missing",
      checkedAt,
      message: "Supabase is reachable, but the demo business visit data standard seed is missing."
    });
  }

  return makeHealthResult({
    status: "ready",
    databaseReachable: true,
    configStatus,
    standardVersion: standard.version,
    demoSeedStatus: "present",
    checkedAt,
    message: "Supabase is configured and the business visit data standard seed is present."
  });
}
