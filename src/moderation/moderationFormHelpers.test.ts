import { ModerationAction } from "./moderationAction";
import { moderationReasonsForAction, normalizeMuteHoursInput } from "./moderationFormHelpers";

describe("moderationReasonsForAction", () => {
  it("returns only reasons whose categories include the action", () => {
    const forWarn = moderationReasonsForAction(ModerationAction.Warning);
    expect(forWarn).toContain("Harassment");
    expect(forWarn.every((r) => r.length > 0)).toBe(true);

    const forKick = moderationReasonsForAction(ModerationAction.Kick);
    expect(forKick).toContain("Scam links (first offense)");
    expect(forKick.length).toBeGreaterThan(0);
  });
});

describe("normalizeMuteHoursInput", () => {
  it("maps null and sub-1 to 1", () => {
    expect(normalizeMuteHoursInput(null)).toBe(1);
    expect(normalizeMuteHoursInput(0)).toBe(1);
  });

  it("caps above 24", () => {
    expect(normalizeMuteHoursInput(99)).toBe(24);
  });

  it("passes through valid range", () => {
    expect(normalizeMuteHoursInput(6)).toBe(6);
  });
});
