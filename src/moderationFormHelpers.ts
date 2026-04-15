import ModerationMap, { type ModerationReason } from "./ModerationMap";
import type { ModerationAction } from "./moderationAction";

const REASON_KEYS = Object.keys(ModerationMap) as ModerationReason[];

/** Reasons allowed for a given moderation action (same filter as ModForm). */
export function moderationReasonsForAction(
  action: ModerationAction
): ModerationReason[] {
  return REASON_KEYS.filter((m) => ModerationMap[m].categories.includes(action));
}

/** Coerce InputNumber mute value after clear or invalid input (min 1, max 24). */
export function normalizeMuteHoursInput(value: number | null): number {
  if (value == null || value < 1) return 1;
  if (value > 24) return 24;
  return value;
}
