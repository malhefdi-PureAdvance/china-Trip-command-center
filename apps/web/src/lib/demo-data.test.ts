import { describe, expect, it } from "vitest";

import { activeTrip, assertDemoCorridorIsSafe, getRouteSummaries } from "./demo-data";

describe("web demo data helpers", () => {
  it("keeps the demo mission in the Hong Kong and Shenzhen corridor", () => {
    expect(activeTrip.region).toBe("Hong Kong / Shenzhen Greater Bay Area");
    expect(assertDemoCorridorIsSafe()).toBe(true);
  });

  it("returns dashboard summaries for key screens", () => {
    expect(getRouteSummaries()).toEqual([
      expect.objectContaining({ href: "/today", title: "Today" }),
      expect.objectContaining({ href: "/business-targets", title: "Targets" }),
      expect.objectContaining({ href: "/notes", title: "Notes" })
    ]);
  });
});
