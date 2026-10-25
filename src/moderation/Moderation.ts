import ModerationMap, { REASON_BAN_EVASION, type ModerationReason } from "./ModerationMap";
import { ModerationAction } from "./moderationAction";

export { ModerationAction };

export interface ModFormData {
  id: string;
  reason: ModerationReason;
  modifiers: string[];
  muteHours: number;
}

export interface ModerationOutput {
  readonly moderationString: string;
  readonly discordChannelURL?: string;
}

const VERIFIED_HOST_MODIFIER = "Verified Host";

const joinParts = (...parts: Array<string | undefined | null>): string =>
  parts.filter((p) => p != null && p.trim().length > 0).join(" ");

/** Dyno slash-command option: `name:value` (spaces allowed in the value). */
const slashOption = (name: string, value: string | undefined | null): string | undefined => {
  if (value == null || value.trim().length === 0) return undefined;
  return `${name}:${value.trim()}`;
};

const slashCommand = (name: string, ...options: Array<string | undefined>): string =>
  joinParts(`/${name}`, ...options);

const DISCORD_CHANNELS = {
  /** Mod discussion / warnings / mutes / kicks */
  moderation: "discord://discord.com/channels/736744916012630046/738522768689332225",
  /** Ban appeals */
  banAppeals: "discord://discord.com/channels/736744916012630046/778335478096724018",
} as const;

function verifiedHostNote(
  modifiers: string[],
  reason: ModerationReason,
  kind: "warning" | "mute"
): string {
  if (!modifiers.includes(VERIFIED_HOST_MODIFIER) || ModerationMap[reason]?.hosting !== true) {
    return "";
  }
  return kind === "warning"
    ? "Your Verified Host Status will be reviewed as a result of this warning."
    : "Your Verified Host Status will be reviewed as a result of this mute.";
}

export abstract class AbstractModeration implements ModerationOutput {
  protected id: string;
  protected reason: ModerationReason;
  protected modifiers: string[];
  protected muteHours: number;
  abstract discordChannelURL: string | undefined;
  abstract get moderationString(): string;

  constructor(formData: ModFormData) {
    this.id = formData.id;
    this.reason = formData.reason;
    this.modifiers = formData.modifiers;
    this.muteHours = formData.muteHours;
  }
}

export class Warning extends AbstractModeration {
  discordChannelURL = DISCORD_CHANNELS.moderation;

  get moderationString() {
    const verifiedString = verifiedHostNote(this.modifiers, this.reason, "warning");
    return slashCommand(
      "warn",
      slashOption("user", this.id),
      slashOption("reason", joinParts(ModerationMap[this.reason]?.description, verifiedString))
    );
  }
}

export class Ban extends AbstractModeration {
  discordChannelURL = DISCORD_CHANNELS.banAppeals;

  get moderationString() {
    const appealLink =
      this.reason !== REASON_BAN_EVASION
        ? "If you wish to appeal this ban, go to https://pogoraiders.gg/appeal"
        : undefined;

    return slashCommand(
      "ban",
      slashOption("user", this.id),
      slashOption("reason", joinParts(ModerationMap[this.reason]?.description, appealLink))
    );
  }
}

export class Mute extends AbstractModeration {
  discordChannelURL = DISCORD_CHANNELS.moderation;

  get moderationString() {
    const verifiedString = verifiedHostNote(this.modifiers, this.reason, "mute");

    return slashCommand(
      "mute",
      slashOption("user", this.id),
      slashOption("reason", joinParts(ModerationMap[this.reason]?.description, verifiedString)),
      slashOption("limit", `${this.muteHours}h`)
    );
  }
}

export class Kick extends AbstractModeration {
  discordChannelURL = DISCORD_CHANNELS.moderation;

  get moderationString() {
    return slashCommand(
      "kick",
      slashOption("user", this.id),
      slashOption("reason", ModerationMap[this.reason]?.description)
    );
  }
}

export class ModerationFactory {
  public static create(type: ModerationAction, formData: ModFormData): ModerationOutput {
    switch (type) {
      case ModerationAction.Warning:
        return new Warning(formData);
      case ModerationAction.Ban:
        return new Ban(formData);
      case ModerationAction.Mute:
        return new Mute(formData);
      case ModerationAction.Kick:
        return new Kick(formData);
      default:
        throw new Error("Wrong moderation type passed.");
    }
  }
}
