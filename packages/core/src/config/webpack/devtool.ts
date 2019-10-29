import { Configuration } from "webpack";
import { Mode } from "../../../types";

export default ({ mode }: { mode: Mode }): Configuration["devtool"] =>
  mode === "development" ? "eval-source-map" : false;
