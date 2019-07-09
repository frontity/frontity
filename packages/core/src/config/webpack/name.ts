import { Configuration } from "webpack";
import { Target } from "../../../types";

// It is important to use the names 'client' and 'server' for
// webpack-hot-server-middleware.
export default ({ target }: { target: Target }): Configuration["name"] =>
  target === "server" ? "server" : "client";
