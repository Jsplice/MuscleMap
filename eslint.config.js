import js from "@eslint/js";
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";

/**
 * Flat ESLint config. Applies the SonarQube/SonarJS rule set
 * (eslint-plugin-sonarjs) on top of the typescript-eslint recommended rules.
 */
export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "apps/playground/dist/**",
      // Machine-generated body diagram data (emitted path strings, not hand-maintained).
      "packages/assets/src/male-front.ts",
      "packages/assets/src/male-back.ts",
      "packages/assets/src/female-front.ts",
      "packages/assets/src/female-back.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
  },
);
