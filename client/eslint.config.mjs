import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  root: true,
  extends: [
    'next',
    'plugin:storybook/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:import/typescript',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  ignores: ['node_modules', 'dist'],
  ignorePatterns: [
    '.next',
    '.storybook',
    '.eslintrc.json',
    '.prettierignore',
    '.prettierrc.js',
    'tailwind.config.ts',
    'postcss.config.js',
    'yarn.lock',
    'next.config.js',
    'next-env.d.ts',
    'schema',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-refresh', 'import', '@typescript-eslint', 'unused-imports'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: '.',
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        pathGroups: [
          {
            pattern: '@/lib/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/repository/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/hooks/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/globalStates/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/routes/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/providers/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/layouts/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/features/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/sections/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/shared/**',
            group: 'internal',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'unused-imports/no-unused-imports': ['error'],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unsafe-return': ['off'],
    '@typescript-eslint/no-unsafe-call': ['off'],
    '@typescript-eslint/no-unsafe-member-access': ['off'],
    '@typescript-eslint/no-unsafe-assignment': ['off'],
    '@typescript-eslint/no-misused-promises': [
      'off',
      {
        voidReturnVariable: false,
      },
    ],
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'no-console': 'warn',
  },
});
