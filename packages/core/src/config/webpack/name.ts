import { Target, WebpackConfig } from "@frontity/types/config";

/**
 * The options of the {@link externals} function.
 */
interface NameOptions {
  /**
   * The target of the build: "server", "es5" or "module".
   */
  target: Target;
}

/**
 * Generate the object for Webpack's name configuration.
 *
 * It is important to use the names 'client' and 'server' for
 * `webpack-hot-server-middleware`.
 *
 * @param options - Defined in {@link NameOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const name = ({ target }: NameOptions): WebpackConfig["name"] =>
  target === "server" ? "server" : "client";

export default name;
