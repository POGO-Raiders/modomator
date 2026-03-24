import ModerationMap, { REASON_BAN_EVASION, type ModerationReason } from "./ModerationMap";

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
    return `?warn ${this.id} ${ModerationMap[this.reason]?.description} ${verifiedString}`;
  }
}

export class Ban extends AbstractModeration {
  discordChannelURL = DISCORD_CHANNELS.banAppeals;

  get moderationString() {
    const appealLink =
      this.reason !== REASON_BAN_EVASION
        ? "If you wish to appeal this ban, go to https://pogoraiders.gg/appeal"
        : "";

    return `?ban ${this.id} ${ModerationMap[this.reason]?.description} ${appealLink}`;
  }
}

export class Mute extends AbstractModeration {
  discordChannelURL = DISCORD_CHANNELS.moderation;

  get moderationString() {
    const verifiedString = verifiedHostNote(this.modifiers, this.reason, "mute");

    return `?mute ${this.id} ${this.muteHours}h ${ModerationMap[this.reason]?.description} ${verifiedString}`;
  }
}

export class Kick extends AbstractModeration {
  discordChannelURL = DISCORD_CHANNELS.moderation;

  get moderationString() {
    return `?kick ${this.id} ${ModerationMap[this.reason]?.description}`;
  }
}

export enum ModerationAction {
  Mute = "Mute",
  Kick = "Kick",
  Warning = "Warning",
  Ban = "Ban",
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
