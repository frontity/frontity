import { Configuration } from "webpack";
import { Mode } from "../../../types";

// Use "cheap-module-eval-source-map" because it was recommended somewhere
// but we should do some tests to figure out the best option ourselves.
// Don't need to use sourcemaps for es5 because development is going to
// be done with modules only.
export default ({ mode }: { mode: Mode }): Configuration["devtool"] =>
  mode === "development" ? "cheap-module-eval-source-map" : false;
