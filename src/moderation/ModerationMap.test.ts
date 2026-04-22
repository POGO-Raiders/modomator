import ModerationMap, { type ModerationReason } from "./ModerationMap";
import { ModerationAction } from "./moderationAction";

const ALL_ACTIONS = Object.values(ModerationAction) as ModerationAction[];

describe("ModerationMap", () => {
  const reasons = Object.keys(ModerationMap) as ModerationReason[];

  it("has at least one entry per moderation action", () => {
    for (const action of ALL_ACTIONS) {
      const supporting = reasons.filter((r) => ModerationMap[r].categories.includes(action));
      expect(supporting.length).toBeGreaterThan(0);
    }
  });

  it.each(reasons)("reason %s has non-empty description", (reason) => {
    expect(ModerationMap[reason].description.trim().length).toBeGreaterThan(0);
  });

  it.each(reasons)("reason %s lists at least one category", (reason) => {
    expect(ModerationMap[reason].categories.length).toBeGreaterThan(0);
  });

  it.each(reasons)("reason %s only references known ModerationAction values", (reason) => {
    for (const cat of ModerationMap[reason].categories) {
      expect(ALL_ACTIONS).toContain(cat);
    }
  });
});
