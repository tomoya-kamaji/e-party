import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  root: true,
  extends: [
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
  ignorePatterns: [
    'node_modules',
    'dist',
    '.eslintrc.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '*.config.js',
    '*.config.ts',
    'schema',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'unused-imports'],
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
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'no-console': 'warn',
  },
});
