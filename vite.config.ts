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
    coverage: {
      provider: "v8",
      // Only measure source files — exclude tests, the app entry point,
      // ambient declarations, and the deployment script.
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/main.tsx",
        "src/react-app-env.d.ts",
        "src/setupTests.ts",
        "src/**/*.test.{ts,tsx}",
      ],
      reporter: ["text", "lcov"],
    },
  },
});
