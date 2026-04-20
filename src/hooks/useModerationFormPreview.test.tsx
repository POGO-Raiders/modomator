import { Form } from "antd";
import { renderHook } from "@testing-library/react";
import { ModerationAction } from "../moderation/moderationAction";
import { useModerationFormPreview } from "./useModerationFormPreview";

describe("useModerationFormPreview", () => {
  it("maps watched fields into preview state", () => {
    const useWatchSpy = vi
      .spyOn(Form, "useWatch")
      .mockImplementation((name: string) => {
        const values: Record<string, unknown> = {
          id: "123456789012345678",
          action: ModerationAction.Warning,
          reason: "Harassment",
          modifiers: [],
          muteHours: 1,
        };
        return values[name];
      });

    const { result } = renderHook(() =>
      useModerationFormPreview({} as import("antd/es/form").FormInstance)
    );

    expect(result.current.clipboardEnabled).toBe(true);
    expect(result.current.moderationOutput?.moderationString).toMatch(/^\?warn /);

    useWatchSpy.mockRestore();
  });

  it("returns disabled when id is invalid", () => {
    const useWatchSpy = vi
      .spyOn(Form, "useWatch")
      .mockImplementation((name: string) => {
        const values: Record<string, unknown> = {
          id: "bad-id",
          action: ModerationAction.Warning,
          reason: "Harassment",
          modifiers: [],
          muteHours: 1,
        };
        return values[name];
      });

    const { result } = renderHook(() =>
      useModerationFormPreview({} as import("antd/es/form").FormInstance)
    );

    expect(result.current.clipboardEnabled).toBe(false);
    expect(result.current.moderationOutput).toBeNull();

    useWatchSpy.mockRestore();
  });
});
