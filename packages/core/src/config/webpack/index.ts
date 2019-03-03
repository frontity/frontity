import path from "path";
import webpack, { Configuration } from "webpack";
import WriteFilePlugin from "write-file-webpack-plugin";
import { Target, Mode, WebpackConfigs } from "../types";
import name from "./name";
import targets from "./targets";
import devtool from "./devtool";
import entry from "./entry";
import output from "./output";
import modules from "./modules";
import resolve from "./resolve";
import plugins from "./plugins";

export default (mode: Mode): WebpackConfigs => {
  const getConfig = (target: Target): Configuration => {
    const config: Configuration = {
      name: name({ target, mode }),
      target: targets({ target, mode }),
      devtool: devtool({ target, mode }),
      entry: entry({ target, mode }),
      output: output({ target, mode }),
      module: modules({ target, mode }),
      resolve: resolve({ target, mode }),
      plugins: plugins({ target, mode })
    };
    return config;
  };

  return {
    module: getConfig("module"),
    es5: getConfig("es5"),
    node: getConfig("node")
  };
};
