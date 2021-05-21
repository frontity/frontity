import LoadablePlugin from "@loadable/webpack-plugin";
import {
  HotModuleReplacementPlugin,
  Configuration,
  optimize,
  WatchIgnorePlugin,
  IgnorePlugin,
} from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { Target, Mode } from "@frontity/types/config";

/**
 * The options for the {@link plugins} function.
 */
interface PluginsOptions {
  /**
   * The target of the build: "server", "es5" or "module".
   */
  target: Target;

  /**
   * The mode of the build: "development" or "production".
   */
  mode: Mode;

  /**
   * The output directory.
   */
  outDir: string;

  /**
   * Flag indicating if the Bundle Analyzer plugin should be included.
   */
  analyze: boolean;
}

/**
 * Generate the object for Webpack's plugins configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/plugins/.
 *
 * @param options - Object of type {@link PluginsOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const plugins = ({
  target,
  mode,
  outDir,
  analyze,
}: PluginsOptions): Configuration["plugins"] => {
  const config: Configuration["plugins"] = [];

  // Create HTML files for bundle analyzing.
  if (analyze)
    config.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: `${
          target !== "server" ? `../` : ""
        }analyze/${target}-${mode}.html`,
        openAnalyzer: false,
        logLevel: "silent",
      })
    );

  // Ignore some files and folders.
  config.push(
    new WatchIgnorePlugin([new RegExp(outDir)]),
    new IgnorePlugin(/^encoding$/)
  );

  // Support HMR in development. Only needed in client.
  if (target !== "server" && mode === "development")
    config.push(new HotModuleReplacementPlugin());

  // Needed for code splitting in client.
  if (target !== "server")
    config.push(
      new LoadablePlugin({
        filename: `../bundling/chunks.${target}.json`,
      })
    );

  // Avoid code splitting in server.
  if (target === "server")
    config.push(new optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  return config;
};

export default plugins;
