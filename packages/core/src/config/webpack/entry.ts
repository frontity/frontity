import { resolve } from "path";
import { Configuration } from "webpack";
import { Env, Mode } from "../types";

export default ({
  env,
  mode
}: {
  env: Env;
  mode: Mode;
}): Configuration["entry"] => {
  const name: "server" | "client" = env === "node" ? "server" : "client";
  const config: Configuration["entry"] = [resolve(__dirname, `../${name}`)];
  if (env === "module" && mode === "development") {
    config.unshift("webpack-hot-middleware/client");
  }
  return config;
};
