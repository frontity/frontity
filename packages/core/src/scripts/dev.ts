import * as tsNode from "ts-node";

/**
 * This file gets transpiled to JS anyway, but if the users's frontity.settings.(js|ts)
 * is an ES Module, we cannot require an ES Module from a commonjs module!
 *
 * This is why we use ts-node here as well as in the `build` script. It's ONLY
 * because we want the user to be able to use ES Modules syntax in the
 * frontity.settings.(js|ts) file like:
 *
 * ```
 * export default {
 *   name: 'my-theme',
 *   state: {},
 *   packages: {},
 * }
 * ```
 *
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
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { getAllSites } from "@frontity/file-settings";
import createApp from "./utils/create-app";
import HotServer from "./utils/hot-server";
import generateEntryPoints from "./utils/entry-points";
import getConfig from "../config";
import getFrontity from "../config/frontity";
import { Mode } from "../../types";
import cleanBuildFolders from "./utils/clean-build-folders";
import { webpackAsync } from "./utils/webpack";
import createSymlinks from "./utils/create-symlinks";

// Start Frontity development environment.
export default async ({
  isHttps,
  mode,
  port,
  target,
  openBrowser = true,
  publicPath,
}: {
  port: number;
  isHttps: boolean;
  mode: Mode;
  target: "es5" | "module";
  openBrowser?: boolean;
  publicPath: string;
}): Promise<void> => {
  // Get config from frontity.config.js files.
  const frontityConfig = getFrontity();
  const { outDir } = frontityConfig;

  // Create symlinks for internal packages
  await createSymlinks();

  // Create the directories if they don't exist, clean them if they do.
  await cleanBuildFolders({ outDir });

  // Get all sites configured in frontity.settings.js with their packages.
  const sites = await getAllSites();

  // Generate the bundles. One for the server, one for each client site.
  const entryPoints = await generateEntryPoints({ sites, outDir, mode });

  // Start dev using webpack dev server with express.
  const { app, done } = await createApp({
    mode,
    port,
    isHttps,
    target,
    openBrowser,
  });

  // Get config for webpack, babel and frontity.
  const config = getConfig({ mode, entryPoints, publicPath });

  // Build and wait until webpack finished the client first.
  // We need to do this because the server bundle needs to import
  // the client loadable-stats, which are created by the client Webpack.
  const clientWebpack =
    target === "es5" ? config.webpack.es5 : config.webpack.module;
  await webpackAsync(clientWebpack);

  // Start a custom webpack-dev-server.
  const compiler = webpack([clientWebpack, config.webpack.server]);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: clientWebpack.output.publicPath,
      writeToDisk: true,
      stats: {
        all: false,
        hash: false,
        assets: true,
        colors: true,
        errors: true,
        warnings: true,
        errorDetails: true,
        excludeAssets: /chunks\..*?\.json/,
      },
    })
  );
  app.use(webpackHotMiddleware(compiler.compilers[0]));
  app.use(HotServer(compiler));

  // Start listening once webpack finishes.
  done(compiler);
};
