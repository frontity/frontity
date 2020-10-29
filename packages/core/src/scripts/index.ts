import { ServeOptions } from "./serve";
import { BuildOptions } from "./build";
import { DevOptions } from "./dev";

/**
 * The serve function that dynamically imports the Frontity serve command.
 *
 * @param args - Defined in {@link ServeOptions}.
 * @returns The imported module.
 */
export const serve = (args: ServeOptions) =>
  import("./serve").then((mod) => mod.default(args));

/**
 * The build function that dynamically imports the Frontity build command.
 *
 * @param args - Defined in {@link BuildOptions}.
 *
 * @returns The imported module.
 */
export const build = (args: BuildOptions) =>
  import("./build").then((mod) => mod.default(args));

/**
 * The dev function that dynamically imports the Frontity dev command.
 *
 * @param args - Defined in {@link DevOptions}.
 *
 * @returns The imported module.
 */
export const dev = (args: DevOptions) =>
  import("./dev").then((mod) => mod.default(args));
