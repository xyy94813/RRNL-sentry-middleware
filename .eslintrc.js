module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  extends: ['airbnb-base'],
  rules: {
    'arrow-parens': ['warn', 'as-needed'],
    'object-curly-newline': ['off'],
    'no-confusing-arrow': ['off'],
    'implicit-arrow-linebreak': ['off'],
    'function-paren-newline': ['off'],
  },
  env: {
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
      },
    },
  ],
};
