import { useMemo } from "react";
import type { ModerationOutput } from "./Moderation";
import {
  tryBuildModeration,
  type ModerationPreviewFields,
} from "./moderationPreview";

export function useModerationPreview(
  fields: ModerationPreviewFields
): {
  moderationOutput: ModerationOutput | null;
  clipboardEnabled: boolean;
} {
  const { id, action, reason, modifiers, muteHours } = fields;

  const moderationOutput = useMemo(
    () =>
      tryBuildModeration({
        id,
        action,
        reason,
        modifiers,
        muteHours,
      }),
    [id, action, reason, modifiers, muteHours]
  );

  return {
    moderationOutput,
    clipboardEnabled: moderationOutput !== null,
  };
}
