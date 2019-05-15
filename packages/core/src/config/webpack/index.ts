import { Configuration } from "webpack";
import {
  Target,
  Mode,
  WebpackConfigs,
  BabelConfigs,
  EntryPoints,
  FrontityConfig
} from "../../types";
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
  babel,
  frontity,
  entryPoints
}: {
  mode: Mode;
  babel: BabelConfigs;
  frontity: FrontityConfig;
  entryPoints: EntryPoints[];
}): WebpackConfigs => {
  const getConfig = (target: Target): Configuration => {
    const config: Configuration = {
      mode,
      name: name({ target }),
      target: targets({ target }),
      devtool: devtool({ mode }),
      entry: entry({ target, mode, entryPoints }),
      output: output({ target, mode, outDir: frontity.outDir }),
      module: modules({ target, babel }),
      resolve: resolve(),
      externals: externals({ target }),
      plugins: plugins({ target, mode, outDir: frontity.outDir })
    };
    return config;
  };

  return {
    module: getConfig("module"),
    es5: getConfig("es5"),
    server: getConfig("server")
  };
};
