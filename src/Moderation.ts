import ModerationMap from "./ModerationMap";

export interface ModFormData {
  id: string;
  reason: string;
  verified: boolean;
}

export interface Moderation {
  // The formatted string to output to the clipboard
  readonly moderationString: string
  // A link to the associated Discord Channel
  readonly discordChannelURL?: string
}

export abstract class AbstractModeration implements Moderation {
  protected id: string;
  protected reason: string;
  protected verified: boolean;
  abstract discordChannelURL?: string | undefined;
  abstract get moderationString(): string;

  constructor(formData: ModFormData) {
    this.id = formData.id;
    this.reason = formData.reason;
    this.verified = formData.verified;
  }
}

export class Warning extends AbstractModeration {
  discordChannelURL = "discord://discord.com/channels/736744916012630046/738522768689332225"

  get moderationString() {
    const verifiedString = this.verified
      ? "Your Verified Host Status will be reviewed as a result of this warning."
      : "";
      return `?warn ${this.id} ${ModerationMap[this.reason]} ${verifiedString}`;
  }
}

export class Ban extends AbstractModeration {
  discordChannelURL = "discord://discord.com/channels/736744916012630046/778335478096724018"

  get moderationString() {
    return `?ban ${this.id} ${ModerationMap[this.reason]} If you wish to appeal this ban, go to https://www.pogoraiders.gg/appeal`;
  }
}

// Factory Class to produce Moderations
export enum ModerationType {
  Warning = "Warning",
  Ban = "Ban",
}

export class ModerationFactory {
  public static create(type: ModerationType, formData: ModFormData): Moderation {
      switch (type) {
          case ModerationType.Warning: return new Warning(formData);
          case ModerationType.Ban: return new Ban(formData);
          default:
              throw new Error('Wrong moderation type passed.');
      }
  }
}
