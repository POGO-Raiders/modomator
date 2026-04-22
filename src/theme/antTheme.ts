import type { ThemeConfig } from "antd";
import { theme as antdTheme } from "antd";

const PGR_RED = "#e93030";

/** Dark-mode surface palette — Discord-adjacent neutral backgrounds. */
const DARK_BG = "#23272a";
const DARK_SURFACE = "#2c2f33";
const DARK_SURFACE_RAISED = "#36393f";
const DARK_DISABLED = "#404449";

/**
 * Component tokens shared between light and dark modes.
 * Card border-radius and Checkbox size are design decisions that don't depend
 * on the colour algorithm, so they live here rather than being duplicated.
 */
const SHARED_COMPONENTS: ThemeConfig["components"] = {
  Card: {
    // 12px matches the card's visual weight in the narrow form layout.
    // Defined here so the CSS border-radius override can be removed.
    borderRadiusLG: 12,
  },
  Checkbox: {
    // 18px improves touch hit area and legibility on dark surfaces.
    // Ant auto-scales the inner checkmark from this value, removing the
    // need for the .ant-checkbox-inner CSS override.
    controlInteractiveSize: 18,
  },
};

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
        ...SHARED_COMPONENTS,
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
      ...SHARED_COMPONENTS,
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
        // buttonCheckedBg omitted — only applies to outline style; all grids
        // use buttonStyle="solid" so this token is never rendered
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
