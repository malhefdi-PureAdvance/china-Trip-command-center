// Local design-verification harness: captures iPhone-viewport screenshots of
// the key routes against a running dev/prod server. Not part of the app build.
// Usage: node scripts/design-screenshots.mjs <outDir> [baseUrl] [--light]
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("@playwright/test");

const outDir = process.argv[2] ?? ".design-audit/local";
const baseUrl = process.argv[3]?.startsWith("http") ? process.argv[3] : "http://127.0.0.1:3000";
const light = process.argv.includes("--light");

const routes = [
  ["today", "/today"],
  ["itinerary", "/itinerary"],
  ["business-targets", "/business-targets"],
  ["dossier-insilico", "/business-targets/hk-insilico-medicine"],
  ["notes", "/notes"],
  ["admin-data-review", "/admin/data-review"],
  ["private", "/private"],
  ["offline", "/offline"]
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  colorScheme: light ? "light" : "dark"
});

let overflowFailures = [];
for (const [name, route] of routes) {
  const page = await context.newPage();
  try {
    await page.goto(baseUrl + route, { waitUntil: "networkidle", timeout: 60000 });
    if (light) {
      await page.evaluate(() => {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        document.documentElement.setAttribute("data-theme", "light");
      });
      await page.waitForTimeout(250);
    }
    await page.waitForTimeout(500);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    if (overflow > 1) overflowFailures.push(`${route}: +${overflow}px horizontal overflow`);
    await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: true });
    console.log(`ok ${name} (overflow ${overflow}px)`);
  } catch (err) {
    console.error(`FAIL ${name}: ${err.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }
}

await browser.close();
if (overflowFailures.length) {
  console.error("HORIZONTAL OVERFLOW DETECTED:\n" + overflowFailures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("no horizontal overflow on any route");
}
