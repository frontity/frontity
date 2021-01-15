import { Configuration } from "webpack";
import { Mode } from "../../../types";

/**
 * The options of the {@link devtools} function.
 */
interface DevToolsOptions {
  /**
   * The mode of the build: "development" or "production".
   */
  mode: Mode;
}

/**
 * Generate the object for Webpack's devtool configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/devtool.
 *
 * @param options - Defined in {@link DevToolsOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const devtools = ({ mode }: DevToolsOptions): Configuration["devtool"] =>
  mode === "development" ? "eval-source-map" : false;

export default devtools;
