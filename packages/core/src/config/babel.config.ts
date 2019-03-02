import { TransformOptions } from "babel-core";
import { Env, Mode, BabelConfigs } from "./types";

const targets = {
  module: { esmodules: true },
  es5: {
    browsers: [
      "and_chr >= 67",
      "and_ff >= 18",
      "and_uc >= 11.8",
      "android >= 67",
      "not android <= 4.4.4",
      "chrome >= 49",
      "edge >= 12",
      "firefox >= 18",
      "ios_saf >= 10",
      "not op_mini all",
      "op_mob >= 46",
      "opera >= 36",
      "safari >= 10",
      "samsung >= 5"
    ]
  },
  node: { node: "8.10" }
};

export default (mode: Mode): BabelConfigs => {
  const getConfig = (env: Env): TransformOptions => {
    const presets = [
      "typescript",
      ["env", { useBuiltIns: "usage", targets: targets[env] }],
      "react"
    ];
    const plugins = [
      "transform-object-rest-spread",
      "transform-class-properties"
    ];
    if (mode === "development" && env === "module")
      plugins.push("react-hot-loader/babel");
    return {
      presets,
      plugins
    };
  };

  return {
    module: getConfig("module"),
    es5: getConfig("es5"),
    node: getConfig("node")
  };
};
