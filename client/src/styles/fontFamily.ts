import type { ThemeConfig } from "tailwindcss/types/config";

export const FONT_FAMILY: ThemeConfig["fontFamily"] = {
  inter: "var(--font-inter)",
  "noto-sans-jp": "var(--font-sans)",
} satisfies ThemeConfig["fontFamily"];
