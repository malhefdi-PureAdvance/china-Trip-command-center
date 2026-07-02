import { describe, expect, it } from "vitest";

import { BusinessTargetDossiersSchema } from "../schemas";
import { demoBusinessTargets } from "./business-targets";

describe("business target dossiers", () => {
  it("validates every dossier against the schema", () => {
    expect(() => BusinessTargetDossiersSchema.parse(demoBusinessTargets)).not.toThrow();
    expect(demoBusinessTargets.length).toBeGreaterThanOrEqual(20);
  });

  it("has unique ids", () => {
    const ids = demoBusinessTargets.map((target) => target.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("stays in the Greater Bay Area corridor", () => {
    const allowed = new Set([
      "Hong Kong",
      "Shenzhen",
      "Guangzhou",
      "Dongguan",
      "Zhuhai",
      "Foshan",
      "Other"
    ]);
    for (const target of demoBusinessTargets) {
      expect(allowed.has(target.corridor)).toBe(true);
    }
  });

  // Defense-in-depth privacy guard: this data ships to a PUBLIC deployment.
  // Contact identifiers and exact unit addresses must never appear in the
  // human-readable fields (public source URLs are exempt).
  it("never ships contact identifiers or unit addresses", () => {
    const emailLike = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
    const phoneLike = /\+\d[\d\s-]{6,}/;
    const wechatLike = /wechat|微信/i;
    const unitLike = /\b(Room|Unit|Suite|Flat)\s*\d/i;

    for (const target of demoBusinessTargets) {
      const humanFields = [
        target.name,
        target.nameLocal ?? "",
        target.area,
        target.oneLiner,
        target.whatTheyDo,
        target.whyItMatters,
        target.visitObjective,
        target.route,
        ...target.talkingPoints,
        ...target.openQuestions,
        ...target.risks
      ].join("\n");

      expect(emailLike.test(humanFields), `${target.id} email`).toBe(false);
      expect(phoneLike.test(humanFields), `${target.id} phone`).toBe(false);
      expect(wechatLike.test(humanFields), `${target.id} wechat`).toBe(false);
      expect(unitLike.test(humanFields), `${target.id} unit address`).toBe(false);
    }
  });
});
