import { resolve as resolvePath } from "path";
import { WebpackConfig } from "@frontity/types/config";

const rootPath = process.cwd();

/**
 * Generate the object for Webpack's resolve configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/resolve/.
 *
 * @returns The configuration object for Webpack.
 */
const resolve = (): WebpackConfig["resolve"] => ({
  // Automatically resolve extensions for js, jsx, ts and tsx files.
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  // Alias the build folder to get access to it directly, without relying on were
  // the node_module folder is. Useful for things like import "build/client-stats.json".
  alias: {
    build: resolvePath(rootPath, "build"),
    // Force ramda to be the esModule version to support tree-shaking.
    "ramda/src": "ramda/es",
    // Avoid dynamic imports with Koa require.
    "any-promise": "promise-monofill",
  },
});

export default resolve;
