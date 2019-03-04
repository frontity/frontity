import { HotModuleReplacementPlugin, Configuration, optimize } from "webpack";
import LoadablePlugin from "@loadable/webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["plugins"] => {
  const config: Configuration["plugins"] = [
    // Needed for code splitting.
    new LoadablePlugin(),
    // Create HTML files for bundle analyzing.
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: `../../build/analyze/${target}-${mode}.html`,
      openAnalyzer: false
    })
  ];
  config.push();
  // Support HMR in development. Only needed in client.
  if (target !== "node" && mode === "development")
    config.push(new HotModuleReplacementPlugin());
  // Avoid code splitting in node.
  if (target === "node")
    config.push(new optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  return config;
};
