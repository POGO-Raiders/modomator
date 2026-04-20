import { Form } from "antd";
import type { FormInstance } from "antd/es/form";
import type { ModerationOutput } from "../moderation/Moderation";
import type { ModerationAction } from "../moderation/moderationAction";
import type { ModerationReason } from "../moderation/ModerationMap";
import { useModerationPreview } from "./useModerationPreview";

/**
 * Watches modform fields and derives moderation preview (single hook for ModForm).
 */
export function useModerationFormPreview(form: FormInstance): {
  moderationOutput: ModerationOutput | null;
  clipboardEnabled: boolean;
} {
  const allValues = Form.useWatch([], form) as Record<string, unknown> | undefined;

  return useModerationPreview({
    id: typeof allValues?.id === "string" ? allValues.id : undefined,
    action: allValues?.action as ModerationAction | undefined,
    reason: allValues?.reason as ModerationReason | undefined,
    modifiers: Array.isArray(allValues?.modifiers) ? (allValues.modifiers as string[]) : [],
    muteHours: typeof allValues?.muteHours === "number" ? allValues.muteHours : undefined,
  });
}
