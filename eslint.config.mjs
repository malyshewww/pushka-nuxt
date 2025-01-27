import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:vue-pug/vue3-recommended"
  ),
  {
    ignores: ["**/.output", "**/.nuxt"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      "no-unused-vars": "warn",
      "vue/first-attribute-linebreak": "off",
      "vue/max-attributes-per-line": "off",
      "vue/multi-word-component-names": "off",
      "no-undef": "off",
      "no-useless-escape": "off",
      "vue/no-v-html": "off",
      "vue/no-child-content": "off",
    },
  },
];
