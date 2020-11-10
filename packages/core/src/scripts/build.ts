import * as tsNode from "ts-node";

/**
 * This file gets transpiled to JS anyway, but if the users's
 * frontity.settings.(js|ts) is an ES Module, we cannot require an ES Module
 * from a commonjs module.
 *
 * This is why we use ts-node here as well as in the `dev` script.
 * It's only because we want the user to be able to use ES Modules syntax in
 * the frontity.settings.(js|ts) file like this.
 *
 * @example
 * ```js
 * export default {
 *   name: 'my-theme',
 *   state: {},
 *   packages: {},
 * }
 * ```
 */
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

/**
 * The options of the build command.
 */
export interface BuildOptions {
  /**
   * The Webpack mode used, either "development" or "production".
   *
   * @defaultValue "production"
   */
  mode: Mode;

  /**
   * The JavaScript transpilation target. Either "es5" or "module".
   *
   * @defaultValue "both"
   */
  target: "es5" | "module" | "both";

  /**
   * The publicPath used in Webpack.
   *
   * @defaultValue "/static/"
   */
  publicPath: string;
}

/**
 * The Frontity build command that creates all the bundles and assets necessary
 * to run the Frontity server.
 *
 * @param options - Defined in {@link BuildOptions}.
 *
 * @returns A promise that resolves when the build has finished.
 */
export default async ({
  mode = "production",
  target = "both",
  publicPath = "/static/",
}: BuildOptions): Promise<void> => {
  console.log();
  console.log(`  - mode: ${mode}`);
  console.log(`  - target: ${target}`);
  console.log(`  - public-path: ${publicPath}`);
  console.log();

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
