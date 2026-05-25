<<<<<<< HEAD
/* eslint-env node */
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
=======
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
>>>>>>> parent of acba134 (feat: app v1)

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      "react/display-name": "off",
    },
  },
]);
