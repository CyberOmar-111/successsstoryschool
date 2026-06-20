import { build } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "dist-site");
const builtBundle = path.join(outDir, "school-app.js");
const deployedBundle = path.join(root, "school-app.js");

await fs.rm(outDir, { recursive: true, force: true });
await build({
  configFile: path.join(root, "vite.config.mjs"),
  build: {
    outDir,
    emptyOutDir: true,
  },
});
await fs.copyFile(builtBundle, deployedBundle);
const bundle = await fs.readFile(deployedBundle, "utf8");
await fs.writeFile(deployedBundle, bundle.replace(/[ \t]+$/gm, ""));
await fs.rm(outDir, { recursive: true, force: true });
