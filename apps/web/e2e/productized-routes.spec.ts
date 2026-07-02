import { expect, test } from "@playwright/test";

test.describe("corridor map intelligence", () => {
  test("shows bases, target clusters, and China-first navigation", async ({ page }) => {
    await page.goto("/map");

    await expect(
      page.getByRole("heading", { name: "Hong Kong ↔ Shenzhen Corridor" })
    ).toBeVisible();
    await expect(page.getByText("The Hari Hong Kong")).toBeVisible();
    await expect(page.getByText("Ascott Raffles City Shenzhen").first()).toBeVisible();
    await expect(page.getByText("Target clusters")).toBeVisible();
    await expect(page.getByText("China-first navigation")).toBeVisible();

    // Cluster cards deep-link into the filtered target list.
    const clusterLink = page.locator('a[href*="/business-targets?corridor="]').first();
    await expect(clusterLink).toBeVisible();
    await clusterLink.click();
    await expect(page.getByRole("heading", { name: "Visit Targets" })).toBeVisible();
  });
});

test.describe("notes field capture", () => {
  test("saves, persists, and deletes a local-only note", async ({ page }) => {
    await page.goto("/notes");

    await expect(page.getByRole("heading", { name: "Notes & Field Capture" })).toBeVisible();
    await expect(page.getByText("Saved only in this browser.")).toBeVisible();

    await page.getByRole("button", { name: "Daily debrief" }).click();
    await page.getByPlaceholder("Day (e.g. Jul 8 · LEAP East)").fill("Jul 8 · LEAP East D1");
    await page.getByRole("button", { name: "Save note" }).click();

    await expect(page.getByText("Jul 8 · LEAP East D1")).toBeVisible();

    // Survives a reload (localStorage-backed).
    await page.reload();
    await expect(page.getByText("Jul 8 · LEAP East D1")).toBeVisible();

    await page.getByRole("button", { name: "Delete Jul 8 · LEAP East D1" }).click();
    await expect(page.getByText("Jul 8 · LEAP East D1")).toHaveCount(0);
  });
});

test.describe("team roster", () => {
  test("separates the Pure Advance team from program representatives", async ({ page }) => {
    await page.goto("/team");

    await expect(page.getByRole("heading", { name: "Mission Team" })).toBeVisible();
    await expect(page.getByText("Pure Advance team")).toBeVisible();
    await expect(page.getByText("Abdulrahman Alalmaee")).toBeVisible();

    // The program rep renders under the separate Program section.
    const programSection = page.locator('section[aria-label="Program"]');
    await expect(programSection.getByText("Abdulrahman AlMansour")).toBeVisible();
    await expect(programSection.getByText("Tech Founders / Multiverse").first()).toBeVisible();
  });
});

test.describe("admin hydration cockpit", () => {
  test("reports hydration counts, sources, and the privacy guard", async ({ page }) => {
    await page.goto("/admin/data-review");

    await expect(page.getByText("Hydration", { exact: true })).toBeVisible();
    await expect(page.getByText("Visit dossiers")).toBeVisible();
    await expect(page.getByText("business/dossiers/*.md")).toBeVisible();
    await expect(page.getByText("Privacy guard", { exact: true })).toBeVisible();
    await expect(page.getByText("No PII")).toBeVisible();
  });
});
