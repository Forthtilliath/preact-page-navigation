import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pkg": path.resolve(__dirname, "./lib/index.ts"),
    },
  },
  define: {
    global: {},
  },
});
