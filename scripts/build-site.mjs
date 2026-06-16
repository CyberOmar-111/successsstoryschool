import { build } from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const reactGlobal = path.join(root, "src", "carousel", "react-global.js");
const reactJsxRuntime = path.join(root, "src", "carousel", "react-jsx-runtime.js");

await build({
  entryPoints: [path.join(root, "src", "site", "index.jsx")],
  outfile: path.join(root, "school-app.js"),
  bundle: true,
  format: "iife",
  jsx: "automatic",
  platform: "browser",
  target: ["es2020"],
  alias: {
    react: reactGlobal,
    "react/jsx-runtime": reactJsxRuntime,
    "react/jsx-dev-runtime": reactJsxRuntime
  }
});
