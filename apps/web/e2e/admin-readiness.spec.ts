import { expect, test } from "@playwright/test";

// The admin page must communicate activation readiness WITHOUT claiming
// Supabase is live (no env is configured in CI/preview/prod today).

test.describe("admin activation readiness", () => {
  test("shows readiness in demo mode and never claims live", async ({ page }) => {
    await page.goto("/admin/data-review");

    const section = page.locator('section[aria-label="Activation readiness"]');
    await expect(section.getByText("Activation readiness")).toBeVisible();
    await expect(section.getByText(/Not activated · running on public demo data/)).toBeVisible();

    // Env vars Mohammed must provide are surfaced in the readiness section.
    await expect(section.getByText(/Mohammed to set in Vercel/)).toBeVisible();
    await expect(section.getByText(/NEXT_PUBLIC_SUPABASE_URL/).first()).toBeVisible();

    // Private-tier warning present; page never says Supabase is live/connected.
    await expect(section.getByText(/requires authentication first/)).toBeVisible();
    await expect(page.locator("body")).not.toContainText("Supabase connected and seeded");

    // Corridor guard + no April regression on this route.
    const body = page.locator("body");
    await expect(body).toContainText("Hong Kong");
    await expect(body).toContainText("Shenzhen");
    await expect(body).not.toContainText("April");
  });
});
