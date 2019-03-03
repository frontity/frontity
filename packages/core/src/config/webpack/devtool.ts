import { Configuration } from "webpack";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["devtool"] => {
  // Use "cheap-module-eval-source-map" because it was recommended somewhere
  // but we should do some tests to figure out the best option ourselves.
  // Don't need to use sourcemaps for es5 because development is going to
  // be done with modules only.
  if (mode === "development" && (target === "module" || target === "node"))
    return "cheap-module-eval-source-map";
  return false;
};
