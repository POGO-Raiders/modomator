import ModerationMap from "./ModerationMap";

export interface ModFormData {
  id: string;
  reason: string;
  modifiers: string[];
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
  abstract discordChannelURL: string | undefined;
  abstract get moderationString(): string;

  constructor(formData: ModFormData) {
    this.id = formData.id;
    this.reason = formData.reason;
    this.modifiers = formData.modifiers;
  }
}

export class Warning extends AbstractModeration {
  discordChannelURL = "discord://discord.com/channels/736744916012630046/738522768689332225";

  get moderationString() {
    const verifiedString = this.modifiers.includes("Verified Host")
      ? "Your Verified Host Status will be reviewed as a result of this warning."
      : "";
    return `?warn ${this.id} ${ModerationMap[this.reason]} ${verifiedString}`;
  }
}

export class Ban extends AbstractModeration {
  discordChannelURL = "discord://discord.com/channels/736744916012630046/778335478096724018";

  get moderationString() {
    return `?ban ${this.id} ${
      ModerationMap[this.reason]
    } If you wish to appeal this ban, go to https://www.pogoraiders.gg/appeal`;
  }
}
export class Mute extends AbstractModeration {
  discordChannelURL = "discord://discord.com/channels/736744916012630046/738522768689332225";

  get moderationString() {
    const muteMinutes = this.modifiers.includes("Release Day") ? 120 : 60;

    return `?mute ${this.id} ${muteMinutes}m ${ModerationMap[this.reason]}`;
  }
}

// Factory Class to produce Moderations
export enum ModerationType {
  Warning = "Warning",
  Ban = "Ban",
  Mute = "Mute",
}

export class ModerationFactory {
  public static create(type: ModerationType, formData: ModFormData): Moderation {
    switch (type) {
      case ModerationType.Warning:
        return new Warning(formData);
      case ModerationType.Ban:
        return new Ban(formData);
      case ModerationType.Mute:
        return new Mute(formData);
      default:
        throw new Error("Wrong moderation type passed.");
    }
  }
}
