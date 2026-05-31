/**
 * Post-build script to prepare Nitro output for Vercel deployment.
 * Copies the Nitro build from dist/ into .vercel/output/ in the format
 * Vercel expects for serverless functions.
 */
import fs from "node:fs";
import path from "node:path";
import { nodeFileTrace } from "@vercel/nft";

const projectRoot = path.resolve(".");
const distDir = path.resolve("dist");
const outputDir = path.resolve(".vercel/output");
const funcDir = path.join(outputDir, "functions", "index.func");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

async function main() {
  if (!fs.existsSync(distDir)) {
    console.error("dist/ directory not found. Run `vite build` first.");
    process.exit(1);
  }

  // Clean and recreate output directory
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(funcDir, { recursive: true });

  const serverDir = path.join(distDir, "server");
  if (!fs.existsSync(serverDir)) {
    console.error("dist/server directory not found. Ensure Nitro server output exists in dist/.");
    process.exit(1);
  }

  const handlerName = "server.js";
  const entryFile = path.join(serverDir, handlerName);
  if (!fs.existsSync(entryFile)) {
    console.error("dist/server/server.js not found. Ensure Nitro output is valid.");
    process.exit(1);
  }

  // Trace runtime dependencies and copy only what the function needs.
  const { fileList, warnings } = await nodeFileTrace([entryFile], { base: projectRoot });
  for (const warning of warnings) {
    console.warn(warning.message);
  }

  for (const file of fileList) {
    if (file.startsWith("dist/server/")) {
      const relPath = file.replace(/^dist\/server\//, "");
      copyFile(path.join(projectRoot, file), path.join(funcDir, relPath));
      continue;
    }
    if (file.startsWith("node_modules/")) {
      copyFile(path.join(projectRoot, file), path.join(funcDir, file));
    }
  }

  // Create .vc-config.json for the function
  fs.writeFileSync(
    path.join(funcDir, ".vc-config.json"),
    JSON.stringify(
      {
        runtime: "nodejs20.x",
        handler: handlerName,
        launcherType: "Nodejs",
        supportsResponseStreaming: true,
      },
      null,
      2,
    ),
  );

  // Copy static client assets
  const staticDir = path.join(outputDir, "static");
  fs.mkdirSync(staticDir, { recursive: true });
  if (fs.existsSync(path.join(distDir, "client"))) {
    copyDir(path.join(distDir, "client"), staticDir);
  }

  // Create Vercel config.json
  fs.writeFileSync(
    path.join(outputDir, "config.json"),
    JSON.stringify(
      {
        version: 3,
        routes: [
          {
            src: "/assets/(.*)",
            headers: { "Cache-Control": "public, max-age=31536000, immutable" },
            continue: true,
          },
          {
            handle: "filesystem",
          },
          {
            src: "/(.*)",
            dest: "/",
          },
        ],
      },
      null,
      2,
    ),
  );

  console.log("✅ Vercel output prepared in .vercel/output/");
}

await main();
