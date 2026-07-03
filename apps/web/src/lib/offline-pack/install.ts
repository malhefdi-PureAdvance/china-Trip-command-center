import {
  FORBIDDEN_OFFLINE_ROUTES,
  OFFLINE_PACK_ARTIFACT_URL,
  OFFLINE_PACK_ID,
  OFFLINE_PACK_SCHEMA_VERSION,
  OFFLINE_PACK_STALE_HOURS,
  type OfflineFlightPack,
  type OfflinePackManifest
} from "./schema";
import { clearAllStores, isIndexedDbSupported, openPackDb, readKey, replaceStores } from "./idb";

/**
 * User-triggered install of the app-safe flight pack into IndexedDB, plus a
 * best-effort warm of the service-worker runtime cache for the public routes.
 * See flight-pack-policy.md — nothing here touches admin/private/auth.
 */

export type OfflinePackStatusState =
  "not-installed" | "installed" | "stale" | "error" | "unsupported";

export interface OfflinePackStatus {
  state: OfflinePackStatusState;
  packVersion?: string;
  generatedAt?: string;
  staleAfter?: string;
  installedAt?: string;
  documentCount?: number;
  message?: string;
}

export interface InstallResult {
  ok: boolean;
  status: OfflinePackStatus;
  warmedRoutes?: number;
}

interface PackMetaRecord {
  key: "manifest";
  manifest: OfflinePackManifest;
  installedAt: string;
  documentCount: number;
}

/** Pure shape validation for a fetched pack — exported for unit tests. */
export function validatePackShape(candidate: unknown): candidate is OfflineFlightPack {
  if (typeof candidate !== "object" || candidate === null) return false;
  const pack = candidate as OfflineFlightPack;
  return (
    pack.manifest?.packId === OFFLINE_PACK_ID &&
    pack.manifest.schemaVersion === OFFLINE_PACK_SCHEMA_VERSION &&
    pack.manifest.dataTier === "tier1-public-safe" &&
    Array.isArray(pack.manifest.includedRoutes) &&
    pack.manifest.includedRoutes.every((route) => typeof route === "string") &&
    Array.isArray(pack.readiness) &&
    Array.isArray(pack.briefing) &&
    Array.isArray(pack.searchDocuments) &&
    typeof pack.exports?.markdown === "string"
  );
}

/** Pure status derivation — exported for unit tests. Staleness is measured
 *  from the INSTALL time, not the artifact's generation time: the artifact is
 *  static per deploy, so "update flight pack" must always be able to clear a
 *  stale state by refetching (and picking up any newer deploy). */
export function deriveStatus(
  meta: PackMetaRecord | undefined,
  now: Date = new Date()
): OfflinePackStatus {
  if (!meta) return { state: "not-installed" };
  const staleAfterMs =
    new Date(meta.installedAt).getTime() + OFFLINE_PACK_STALE_HOURS * 60 * 60 * 1000;
  const stale = now.getTime() > staleAfterMs;
  return {
    state: stale ? "stale" : "installed",
    packVersion: meta.manifest.packVersion,
    generatedAt: meta.manifest.generatedAt,
    staleAfter: new Date(staleAfterMs).toISOString(),
    installedAt: meta.installedAt,
    documentCount: meta.documentCount,
    ...(stale
      ? {
          message:
            "Your copy is older than 72 hours — update it while you have a connection to pick up the latest deploy."
        }
      : {})
  };
}

/** Only same-origin public paths from the pack's own allowlist are ever
 *  warmed — exported for unit tests. Rejects protocol-relative ("//host"),
 *  backslash, and scheme-bearing values so a tampered manifest can never
 *  steer the hidden iframe off-origin. */
export function warmableUrls(manifest: OfflinePackManifest): string[] {
  return [...manifest.includedRoutes, OFFLINE_PACK_ARTIFACT_URL].filter(
    (route) =>
      typeof route === "string" &&
      /^\/(?!\/)/.test(route) &&
      !route.includes("\\") &&
      !route.includes(":") &&
      !FORBIDDEN_OFFLINE_ROUTES.some((forbidden) => route.startsWith(forbidden))
  );
}

function serviceWorkerControls(): boolean {
  return typeof navigator !== "undefined" && Boolean(navigator.serviceWorker?.controller);
}

/** Fully load a route in a hidden same-origin iframe so the controlling
 *  service worker runtime-caches the page AND its script/style subresources.
 *  Caching only the HTML is not enough: offline hydration would crash on the
 *  missing chunks and React would unmount the perfectly good SSR content. */
function warmRouteViaIframe(route: string, timeoutMs = 8000): Promise<boolean> {
  return new Promise((resolve) => {
    const iframe = document.createElement("iframe");
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      // Give the frame a beat to fetch late chunks before tearing it down.
      window.setTimeout(() => iframe.remove(), 1500);
      resolve(ok);
    };
    const timer = window.setTimeout(() => finish(false), timeoutMs);
    iframe.hidden = true;
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.addEventListener("load", () => finish(true));
    iframe.addEventListener("error", () => finish(false));
    iframe.src = route;
    document.body.append(iframe);
  });
}

