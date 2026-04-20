import type { ThemeConfig } from "antd";
import { theme as antdTheme } from "antd";

const PGR_RED = "#e93030";

/** Dark-mode surface palette — Discord-adjacent neutral backgrounds. */
const DARK_BG = "#23272a";
const DARK_SURFACE = "#2c2f33";
const DARK_SURFACE_RAISED = "#36393f";
const DARK_DISABLED = "#404449";

/**
 * Ant Design theme for the app shell.
 * Both modes share `colorPrimary: PGR_RED` so selected radio buttons, the
 * primary Copy button, and input focus rings all use the same brand color.
 * Dark mode adds neutral-surface overrides; everything else derives from the
 * algorithm + colorPrimary, keeping components consistent without !important hacks.
 */
export function getAntdTheme(isDark: boolean): ThemeConfig {
  if (!isDark) {
    return {
      algorithm: antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: PGR_RED,
      },
      components: {
        Layout: {
          headerBg: "transparent",
          footerBg: "transparent",
        },
      },
    };
  }

  return {
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorPrimary: PGR_RED,
      colorBgLayout: DARK_BG,
      colorBgBase: DARK_BG,
      colorBgContainer: DARK_SURFACE,
      colorBgElevated: DARK_SURFACE,
      colorText: "rgba(255, 255, 255, 0.92)",
      colorTextHeading: "#ffffff",
      colorTextDescription: "rgba(255, 255, 255, 0.65)",
      colorTextDisabled: "rgba(255, 255, 255, 0.72)",
      colorBorder: "rgba(255, 255, 255, 0.28)",
      colorBorderSecondary: "rgba(255, 255, 255, 0.2)",
      colorFillSecondary: DARK_SURFACE,
      colorFillTertiary: DARK_SURFACE_RAISED,
      colorBgContainerDisabled: DARK_DISABLED,
    },
    components: {
      Layout: {
        bodyBg: DARK_BG,
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
        colorBgContainer: DARK_SURFACE,
        colorBorder: "rgba(255, 255, 255, 0.25)",
        // hover/active border color derives from colorPrimary
      },
      InputNumber: {
        colorBgContainer: DARK_SURFACE,
        // hover/active border color derives from colorPrimary
      },
      Radio: {
        buttonBg: DARK_SURFACE,
        buttonCheckedBg: DARK_SURFACE,
        // buttonSolidCheckedBg derives from colorPrimary — no override needed
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
