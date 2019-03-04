import { Configuration } from "webpack";
import LoadablePlugin from "@loadable/webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["externals"] => {
  const config: Configuration["externals"] = {};
  if (target === "node") {
    config["any-promise"] = "promise-monofill";
  }
  return config;
};
