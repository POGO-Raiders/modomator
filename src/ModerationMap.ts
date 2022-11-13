import { ModerationAction } from "./Moderation";

const ModerationMap: {
  [reason: string]: { description: string; hosting: boolean; categories: ModerationAction[] };
} = {
  "AFK host": {
    description: "Going AFK while hosting a raid. When you host a raid, you are expected to communicate with your lobby and invite other players to join. Please review the server’s <#736807346268930058> and <#1039022349195948152> for more information.",
    hosting: true,
    categories: [ModerationAction.Warning],
  },
  "Ban Evasion": {
    description: "Ban Evasion. You may not use an alternate account to avoid a ban issued on PGR.",
    hosting: false,
    categories: [ModerationAction.Ban]
  },
  Discrimination: {
    description: "Discrimination is not allowed on this server and likely violates Discord ToS.",
    hosting: false,
    categories: [ModerationAction.Ban, ModerationAction.Mute, ModerationAction.Warning],
  },
  "Failure to commit": {
    description:
      "Failure to commit to a raid. When you react to a raid, you are expected to join it. Please review the <#736807346268930058> of the server and <#1039022349195948152>.",
    hosting: false,
    categories: [ModerationAction.Warning],
  },

  "Failure to invite": {
    description:
      "Failure to invite all members of your party to the raid. Make sure to use private lobbies and the search string below the QR code. Please review <#1039022349195948152> and the server’s <#736807346268930058> for more information.",
    hosting: true,
    categories: [ModerationAction.Warning],
  },
  "Failure to reattempt": {
    description:
      "When you host a raid that’s unsuccessful, you are expected to continue communicating with your lobby and provide a reattempt to prevent lost passes. If you need help, ping `@Moderator`. Please review <#1039022349195948152> and the server’s <#736807346268930058> for more information.",
    hosting: true,
    categories: [ModerationAction.Warning],
  },
  Harassment: {
    description: "Harassment is not allowed on this server and likely violates Discord ToS.",
    hosting: false,
    categories: [ModerationAction.Warning],
  },
  "Inappropriate language": {
    description: "Inappropriate language. Please be mindful of your language as we have members of all ages.",
    hosting: false,
    categories: [ModerationAction.Mute, ModerationAction.Warning],
  },
  "Less than 10 minutes": {
    description:
      "Hosting with less than ten minutes on the raid clock. This endangers the other members' passes. Please review the server’s <#736807346268930058> and <#1039022349195948152> for more information.",
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
    categories: [ModerationAction.Mute, ModerationAction.Warning, ModerationAction.Ban],
  },
  Promotion: {
    description: "You may not promote unaffiliated links, resources, or servers on PGR.",
    hosting: false,
    categories: [ModerationAction.Mute, ModerationAction.Warning, ModerationAction.Ban],
  },
  "Scam links (first offense)": {
    description: "Spreading a scam link. Your account was most likely hacked, and you should reset your password. You can rejoin the server at discord.gg/POGORaiders when your account has been recovered. Spreading the same message again will result in a ban.",
    hosting: false,
    categories: [ModerationAction.Kick],
  },
  "Scam links (second offense)": {
    description: "Sending scam links on PGR or to other members over DM is not allowed and violates Discord ToS.",
    hosting: false,
    categories: [ModerationAction.Ban],
  },
  Spamming: {
    description: "Spamming and disrupting the chat.",
    hosting: false,
    categories: [ModerationAction.Mute, ModerationAction.Warning, ModerationAction.Ban],
  },
  Spoofing: {
    description: "Spoofing is not tolerated on this server and violates Niantic’s ToS.",
    hosting: false,
    categories: [ModerationAction.Ban],
  },
  "Troll hosting": {
    description: "Troll hosting. When you post a raid, be prepared to host it.",
    hosting: true,
    categories: [ModerationAction.Mute],
  },
  "Unhatched Egg": {
    description:
      "Failure to host from a hatched egg. Hosts must be within range of a gym and the egg must be already hatched before posting a raid to host. Please review the <#736807346268930058> of the server and <#1039022349195948152>.",
    hosting: true,
    categories: [ModerationAction.Warning],
  },
};

export default ModerationMap;
