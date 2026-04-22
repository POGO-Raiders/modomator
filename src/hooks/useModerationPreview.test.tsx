import { renderHook } from "@testing-library/react";
import { ModerationAction } from "../moderation/moderationAction";
import { useModerationPreview } from "./useModerationPreview";

describe("useModerationPreview", () => {
  it("is disabled until id and action produce valid preview", () => {
    const { result, rerender } = renderHook(
      (props: { id?: string; action?: ModerationAction }) =>
        useModerationPreview({
          id: props.id,
          action: props.action,
          reason: "Harassment",
          modifiers: [],
          muteHours: 1,
        }),
      {
        initialProps: {
          id: undefined as string | undefined,
          action: undefined as ModerationAction | undefined,
        },
      }
    );

    expect(result.current.moderationOutput).toBeNull();
    expect(result.current.clipboardEnabled).toBe(false);

    rerender({
      id: "123456789012345678",
      action: ModerationAction.Warning,
    });

    expect(result.current.moderationOutput).not.toBeNull();
    expect(result.current.clipboardEnabled).toBe(true);
  });
});
