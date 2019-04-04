import LoadablePlugin from "@loadable/webpack-plugin";
import {
  HotModuleReplacementPlugin,
  Configuration,
  optimize,
  WatchIgnorePlugin
} from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode,
  outDir
}: {
  target: Target;
  mode: Mode;
  outDir: string;
}): Configuration["plugins"] => {
  const config: Configuration["plugins"] = [
    // Create HTML files for bundle analyzing.
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: `${
        target !== "server" ? `../` : ""
      }analyze/${target}-${mode}.html`,
      openAnalyzer: false,
      logLevel: "silent"
    }),
    new WatchIgnorePlugin([new RegExp(outDir)])
  ];

  // Support HMR in development. Only needed in client.
  if (target !== "server" && mode === "development")
    config.push(new HotModuleReplacementPlugin());

  // Needed for code splitting in client.
  if (target !== "server")
    config.push(
      new LoadablePlugin({
        filename: `../bundling/client-chunks.json`
      })
    );

  // Avoid code splitting in server.
  if (target === "server")
    config.push(new optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  return config;
};
