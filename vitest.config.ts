import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@musclemap/core": r("./packages/core/src/index.ts"),
      "@musclemap/assets": r("./packages/assets/src/index.ts"),
    },
  },
  test: {
    include: ["packages/*/src/**/*.test.ts"],
  },
});
