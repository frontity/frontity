import * as tsNode from "ts-node";

tsNode.register({
  transpileOnly: true,
  compilerOptions: {
    // Target latest version of ECMAScript.
    target: "es2017",
    // Search under node_modules for non-relative imports.
    moduleResolution: "node",
    // commonjs modules.
    module: "commonjs",
    // Allow default imports from modules with no default export.
    allowSyntheticDefaultImports: true,
    // Don't emit; allow Babel to transform files.
    noEmit: true,
    // Import non-ES modules as default imports.
    esModuleInterop: true,
    // Resolve JSON files.
    resolveJsonModule: true,
    // Support for JSX.
    jsx: "react",
    // Transpile JS as well.
    allowJs: true,
  },
});

import "./utils/envs";
import { join } from "path";
import { remove } from "fs-extra";
import { getAllSites } from "@frontity/file-settings";
import generateEntryPoints from "./utils/entry-points";
import getConfig from "../config";
import getFrontity from "../config/frontity";
import { Mode } from "../../types";
import cleanBuildFolders from "./utils/clean-build-folders";
import { webpackAsync } from "./utils/webpack";

export default async ({
  mode,
  target,
  publicPath,
}: {
  mode: Mode;
  target: "both" | "es5" | "module";
  publicPath: string;
}): Promise<void> => {
  console.log(`mode: ${mode}\n`);

  // Get config from frontity.config.js files.
  const frontityConfig = getFrontity();
  const { outDir } = frontityConfig;

  // Create the directories if they don't exist. Clean them if they do.
  await cleanBuildFolders({ outDir });

  // Get all sites configured in frontity.settings.js with their packages.
  const sites = await getAllSites();

  // Generate the bundles. One for the server, one for each client site.
  const entryPoints = await generateEntryPoints({ sites, outDir, mode });

  // Get FrontityConfig for Webpack.
  const config = getConfig({ mode, entryPoints, publicPath });

  // Build and wait until webpack finished the clients first.
  // We need to do this because the server bundle needs to import
  // the client chunks.x.json, which are created by the clients.
  //
  // If target is both or es5, build the es5 bundle.
  if (target !== "module") {
    console.log("Building es5 bundle");
    await webpackAsync(config.webpack.es5);
  }
  // If target is both or module, build the module bundle.
  if (target !== "es5") {
    console.log("Building module bundle");
    await webpackAsync(config.webpack.module);
  }
  console.log("Building server bundle");
  await webpackAsync(config.webpack.server);
  console.log();

  // Remove the bundling folder after the build in production because
  // it is not needed anymore.
  if (mode === "production") await remove(join(outDir, "bundling"));
};
