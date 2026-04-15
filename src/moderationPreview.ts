import { ModerationFactory, ModerationAction, type ModerationOutput } from "./Moderation";
import type { ModerationReason } from "./ModerationMap";

/** Same pattern as the Discord ID field in ModForm. */
export const DISCORD_ID_PATTERN = /^\d{18,19}$/;

export interface ModerationPreviewFields {
  id: string | undefined;
  action: ModerationAction | undefined;
  reason: ModerationReason | undefined;
  modifiers: string[];
  muteHours: number | undefined;
}

/**
 * Returns a moderation command preview when inputs satisfy the same rules as ModForm validation.
 * Otherwise returns null (no preview / clipboard disabled).
 */
export function tryBuildModeration(
  fields: ModerationPreviewFields
): ModerationOutput | null {
  const { id, action, reason, modifiers, muteHours } = fields;
  if (!id || !action || !reason) return null;
  if (!DISCORD_ID_PATTERN.test(id)) return null;

  if (action === ModerationAction.Mute) {
    const hours = muteHours ?? 0;
    if (hours < 1 || hours > 24) return null;
  }

  return ModerationFactory.create(action, {
    id,
    reason,
    modifiers,
    muteHours: muteHours ?? 1,
  });
}
