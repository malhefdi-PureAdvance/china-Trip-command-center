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

test.describe("Pure Advance theme foundation", () => {
  test("resolves dark and light Pure Advance tokens", async ({ page }) => {
    await page.goto("/");

    await setTheme(page, "light");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "light");
    await expect(page.getByRole("button", { name: "Light theme" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    const lightTokens = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return {
        theme: styles.getPropertyValue("--pa-theme").trim(),
        background: styles.getPropertyValue("--pa-background").trim(),
        foreground: styles.getPropertyValue("--pa-foreground").trim(),
        primary: styles.getPropertyValue("--pa-primary").trim(),
        surface: styles.getPropertyValue("--pa-surface").trim()
      };
    });

    expect(lightTokens).toMatchObject({
      theme: "light",
      background: "#faf7ff",
      foreground: "#140126",
      primary: "#7a36d9",
      surface: "#fff"
    });

    await setTheme(page, "dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "dark");

    const darkTokens = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return {
        theme: styles.getPropertyValue("--pa-theme").trim(),
        background: styles.getPropertyValue("--pa-background").trim(),
        foreground: styles.getPropertyValue("--pa-foreground").trim(),
        primary: styles.getPropertyValue("--pa-primary").trim(),
        surface: styles.getPropertyValue("--pa-surface").trim()
      };
    });

    expect(darkTokens).toMatchObject({
      theme: "dark",
      background: "#0b0612",
      foreground: "#fbf7ff",
      primary: "#8c37e0",
      surface: "#150a21"
    });
  });

  test("system preference is explicit and resolves to a concrete theme", async ({ page }) => {
    await page.goto("/");
    await setTheme(page, "system");

    await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "system");
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
