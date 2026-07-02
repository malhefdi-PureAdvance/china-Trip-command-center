import { expect, test } from "@playwright/test";

// PWA artifacts: manifest, icons, offline shell, service worker file, and the
// iOS metadata that makes home-screen install sensible. The worker itself only
// registers in production builds, so here we verify the artifacts and wiring.

test.describe("pwa artifacts", () => {
  test("serves a valid web app manifest", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    expect(response.ok()).toBe(true);

    const manifest = await response.json();
    expect(manifest.name).toBe("China 2026 Command Center");
    expect(manifest.start_url).toBe("/today");
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons.length).toBeGreaterThanOrEqual(3);
    // No private data belongs in the manifest.
    const text = JSON.stringify(manifest);
    expect(text).not.toMatch(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  });

  test("serves the service worker and icons", async ({ request }) => {
    const sw = await request.get("/sw.js");
    expect(sw.ok()).toBe(true);
    const body = await sw.text();
    expect(body).toContain("CACHE_VERSION");
    expect(body).toContain("/offline");
    // Auth/private/admin surfaces are never intercepted or cached.
    expect(body).toContain('NETWORK_ONLY_PREFIXES = ["/admin", "/private", "/auth"]');
    // Authenticated (bearer-token) requests are never intercepted or cached.
    expect(body).toContain('request.headers.has("authorization")');
    // Private routes must never be precached: inspect the precache list itself.
    const precacheList = body.match(/const PRECACHE_URLS = \[[^\]]*\]/s)?.[0] ?? "";
    expect(precacheList.length).toBeGreaterThan(0);
    expect(precacheList).not.toMatch(/\/(private|auth|admin)/);

    for (const icon of [
      "/icons/icon-192.png",
      "/icons/icon-512.png",
      "/icons/icon-512-maskable.png",
      "/icons/apple-touch-icon.png"
    ]) {
      const response = await request.get(icon);
      expect(response.ok(), icon).toBe(true);
      expect(response.headers()["content-type"], icon).toContain("image/png");
    }
  });

  test("wires manifest + iOS metadata into the document head", async ({ page }) => {
    await page.goto("/today");

    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
      "href",
      "/manifest.webmanifest"
    );
    await expect(page.locator('meta[name="apple-mobile-web-app-title"]')).toHaveAttribute(
      "content",
      "China 2026"
    );
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
      "href",
      "/icons/apple-touch-icon.png"
    );
  });

  test("offline fallback page renders the cached-shell links", async ({ page }) => {
    await page.goto("/offline");

    await expect(page.getByRole("heading", { name: "No connection" })).toBeVisible();
    await expect(page.getByText("Pages you have visited are cached on this device.")).toBeVisible();
    await expect(page.locator('a[href="/itinerary"]').first()).toBeVisible();
  });
});
