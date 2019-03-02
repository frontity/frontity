import { HotModuleReplacementPlugin, Configuration } from "webpack";
import LoadablePlugin from "@loadable/webpack-plugin";
import { Env, Mode } from "../types";

export default ({
  env,
  mode
}: {
  env: Env;
  mode: Mode;
}): Configuration["plugins"] => {
  const config: Configuration["plugins"] = [];
  if (env !== "es5") config.push(new LoadablePlugin());
  if (env === "module" && mode === "development")
    config.push(new HotModuleReplacementPlugin());
  return config;
};
