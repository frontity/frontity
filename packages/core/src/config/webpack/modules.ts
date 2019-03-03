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
        test: /\.(j|t)sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            ...babel[target]
          }
        }
      }
    ]
  };
  return config;
};
