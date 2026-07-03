import { expect, test } from "@playwright/test";

// PR A scope: the readiness cockpit, pack install into IndexedDB, and the
// privacy notices. True airplane-mode navigation tests arrive with the
// service-worker pack caching PR (the dev server runs without the worker —
// registration is production-only by design).

test.describe("offline flight pack readiness", () => {
  test("serves the app-safe pack artifact", async ({ request }) => {
    const response = await request.get("/offline-pack/china-2026.v1.json");
    expect(response.ok()).toBe(true);
    const pack = await response.json();
    expect(pack.manifest.packId).toBe("china-2026");
    expect(pack.manifest.dataTier).toBe("tier1-public-safe");
    expect(pack.manifest.excludedRoutes).toEqual(["/admin", "/private", "/auth"]);
    const scannable = JSON.stringify({ ...pack, manifest: undefined, privacy: undefined });
    expect(scannable).not.toMatch(
      /(passport|\bpnr\b|booking\s?ref|ticket\s?number|barcode|qr\s?payload|service_role|\bsecret\b|\btoken\b|private calendar)/i
    );
  });

  test("installs, verifies, and clears the flight pack", async ({ page }) => {
    await page.goto("/flight-pack");
    await expect(page.getByRole("heading", { name: "Ready for flight?" })).toBeVisible();

    // Network-only surfaces are explicitly marked before anything installs.
    await expect(page.getByText("Admin data review")).toBeVisible();
    await expect(page.getByText("Network required").first()).toBeVisible();
    await expect(page.getByText("Private tier")).toBeVisible();

    // The pack-data checklist row is state-dependent: it must flip through
    // Not installed -> Installed -> Not installed across the flow.
    const packRow = page.locator("li").filter({ hasText: "Flight pack data installed" });
    await expect(packRow.getByText("Not installed")).toBeVisible();

    await page.getByRole("button", { name: /prepare for flight/i }).click();
    await expect(page.getByText(/Flight pack installed/i).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /update flight pack/i })).toBeVisible();
    await expect(packRow.getByText("Installed", { exact: true })).toBeVisible();
    await expect(
      page
        .locator("li")
        .filter({ hasText: "Offline search index installed" })
        .getByText(/documents/)
    ).toBeVisible();

    // Status survives a reload — it is read back from IndexedDB.
    await page.reload();
    await expect(page.getByText(/Flight pack installed/i).first()).toBeVisible();

    await page.getByRole("button", { name: /verify offline readiness/i }).click();
    await expect(packRow.getByText("Installed", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: /clear offline pack/i }).click();
    await expect(page.getByText(/Offline pack cleared/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /prepare for flight/i })).toBeVisible();
    await expect(packRow.getByText("Not installed")).toBeVisible();
  });

  test("explains that offline is not private", async ({ page }) => {
    await page.goto("/flight-pack");
    await expect(page.getByText("Offline is not private")).toBeVisible();
    await expect(page.getByText(/never enter the pack/i)).toBeVisible();
  });

  test("offline fallback page links to the flight pack", async ({ page }) => {
    await page.goto("/offline");
    await expect(page.locator('a[href="/flight-pack"]').first()).toBeVisible();
  });
});
