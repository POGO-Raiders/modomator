import path from "node:path";
import { defineConfig } from "vitest/config";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { visualizer } from "rollup-plugin-visualizer";
import { imagetools } from "vite-imagetools";

// Must match package.json "homepage" (GitHub Pages subpath).
export default defineConfig({
  base: "/modomator/",
  plugins: [
    babel({
      presets: [reactCompilerPreset()],
    }),
    react(),
    imagetools({
      defaultDirectives: () => new URLSearchParams({ format: "webp", quality: "80", as: "url" }),
    }),
    visualizer({ open: false, filename: "build/stats.html" }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  build: {
    outDir: "build",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules[/\\](?:react-router)[/\\]/.test(id)) return "vendor-router";
          if (/node_modules[/\\](?:react|react-dom)[/\\]/.test(id)) return "vendor-react";
          if (/node_modules[/\\](?:antd|@ant-design)[/\\]/.test(id)) return "vendor-antd";
        },
      },
    },
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
