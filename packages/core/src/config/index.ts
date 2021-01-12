import { Mode, Config, EntryPoints } from "../../types";
import getBabel from "./babel";
import getWebpack from "./webpack";
import getFrontity from "./frontity";

/**
 * Frontity config definition.
 */
interface FrontityConfig {
  /**
   * Webpack mode.
   */
  mode: Mode;

  /**
   * Entry points list.
   */
  entryPoints: EntryPoints[];

  /**
   * Public path.
   */
  publicPath: string;
}

/**
 * This returns our FrontityConfig defaults. In the future,
 * we will add here logic to inject the frontity.config.js of each package.
 *
 * @param config - Configurations.
 * @returns Frontity configuration.
 */
export default ({ mode, entryPoints, publicPath }: FrontityConfig): Config => {
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
