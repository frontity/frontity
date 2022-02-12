import { WebpackConfigs, BabelConfigs, EntryPoints } from "../../../types";
import {
  Mode,
  Target,
  WebpackConfig,
  FrontityConfig,
} from "@frontity/types/config";
import name from "./name";
import targets from "./targets";
import devtool from "./devtool";
import entry from "./entry";
import output from "./output";
import modules from "./modules";
import resolve from "./resolve";
import externals from "./externals";
import plugins from "./plugins";
import performance from "./performance";
import stats from "./stats";

/**
 * The options of the {@link webpack} function.
 */
interface WebpackOptions {
  /**
   * The mode of the build: "development" or "production".
   */
  mode: Mode;

  /**
   * The paths of the entry points generated on the fly by Frontity in the
   * `/build/bundling/entry-points folder`.
   */
  entryPoints: EntryPoints[];

  /**
   * The config of Babel, generated in the previous step.
   */
  babel: BabelConfigs;

  /**
   * The config of Frontity, generated in the previous step.
   */
  frontity: FrontityConfig;

  /**
   * Flag indicating if the Bundle Analyzer plugin should be included.
   */
  analyze?: boolean;
}

/**
 * The options of the {@link getConfig} function.
 */
interface ConfigOptions extends WebpackOptions {
  /**
   * The target of the build: "server", "es5" or "module".
   */
  target: Target;
}

/**
 * Generate the Webpack configuration for each one of the targets.
 *
 * @param options - Defined in {@link ConfigOptions}.
 *
 * @returns A Webpack's configuration object.
 */
const getConfig = ({
  target,
  mode,
  entryPoints,
  babel,
  frontity,
  analyze,
}: ConfigOptions): WebpackConfig => ({
  mode,
  name: name({ target }),
  target: targets({ target }),
  devtool: devtool({ mode }),
  entry: entry({ target, mode, entryPoints }),
  output: output({ target, mode, outDir: frontity.outDir }),
  module: modules({ target, babel, mode }),
  resolve: resolve(),
  externals: externals({ target }),
  plugins: plugins({ target, mode, outDir: frontity.outDir, analyze }),
  performance: performance({ target }),
  stats: stats({ mode }),
});

/**
 * Generate the object for Webpack configuration.
 *
 * Official Webpack docs: https://webpack.js.org/.
 *
 * @param options - Defined in {@link WebpackOptions}.
 *
 * @returns The configuration objects for Webpack.
 */
const webpack = (options: WebpackOptions): WebpackConfigs => ({
  module: getConfig({ ...options, target: "module" }),
  es5: getConfig({ ...options, target: "es5" }),
  server: getConfig({ ...options, target: "server" }),
});

export default webpack;
