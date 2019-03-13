import { resolve } from "path";
import { Configuration } from "webpack";
import { Target, Mode } from "../../types";

const rootPath = process.cwd();

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["resolve"] => {
  const config: Configuration["resolve"] = {
    // Automatically resolve extensions for js, jsx, ts and tsx files.
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      build: resolve(rootPath, "build")
    }
  };
  return config;
};
