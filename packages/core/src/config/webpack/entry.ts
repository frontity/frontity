import { resolve } from "path";
import { Configuration } from "webpack";
import { Target, Mode } from "../types";

export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["entry"] => {
  const name: "server" | "client" = target === "node" ? "server" : "client";
  const config: Configuration["entry"] = [resolve(__dirname, `../${name}`)];
  if (target === "module" && mode === "development") {
    config.unshift("webpack-hot-middleware/client");
  }
  return config;
};
