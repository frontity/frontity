import { resolve } from "path";
import { Configuration } from "webpack";
import { Target, Mode, EntryPoints } from "../../../types";

// Get the root path of the directory where the script was started.
const rootPath = process.cwd();

export default ({
  target,
  mode,
  entryPoints,
}: {
  target: Target;
  mode: Mode;
  entryPoints: EntryPoints[];
}): Configuration["entry"] => {
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

        // Add polyfills for the es5 packages.
        if (target === "es5") {
          // config[name].push("core-js/stable");
          // config[name].push("regenerator-runtime/runtime");
        }

        config[name].push(resolve(rootPath, path));
      });
  }
  return config;
};
