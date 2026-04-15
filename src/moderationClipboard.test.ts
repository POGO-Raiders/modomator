import {
  copyModerationToClipboard,
  copyTextToClipboard,
} from "./moderationClipboard";

describe("moderationClipboard", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
      writable: true,
    });
  });

  it("copyTextToClipboard delegates to navigator.clipboard.writeText", async () => {
    await copyTextToClipboard("hello");
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
  });

  it("copyModerationToClipboard notifies and optionally opens URL", async () => {
    const notify = jest.fn();
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);

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
});
