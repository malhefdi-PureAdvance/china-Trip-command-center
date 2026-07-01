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
