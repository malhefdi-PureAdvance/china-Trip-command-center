import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const seed = readFileSync(
  fileURLToPath(new URL("../seeds/china_2026_demo.sql", import.meta.url)),
  "utf8"
);

describe("China 2026 demo seed anchors", () => {
  it("uses the real July/August 2026 trip anchors", () => {
    expect(seed).toContain("'2026-07-04'");
    expect(seed).toContain("'2026-08-02'");
    expect(seed).toContain("China 2026 · Tech Founders");
  });

  it("never regresses to the April 2026 placeholder dates", () => {
    expect(seed).not.toContain("2026-04");
  });
});