/** Best-effort: loading each public route lets the active service worker
 *  runtime-cache it (network-first handler). Warming only makes sense when a
 *  worker actually controls the page — without one (dev, first visit before
 *  activation) nothing caches, so skip entirely. */
async function warmRouteCache(manifest: OfflinePackManifest): Promise<number> {
  if (!serviceWorkerControls()) return 0;

  let warmed = 0;
  for (const url of warmableUrls(manifest)) {
    if (url.endsWith(".json")) {
      // Data artifacts have no subresources — a drained fetch is enough.
      try {
        const response = await fetch(url, { method: "GET" });
        if (response.ok) {
          await response.arrayBuffer();
          warmed += 1;
        }
      } catch {
        // Offline or missing — the readiness check will surface it.
      }
      continue;
    }
    if (typeof document === "undefined") continue;
    if (await warmRouteViaIframe(url)) warmed += 1;
  }
  return warmed;
}

export async function installOfflinePack(
  packUrl: string = OFFLINE_PACK_ARTIFACT_URL
): Promise<InstallResult> {
  if (!isIndexedDbSupported()) {
    return {
      ok: false,
      status: {
        state: "unsupported",
        message: "This browser does not support offline storage (IndexedDB)."
      }
    };
  }

  try {
    const response = await fetch(packUrl, { cache: "no-store" });
    if (!response.ok) {
      return {
        ok: false,
        status: {
          state: "error",
          message: `Could not download the flight pack (HTTP ${response.status}). Check your connection and try again.`
        }
      };
    }
    const candidate: unknown = await response.json();
    if (!validatePackShape(candidate)) {
      return {
        ok: false,
        status: {
          state: "error",
          message: "Downloaded pack does not match the expected app-safe format."
        }
      };
    }

    const pack = candidate;
    const installedAt = new Date().toISOString();
    const meta: PackMetaRecord = {
      key: "manifest",
      manifest: pack.manifest,
      installedAt,
      documentCount: pack.searchDocuments.length
    };

    const db = await openPackDb();
    try {
      await replaceStores(db, {
        meta: [meta],
        documents: pack.briefing.map((section) => ({ ...section, id: `briefing-${section.id}` })),
        searchIndex: pack.searchDocuments,
        exports: [{ kind: "markdown", content: pack.exports.markdown }],
        readiness: pack.readiness
      });
    } finally {
      db.close();
    }

    const warmedRoutes = await warmRouteCache(pack.manifest);
    return { ok: true, status: deriveStatus(meta), warmedRoutes };
  } catch (error) {
    return {
      ok: false,
      status: {
        state: "error",
        message:
          error instanceof Error && error.name === "QuotaExceededError"
            ? "Could not save the pack — storage is full or private browsing is blocking it."
            : "Could not save the pack. Check storage/private browsing and try again."
      }
    };
  }
}

export async function getOfflinePackStatus(now: Date = new Date()): Promise<OfflinePackStatus> {
  if (!isIndexedDbSupported()) {
    return { state: "unsupported", message: "Offline storage is not supported here." };
  }
  try {
    const db = await openPackDb();
    try {
      const meta = await readKey<PackMetaRecord>(db, "meta", "manifest");
      return deriveStatus(meta, now);
    } finally {
      db.close();
    }
  } catch {
    return { state: "error", message: "Could not read offline storage." };
  }
}

export async function clearOfflinePack(): Promise<void> {
  if (!isIndexedDbSupported()) return;
  const db = await openPackDb();
  try {
    await clearAllStores(db);
  } finally {
    db.close();
  }
}

export interface RouteCacheCheck {
  route: string;
  cached: boolean;
}

export interface OfflineReadinessReport {
  supported: boolean;
  serviceWorkerActive: boolean;
  routes: RouteCacheCheck[];
}

/** Reads Cache Storage directly (page context) to report which public routes
 *  would survive airplane mode. Dev/e2e run without the production worker, so
 *  `supported` distinguishes "not cached" from "cannot cache here". */
export async function verifyOfflineReadiness(
  routes: readonly string[]
): Promise<OfflineReadinessReport> {
  const cachesSupported = typeof caches !== "undefined";
  const serviceWorkerActive =
    typeof navigator !== "undefined" && Boolean(navigator.serviceWorker?.controller);

  if (!cachesSupported) {
    return {
      supported: false,
      serviceWorkerActive,
      routes: routes.map((route) => ({ route, cached: false }))
    };
  }

  const checks: RouteCacheCheck[] = [];
  for (const route of routes) {
    try {
      const match = await caches.match(route, { ignoreSearch: true });
      checks.push({ route, cached: Boolean(match) });
    } catch {
      checks.push({ route, cached: false });
    }
  }
  return { supported: true, serviceWorkerActive, routes: checks };
}
