"use client";

import { useEffect } from "react";

/**
 * Registers the offline-shell service worker. Production-only so local dev
 * and e2e runs are never served stale content from a worker cache.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Registration failure just means no offline shell — never block the app.
    });
  }, []);

  return null;
}
