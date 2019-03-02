import { resolve } from "path";
import { Configuration } from "webpack";
import { Env, Mode } from "../types";

export default ({
  env,
  mode
}: {
  env: Env;
  mode: Mode;
}): Configuration["output"] => {
  const filenames = {
    module: {
      development: "main.module.js",
      production: "main.module.[chunkhash].js"
    },
    es5: {
      development: "main.es5.js",
      production: "main.es5.[chunkhash].js"
    },
    node: {
      development: "main.js",
      production: "main.js"
    }
  };
  const paths = {
    module: "static",
    es5: "static",
    node: "dynamic"
  };
  const chunkFilenames = {
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
    filename: filenames[env][mode],
    path: resolve(__dirname, `../../build/${paths[env]}`)
  };
  if (env === "node") config.libraryTarget = "commonjs2";
  if (env !== "node") config.chunkFilename = chunkFilenames[env][mode];
  return config;
};
