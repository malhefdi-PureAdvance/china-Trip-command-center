import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: "China 2026 Demo Mission" },
  { path: "/today", heading: "China 2026 Demo Mission" },
  { path: "/itinerary", heading: "Mission Schedule" },
  { path: "/map", heading: "Hong Kong <-> Shenzhen Corridor" },
  { path: "/business-targets", heading: "Visit Pipeline" },
  { path: "/notes", heading: "Team Notes" },
  { path: "/team", heading: "Mission Team" },
  { path: "/admin/data-review", heading: "Data Review" }
];

test.describe("command center smoke", () => {
  for (const route of routes) {
    test(`${route.path} renders`, async ({ page }) => {
      await page.goto(route.path);

      await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
      await expect(page.locator("body")).toContainText("Hong Kong");
      await expect(page.locator("body")).toContainText("Shenzhen");

      if (route.path === "/admin/data-review") {
        await expect(page.getByText("Supabase config")).toBeVisible();
        await expect(page.getByText("Not configured", { exact: true })).toBeVisible();
        await expect(page.getByText("RLS policy mode")).toBeVisible();
        await expect(page.getByText("Ingestion dry-run")).toBeVisible();
        await expect(page.getByText("Dry-run corrections needed")).toBeVisible();
        await expect(page.getByText("Dry-run accepted")).toBeVisible();
        await expect(page.getByRole("heading", { name: "Database writes" })).toBeVisible();
      }
    });
  }
});
