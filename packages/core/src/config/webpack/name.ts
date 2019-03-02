import { Configuration } from "webpack";
import { Env } from "../types";

export default ({ env }: { env: Env }): Configuration["name"] => {
  const config = {
    module: "client",
    es5: "es5",
    node: "server"
  };
  return config[env];
};
