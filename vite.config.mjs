import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: path.resolve(root, "dist-site"),
    emptyOutDir: true,
    target: "es2020",
    minify: "esbuild",
    sourcemap: false,
    lib: {
      entry: path.resolve(root, "src/site/index.jsx"),
      name: "SuccessStorySchool",
      formats: ["iife"],
      fileName: () => "school-app.js",
    },
    rollupOptions: {
      output: {
        entryFileNames: "school-app.js",
      },
    },
  },
});
