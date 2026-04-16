/**
 * Clipboard write used by ModForm; separated for tests and reuse.
 */
export function copyTextToClipboard(text: string): Promise<void> {
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    navigator.clipboard.writeText
  ) {
    return navigator.clipboard.writeText(text);
  }

  if (typeof document !== "undefined" && typeof document.execCommand === "function") {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const copied = document.execCommand("copy");
    document.body.removeChild(textArea);
    if (copied) {
      return Promise.resolve();
    }
  }

  return Promise.reject(new Error("Clipboard is not available on this device/browser."));
}

export type ModerationNotify = (message: string, durationSeconds?: number) => void;

/**
 * Copy moderation text, show notification, optionally open Discord channel URL.
 */
export async function copyModerationToClipboard(options: {
  text: string;
  actionLabel: string;
  notify: ModerationNotify;
  shouldOpenDiscord: boolean;
  discordChannelURL?: string;
}): Promise<void> {
  await copyTextToClipboard(options.text);
  options.notify(`${options.actionLabel} copied to clipboard.`, 2);
  if (options.shouldOpenDiscord && options.discordChannelURL) {
    window.open(options.discordChannelURL);
  }
}
