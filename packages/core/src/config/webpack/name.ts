import { Configuration } from "webpack";
import { Target, Mode } from "../../types";

// It is important to use the names 'client' and 'server' for
// webpack-hot-server-middleware.
export default ({
  target,
  mode
}: {
  target: Target;
  mode: Mode;
}): Configuration["name"] => (target === "server" ? "server" : "client");
