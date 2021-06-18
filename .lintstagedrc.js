module.exports = {
  '*.{js,json,css,less,html,md,ts}': [
    'npx prettier-eslint --config .prettierrc --eslint-config-path .eslintrc.js --write',
  ],
};
