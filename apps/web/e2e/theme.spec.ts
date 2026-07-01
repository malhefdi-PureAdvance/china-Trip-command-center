import { expect, test, type Page } from "@playwright/test";

declare global {
  interface Window {
    __setTheme?: (theme: "light" | "dark" | "system") => void;
  }
}

async function setTheme(page: Page, theme: "light" | "dark" | "system") {
  await page.waitForFunction(() => typeof window.__setTheme === "function");
  await page.evaluate((nextTheme) => window.__setTheme?.(nextTheme), theme);
}

test.describe("Pure Advance command-center design-system port", () => {
  test("resolves source handoff dark and light tokens", async ({ page }) => {
    await page.goto("/");

    await setTheme(page, "light");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("body")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "light");
    await expect(page.getByRole("button", { name: "Light theme" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    const lightTokens = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return {
        theme: styles.getPropertyValue("--cc-theme").trim(),
        bg: styles.getPropertyValue("--cc-bg").trim(),
        text: styles.getPropertyValue("--cc-text").trim(),
        body: styles.getPropertyValue("--cc-text-2").trim(),
        primary: styles.getPropertyValue("--cc-cyan").trim(),
        purple: styles.getPropertyValue("--cc-purple").trim(),
        surface: styles.getPropertyValue("--cc-surface").trim(),
        radiusCard: styles.getPropertyValue("--cc-r-card").trim()
      };
    });

    expect(lightTokens).toMatchObject({
      theme: "light",
      bg: "#f4efe4",
      text: "#231f17",
      body: "#4b443a",
      primary: "#0b6e80",
      purple: "#7a36d9",
      surface: "#fff",
      radiusCard: "14px"
    });

    await setTheme(page, "dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "dark");

    const darkTokens = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return {
        theme: styles.getPropertyValue("--cc-theme").trim(),
        bg: styles.getPropertyValue("--cc-bg").trim(),
        text: styles.getPropertyValue("--cc-text").trim(),
        body: styles.getPropertyValue("--cc-text-2").trim(),
        primary: styles.getPropertyValue("--cc-cyan").trim(),
        purple: styles.getPropertyValue("--cc-purple").trim(),
        surface: styles.getPropertyValue("--cc-surface").trim(),
        radiusCard: styles.getPropertyValue("--cc-r-card").trim()
      };
    });

    expect(darkTokens).toMatchObject({
      theme: "dark",
      bg: "#0d1016",
      text: "#eef2f7",
      body: "#c4ccd6",
      primary: "#2dd4e8",
      purple: "#9a5cff",
      surface: "#161b23",
      radiusCard: "14px"
    });
  });

  test("system preference is explicit and resolves to a concrete theme", async ({ page }) => {
    await page.goto("/");
    await setTheme(page, "system");

    await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "system");
    await expect(page.locator("body")).toHaveAttribute("data-theme-preference", "system");
    await expect(page.locator("html")).toHaveAttribute("data-theme", /^(dark|light)$/);
    await expect(page.getByRole("button", { name: "System theme" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  test("mobile shell does not overflow and navigation remains tappable", async ({ page }) => {
    await page.setViewportSize({ width: 430, height: 932 });
    await page.goto("/");
    await setTheme(page, "light");

    const metrics = await page.evaluate(() => ({
      viewportWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth
    }));

    expect(metrics.documentScrollWidth).toBeLessThanOrEqual(metrics.viewportWidth);
    expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.viewportWidth);

    const primaryNav = page.getByRole("navigation", { name: "Primary" });

    for (const name of ["Today", "Itinerary", "Map", "Targets", "Notes", "Team", "Data Review"]) {
      const link = primaryNav.getByRole("link", { name, exact: true });
      await link.click({ trial: true });
    }
  });
});
