import { expect, test } from "@playwright/test";

// Team note sync — local-first honesty. Local/CI has no Supabase env, so the
// UI must show the local-only state, keep the full offline note flow working,
// and expose no sync controls. The signed-in push/pull path is covered by
// unit tests (team-notes-sync.test.ts) and verified against production RLS.

test.describe("team notes sync (local-only environment)", () => {
  test("shows local-only state with no sync controls and working local notes", async ({ page }) => {
    await page.goto("/notes");

    // Honest state: tier not configured locally → Local only, no sync button,
    // no sign-in prompt, and the local-only footer copy.
    await expect(page.getByText("Local only")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sync now" })).toHaveCount(0);
    await expect(page.getByText("Sign in to sync")).toHaveCount(0);
    await expect(page.getByText("Saved only in this browser.")).toBeVisible();

    // Local capture still fully works and notes are labeled Local.
    await page.getByRole("button", { name: "Meeting note" }).click();
    await page.getByPlaceholder("Company / person met").fill("Synceres · pilot scope");
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page.getByText("Synceres · pilot scope")).toBeVisible();
    await expect(page.getByText("Local", { exact: true })).toBeVisible();

    // Survives reload; still deletable — nothing was uploaded anywhere.
    await page.reload();
    await expect(page.getByText("Synceres · pilot scope")).toBeVisible();
    await page.getByRole("button", { name: "Delete Synceres · pilot scope" }).click();
    await expect(page.getByText("Synceres · pilot scope")).toHaveCount(0);
  });

  test("privacy: no supabase content or tokens in the served /notes HTML", async ({ request }) => {
    const response = await request.get("/notes");
    const html = await response.text();
    // Server-rendered HTML must not embed team note content or auth tokens.
    expect(html).not.toMatch(/team_notes|access_token|refresh_token/);
  });
});
