import { resolve } from "path";
import { Configuration } from "webpack";
import { Target, Mode } from "../../../types";

// Get the root path of the directory where the script was started.
const rootPath = process.cwd();

export default ({
  target,
  mode,
  outDir
}: {
  target: Target;
  mode: Mode;
  outDir: string;
}): Configuration["output"] => {
  // Use hashes only in production and distinguish between es5 and module
  // files using their filenames.
  type filenames = {
    development: string;
    production: string;
  };
  const filenames: {
    module: filenames;
    es5: filenames;
    server: filenames;
  } = {
    module: {
      development: "[name].module.js",
      production: "[name].module.[chunkhash].js"
    },
    es5: {
      development: "[name].es5.js",
      production: "[name].es5.[chunkhash].js"
    },
    server: {
      development: "server.js",
      production: "server.js"
    }
  };
  const paths: {
    module: string;
    es5: string;
    server: string;
  } = {
    module: "static",
    es5: "static",
    server: ""
  };
  // Same with chunks, only hashes in production and es5/module in the filename.
  const chunkFilenames: {
    module: filenames;
    es5: filenames;
  } = {
    module: {
      development: "[name].module.js",
      production: "[name].module.[chunkhash].js"
    },
    es5: {
      development: "[name].es5.js",
      production: "[name].es5.[chunkhash].js"
    }
  };
  const config: Configuration["output"] = {
    filename: filenames[target][mode],
    path: resolve(rootPath, outDir, paths[target]),
    publicPath: "/static/"
  };
  // Node still needs CJS.
  if (target === "server") config.libraryTarget = "commonjs2";
  if (target !== "server") {
    config.chunkFilename = chunkFilenames[target][mode];
  }
  return config;
};
