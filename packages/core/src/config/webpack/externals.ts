import { Configuration } from "webpack";
import { Target } from "../../types";

export default ({ target }: { target: Target }): Configuration["externals"] => {
  const config: Configuration["externals"] = {};
  if (target === "server") {
    config["any-promise"] = "promise-monofill";
  }
  return config;
};
