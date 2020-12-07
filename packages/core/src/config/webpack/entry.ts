import { resolve } from "path";
import { Configuration } from "webpack";
import { Target, Mode, EntryPoints } from "../../../types";

// Get the root path of the directory where the script was started.
const rootPath = process.cwd();

/**
 * The options of the {@link entry} function.
 */
interface EntryOptions {
  /**
   * The target of the build: "server", "es5" or "module".
   */
  target: Target;

  /**
   * The mode of the build: "development" or "production".
   */
  mode: Mode;

  /**
   * The paths of the entry points generated on the fly by Frontity in the
   * `/build/bundling/entry-points folder`.
   */
  entryPoints: EntryPoints[];
}

/**
 * Generate the object for Webpack's entry configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/entry-context/.
 *
 * @param options - Defined in {@link EntryOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const entry = ({
  target,
  mode,
  entryPoints,
}: EntryOptions): Configuration["entry"] => {
  let config: Configuration["entry"] = {};

  if (target === "server") {
    const { path } = entryPoints.find((bundle) => bundle.name === "server");
    config = resolve(rootPath, path);
  } else {
    entryPoints
      .filter((bundle) => bundle.name !== "server")
      .forEach(({ name, path }) => {
        config[name] = [];

        // This is needed for HMR in the client but only when we are in development.
        if (mode === "development")
          config[name].push("webpack-hot-middleware/client");

        config[name].push(resolve(rootPath, path));
      });
  }
  return config;
};

export default entry;
