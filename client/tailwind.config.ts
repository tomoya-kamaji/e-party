import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#F4F5F7', // メイン背景
          dark: '#0079BF', // ダーク背景
        },
        card: {
          DEFAULT: '#FFFFFF', // カード背景
          hover: '#EBECF0', // カードホバー
        },
        text: {
          primary: '#172B4D', // メイン文字色
          muted: '#5E6C84', // サブ文字色
        },
        accent: {
          green: '#61BD4F', // 成功
          yellow: '#F2D600', // 警告
          blue: '#0079BF', // アクティブ
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
