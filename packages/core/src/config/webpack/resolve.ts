import { Configuration } from "webpack";
import { Target, Mode } from "../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["resolve"] => {
  const config: Configuration["resolve"] = {
    extensions: [".js", ".jsx", ".ts", "tsx", ".json"]
  };
  return config;
};
