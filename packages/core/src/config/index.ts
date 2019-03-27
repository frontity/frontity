import { Mode, FrontityConfig } from "../types";
import getBabel from "./babel";
import getWebpack from "./webpack";

// This returns our FrontityConfig defaults. In the future,
// we will add here logic to inject the frontity.config.js of each package.
export default ({ mode }: { mode: Mode }): FrontityConfig => {
  const babel = getBabel({ mode });
  const webpack = getWebpack({ mode, babel });
  return {
    babel,
    webpack
  };
};
