import { resolve } from "path";
import { Configuration } from "webpack";
import { Target, Mode, EntryPoints } from "../../types";

// Get the root path of the directory where the script was started.
const rootPath = process.cwd();

export default ({
  target,
  mode,
  entryPoints
}: {
  target: Target;
  mode: Mode;
  entryPoints: EntryPoints[];
}): Configuration["entry"] => {
  // Use /client for both es5 and modules and /server for node.
  const name: "server" | "client" = target === "server" ? "server" : "client";

  let config: Configuration["entry"] = {};

  if (target === "server") {
    const { path } = entryPoints.find(bundle => bundle.name === "server");
    config = resolve(rootPath, path);
  } else {
    entryPoints
      .filter(bundle => bundle.name !== "server")
      .forEach(({ name, path }) => {
        config[name] = [resolve(rootPath, path)];
      });
  }
  // This is needed for HMR in the client but only when we are in development.
  if (target !== "server" && mode === "development") {
    Object.values(config).forEach(entry => {
      // @ts-ignore
      entry.unshift("webpack-hot-middleware/client");
    });
  }
  return config;
};
