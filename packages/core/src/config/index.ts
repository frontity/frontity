import { Mode, Config, EntryPoints } from "../../types";
import getBabel from "./babel";
import getWebpack from "./webpack";
import getFrontity from "./frontity";

/**
 * The options of the {@link config} function.
 */
interface ConfigOptions {
  /**
   * The mode of the build: "development" or "production".
   */
  mode: Mode;

  /**
   * The paths of the entry points generated on the fly by Frontity in the
   * `/build/bundling/entry-points folder`.
   */
  entryPoints: EntryPoints[];

  /**
   * The public path of Webpack.
   */
  publicPath: string;
}

/**
 * Generate the configuration objects for Webpack, Babel and Frontity.
 *
 * @param options - Defined in {@link ConfigOptions}.
 *
 * @returns The configuration object for Webpack, Babel and Frontity. Each
 * configuration object contains the three targets: "module", "es5" and "server".
 */
const config = ({
  mode,
  entryPoints,
  publicPath = "/static/",
}: ConfigOptions): Config => {
  const frontity = getFrontity();
  const babel = getBabel();
  const webpack = getWebpack({
    mode,
    babel,
    frontity,
    entryPoints,
    publicPath,
  });

  return {
    babel,
    webpack,
    frontity,
  };
};

export default config;
