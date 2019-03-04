import { resolve } from "path";
import { Configuration } from "webpack";
import { Target, Mode } from "../../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["entry"] => {
  // Use /client for both es5 and modules and /server for node.
  const name: "server" | "client" = target === "node" ? "server" : "client";
  const config: Configuration["entry"] = [
    resolve(__dirname, `../../../src/${name}`)
  ];
  // This is needed for HMR but only in module when we are in development.
  if (target === "module" && mode === "development") {
    config.unshift("webpack-hot-middleware/client");
  }
  return config;
};
