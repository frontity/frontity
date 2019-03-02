import { Configuration } from "webpack";
import { Env, Mode } from "../types";

export default ({
  env,
  mode
}: {
  env: Env;
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
