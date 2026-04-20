import { ModerationAction } from "./moderationAction";
import { tryBuildModeration } from "./moderationPreview";

const VALID_ID = "123456789012345678";

describe("tryBuildModeration", () => {
  it("returns null when id, action, or reason is missing", () => {
    expect(
      tryBuildModeration({
        id: VALID_ID,
        action: ModerationAction.Warning,
        reason: undefined,
        modifiers: [],
        muteHours: 1,
      })
    ).toBeNull();
    expect(
      tryBuildModeration({
        id: VALID_ID,
        action: undefined,
        reason: "Harassment",
        modifiers: [],
        muteHours: 1,
      })
    ).toBeNull();
  });

  it("returns null for invalid Discord id", () => {
    expect(
      tryBuildModeration({
        id: "123",
        action: ModerationAction.Warning,
        reason: "Harassment",
        modifiers: [],
        muteHours: 1,
      })
    ).toBeNull();
  });

  it("returns output for valid warning", () => {
    const out = tryBuildModeration({
      id: VALID_ID,
      action: ModerationAction.Warning,
      reason: "Harassment",
      modifiers: [],
      muteHours: 1,
    });
    expect(out).not.toBeNull();
    expect(out?.moderationString).toMatch(/^\?warn /);
  });

  it("returns null for mute when hours out of range", () => {
    expect(
      tryBuildModeration({
        id: VALID_ID,
        action: ModerationAction.Mute,
        reason: "Inappropriate language",
        modifiers: [],
        muteHours: 0,
      })
    ).toBeNull();
    expect(
      tryBuildModeration({
        id: VALID_ID,
        action: ModerationAction.Mute,
        reason: "Inappropriate language",
        modifiers: [],
        muteHours: 25,
      })
    ).toBeNull();
  });

  it("accepts mute with hours 1–24", () => {
    const out = tryBuildModeration({
      id: VALID_ID,
      action: ModerationAction.Mute,
      reason: "Inappropriate language",
      modifiers: [],
      muteHours: 12,
    });
    expect(out?.moderationString).toContain("12h");
  });

  it("enforces Discord id length boundaries", () => {
    const base = {
      action: ModerationAction.Warning as ModerationAction,
      reason: "Harassment" as const,
      modifiers: [],
      muteHours: 1,
    };
    // 17 digits — rejected
    expect(tryBuildModeration({ ...base, id: "12345678901234567" })).toBeNull();
    // 18 digits — accepted
    expect(tryBuildModeration({ ...base, id: "123456789012345678" })).not.toBeNull();
    // 19 digits — accepted
    expect(tryBuildModeration({ ...base, id: "1234567890123456789" })).not.toBeNull();
    // 20 digits — rejected
    expect(tryBuildModeration({ ...base, id: "12345678901234567890" })).toBeNull();
  });
});
