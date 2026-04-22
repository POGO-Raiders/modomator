import type { FormInstance } from "antd/es/form";
import { useCallback } from "react";

/**
 * Clear all fields, then re-apply id from the current URL and mute defaults.
 * antd resetFields alone restores the id from the form's initial mount, which can be stale.
 */
export function useModFormClear(form: FormInstance, searchParams: URLSearchParams): () => void {
  return useCallback(() => {
    form.resetFields();
    form.setFieldsValue({
      id: searchParams.get("id") ?? "",
      modifiers: [],
      muteHours: 1,
    });
  }, [form, searchParams]);
}
