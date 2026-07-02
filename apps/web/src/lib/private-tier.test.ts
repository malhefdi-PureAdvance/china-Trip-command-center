import { describe, expect, it } from "vitest";

import { resolvePrivateTierStatus } from "./private-tier";

describe("private tier status", () => {
  it("is not_configured without Supabase public env", () => {
    expect(resolvePrivateTierStatus(false, undefined)).toBe("not_configured");
    // The flag alone can never enable the tier without Supabase config.
    expect(resolvePrivateTierStatus(false, "true")).toBe("not_configured");
  });

  it("defaults to ready_inactive when configured but not explicitly enabled", () => {
    expect(resolvePrivateTierStatus(true, undefined)).toBe("ready_inactive");
    expect(resolvePrivateTierStatus(true, "false")).toBe("ready_inactive");
    expect(resolvePrivateTierStatus(true, "1")).toBe("ready_inactive");
    expect(resolvePrivateTierStatus(true, "TRUE")).toBe("ready_inactive");
  });

  it("enables only on the exact literal 'true'", () => {
    expect(resolvePrivateTierStatus(true, "true")).toBe("enabled");
  });
});
