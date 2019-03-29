import { Mode, FrontityConfig } from "../types";
import getBabel from "./babel";
import getWebpack from "./webpack";

// This returns our FrontityConfig defaults. In the future,
// we will add here logic to inject the frontity.config.js of each package.
export default ({
  mode,
  packages,
  outDir
}: {
  mode: Mode;
  packages: {
    [key: string]: string[];
  };
  outDir: string;
}): FrontityConfig => {
  const babel = getBabel({ mode });
  const webpack = getWebpack({ mode, babel, packages, outDir });
  return {
    babel,
    webpack
  };
};
