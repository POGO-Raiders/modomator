import { copyModerationToClipboard, copyTextToClipboard } from "./moderationClipboard";

describe("moderationClipboard", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
      writable: true,
    });
  });

  it("copyTextToClipboard delegates to navigator.clipboard.writeText", async () => {
    await copyTextToClipboard("hello");
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
  });

  it("copyTextToClipboard rejects when Clipboard API is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
      writable: true,
    });
    await expect(copyTextToClipboard("hello")).rejects.toThrow(/Clipboard is not available/);
  });

  it("copyTextToClipboard falls back to execCommand when Clipboard API is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
      writable: true,
    });

    const execSpy = vi.fn().mockReturnValue(true);
    Object.defineProperty(document, "execCommand", {
      value: execSpy,
      configurable: true,
      writable: true,
    });
    await expect(copyTextToClipboard("fallback")).resolves.toBeUndefined();
    expect(execSpy).toHaveBeenCalledWith("copy");
  });

  it("copyModerationToClipboard notifies and optionally opens URL", async () => {
    const notify = vi.fn();
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    await copyModerationToClipboard({
      text: "?warn 1 test",
      actionLabel: "Warning",
      notify,
      shouldOpenDiscord: true,
      discordChannelURL: "discord://channel",
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("?warn 1 test");
    expect(notify).toHaveBeenCalledWith("Warning copied to clipboard.", 2);
    expect(openSpy).toHaveBeenCalledWith("discord://channel");

    openSpy.mockRestore();
  });

  it("does not open URL when shouldOpenDiscord is false", async () => {
    const notify = vi.fn();
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    await copyModerationToClipboard({
      text: "?warn 1 test",
      actionLabel: "Warning",
      notify,
      shouldOpenDiscord: false,
      discordChannelURL: "discord://channel",
    });

    expect(openSpy).not.toHaveBeenCalled();
    openSpy.mockRestore();
  });

  it("does not open URL when discordChannelURL is missing", async () => {
    const notify = vi.fn();
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    await copyModerationToClipboard({
      text: "?warn 1 test",
      actionLabel: "Warning",
      notify,
      shouldOpenDiscord: true,
      discordChannelURL: undefined,
    });

    expect(openSpy).not.toHaveBeenCalled();
    openSpy.mockRestore();
  });
});
