import { Mode, Target } from "@frontity/core/types";

/**
 * Options that are used to customize the webpack config.
 */
interface Options {
  /**
   * The frontity inner webpack config.
   */
  config: Record<string, Record<string, unknown>>;

  /**
   * The current running mode.
   */
  mode: Mode;

  /**
   * The target context for the current execution.
   */
  target: Target;
}

/**
 * The webpack configuration function.
 *
 * @param configs - The frontity inner configuration for webpack.
 */
export const webpack = ({ config }: Options) => {
  // Modify the config as you wish
  // Here for example we alias react to preact/compat.
  config.resolve.alias["react"] = "preact/compat";
  config.resolve.alias["react-dom"] = "preact/compat";
};
