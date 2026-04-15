import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Must match package.json "homepage" (GitHub Pages subpath).
export default defineConfig({
  base: "/modomator/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    css: true,
    pool: "forks",
  },
});
