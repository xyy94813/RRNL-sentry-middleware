module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-base'],
  rules: {
    'arrow-parens': ['warn', 'as-needed'],
    'object-curly-newline': ['off'],
    'no-confusing-arrow': ['off'],
    'implicit-arrow-linebreak': ['off'],
    'function-paren-newline': ['off'],
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
