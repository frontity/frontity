import { Mode, FrontityConfig } from "../types";
import getHeaders from "./headers";
import getBabel from "./babel";
import getWebpack from "./webpack";
import getRobots from "./robots";

export default ({ mode }: { mode: Mode }): FrontityConfig => {
  const headers = getHeaders({ mode });
  const babel = getBabel({ mode });
  const webpack = getWebpack({ mode, babel });
  const robots = getRobots({ mode });
  return {
    headers,
    babel,
    webpack,
    robots
  };
};
