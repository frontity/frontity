import { Configuration } from "webpack";
import { Env } from "../types";

export default ({ env }: { env: Env }): Configuration["target"] => {
  return env === "node" ? "node" : "web";
};
