import { Configuration } from "webpack";
import { Target } from "../../types";

export default ({ target }: { target: Target }): Configuration["externals"] => {
  const config: Configuration["externals"] = {};
  if (target === "server") {
    // Avoid dynamic imports with Koa require.
    //config["any-promise"] = "promise-monofill";
    // Force ramda to be the esModule version to support tree-shaking.
    // config["ramda"] = "ramda/es";
    // Force lodash to be the esModule version to support tree-shaking.
    // config["lodash"] = "lodash-es";
  }
  return config;
};
