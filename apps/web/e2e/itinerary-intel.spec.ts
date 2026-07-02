import { expect, test } from "@playwright/test";

// Itinerary ↔ dossier intelligence: Week-1 sub-sessions render on the
// timeline, schedule items deep-link into source-grounded target dossiers,
// and the targets search narrows the list.

test.describe("itinerary intelligence", () => {
  test("timeline shows Week 1 sub-sessions and dossier links", async ({ page }) => {
    await page.goto("/itinerary");

    // Sub-sessions from the Week 1 plan (program facts).
    await expect(page.getByText("Rocket Fuel East · semi-finals round 1")).toBeVisible();
    await expect(page.getByText("Science Park tour · showcase & Q&A")).toBeVisible();
    // The corrected transition: border move on Jul 12, free day Jul 11.
    await expect(page.getByText("Free day · Kowloon & Bruce Lee trail")).toBeVisible();

    // The Science Park day links to Science Park dossiers.
    const insilicoChip = page.locator('a[href="/business-targets/hk-insilico-medicine"]').first();
    await expect(insilicoChip).toBeVisible();
    await insilicoChip.click();
    await expect(page.getByRole("heading", { name: "Insilico Medicine" })).toBeVisible();
    // Visit-window hint carries the LEAP East block rule.
    await expect(page.getByText(/avoid Jul 8–10/i)).toBeVisible();
  });

  test("today surfaces prep dossiers for the next linked event", async ({ page }) => {
    await page.goto("/today");

    await expect(page.getByText(/^Prep · /)).toBeVisible();
    await expect(page.locator('a[href^="/business-targets/"]').first()).toBeVisible();
  });

  test("targets search narrows the list", async ({ page }) => {
    await page.goto("/business-targets");

    const search = page.getByLabel("Search targets");
    await search.fill("Synceres");
    await expect(page).toHaveURL(/q=Synceres/);
    await expect(page.getByText("Synceres Biosciences").first()).toBeVisible();
    await expect(page.getByText("Insilico Medicine")).toHaveCount(0);

    // Clearing restores the full list.
    await page.getByLabel("Clear search").click();
    await expect(page).not.toHaveURL(/q=/);
    await expect(page.getByText("Insilico Medicine").first()).toBeVisible();
  });
});
