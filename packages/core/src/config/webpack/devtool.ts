import { Configuration } from "webpack";
import { Mode } from "../../../types";

/**
 * The options of the {@link entry} function.
 */
interface ModeOptions {
  /**
   * The mode of the build: "development" or "production".
   */
  mode: Mode;
}

/**
 * Generate the object for Webpack's mode configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/mode.
 *
 * @param options - Defined in {@link ModeOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const mode = ({ mode }: ModeOptions): Configuration["devtool"] =>
  mode === "development" ? "eval-source-map" : false;

export default mode;
