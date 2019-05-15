import { Mode, Config, EntryPoints } from "../types";
import getBabel from "./babel";
import getWebpack from "./webpack";
import getFrontity from "./frontity";

// This returns our FrontityConfig defaults. In the future,
// we will add here logic to inject the frontity.config.js of each package.
export default ({
  mode,
  entryPoints
}: {
  mode: Mode;
  entryPoints: EntryPoints[];
}): Config => {
  const frontity = getFrontity();
  const babel = getBabel({ mode });
  const webpack = getWebpack({ mode, babel, frontity, entryPoints });
  return {
    babel,
    webpack,
    frontity
  };
};
