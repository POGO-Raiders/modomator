import { ModerationAction } from "./Moderation";

const ModerationMap: {
  [reason: string]: {
    description: string;
    hosting: boolean;
    categories: ModerationAction[];
  };
} = {
  "AFK host": {
    description:
      "Going AFK while hosting a raid. When you host a raid, you are expected to communicate with your lobby and invite other players to join. Please review the server's <#736807346268930058> and <#1039022349195948152> for more information.",
    hosting: true,
    categories: [ModerationAction.Warning],
  },
  "Ban Evasion": {
    description:
      "Ban Evasion. You may not use an alternate account to avoid a ban issued on PGR.",
    hosting: false,
    categories: [ModerationAction.Ban],
  },
  Discrimination: {
    description:
      "Discrimination is not allowed on this server and likely violates Discord ToS.",
    hosting: false,
    categories: [
      ModerationAction.Ban,
      ModerationAction.Mute,
      ModerationAction.Warning,
    ],
  },
  "Failure to commit": {
    description:
      "Failure to commit to a raid. When you react to a raid, you are expected to join it. Not doing so endangers the passes of other raiders who are left one person short. Please review the <#736807346268930058> of the server and <#1039022349195948152>.",
    hosting: false,
    categories: [ModerationAction.Warning],
  },
  "Failure to invite": {
    description:
      "Failure to invite all members of your party to the raid. Multiple members reported not receiving invites to your raid. Please review <#1039022349195948152> and the server's <#736807346268930058> for more information.",
    hosting: true,
    categories: [ModerationAction.Warning],
  },
  "Failure to reattempt": {
    description:
      "When you host a raid that’s unsuccessful, you are expected to continue communicating with your lobby and provide a reattempt to prevent lost passes. If you need help, ping `@Moderator`. Please review <#1039022349195948152> and the server’s <#736807346268930058> for more information.",
    hosting: true,
    categories: [ModerationAction.Warning],
  },
  "Fake Hosting": {
    description:
      "Fake hosting a raid. Please only host if you have a raid to provide. Please read <#1039022349195948152> and <#736807346268930058> before hosting a raid in the future.",
    hosting: true,
    categories: [ModerationAction.Mute, ModerationAction.Warning],
  },
  Harassment: {
    description:
      "Harassment is not allowed on this server and likely violates Discord ToS.",
    hosting: false,
    categories: [ModerationAction.Warning],
  },
  "Hosting Wrong Pokemon": {
    description:
      "Please double check your host commands, and ensure that the egg that spawned is the pokemon you are hosting. Please review <#1039022349195948152> and the server's <#736807346268930058> for more information.",
    hosting: true,
    categories: [ModerationAction.Warning],
  },
  "Immediate Closing": {
    description:
      "Creating a raid lobby and then closing it immediately without explanation is not allowed. Please review the <#736807346268930058> of the server and <#1039022349195948152>.",
    hosting: true,
    categories: [ModerationAction.Warning],
  },
  "Inappropriate language": {
    description:
      "Inappropriate language. Please be mindful of your language as we have members of all ages.",
    hosting: false,
    categories: [ModerationAction.Mute, ModerationAction.Warning],
  },
  "Lack of raid pass": {
    description:
      "You are responsible for having a raid pass or enough coins to purchase one before reacting and joining a raid. Please refresh yourself with our <#736807346268930058> of the server and <#1039022349195948152>.",
    hosting: false,
    categories: [ModerationAction.Warning],
  },
  "Less than 10 minutes": {
    description:
      "Hosting with less than ten minutes on the raid clock. This endangers the other members' passes. Please review the server's <#736807346268930058> and <#1039022349195948152> for more information.",
    hosting: true,
    categories: [ModerationAction.Warning],
  },
  "Moderation Evasion": {
    description: "You may not leave the server to avoid moderation.",
    hosting: false,
    categories: [ModerationAction.Ban],
  },
  NSFW: {
    description:
      "Posting NSFW content is not allowed on this server and likely violates Discord ToS.",
    hosting: false,
    categories: [
      ModerationAction.Mute,
      ModerationAction.Warning,
      ModerationAction.Ban,
    ],
  },
  Promotion: {
    description:
      "You may not promote unaffiliated links, resources, or servers on PGR.",
    hosting: false,
    categories: [
      ModerationAction.Mute,
      ModerationAction.Warning,
      ModerationAction.Ban,
    ],
  },
  "Scam links (first offense)": {
    description:
      "Spreading a scam link. Your account was most likely hacked, and you should reset your password. You can rejoin the server at discord.gg/POGORaiders when your account has been recovered. Spreading the same message again will result in a ban.",
    hosting: false,
    categories: [ModerationAction.Kick],
  },
  "Scam links (second offense)": {
    description:
      "Sending scam links on PGR or to other members over DM is not allowed and violates Discord ToS.",
    hosting: false,
    categories: [ModerationAction.Ban],
  },
  Spamming: {
    description: "Spamming and disrupting the chat.",
    hosting: false,
    categories: [
      ModerationAction.Mute,
      ModerationAction.Warning,
      ModerationAction.Ban,
    ],
  },
  Speedhosting: {
    description:
      "Rehosting a legendary or mega raid that hasn't finished (Speedhosting) is not allowed on this server and endangers other members passes by not allowing reattempts. Please review <#1039022349195948152> and the server <#736807346268930058> for more information.",
    hosting: true,
    categories: [ModerationAction.Warning],
  },
  Spoofing: {
    description:
      "Spoofing is not tolerated on this server and violates Niantic's ToS.",
    hosting: false,
    categories: [ModerationAction.Ban],
  },
  "Unhatched Egg": {
    description:
      "Failure to host from a hatched egg. Hosts must be within range of a gym and the egg must be already hatched before posting a raid to host. Please review the <#736807346268930058> of the server and <#1039022349195948152>.",
    hosting: true,
    categories: [ModerationAction.Warning],
  },
};

export default ModerationMap;
