import { resolve } from "path";
import { Configuration } from "webpack";

const rootPath = process.cwd();

export default (): Configuration["resolve"] => {
  const config: Configuration["resolve"] = {
    // Automatically resolve extensions for js, jsx, ts and tsx files.
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    // Alias the build folder to get access to it directly, without relying on were
    // the node_module folder is. Useful for things like import "build/client-stats.json".
    alias: {
      build: resolve(rootPath, "build")
    }
  };
  return config;
};
