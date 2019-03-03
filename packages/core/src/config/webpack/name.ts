import { Configuration } from "webpack";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["name"] => {
  // It is important to use the names 'client' and 'server' for
  // webpack-hot-server-middleware.
  const config = {
    module: "client",
    es5: "es5",
    node: "server"
  };
  return config[target];
};
