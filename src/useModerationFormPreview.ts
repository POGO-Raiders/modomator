import { Form } from "antd";
import type { FormInstance } from "antd/es/form";
import type { ModerationOutput } from "./Moderation";
import type { ModerationAction } from "./moderationAction";
import type { ModerationReason } from "./ModerationMap";
import { useModerationPreview } from "./useModerationPreview";

/**
 * Watches modform fields and derives moderation preview (single hook for ModForm).
 */
export function useModerationFormPreview(form: FormInstance): {
  moderationOutput: ModerationOutput | null;
  clipboardEnabled: boolean;
} {
  const id = Form.useWatch("id", form);
  const action = Form.useWatch("action", form);
  const reason = Form.useWatch("reason", form);
  const modifiers = Form.useWatch("modifiers", form);
  const muteHours = Form.useWatch("muteHours", form);

  return useModerationPreview({
    id: typeof id === "string" ? id : undefined,
    action: action as ModerationAction | undefined,
    reason: reason as ModerationReason | undefined,
    modifiers: Array.isArray(modifiers) ? modifiers : [],
    muteHours: typeof muteHours === "number" ? muteHours : undefined,
  });
}
