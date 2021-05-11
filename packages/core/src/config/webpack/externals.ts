import { Target, WebpackConfig } from "@frontity/types/config";

/**
 * The options of the {@link externals} function.
 */
interface ExternalsOptions {
  /**
   * The target of the build: "server", "es5" or "module".
   */
  target: Target;
}

/**
 * Generate the object for Webpack's externals configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/externals/.
 *
 * @param options - Defined in {@link ExternalsOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const externals = ({
  target,
}: ExternalsOptions): WebpackConfig["externals"] => ({
  ...(target !== "server" && {
    he: "{}",
    "node-fetch": "window.fetch",
    url: "{ URL: window.URL }",
  }),
});

export default externals;
