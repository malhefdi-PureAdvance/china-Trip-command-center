/* China 2026 Command Center — offline shell service worker.
 *
 * Conservative by design:
 * - Same-origin GET requests only. All app content is public, demo-safe data;
 *   nothing private or credentialed is ever cached (none exists client-side).
 * - /admin is network-only so Supabase readiness is never shown stale.
 * - Navigations are network-first (fresh when online), falling back to the
 *   last cached copy, then to /offline.
 * - Hashed build assets (/_next/static) and icons are cache-first (immutable).
 * - Bump CACHE_VERSION to invalidate everything on the next deploy.
 */
const CACHE_VERSION = "pa-cc-v3";
// Auth/private/admin surfaces are NEVER intercepted or cached: they may carry
// per-user or live-status content and must always hit the network.
const NETWORK_ONLY_PREFIXES = ["/admin", "/private", "/auth"];
const OFFLINE_URL = "/offline";
const PRECACHE_URLS = [
  OFFLINE_URL,
  "/today",
  "/itinerary",
  "/business-targets",
  "/map",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

function cacheable(response) {
  return response && response.ok && (response.type === "basic" || response.type === "default");
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Authenticated requests are never intercepted or cached — defense in depth
  // for any future same-origin API carrying a bearer token.
  if (request.headers.has("authorization")) return;
  // Never intercept auth/private/admin surfaces or the worker itself.
  if (NETWORK_ONLY_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) return;
  if (url.pathname === "/sw.js") return;

  // Navigations: network-first → cached page → offline shell.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (cacheable(response)) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() =>
          caches
            .match(request, { ignoreSearch: true })
            .then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  // Immutable build assets + icons: cache-first.
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/")) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (cacheable(response)) {
              const copy = response.clone();
              caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
            }
            return response;
          })
      )
    );
    return;
  }

  // Everything else same-origin (RSC payloads, images): network-first with
  // cache fallback so client-side navigation keeps working offline.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (cacheable(response)) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request, { ignoreSearch: false }))
  );
});
