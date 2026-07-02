import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Browser Supabase client for Tier-2 features. The env references below are
// LITERAL so Next.js inlines them into the client bundle at build time —
// dynamic access (env[key]) would not inline and would break in the browser.
// Only PUBLIC values are ever referenced here; the service-role key has no
// NEXT_PUBLIC_ prefix and can never reach this bundle.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const flag = process.env.NEXT_PUBLIC_PRIVATE_TIER_ENABLED;

const placeholders = new Set(["https://example.supabase.co", "public-anon-placeholder"]);

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return !trimmed || placeholders.has(trimmed) ? undefined : trimmed;
}

/** True only when Supabase public env is present AND the tier flag is "true". */
export function isPrivateTierEnabled(): boolean {
  return Boolean(clean(url) && clean(anonKey)) && flag === "true";
}

let client: SupabaseClient | null | undefined;

/**
 * Shared singleton so /private (auth panel) and /notes (sync) reuse ONE
 * session store and one token-refresh loop. Returns null when the tier is
 * disabled/unconfigured or when running server-side — callers degrade to the
 * local-only experience.
 */
export function getBrowserSupabase(): SupabaseClient | null {
  if (typeof window === "undefined") return null;
  if (client !== undefined) return client;

  client = isPrivateTierEnabled()
    ? createClient(clean(url)!, clean(anonKey)!, {
        auth: { autoRefreshToken: true, persistSession: true }
      })
    : null;

  return client;
}
