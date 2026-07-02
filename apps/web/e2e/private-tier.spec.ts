import { expect, test } from "@playwright/test";

// The auth/private-tier shell must degrade gracefully without credentials and
// never overstate activation. Local/CI runs have no Supabase env, so the page
// must render the honest inactive state with sign-in disabled.

test.describe("private tier shell", () => {
  test("renders honestly without credentials and keeps sign-in disabled", async ({ page }) => {
    await page.goto("/private");

    await expect(page.getByRole("heading", { name: "Private Tier" })).toBeVisible();
    // Local: not configured. Production: ready-inactive. Both are honest;
    // neither claims verification.
    await expect(page.getByText(/(Not configured|Ready · inactive)/).first()).toBeVisible();
    await expect(page.getByText("Sign-in is disabled.")).toBeVisible();
    // No interactive sign-in form in the disabled states.
    await expect(page.locator("#auth-email")).toHaveCount(0);

    // Role model documented; fail-closed language present.
    await expect(page.getByText("program_viewer")).toBeVisible();
    await expect(page.getByText(/fail-closed/i).first()).toBeVisible();

    // Tier-3 exclusions stated on-page.
    await expect(page.getByText(/never enter this\s+app/).first()).toBeVisible();
  });

  test("admin readiness reports the auth shell without overstating", async ({ page }) => {
    await page.goto("/admin/data-review");

    const section = page.locator('section[aria-label="Activation readiness"]');
    await expect(section.getByText("Auth shell")).toBeVisible();
    await expect(section.getByText("Private tier", { exact: true })).toBeVisible();
    // Never claims a verified/active private tier.
    await expect(page.locator("body")).not.toContainText("Private tier verified");
    await expect(page.locator("body")).not.toContainText("Private tier active");
  });
});
