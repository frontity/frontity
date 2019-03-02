import { Configuration } from "webpack";
import { Env, Mode } from "../types";

export default ({
  env,
  mode
}: {
  env: Env;
  mode: Mode;
}): Configuration["devtool"] => {
  if (mode === "development" && (env === "module" || env === "node"))
    return "cheap-module-eval-source-map";
  return false;
};
