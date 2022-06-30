import ModerationMap from "./ModerationMap";

export interface ModFormData {
  id: string;
  reason: string;
  modifiers: string[];
  muteHours: number;
}

export interface Moderation {
  // The formatted string to output to the clipboard
  readonly moderationString: string;
  // A link to the associated Discord Channel
  readonly discordChannelURL?: string;
}

export abstract class AbstractModeration implements Moderation {
  protected id: string;
  protected reason: string;
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
  discordChannelURL = "discord://discord.com/channels/736744916012630046/738522768689332225";

  get moderationString() {
    const verifiedString =
      this.modifiers.includes("Verified Host") && ModerationMap[this.reason]?.hosting === true
        ? "Your Verified Host Status will be reviewed as a result of this warning."
        : "";
    return `?warn ${this.id} ${ModerationMap[this.reason]?.description} ${verifiedString}`;
  }
}

export class Ban extends AbstractModeration {
  discordChannelURL = "discord://discord.com/channels/736744916012630046/778335478096724018";

  get moderationString() {
    const appealLink = this.reason.toLowerCase() !== "ban evasion" ? "If you wish to appeal this ban, go to https://www.pogoraiders.gg/appeal" : "";

    return `?ban ${this.id} ${
      ModerationMap[this.reason]?.description
    } ${appealLink}`;
  }
}
export class Mute extends AbstractModeration {
  discordChannelURL = "discord://discord.com/channels/736744916012630046/738522768689332225";

  get moderationString() {
    const verifiedString =
      this.modifiers.includes("Verified Host") && ModerationMap[this.reason]?.hosting === true
        ? "Your Verified Host Status will be reviewed as a result of this mute."
        : "";

    return `?mute ${this.id} ${this.muteHours}h ${
      ModerationMap[this.reason]?.description
    } ${verifiedString}`;
  }
}

export class Kick extends AbstractModeration {
  discordChannelURL = "discord://discord.com/channels/736744916012630046/738522768689332225";

  get moderationString() {
    return `?kick ${this.id} ${ModerationMap[this.reason]?.description}`;
  }
}

// Factory Class to produce Moderations
export enum ModerationAction {
  Mute = "Mute",
  Kick = "Kick",
  Warning = "Warning",
  Ban = "Ban",
}

export class ModerationFactory {
  public static create(type: ModerationAction, formData: ModFormData): Moderation {
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
