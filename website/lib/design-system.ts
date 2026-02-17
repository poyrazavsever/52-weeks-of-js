/**
 * 52 Weeks of JavaScript - Design System
 * A minimal, refined, and sophisticated design system
 * Primary Color: Red-600
 */

export const designSystem = {
  /**
   * COLOR PALETTE
   * Using Tailwind color system with red-600 as primary
   */
  colors: {
    primary: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626", // Primary Brand Color
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    semantic: {
      success: "#10b981",
      warning: "#f59e0b",
      error: "#dc2626",
      info: "#3b82f6",
    },
    surface: {
      base: "#ffffff",
      elevated: "#f9fafb",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
  },

  /**
   * TYPOGRAPHY
   * Minimal, refined scale - smaller and more sophisticated
   */
  typography: {
    fontFamily: {
      sans: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "var(--font-mono), 'Courier New', monospace",
      display: "var(--font-agbalumo), cursive",
    },
    fontSize: {
      // Body text
      xs: ["0.6875rem", { lineHeight: "1rem" }], // 11px
      sm: ["0.8125rem", { lineHeight: "1.25rem" }], // 13px
      base: ["0.875rem", { lineHeight: "1.5rem" }], // 14px
      md: ["0.9375rem", { lineHeight: "1.5rem" }], // 15px

      // Headings - refined and minimal
      lg: ["1rem", { lineHeight: "1.5rem" }], // 16px
      xl: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
      "2xl": ["1.375rem", { lineHeight: "2rem" }], // 22px
      "3xl": ["1.75rem", { lineHeight: "2.25rem" }], // 28px
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
      "5xl": ["2.75rem", { lineHeight: "3rem" }], // 44px
      "6xl": ["3.5rem", { lineHeight: "3.5rem" }], // 56px
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    letterSpacing: {
      tighter: "-0.02em",
      tight: "-0.01em",
      normal: "0",
      wide: "0.01em",
      wider: "0.02em",
      widest: "0.05em",
    },
  },

  /**
   * SPACING
   * Consistent 4px-based scale
   */
  spacing: {
    0: "0",
    0.5: "0.125rem", // 2px
    1: "0.25rem", // 4px
    1.5: "0.375rem", // 6px
    2: "0.5rem", // 8px
    2.5: "0.625rem", // 10px
    3: "0.75rem", // 12px
    3.5: "0.875rem", // 14px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    7: "1.75rem", // 28px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    14: "3.5rem", // 56px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
  },

  /**
   * CONTAINER
   * Narrower, more focused content widths
   */
  container: {
    xs: "20rem", // 320px
    sm: "24rem", // 384px
    md: "32rem", // 512px
    lg: "42rem", // 672px
    xl: "52rem", // 832px
    "2xl": "60rem", // 960px
    "3xl": "68rem", // 1088px
    full: "100%",
  },

  /**
   * BREAKPOINTS
   * Mobile-first responsive design
   */
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  /**
   * BORDER RADIUS
   * Subtle, refined corners
   */
  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    base: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    full: "9999px",
  },

  /**
   * SHADOWS
   * Subtle, minimal elevation
   */
  shadows: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
  },

  /**
   * TRANSITIONS
   * Smooth, refined animations
   */
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
    slower: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
  },

  /**
   * Z-INDEX
   * Layering system
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },

  /**
   * BORDERS
   * Minimal border styles
   */
  borders: {
    width: {
      none: "0",
      thin: "1px",
      base: "2px",
      thick: "3px",
    },
    style: {
      solid: "solid",
      dashed: "dashed",
      dotted: "dotted",
    },
  },
} as const;

/**
 * COMPONENT-SPECIFIC TOKENS
 */
export const components = {
  button: {
    sizes: {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1.5 text-sm",
      base: "px-4 py-2 text-base",
      lg: "px-5 py-2.5 text-md",
      xl: "px-6 py-3 text-lg",
    },
    variants: {
      primary: "bg-red-600 hover:bg-red-700 text-white",
      secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
      outline: "border-2 border-red-600 text-red-600 hover:bg-red-50",
      ghost: "text-gray-700 hover:bg-gray-100",
    },
  },
  card: {
    padding: {
      sm: "p-3",
      base: "p-4",
      lg: "p-6",
    },
    border: "border border-gray-200",
    shadow: "shadow-sm hover:shadow-md",
  },
  input: {
    base: "px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent",
  },
} as const;

export type DesignSystem = typeof designSystem;
export type Components = typeof components;
