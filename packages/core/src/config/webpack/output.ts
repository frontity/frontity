import { resolve } from "path";
import { Target, Mode, WebpackConfig } from "@frontity/types/config";

// Get the root path of the directory where the script was started.
const rootPath = process.cwd();

// Use hashes only in production and distinguish between es5 and module
// files using their filenames.

/**
 * Configuration of the filenames for the generated chunks, for both development
 * and production.
 */
type Filenames = {
  /**
   * The filename in development.
   */
  development: string;

  /**
   * The filename in production.
   */
  production: string;
};

const filenames: {
  /**
   * The filenames for the target module.
   */
  module: Filenames;

  /**
   * The filenames for the target es5.
   */
  es5: Filenames;

  /**
   * The filenames for the target server.
   */
  server: Filenames;
} = {
  module: {
    development: "[name].module.js",
    production: "[name].module.[chunkhash].js",
  },
  es5: {
    development: "[name].es5.js",
    production: "[name].es5.[chunkhash].js",
  },
  server: {
    development: "server.js",
    production: "server.js",
  },
};

const paths: {
  /**
   * The pathname for the target module.
   */
  module: string;

  /**
   * The pathname for the target es5.
   */
  es5: string;

  /**
   * The pathname for the target server.
   */
  server: string;
} = {
  module: "static",
  es5: "static",
  server: "",
};

// Same with chunks, only hashes in production and es5/module in the filename.
const chunkFilenames: {
  /**
   * The chunk filename for the target module.
   */
  module: Filenames;

  /**
   * The chunk filename for the target es5.
   */
  es5: Filenames;
} = {
  module: {
    development: "[name].module.js",
    production: "[name].module.[chunkhash].js",
  },
  es5: {
    development: "[name].es5.js",
    production: "[name].es5.[chunkhash].js",
  },
};

/**
 * The options of the {@link moduleConf} function.
 */
interface OutputOptions {
  /**
   * The target of the build: "server", "es5" or "module".
   */
  target: Target;

  /**
   * The mode of the build: "development" or "production".
   */
  mode: Mode;

  /**
   * The output directory.
   */
  outDir: string;
}

/**
 * Generate the object for Webpack's output configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/output/.
 *
 * @param options - Defined in {@link OutputOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const output = ({
  target,
  mode,
  outDir,
}: OutputOptions): WebpackConfig["output"] => ({
  filename: filenames[target][mode],
  path: resolve(rootPath, outDir, paths[target]),
  ...(target !== "server" && { chunkFilename: chunkFilenames[target][mode] }),
  // Node still needs CJS.
  ...(target === "server" && { libraryTarget: "commonjs2" }),
});

export default output;
