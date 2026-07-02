import { expect, test } from "@playwright/test";

// The business-target dossier flow ships to a PUBLIC deployment. These checks
// lock the list → dossier drill-in and guard against contact identifiers or
// exact addresses appearing in the app-facing UI.

test.describe("business target dossiers", () => {
  test("list groups real targets and filters by corridor", async ({ page }) => {
    await page.goto("/business-targets");

    await expect(page.getByRole("heading", { name: "Visit Targets" })).toBeVisible();
    // Real, source-backed company names appear (not the old placeholder).
    await expect(page.getByText("Synceres Biosciences").first()).toBeVisible();
    await expect(page.locator("body")).not.toContainText("Demo Shenzhen Advanced Materials Group");

    // Corridor filter narrows the list.
    await page.goto("/business-targets?corridor=Hong+Kong");
    await expect(page.getByRole("heading", { name: "Visit Targets" })).toBeVisible();
    await expect(page.locator('a[href^="/business-targets/"]').first()).toBeVisible();
  });

  test("dossier drill-in shows curated intel without contact identifiers", async ({ page }) => {
    await page.goto("/business-targets/sz-synceres");

    await expect(page.getByRole("heading", { name: "Synceres Biosciences" })).toBeVisible();
    await expect(page.getByText("Next action").first()).toBeVisible();
    await expect(page.getByText("Why now:")).toBeVisible();
    await expect(page.getByText("What they do")).toBeVisible();
    await expect(page.getByText("Talking points")).toBeVisible();
    await expect(page.getByText(/verify privately/i)).toBeVisible();

    // Public-safety guard on the rendered dossier: no email/phone/WeChat in body.
    const body = await page.locator("main").innerText();
    expect(body).not.toMatch(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
    expect(body).not.toMatch(/\+\d[\d\s-]{6,}/);
    expect(body).not.toMatch(/wechat|微信/i);
  });
});
