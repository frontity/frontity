import devCommand from "../commands/dev";
import { errorLogger } from "../utils";

/**
 * The options for the {@link build} command.
 */
interface DevOptions {
  /**
   * Describes the environments the final bundles will support in the client
   * side, which can be either `es5` for old browsers with ES6 Proxy support or
   * `module` for modern browsers with `<script type="module"></script>`
   * support.
   *
   * - Module: edge \>= 16, firefox \>= 60, chrome \>= 61, safari \>= 10.1,
   * opera \>= 48, ios_saf \>= 10.3, and_ff \>= 60.
   *
   * - ES5: and_chr \>= 67, and_ff \>= 18, and_uc \>= 11.8, android \>= 67, not
   * android \<= 4.4.4, chrome \>= 49, edge \>= 12, firefox \>= 18, ios_saf \>=
   * 10, not op_mini all, op_mob \>= 46, opera \>= 36, "safari \>= 10, samsung
   * \>= 5.
   *
   * It can be also configured using the `FRONTITY_DEV_TARGET` env variable.
   *
   * @defaultValue "module"
   */
  target?: string;

  /**
   * Indicates if the bundles should be generated using the mode="production"
   * option of Webpack.
   *
   * Webpack docs: https://webpack.js.org/configuration/mode/.
   *
   * It can be also configured using the `FRONTITY_DEV_PRODUCTION` env
   * variable.
   *
   * @defaultValue false
   */
  production?: boolean;

  /**
   * The publicPath option of Webpack.
   *
   * Webpack docs: https://webpack.js.org/guides/public-path/.
   *
   * It can be also configured using the `FRONTITY_DEV_PUBLIC_PATH` env
   * variable.
   *
   * @example
   * ```sh
   * npx frontity dev --public-path /custom/path
   * npx frontity dev --public-path http://cdn.domain.com/custom/path
   * ```
   *
   * @defaultValue "/static/"
   */
  publicPath?: string;

  /**
   * The port that should be used to open the server.
   *
   * It can be also configured using the `FRONTITY_DEV_PORT` env variable.
   *
   * @example
   * ```sh
   * # This will start Frontity in http://localhost:3003.
   * npx frontity dev --port 3003
   * ```
   *
   * @defaultValue "3000"
   */
  port?: string;

  /**
   * Indicates if the server should be started in HTTPS mode.
   *
   * The certificates used are stored internally in the Frontity core and are
   * not meant to be used in production, only in local development.
   *
   * It can be also configured using the `FRONTITY_DEV_HTTPS` env variable.
   *
   * @example
   * ```sh
   * # This will start Frontity in https://localhost:3000.
   * npx frontity dev --https
   * ```
   *
   * @defaultValue false
   */
  https?: boolean;

  /**
   * Indicates if a browser tab should be opened once Frontity starts.
   *
   * It can be also configured using the `FRONTITY_DEV_DONT_OPEN_BROWSER` env
   * variable.
   *
   * @defaultValue true
   */
  dontOpenBrowser?: boolean;
}

/**
 * The dev CLI command, usually run with `npx frontity dev`.
 *
 * It takes args from the CLI and checks for the presence of environment
 * variables. Then, it runs the dev command programatically.
 *
 * @param options - Defined in {@link DevOptions}.
 */
const dev = async ({
  target = process.env.FRONTITY_DEV_TARGET || "module",
  port = process.env.FRONTITY_DEV_PORT || "3000",
  https = !!process.env.FRONTITY_DEV_HTTPS,
  production = !!process.env.FRONTITY_DEV_PRODUCTION,
  publicPath = process.env.FRONTITY_DEV_PUBLIC_PATH || "/static/",
  dontOpenBrowser = !!process.env.FRONTITY_DEV_DONT_OPEN_BROWSER,
}: DevOptions) => {
  // Check `target` parameter.
  if (target && target !== "es5" && target !== "module") {
    errorLogger(
      new Error(
        `The target specified is invalid: "${target}". Use either "module" or "es5".`
      )
    );
  }

  // Check `port` parameter.
  if (port && Number.isNaN(parseInt(port, 10))) {
    errorLogger(new Error(`The port number specified is not valid: ${port}.`));
  }

  // Execute `dev` command.
  devCommand({
    target: target as "es5" | "module",
    port: parseInt(port, 10),
    production,
    https,
    publicPath,
    dontOpenBrowser,
  });
};

export default dev;
