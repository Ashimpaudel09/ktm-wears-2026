import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  //  MUST be first and MUST NOT have "files"
  {
    ignores: ["build/**", "dist/**", ".react-router/**", "node_modules/**"],
  },

  // Base JS rules
  js.configs.recommended,

  // TS rules
  ...tseslint.configs.recommended,

  // React rules
  pluginReact.configs.flat.recommended,

  // Your overrides
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-empty": "off",
      "no-empty-pattern": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "react/prop-types": "off",
    },
  },
]);
