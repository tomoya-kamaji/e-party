import type { ThemeConfig } from 'tailwindcss/types/config';

export const FONT_SIZE: ThemeConfig['fontSize'] = {
  '2xs': [
    '0.625rem',
    {
      lineHeight: '16px',
    },
  ],
  xs: [
    '0.75rem',
    {
      lineHeight: '16px',
    },
  ],
  sm: [
    '0.875rem',
    {
      lineHeight: '20px',
    },
  ],
  base: [
    '1rem',
    {
      lineHeight: '24px',
    },
  ],
  lg: [
    '1.125rem',
    {
      lineHeight: '28px',
    },
  ],
  xl: [
    '1.25rem',
    {
      lineHeight: '28px',
    },
  ],
  '2xl': [
    '1.5rem',
    {
      lineHeight: '32px',
    },
  ],
  '3xl': [
    '1.875rem',
    {
      lineHeight: '36px',
    },
  ],
  '4xl': [
    '2.25rem',
    {
      lineHeight: '40px',
    },
  ],
  '5xl': [
    '3rem',
    {
      lineHeight: '48px',
    },
  ],
} satisfies ThemeConfig['fontSize'];
