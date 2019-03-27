import { Configuration } from "webpack";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["externals"] => {
  const config: Configuration["externals"] = {};
  if (target === "server") {
    config["any-promise"] = "promise-monofill";
  }
  return config;
};
