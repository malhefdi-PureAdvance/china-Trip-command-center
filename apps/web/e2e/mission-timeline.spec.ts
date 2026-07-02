import { expect, test } from "@playwright/test";

// Locks the app-facing schedule to the real sanitized Jul–Aug 2026 anchors and
// guards against regressing to the old April placeholder scaffold.

test.describe("real mission timeline", () => {
  test("Today leads with the live mission clock and the real trip", async ({ page }) => {
    await page.goto("/today");

    await expect(page.getByRole("heading", { name: "China 2026 · Tech Founders" })).toBeVisible();
    await expect(page.getByRole("region", { name: "Mission clock" })).toBeVisible();
    await expect(page.getByText("Up next")).toBeVisible();

    const body = page.locator("body");
    await expect(body).not.toContainText("April");
    await expect(body).not.toContainText("2026-04");
  });

  test("Itinerary shows the real program spine (LEAP East → Demo Day)", async ({ page }) => {
    await page.goto("/itinerary");

    await expect(page.getByRole("heading", { name: "Mission Timeline" })).toBeVisible();
    // These labels intentionally appear in both the week strip and the timeline
    // rail, so assert the first match rather than a unique element.
    await expect(page.getByText("Go Global from GBA").first()).toBeVisible();
    await expect(page.getByText(/LEAP East at HKCEC/).first()).toBeVisible();
    await expect(page.getByText(/Demo Day/).first()).toBeVisible();

    const body = page.locator("body");
    await expect(body).toContainText("Hong Kong");
    await expect(body).toContainText("Shenzhen");
    await expect(body).not.toContainText("April");
    await expect(body).not.toContainText("2026-04");
  });
});
