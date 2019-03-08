import { Configuration } from "webpack";
import { Target, Mode, WebpackConfigs, BabelConfigs } from "../../types";
import name from "./name";
import targets from "./targets";
import devtool from "./devtool";
import entry from "./entry";
import output from "./output";
import modules from "./modules";
import resolve from "./resolve";
import externals from "./externals";
import plugins from "./plugins";

export default ({
  mode,
  babel
}: {
  mode: Mode;
  babel: BabelConfigs;
}): WebpackConfigs => {
  const getConfig = (target: Target): Configuration => {
    const config: Configuration = {
      mode,
      name: name({ target, mode }),
      target: targets({ target, mode }),
      devtool: devtool({ target, mode }),
      entry: entry({ target, mode }),
      output: output({ target, mode }),
      module: modules({ target, mode, babel }),
      resolve: resolve({ target, mode }),
      externals: externals({ target, mode }),
      plugins: plugins({ target, mode })
    };
    return config;
  };

  return {
    module: getConfig("module"),
    es5: getConfig("es5"),
    server: getConfig("server")
  };
};
