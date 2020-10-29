// We are exporting each script, with a dynamic import in order to avoid
// loading the rest of the scripts which might have side-effects

export const serve = (args) =>
  import("./serve").then((mod) => mod.default(args));
export const build = (args) =>
  import("./build").then((mod) => mod.default(args));
export const dev = (args) => import("./dev").then((mod) => mod.default(args));
