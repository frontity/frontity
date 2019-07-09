import { Configuration } from "webpack";
import { Target } from "../../../types";

export default ({ target }: { target: Target }): Configuration["externals"] => {
  const config: Configuration["externals"] = {};
  return config;
};
