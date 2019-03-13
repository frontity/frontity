import LoadablePlugin from "@loadable/webpack-plugin";
import {
  HotModuleReplacementPlugin,
  Configuration,
  optimize,
  WatchIgnorePlugin
} from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { Target, Mode } from "../../types";

const buildDir = "build";
const analyzeDir = "analyze";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["plugins"] => {
  const config: Configuration["plugins"] = [
    // Create HTML files for bundle analyzing.
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: `../${
        target !== "server" ? `../` : ""
      }${analyzeDir}/${target}-${mode}.html`,
      openAnalyzer: false,
      logLevel: "silent"
    }),
    // Don't rebuild on changes of the build folder.
    new WatchIgnorePlugin([new RegExp(buildDir)])
  ];

  // Support HMR in development. Only needed in client.
  if (target !== "server" && mode === "development")
    config.push(new HotModuleReplacementPlugin());

  // Needed for code splitting in client.
  if (target !== "server")
    config.push(
      new LoadablePlugin({
        filename: "../client-chunks.json"
      })
    );

  // Avoid code splitting in server.
  if (target === "server")
    config.push(new optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  return config;
};
