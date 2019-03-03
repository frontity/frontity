import { Configuration } from "webpack";
import { Target, Mode } from "../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["module"] => {
  const config: Configuration["module"] = {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false
          }
        }
      }
    ]
  };
  return config;
};
