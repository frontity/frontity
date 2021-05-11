import { Target, WebpackConfig } from "@frontity/types/config";

/**
 * The options of the {@link target} function.
 */
interface TargetOptions {
  /**
   * The target of the build: "server", "es5" or "module".
   */
  target: Target;
}

/**
 * Generate the object for Webpack's target configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/target/.
 *
 * @param options - Defined in {@link TargetOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const target = ({ target }: TargetOptions): WebpackConfig["target"] => {
  return target === "server" ? "node" : "web";
};

export default target;
