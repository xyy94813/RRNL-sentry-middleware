module.exports = {
  '*.{js,ts,mjs}': ['npx eslint --fix'],
  '*.{json,css,less,html,md}': ['npx prettier --write'],
};
