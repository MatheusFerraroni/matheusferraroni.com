#!/usr/bin/env node

import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const temporaryDirectory = await mkdtemp(resolve(tmpdir(), "personal-website-css-"));
const temporaryCssPath = resolve(temporaryDirectory, "styles.css");
const tailwindExecutable = resolve(
  projectRoot,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "tailwindcss.cmd" : "tailwindcss"
);

try {
  const result = spawnSync(
    tailwindExecutable,
    [
      "-i",
      resolve(projectRoot, "assets/css/tailwind.css"),
      "-o",
      temporaryCssPath,
      "--minify",
    ],
    { cwd: projectRoot, encoding: "utf8" }
  );

  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout || "Tailwind CSS compilation failed.\n");
    process.exitCode = result.status || 1;
  } else {
    const [expectedCss, generatedCss] = await Promise.all([
      readFile(resolve(projectRoot, "assets/css/styles.css")),
      readFile(temporaryCssPath),
    ]);

    if (!expectedCss.equals(generatedCss)) {
      console.error("Compiled CSS is stale. Run `npm run build:css` to regenerate it.");
      process.exitCode = 1;
    } else {
      console.log("Compiled CSS is current.");
    }
  }
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
