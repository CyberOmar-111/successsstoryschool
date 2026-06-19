import { build } from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await build({
  absWorkingDir: root,
  entryPoints: ["src/carousel/index.jsx"],
  outfile: "school-carousel.js",
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  jsx: "automatic",
  minify: false,
  alias: {
    react: "./src/carousel/react-global.js",
    "react/jsx-runtime": "./src/carousel/react-jsx-runtime.js",
    "react/jsx-dev-runtime": "./src/carousel/react-jsx-runtime.js"
  },
  logLevel: "info"
});
