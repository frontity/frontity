import buildCommand from "../commands/build";
import { errorLogger } from "../utils";

/**
 * The options for the {@link build} command.
 */
interface BuildOptions {
  /**
   * Describes the environments the final bundles will support in the client
   * side, which can be either `es5` for old browsers with ES6 Proxy support or
   * `module` for modern browsers with `<script type="module"></script>`
   * support, or `both` to generate both.
   *
   * - Module: edge \>= 16, firefox \>= 60, chrome \>= 61, safari \>= 10.1,
   * opera \>= 48, ios_saf \>= 10.3, and_ff \>= 60.
   *
   * - ES5: and_chr \>= 67, and_ff \>= 18, and_uc \>= 11.8, android \>= 67, not
   * android \<= 4.4.4, chrome \>= 49, edge \>= 12, firefox \>= 18, ios_saf \>=
   * 10, not op_mini all, op_mob \>= 46, opera \>= 36, "safari \>= 10, samsung
   * \>= 5.
   *
   * @defaultValue "both"
   */
  target?: string;

  /**
   * Indicates if the bundles should be generated using the mode="development"
   * option of Webpack.
   *
   * Webpack docs: https://webpack.js.org/configuration/mode/.
   *
   * @defaultValue false
   */
  development?: boolean;

  /**
   * The publicPath option of Webpack.
   *
   * Webpack docs: https://webpack.js.org/guides/public-path/.
   *
   * @example
   * ```sh
   * npx frontity build --public-path /custom/path
   * npx frontity build --public-path http://cdn.domain.com/custom/path
   * ```
   *
   * @defaultValue "/static/"
   */
  publicPath?: string;
}

/**
 * The build CLI command, usually run with `npx frontity build`.
 *
 * It takes args from the CLI and checks for the presence of environment
 * variables. Then, it runs the build command programatically.
 *
 * @param options - Defined in {@link BuildOptions}.
 */
const build = async ({
  target = process.env.FRONTITY_BUILD_TARGET || "both",
  development = !!process.env.FRONTITY_BUILD_DEVELOPMENT,
  publicPath = process.env.FRONTITY_BUILD_PUBLIC_PATH || "/static/",
}: BuildOptions) => {
  // Check `target` parameter.
  if (target && target !== "es5" && target !== "module" && target !== "both") {
    errorLogger(
      new Error(
        `The target specified is invalid: "${target}". Use either "module", "es5" or "both".`
      )
    );
  }

  // Execute the `build` command.
  buildCommand({
    target: target as "es5" | "module" | "both",
    development,
    publicPath,
  });
};

export default build;
