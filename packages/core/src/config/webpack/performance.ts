import { Configuration } from "webpack";
import { Target } from "../../../types";

/**
 * The options of the {@link performance} function.
 */
interface PerformanceOptions {
  /**
   * The target of the build: "server", "es5" or "module".
   */
  target: Target;
}

/**
 * Generate the object for Webpack's performance configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/performance/.
 *
 * @param options - Defined in {@link PerformanceOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const performance = ({
  target,
}: PerformanceOptions): Configuration["performance"] => ({
  ...(target === "server"
    ? {
        // Max size recommended for the server bundle: 5Mbs.
        maxEntrypointSize: 5000000,
        maxAssetSize: 5000000,
      }
    : {
        // Max size recommended for the client bundles: 500Kbs.
        maxEntrypointSize: 500000,
        maxAssetSize: 500000,
      }),
});

export default performance;
