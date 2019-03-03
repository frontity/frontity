import { resolve } from "path";
import { Configuration } from "webpack";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode
}: {
  target: Target;
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
    filename: filenames[target][mode],
    path: resolve(__dirname, `../../build/${paths[target]}`)
  };
  if (target === "node") config.libraryTarget = "commonjs2";
  if (target !== "node") config.chunkFilename = chunkFilenames[target][mode];
  return config;
};
