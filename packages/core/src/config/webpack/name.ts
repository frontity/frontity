import { Configuration } from "webpack";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["name"] => {
  const config = {
    module: "client",
    es5: "es5",
    node: "server"
  };
  return config[target];
};
