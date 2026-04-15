import {
  ModerationFactory,
  ModerationAction,
  type ModFormData,
} from "./Moderation";
import { REASON_BAN_EVASION } from "./ModerationMap";

const MODERATION_CHANNEL =
  "discord://discord.com/channels/736744916012630046/738522768689332225";
const BAN_APPEALS_CHANNEL =
  "discord://discord.com/channels/736744916012630046/778335478096724018";

const SAMPLE_ID = "123456789012345678";

describe("ModerationFactory", () => {
  describe("Warning", () => {
    it("builds warn string with reason description", () => {
      const formData: ModFormData = {
        id: SAMPLE_ID,
        reason: "Harassment",
        modifiers: [],
        muteHours: 1,
      };
      const out = ModerationFactory.create(ModerationAction.Warning, formData);
      expect(out.moderationString).toMatch(/^\?warn 123456789012345678 .+/);
      expect(out.discordChannelURL).toBe(MODERATION_CHANNEL);
    });

    it("appends verified host note when modifier set and reason is hosting", () => {
      const formData: ModFormData = {
        id: SAMPLE_ID,
        reason: "AFK host",
        modifiers: ["Verified Host"],
        muteHours: 1,
      };
      const out = ModerationFactory.create(ModerationAction.Warning, formData);
      expect(out.moderationString).toContain(
        "Your Verified Host Status will be reviewed as a result of this warning."
      );
    });

    it("does not append verified host note when reason is not hosting", () => {
      const formData: ModFormData = {
        id: SAMPLE_ID,
        reason: "Harassment",
        modifiers: ["Verified Host"],
        muteHours: 1,
      };
      const out = ModerationFactory.create(ModerationAction.Warning, formData);
      expect(out.moderationString).not.toContain("Verified Host Status");
    });
  });

  describe("Mute", () => {
    it("includes duration and description", () => {
      const formData: ModFormData = {
        id: SAMPLE_ID,
        reason: "Inappropriate language",
        modifiers: [],
        muteHours: 6,
      };
      const out = ModerationFactory.create(ModerationAction.Mute, formData);
      expect(out.moderationString).toMatch(/^\?mute 123456789012345678 6h .+/);
      expect(out.discordChannelURL).toBe(MODERATION_CHANNEL);
    });

    it("appends verified host note for hosting reasons", () => {
      const formData: ModFormData = {
        id: SAMPLE_ID,
        reason: "Fake hosting",
        modifiers: ["Verified Host"],
        muteHours: 2,
      };
      const out = ModerationFactory.create(ModerationAction.Mute, formData);
      expect(out.moderationString).toContain(
        "Your Verified Host Status will be reviewed as a result of this mute."
      );
    });
  });

  describe("Kick", () => {
    it("builds kick string", () => {
      const formData: ModFormData = {
        id: SAMPLE_ID,
        reason: "Scam links (first offense)",
        modifiers: [],
        muteHours: 1,
      };
      const out = ModerationFactory.create(ModerationAction.Kick, formData);
      expect(out.moderationString).toMatch(/^\?kick 123456789012345678 .+/);
      expect(out.discordChannelURL).toBe(MODERATION_CHANNEL);
    });
  });

  describe("Ban", () => {
    it("includes appeal link when reason is not ban evasion", () => {
      const formData: ModFormData = {
        id: SAMPLE_ID,
        reason: "Spoofing",
        modifiers: [],
        muteHours: 1,
      };
      const out = ModerationFactory.create(ModerationAction.Ban, formData);
      expect(out.moderationString).toContain("https://pogoraiders.gg/appeal");
      expect(out.discordChannelURL).toBe(BAN_APPEALS_CHANNEL);
    });

    it("omits appeal link for ban evasion", () => {
      const formData: ModFormData = {
        id: SAMPLE_ID,
        reason: REASON_BAN_EVASION,
        modifiers: [],
        muteHours: 1,
      };
      const out = ModerationFactory.create(ModerationAction.Ban, formData);
      expect(out.moderationString).not.toContain("pogoraiders.gg");
    });
  });
});
