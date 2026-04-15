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
  return Promise.reject(new Error("The Clipboard API is not available."));
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
