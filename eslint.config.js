import js from '@eslint/js';
import globals from 'globals';

export default [
  // Apply default recommended rules
  js.configs.recommended,

  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // Injects Node.js global variables like 'process' or '__dirname'
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Force strict adherence to constants
      'prefer-const': 'error',

      // Catch accidental console remnants
      'no-console': 'warn',

      // Ban the dangerous use of var
      'no-var': 'error',

      // Prevent execution blocks with unused references
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Mandate semicolon uniformity
      semi: ['error', 'always'],
    },
  },
];
