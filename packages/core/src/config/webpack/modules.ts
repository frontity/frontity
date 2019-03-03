import { Configuration } from "webpack";
import { Target, Mode, BabelConfigs } from "../../types";

export default ({
  target,
  mode,
  babel
}: {
  target: Target;
  mode: Mode;
  babel: BabelConfigs;
}): Configuration["module"] => {
  const config: Configuration["module"] = {
    rules: [
      {
        // Support for js, jsx, ts and tsx files.
        test: /\.(j|t)sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            // Don't use the babelrc file of the root.
            babelrc: false,
            // Instead, use the babel options directly from our babel object.
            ...babel[target]
          }
        }
      }
    ]
  };
  return config;
};
