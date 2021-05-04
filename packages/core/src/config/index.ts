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

  /**
   * Flag indicating if the Bundle Analyzer plugin should be included.
   *
   * @defaultValue false
   */
  analyze?: boolean;

  /**
   * Extra configurations used to extend the current configurations.
   */
  extraConfigurations?: Record<string, []>;
}

/**
 * Runs through the source targets and calls the entries configurations
 * with the current target configuration, target name and mode.
 *
 * @param source - The source of the configuration targets.
 * @param entries - The entries for the current target.
 * @param mode - The current running mode.
 */
const runForEachTarget = (source, entries, mode) => {
  // If there are entries to be ran.
  if (entries && entries.length) {
    // Iterate for each target inside the source.
    for (const target in source) {
      // And run through each entry configuration.
      entries.forEach((configuration) => {
        // And call the configuration function with the current
        // config, target and mode.
        configuration({
          config: source[target],
          target,
          mode,
        });
      });
    }
  }
};

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
  publicPath,
  analyze = false,
  extraConfigurations = { babel: [], webpack: [] },
}: ConfigOptions): Config => {
  const frontity = getFrontity();
  const babel = getBabel();

  // Runs the extra configurations for babel, if any.
  runForEachTarget(babel, extraConfigurations.babel, mode);

  const webpack = getWebpack({
    mode,
    babel,
    frontity,
    entryPoints,
    publicPath,
    analyze,
  });

  // Runs the extra webpack configuration, if any.
  runForEachTarget(webpack, extraConfigurations.webpack, mode);

  return {
    babel,
    webpack,
    frontity,
  };
};

export default config;
