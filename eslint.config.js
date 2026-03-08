const js = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist', 'node_modules'],
    languageOptions: {
      parserOptions: { project: true },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      semi: ['error', 'always'],
      'no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': ['error'],
      quotes: ['error', 'single'],
      'no-multi-spaces': 'error',
      eqeqeq: 'error',
      'prettier/prettier': ['off', { endOfLine: 'auto' }],
      'linebreak-style': ['error', 'unix'],
      'object-curly-spacing': ['error', 'always'],
      'eol-last': ['error', 'always'],
      'comma-dangle': [2, 'always-multiline'],
      'no-duplicate-imports': ['error', { includeExports: true }],
      '@typescript-eslint/no-explicit-any': ['error'],
      'nonblock-statement-body-position': ['error', 'beside'],
    },
  },
];
