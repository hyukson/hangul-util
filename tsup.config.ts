import { defineConfig } from "tsup";

export default defineConfig([
  // ESM + CJS 빌드
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    outDir: "dist",
    splitting: false,
    sourcemap: true,
    treeshake: true,
  },
  // 브라우저 번들 (IIFE)
  {
    entry: ["src/index.ts"],
    format: ["iife"],
    globalName: "H",
    outDir: "dist",
    outExtension: () => ({ js: ".browser.js" }),
    minify: true,
  },
]);
