import { TransformOptions } from "babel-core";
import { Target, Mode, BabelConfigs } from "../../types";

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

export default ({ mode }: { mode: Mode }): BabelConfigs => {
  const getConfig = (target: Target): TransformOptions => {
    const presets = [
      "@babel/preset-typescript",
      ["@babel/preset-env", { useBuiltIns: "usage", targets: targets[target] }],
      "@babel/preset-react"
    ];
    const plugins = [
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-class-properties"
    ];
    if (mode === "development" && target === "module")
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
