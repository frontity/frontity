import { HotModuleReplacementPlugin, Configuration, optimize } from "webpack";
import LoadablePlugin from "@loadable/webpack-plugin";
import { Target, Mode } from "../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["plugins"] => {
  const config: Configuration["plugins"] = [];
  if (target !== "es5") config.push(new LoadablePlugin());
  if (target === "module" && mode === "development")
    config.push(new HotModuleReplacementPlugin());
  if (target === "node")
    config.push(new optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  return config;
};
