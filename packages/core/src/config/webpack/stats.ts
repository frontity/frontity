import { Configuration } from "webpack";
import { Mode } from "../../../types";

/**
 * The options of the {@link stats} function.
 */
interface StatsOptions {
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
 * @param options - Defined in {@link StatsOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const stats = ({ mode }: StatsOptions): Configuration["stats"] =>
  mode === "development"
    ? {
        all: false,
        hash: false,
        assets: true,
        colors: true,
        errors: true,
        warnings: true,
        errorDetails: true,
        excludeAssets: /chunks\..*?\.json/,
      }
    : false;

export default stats;
