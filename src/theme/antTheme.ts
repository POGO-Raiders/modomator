import type { ThemeConfig } from "antd";
import { theme as antdTheme } from "antd";

/** Discord-adjacent surfaces; aligns with former public/dark-theme.css intent. */
const DISCORD_BG = "#23272a";
const DISCORD_SURFACE = "#2c2f33";
const DISCORD_ACCENT = "#ffffff";

/**
 * Ant Design theme for the app shell. Light mode uses defaults; dark uses algorithm + tokens
 * so disabled buttons, inputs, and radios stay readable without !important CSS overrides.
 */
export function getAntdTheme(isDark: boolean): ThemeConfig {
  if (!isDark) {
    return {
      algorithm: antdTheme.defaultAlgorithm,
    };
  }

  return {
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorBgLayout: DISCORD_BG,
      colorBgBase: DISCORD_BG,
      colorBgContainer: DISCORD_SURFACE,
      colorBgElevated: DISCORD_SURFACE,
      colorText: "rgba(255, 255, 255, 0.92)",
      colorTextHeading: "#ffffff",
      colorTextDescription: "rgba(255, 255, 255, 0.65)",
      colorTextDisabled: "rgba(255, 255, 255, 0.72)",
      colorBorder: "rgba(255, 255, 255, 0.28)",
      colorBorderSecondary: "rgba(255, 255, 255, 0.2)",
      colorFillSecondary: DISCORD_SURFACE,
      colorFillTertiary: "#36393f",
      colorBgContainerDisabled: "#404449",
    },
    components: {
      Layout: {
        bodyBg: DISCORD_BG,
        headerBg: "transparent",
        footerBg: "transparent",
      },
      Button: {
        defaultBg: "#4a4f55",
        defaultBorderColor: "rgba(255, 255, 255, 0.45)",
        defaultColor: "#ffffff",
        borderColorDisabled: "rgba(255, 255, 255, 0.38)",
      },
      Input: {
        colorBgContainer: DISCORD_SURFACE,
        colorBorder: "rgba(255, 255, 255, 0.25)",
        hoverBorderColor: DISCORD_ACCENT,
        activeBorderColor: DISCORD_ACCENT,
      },
      InputNumber: {
        colorBgContainer: DISCORD_SURFACE,
        hoverBorderColor: DISCORD_ACCENT,
        activeBorderColor: DISCORD_ACCENT,
      },
      Radio: {
        buttonBg: DISCORD_SURFACE,
        buttonCheckedBg: DISCORD_SURFACE,
        buttonSolidCheckedBg: "#5865f2",
        buttonSolidCheckedHoverBg: "#4752c4",
        buttonSolidCheckedActiveBg: "#3c45a5",
        buttonSolidCheckedColor: "#ffffff",
        buttonColor: "rgba(255, 255, 255, 0.92)",
        buttonPaddingInline: 12,
      },
      Timeline: {
        dotBg: "transparent",
        tailColor: "rgba(255, 255, 255, 0.25)",
      },
    },
  };
}
