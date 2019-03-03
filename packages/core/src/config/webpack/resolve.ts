import { Configuration } from "webpack";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["resolve"] => {
  const config: Configuration["resolve"] = {
    // Automatically resolve extensions for js, jsx, ts and tsx files.
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  };
  return config;
};
