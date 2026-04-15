export enum ModerationAction {
  Mute = "Mute",
  Kick = "Kick",
  Warning = "Warning",
  Ban = "Ban",
}

/** UI order for action radios (avoid relying on Object.keys enum iteration). */
export const MODERATION_ACTION_ORDER: readonly ModerationAction[] = [
  ModerationAction.Mute,
  ModerationAction.Kick,
  ModerationAction.Warning,
  ModerationAction.Ban,
];
