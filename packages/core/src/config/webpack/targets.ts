import { Configuration } from "webpack";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["target"] => {
  return target === "node" ? "node" : "web";
};
