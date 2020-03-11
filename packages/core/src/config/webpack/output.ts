import { resolve } from "path";
import { Configuration } from "webpack";
import { Target, Mode } from "../../../types";

// Get the root path of the directory where the script was started.
const rootPath = process.cwd();

// Use hashes only in production and distinguish between es5 and module
// files using their filenames.
type Filenames = {
  development: string;
  production: string;
};
const filenames: {
  module: Filenames;
  es5: Filenames;
  server: Filenames;
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
  module: Filenames;
  es5: Filenames;
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

export default ({
  target,
  mode,
  outDir
}: {
  target: Target;
  mode: Mode;
  outDir: string;
}): Configuration["output"] => ({
  filename: filenames[target][mode],
  path: resolve(rootPath, outDir, paths[target]),
  publicPath: "/static/",
  ...(target !== "server" && { chunkFilename: chunkFilenames[target][mode] }),
  // Node still needs CJS.
  ...(target === "server" && { libraryTarget: "commonjs2" })
});
