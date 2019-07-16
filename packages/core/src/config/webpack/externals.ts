import { Configuration } from "webpack";
import { Target } from "../../../types";

export default ({ target }: { target: Target }): Configuration["externals"] => {
  const config: Configuration["externals"] =
    target !== "server"
      ? {
          "node-fetch": "window.fetch",
          url: "{ URL: window.URL }"
        }
      : {};
  return config;
};
