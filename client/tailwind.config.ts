import type { Config } from 'tailwindcss';
import { COLORS, FONT_FAMILY, FONT_SIZE } from './src/styles';

export default {
  content: [
    './src/page/**/*.{js,ts,jsx,tsx,mdx}',
    './src/component/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: COLORS,
      borderColor: COLORS,
      fontFamily: FONT_FAMILY,
      fontSize: FONT_SIZE,
    },
  },
  plugins: [],
} satisfies Config;
