import { Configuration } from "webpack";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["devtool"] => {
  if (mode === "development" && (target === "module" || target === "node"))
    return "cheap-module-eval-source-map";
  return false;
};
