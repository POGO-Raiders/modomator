import { renderHook } from "@testing-library/react";
import { useModFormClear } from "./useModFormClear";

describe("useModFormClear", () => {
  it("resets form and reapplies URL id + defaults", () => {
    const resetFields = vi.fn();
    const setFieldsValue = vi.fn();
    const form = {
      resetFields,
      setFieldsValue,
    } as unknown as import("antd/es/form").FormInstance;

    const searchParams = new URLSearchParams("id=123456789012345678");
    const { result } = renderHook(() => useModFormClear(form, searchParams));

    result.current();

    expect(resetFields).toHaveBeenCalledTimes(1);
    expect(setFieldsValue).toHaveBeenCalledWith({
      id: "123456789012345678",
      modifiers: [],
      muteHours: 1,
    });
  });

  it("uses empty string when no id is in search params", () => {
    const resetFields = vi.fn();
    const setFieldsValue = vi.fn();
    const form = {
      resetFields,
      setFieldsValue,
    } as unknown as import("antd/es/form").FormInstance;

    const searchParams = new URLSearchParams("");
    const { result } = renderHook(() => useModFormClear(form, searchParams));

    result.current();

    expect(setFieldsValue).toHaveBeenCalledWith({
      id: "",
      modifiers: [],
      muteHours: 1,
    });
  });
});
