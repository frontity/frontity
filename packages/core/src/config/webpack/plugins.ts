import { HotModuleReplacementPlugin, Configuration, optimize } from "webpack";
import LoadablePlugin from "@loadable/webpack-plugin";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["plugins"] => {
  const config: Configuration["plugins"] = [];
  // Needed for code splitting.
  if (target !== "es5") config.push(new LoadablePlugin());
  // Support HMR in development.
  if (target === "module" && mode === "development")
    config.push(new HotModuleReplacementPlugin());
  // Avoid code splitting in node.
  if (target === "node")
    config.push(new optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  return config;
};
