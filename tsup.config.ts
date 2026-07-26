import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/index.ts"],
  format: ["esm", "cjs"],
  outDir: "dist-lib",
  tsconfig: "tsconfig.lib.json",
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["preact"],
  esbuildOptions(options) {
    options.jsx = "automatic";
    options.jsxImportSource = "preact";
  },
});
