import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns initialValue when storage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", false));
    expect(result.current[0]).toBe(false);
  });

  it("persists value to localStorage on set", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", false));
    act(() => {
      result.current[1](true);
    });
    expect(result.current[0]).toBe(true);
    expect(JSON.parse(localStorage.getItem("test-key")!)).toBe(true);
  });

  it("reads existing value from localStorage on mount", () => {
    localStorage.setItem("test-key", JSON.stringify("hello"));
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(result.current[0]).toBe("hello");
  });

  it("syncs value from cross-tab storage event", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", false));
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", { key: "test-key", newValue: JSON.stringify(true) })
      );
    });
    expect(result.current[0]).toBe(true);
  });

  it("falls back to current value on malformed JSON in storage event", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", false));
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", { key: "test-key", newValue: "not-valid-json{{" })
      );
    });
    expect(result.current[0]).toBe(false);
  });

  it("ignores storage events for other keys", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", false));
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", { key: "other-key", newValue: JSON.stringify(true) })
      );
    });
    expect(result.current[0]).toBe(false);
  });
});
