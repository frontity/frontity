import { Configuration } from "webpack";
import { Target } from "../../../types";

export default ({ target }: { target: Target }): Configuration["target"] => {
  return target === "server" ? "node" : "web";
};
