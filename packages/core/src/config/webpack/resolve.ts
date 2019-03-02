import { Configuration } from "webpack";
import { Env, Mode } from "../types";

export default ({
  env,
  mode
}: {
  env: Env;
  mode: Mode;
}): Configuration["resolve"] => {
  const config: Configuration["resolve"] = {
    extensions: [".js", ".jsx", ".ts", "tsx", ".json"]
  };
  return config;
};
