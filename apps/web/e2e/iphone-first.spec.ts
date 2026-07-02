import { devices, expect, test } from "@playwright/test";

const iPhone = devices["iPhone 14 Pro Max"];
const iPhoneChromium = {
  userAgent: iPhone.userAgent,
  viewport: iPhone.viewport,
  deviceScaleFactor: iPhone.deviceScaleFactor,
  isMobile: iPhone.isMobile,
  hasTouch: iPhone.hasTouch
};

const primaryTabs = ["Today", "Itinerary", "Map", "Targets", "Notes"] as const;
const secondaryLinks = ["Team", "Data Review"] as const;

test.describe("iPhone-first command center shell", () => {
  test.use(iPhoneChromium);

  test("uses a thumb-reachable bottom tab bar with only high-frequency mission actions", async ({
    page
  }) => {
    await page.goto("/");

    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    const secondaryNav = page.getByRole("navigation", { name: "Secondary" });

    await expect(primaryNav).toBeVisible();
    await expect(secondaryNav).toBeVisible();

    await expect(primaryNav.getByRole("link")).toHaveText([...primaryTabs]);

    for (const name of primaryTabs) {
      const tab = primaryNav.getByRole("link", { name, exact: true });
      const box = await tab.boundingBox();

      expect(box, `${name} tab should be measurable`).not.toBeNull();
      expect(box?.width, `${name} tab touch width`).toBeGreaterThanOrEqual(44);
      expect(box?.height, `${name} tab touch height`).toBeGreaterThanOrEqual(44);
      await tab.click({ trial: true });
    }

    for (const name of secondaryLinks) {
      await expect(secondaryNav.getByRole("link", { name, exact: true })).toBeVisible();
    }

    const metrics = await primaryNav.evaluate((nav) => {
      const rect = nav.getBoundingClientRect();
      const style = window.getComputedStyle(nav);

      return {
        viewportWidth: document.documentElement.clientWidth,
        viewportHeight: window.innerHeight,
        documentScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        position: style.position,
        overflowX: style.overflowX
      };
    });

    expect(metrics.documentScrollWidth).toBeLessThanOrEqual(metrics.viewportWidth);
    expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.viewportWidth);
    expect(metrics.position).toBe("fixed");
    expect(metrics.overflowX).not.toBe("auto");
    expect(metrics.width).toBeLessThanOrEqual(metrics.viewportWidth);
    expect(metrics.bottom).toBeLessThanOrEqual(metrics.viewportHeight);
    expect(metrics.top).toBeGreaterThanOrEqual(metrics.viewportHeight - 96);
  });

  test("keeps every top-level route within the iPhone viewport above the bottom tabs", async ({
    page
  }) => {
    for (const path of [
      "/today",
      "/itinerary",
      "/map",
      "/business-targets",
      "/notes",
      "/team",
      "/private",
      "/admin/data-review"
    ]) {
      await page.goto(path);

      const metrics = await page.evaluate(() => ({
        viewportWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        mainPaddingBottom: window.getComputedStyle(document.querySelector("main")!).paddingBottom
      }));

      expect(metrics.documentScrollWidth, `${path} document width`).toBeLessThanOrEqual(
        metrics.viewportWidth
      );
      expect(metrics.bodyScrollWidth, `${path} body width`).toBeLessThanOrEqual(
        metrics.viewportWidth
      );
      expect(
        parseFloat(metrics.mainPaddingBottom),
        `${path} main bottom padding`
      ).toBeGreaterThanOrEqual(88);
    }
  });

  test("keeps critical mission content inside the first iPhone screen", async ({ page }) => {
    await page.goto("/business-targets");

    const banner = page.getByText("App-safe HK / Shenzhen ops");
    const pageHeadingLocator = page.getByRole("heading", { name: "Visit Targets" });
    const firstTargetCard = page.locator('a[href^="/business-targets/"]').first();

    await expect(banner).toBeVisible();
    await expect(pageHeadingLocator).toBeVisible();
    await expect(firstTargetCard).toBeVisible();

    const density = await page.evaluate(() => {
      const bannerElement = Array.from(document.querySelectorAll("span")).find((element) =>
        element.textContent?.includes("App-safe HK / Shenzhen ops")
      );
      const firstCard = document.querySelector('a[href^="/business-targets/"]');
      const pageHeading = Array.from(document.querySelectorAll("h1")).find((element) =>
        element.textContent?.includes("Visit Targets")
      );

      return {
        viewportHeight: window.innerHeight,
        bannerHeight: bannerElement?.getBoundingClientRect().height ?? 999,
        pageHeadingTop: pageHeading?.getBoundingClientRect().top ?? 999,
        firstCardTop: firstCard?.getBoundingClientRect().top ?? 999
      };
    });

    expect(density.bannerHeight).toBeLessThanOrEqual(24);
    expect(density.pageHeadingTop).toBeLessThanOrEqual(260);
    expect(density.firstCardTop).toBeLessThanOrEqual(560);
  });
});
