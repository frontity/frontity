import ignore from "./utils/ts-node-ignore";
import * as tsNode from "ts-node";

/**
 * This file gets transpiled to JS anyway, but if the users's
 * frontity.settings.(js|ts) is an ES Module, we cannot require an ES Module
 * from a commonjs module.
 *
 * This is why we use ts-node here as well as in the `build` script.
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
  ignore,
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
    // Support for JSX runtime.
    jsx: "react-jsx",
    // Support for emotion css prop with types
    jsxImportSource: "@emotion/react",
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
import { Mode } from "@frontity/types/config";
import cleanBuildFolders from "./utils/clean-build-folders";
import { webpackAsync } from "./utils/webpack";
import createSymlinks from "./utils/create-symlinks";
import { readConfigurationsFromConfigFiles } from "./utils/read-configuration";

/**
 * The options of the dev command.
 */
export interface DevOptions {
  /**
   * The Webpack mode used, either "development" or "production".
   *
   * @defaultValue "development"
   */
  mode: Mode;

  /**
   * The port used to start the server.
   *
   * @defaultValue 3000
   */
  port: number;

  /**
   * Indicate if the server should be started using HTTPS. The certs used
   * are in the /certs folder of this package. They are valid only for local
   * usage.
   *
   * @defaultValue false
   */
  isHttps: boolean;

  /**
   * The JavaScript transpilation target. Either "es5" or "module".
   *
   * @defaultValue "module"
   */
  target: "es5" | "module";

  /**
   * If this command should open a browser or not.
   *
   * @defaultValue true
   */
  openBrowser?: boolean;

  /**
   * The publicPath used in Webpack.
   *
   * @defaultValue "/static/"
   */
  publicPath: string;

  /**
   * Indicate if the Bundle Analyzer plugin should be included in the Webpack
   * configuration, in order to generate HTML files for bundle analyzing.
   *
   * @defaultValue false
   */
  analyze?: boolean;

  /**
   * The name of the site you want to start.
   */
  siteName?: string;
}

/**
 * The Frontity dev command that starts a development Frontity server.
 *
 * @param options - Defined in {@link DevOptions}.
 *
 * @returns A promise that resolves when the server has started.
 */
export default async ({
  isHttps,
  mode,
  port,
  target,
  openBrowser = true,
  publicPath = "/static/",
  analyze,
  siteName,
}: DevOptions): Promise<void> => {
  // Get config from frontity.config.js files.
  const frontityConfig = getFrontity();
  const { outDir } = frontityConfig;

  // Create symlinks for internal packages
  await createSymlinks();

  // Create the directories if they don't exist, clean them if they do.
  await cleanBuildFolders({ outDir });

  // Get all sites configured in frontity.settings.js with their packages.
  let sites = await getAllSites();

  // If there's no siteName and we have more than one site configuration.
  if (!siteName && sites.length > 1) {
    throw { sites };
  }

  // Filter out the sites based on the siteName and only if we have more than one.
  if (sites.length > 1) {
    sites = sites.filter((site) => site.name === siteName);
  } else {
    // If we only have one configuration
    siteName = sites[0].name;
  }

  // Generate the bundles. One for the server, one for each client site.
  const entryPoints = await generateEntryPoints({ sites, outDir, mode });

  // Start dev using webpack dev server with express.
  const { app, done } = await createApp({
    mode,
    port,
    isHttps,
    target,
    openBrowser,
    publicPath,
    siteName,
  });

  // Read the extra configurations from files.
  const extraConfigurations = await readConfigurationsFromConfigFiles(sites);

  // Get config for webpack, babel and frontity.
  const config = getConfig({
    mode,
    entryPoints,
    analyze,
    extraConfigurations,
  });

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
      writeToDisk: true,
    })
  );
  app.use(webpackHotMiddleware(compiler.compilers[0]));
  app.use(HotServer(compiler));

  // Start listening once webpack finishes.
  done(compiler);
};
